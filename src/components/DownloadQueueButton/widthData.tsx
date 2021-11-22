import { useDownloadQueue } from "@lib/hooks/useDownloadQueue";
import { FC } from "react";
import { DownloadQueueButton as RawDownloadQueueButton } from ".";

export const DownloadQueueButton: FC = () => {
  const { queue, removeFromQueue } = useDownloadQueue();

  return (
    <RawDownloadQueueButton queue={queue} onDownloadCancel={removeFromQueue} />
  );
};
