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
      "flex flex-wrap justify-center lg:justify-between",
    ].join(" ")}
  >
    <div className='w-full sm:w-auto'>
      <h2
        className={[
          "text-xl sm:text-2xl md:text-3xl",
          "font-bold font-headline text-purple",
          "mt-8 sm:mt-6 mb-1 text-center lg:text-left",
        ].join(" ")}
        style={{
          textShadow:
            "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
        }}
      >
        Wir stehen erst am Anfang
      </h2>
      <p className='mb-4 text-center lg:text-left'>Ein paar Zahlen</p>
    </div>
    <div className='flex items-center'>
      <div
        className={[
          "inline-flex flex-wrap lg:flex-nowrap gap-x-8 gap-y-2",
          "items-center justify-center sm:text-xl font-bold",
          "font-headline",
        ].join(" ")}
      >
        <div className='flex gap-4 items-center bg-blue text-green pr-4'>
          <strong
            className='bg-purple h-12 text-white p-4 flex place-items-center'
            style={{ minWidth: "3rem" }}
          >
            {stats.usersCount}
          </strong>
          Teilnehmer
        </div>
        <div className='flex gap-4 items-center bg-purple text-white pr-4'>
          <strong
            className='bg-green h-12 text-blue p-4 flex place-items-center'
            style={{ minWidth: "3rem" }}
          >
            {stats.devicesCount}
          </strong>
          Sensoren
        </div>
        <div className='flex gap-4 items-center bg-blue text-green pr-4'>
          <strong
            className='bg-green h-12 text-blue p-4 flex place-items-center'
            style={{ minWidth: "3rem" }}
          >
            {stats.recordsCount}
          </strong>
          Messwerte
        </div>
      </div>
    </div>
  </section>
);
