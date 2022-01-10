import { useState, useCallback } from "react";
import { Story } from "@storybook/react";
import { DownloadQueueButton } from ".";
import { Button } from "@components/Button";
import { DownloadQueueType, QueueItemType } from "@lib/hooks/useDownloadQueue";
import { action } from "@storybook/addon-actions";

export default {
  title: "UI Elements/DownloadQueueButton",
  component: DownloadQueueButton,
};

let lastId = 0;
const createQueueEl = (): QueueItemType => ({
  id: `${(lastId += 1)}`,
  username: "potus",
  title: `Sensoqwfffffqf qf qwf qwf qwfqwfqwf qwfqwffqwfr ${lastId}`,
  progress: Math.round(Math.random() * 100),
  totalCount: Math.round(Math.random() * 1000),
  callback: () => undefined,
});

const Template: Story = () => {
  const [queue, setQueue] = useState<DownloadQueueType>({});

  const addElToQueue = useCallback(() => {
    const newQueueItem = createQueueEl();
    const newQueue = {
      ...queue,
      [newQueueItem.id]: newQueueItem,
    };
    setQueue(newQueue);

    const interval = setInterval(() => {
      setQueue(currentQueue => {
        if (!currentQueue || !currentQueue[newQueueItem.id]) {
          clearInterval(interval);
          return currentQueue;
        }
        const queueWithIncreasedProgress = {
          ...currentQueue,
          [newQueueItem.id]: {
            ...currentQueue[newQueueItem.id],
            progress: currentQueue[newQueueItem.id].progress + 4,
          },
        };
        if (queueWithIncreasedProgress[newQueueItem.id].progress >= 100) {
          clearInterval(interval);
          const newQueueWithoutItem = { ...currentQueue };
          delete newQueueWithoutItem[newQueueItem.id];
          return newQueueWithoutItem;
        }
        return queueWithIncreasedProgress;
      });
    }, 1000);
  }, [queue]);

  const removeElFromQueue = useCallback(
    (id?: string) => {
      if (Object.values(queue).length === 0) return;
      const newQueue = { ...queue };
      delete newQueue[id || Object.keys(queue)[0]];
      setQueue(newQueue);
    },
    [queue]
  );

  return (
    <div className='inline-flex flex-col gap-6 float-right'>
      <div className='flex gap-3 h-10 items-center content-center'>
        <span>Text before</span>
        <DownloadQueueButton
          queue={queue}
          onDownloadCancel={id => {
            action("Removed element from queue")(id);
            removeElFromQueue(id);
          }}
        />
        <span>Text after</span>
      </div>
      <div className='flex gap-4'>
        <Button onClick={addElToQueue}>Add queue item</Button>
        <Button onClick={() => removeElFromQueue()}>Remove queue item</Button>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
