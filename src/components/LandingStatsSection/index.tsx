import { LandingStatsReturnType } from "@lib/requests/getLandingStats";
import { FC } from "react";

export const LandingStatsSection: FC<{
  stats: LandingStatsReturnType;
}> = ({ stats }) => (
  <section
    className={[
      "relative z-10",
      "container mx-auto max-w-8xl",
      "px-4 sm:px-6 md:px-8",
      "flex flex-wrap justify-between",
    ].join(" ")}
  >
    <div>
      <h2
        className={[
          "text-xl sm:text-2xl md:text-3xl",
          "text-blue-500 font-semibold",
          "mt-6 mb-4",
        ].join(" ")}
        style={{
          textShadow:
            "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
        }}
      >
        Wir stehen erst am Anfang
        <br />
        <span className='text-blue-300'>Ein paar Beispielprojekte</span>
      </h2>
    </div>
    <div className='flex items-center'>
      <div className='p-4 flex gap-8 bg-white shadow items-center'>
        <div className='flex gap-2 items-center'>
          <strong className='text-xl font-bold text-blue-500'>
            {stats.usersCount}
          </strong>
          Teilnehmer
        </div>
        <div className='flex gap-2 items-center'>
          <strong className='text-xl font-bold text-blue-500'>
            {stats.devicesCount}
          </strong>
          Sensoren
        </div>
        <div className='flex gap-2 items-center'>
          <strong className='text-xl font-bold text-blue-500'>
            {stats.recordsCount}
          </strong>
          Messwerte
        </div>
      </div>
    </div>
  </section>
);
