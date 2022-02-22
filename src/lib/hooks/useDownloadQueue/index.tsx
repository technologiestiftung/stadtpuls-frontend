import { GetRecordsOptionsType } from "@lib/requests/getRecordsBySensorId";
import {
  useState,
  useRef,
  useEffect,
  createContext,
  FC,
  useContext,
} from "react";

export interface QueueItemType {
  id: string;
  username: string;
  title: string;
  progress: number;
  totalCount: number;
  result?: string;
  error?: Error;
  callback: (data: QueueItemType) => void;
}

type PushToQueueSignature = (config: {
  id: number;
  username: string;
  title: string;
  totalCount: number;
  options?: GetRecordsOptionsType;
  callback?: (data: QueueItemType) => void;
}) => void;

export type DownloadQueueType = Record<string, QueueItemType>;

interface DownloadQueueContextType {
  queue: DownloadQueueType;
  queueSize: number;
  pushToQueue: PushToQueueSignature;
  removeFromQueue: (id: string) => void;
}

const defaultValue = {
  queue: {},
  queueSize: 0,
  pushToQueue: () => undefined,
  removeFromQueue: () => undefined,
};

const DownloadQueueContext =
  createContext<DownloadQueueContextType>(defaultValue);

export const DownloadQueueProvider: FC = ({ children }) => {
  const workerRef = useRef<Worker>();
  const [queue, setQueue] = useState<DownloadQueueContextType["queue"]>({});

  useEffect(() => {
    workerRef.current = new Worker("/workers/downloadQueueWorker.js", {
      type: "module",
    });
    workerRef.current.onerror = () => {
      console.error(`Error while loading the WebWorker`);
    };
    workerRef.current.onmessage = ({ data }: { data: QueueItemType }) => {
      setQueue(currentQueue => {
        const existingEl = currentQueue[data.id] || {};
        return {
          ...currentQueue,
          [data.id]: { ...existingEl, ...data },
        };
      });

      if (data.progress >= 100 && !!data.result) {
        setQueue(currentQueue => {
          const currentItem = currentQueue[data.id];
          if (!currentItem) return currentQueue;
          typeof currentItem?.callback === "function" &&
            void currentItem.callback(data);
          const newQueue = { ...currentQueue };
          delete newQueue[data.id];
          return newQueue;
        });
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  return (
    <DownloadQueueContext.Provider
      value={{
        queue,
        queueSize: Object.values(queue).filter(Boolean).length || 0,
        pushToQueue: ({
          id,
          username,
          title,
          options,
          totalCount,
          callback = () => undefined,
        }) => {
          setQueue(currentQueue => ({
            ...currentQueue,
            [id]: {
              id,
              username,
              title,
              progress: 0,
              callback,
            },
          }));
          workerRef.current?.postMessage({
            id,
            username,
            title,
            options,
            totalCount,
          });
        },
        removeFromQueue: id => {
          setQueue(currentQueue => {
            const newQueue = { ...currentQueue };
            if (!newQueue[id]) return currentQueue;
            delete newQueue[id];
            return newQueue;
          });
          workerRef.current?.postMessage(id);
        },
      }}
    >
      {children}
    </DownloadQueueContext.Provider>
  );
};

export const useDownloadQueue = (): DownloadQueueContextType => {
  return useContext(DownloadQueueContext);
};
