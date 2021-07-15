import { FC } from "react";
import { SummaryType } from "@common/interfaces";

export const ProjectSummary: FC<SummaryType> = ({
  title,
  description,
  noOfDevices,
}) => {
  return (
    <div className='max-prose'>
      <h1 className='text-xl sm:text-3xl md:text-4xl text-purple'>{title}</h1>
      <p className='mt-3'>{description}</p>
      <p className='mt-1 font-bold'>Anzahl der Sensoren: {noOfDevices}</p>
    </div>
  );
};
