import { LandingStatsReturnType } from "@lib/requests/getLandingStats";
import { FC } from "react";

export const LandingStatsSection: FC<{
  stats: LandingStatsReturnType;
}> = ({ stats }) => (
  <section
    className={[
      "relative z-10",
      "container mx-auto max-w-8xl",
      "pt-96",
      "px-4 sm:px-6 md:px-8",
      "flex flex-wrap justify-between",
    ].join(" ")}
  >
    <div className='w-full sm:w-auto'>
      <h2
        className={[
          "text-xl sm:text-2xl md:text-3xl",
          "text-blue font-semibold",
          "mt-8 sm:mt-6 mb-4 text-center sm:text-left",
        ].join(" ")}
        style={{
          textShadow:
            "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
        }}
      >
        Wir stehen erst am Anfang
        <br />
        <span className='text-purple'>Ein paar Beispielprojekte</span>
      </h2>
    </div>
    <div className='flex items-center'>
      <div className='p-4 inline-flex flex-wrap sm:flex-nowrap gap-x-8 gap-y-2 bg-white shadow items-center justify-center'>
        <div className='flex gap-2 items-center'>
          <strong className='sm:text-xl font-bold text-blue'>
            {stats.usersCount}
          </strong>
          Teilnehmer
        </div>
        <div className='flex gap-2 items-center'>
          <strong className='sm:text-xl font-bold text-blue'>
            {stats.devicesCount}
          </strong>
          Sensoren
        </div>
        <div className='flex gap-2 items-center'>
          <strong className='sm:text-xl font-bold text-blue'>
            {stats.recordsCount}
          </strong>
          Messwerte
        </div>
      </div>
    </div>
  </section>
);
