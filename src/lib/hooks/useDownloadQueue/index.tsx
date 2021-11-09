import { GetRecordsOptionsType } from "@lib/requests/getRecordsBySensorId";
import {
  useState,
  useRef,
  useEffect,
  createContext,
  FC,
  useContext,
} from "react";

interface QueueItemType {
  id: string;
  title: string;
  progress: number;
  totalCount: number;
  result?: string;
  error?: Error;
  callback: (data: QueueItemType) => void;
}

type PushToQueueSignature = (config: {
  id: number;
  title: string;
  totalCount: number;
  options?: GetRecordsOptionsType;
  callback?: (data: QueueItemType) => void;
}) => void;

interface DownloadQueueContextType {
  queue: Record<string, QueueItemType>;
  pushToQueue: PushToQueueSignature;
}

const defaultValue = {
  queue: {},
  pushToQueue: () => undefined,
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
      if (data.progress === 100) {
        setQueue(currentQueue => {
          const currentItem = currentQueue[data.id];
          if (!currentItem) return currentQueue;
          typeof currentItem?.callback === "function" &&
            void currentItem.callback(data);
          delete currentQueue[data.id];
          return currentQueue;
        });
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DownloadQueueContext.Provider
      value={{
        queue,
        pushToQueue: ({
          id,
          title,
          options,
          totalCount,
          callback = () => undefined,
        }) => {
          setQueue(currentQueue => ({
            ...currentQueue,
            [id]: {
              id,
              title,
              progress: 0,
              callback,
            },
          }));
          workerRef.current?.postMessage({
            id,
            title,
            options,
            totalCount,
          });
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
