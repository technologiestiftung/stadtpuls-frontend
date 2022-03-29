import { Story, Meta } from "@storybook/react";
import { useEffect, useState } from "react";
import { MarkerMap, MarkerMapType } from ".";

export default {
  title: "Map/MarkerMap",
  component: MarkerMap,
} as Meta;

const Template: Story<MarkerMapType> = args => {
  const [markers, setMarkers] = useState<MarkerMapType["markers"]>([]);

  useEffect(() => {
    const to = setTimeout(() => {
      setMarkers(args.markers || []);
    }, 500);
    return () => clearTimeout(to);
  }, []);

  return (
    <main className='w-[calc(100vw-40px)] h-[calc(100vh-40px)]'>
      <MarkerMap markers={markers} />
    </main>
  );
};

export const World = Template.bind({});
World.args = {
  markers: [
    {
      id: 1,
      latitude: 52.402419,
      longitude: 13.842773,
      isActive: true,
      isPulsating: true,
    },
    {
      id: 2,
      latitude: 32.394472,
      longitude: -5.607857,
      isActive: false,
      isPulsating: false,
    },
    {
      id: 3,
      latitude: 71.376721,
      longitude: 99.601494,
      isActive: true,
      isPulsating: false,
    },
    {
      id: 4,
      latitude: -33.989821,
      longitude: 149.479363,
      isActive: false,
      isPulsating: true,
    },
    {
      id: 5,
      latitude: -50.873178,
      longitude: -69.894979,
      isActive: false,
      isPulsating: false,
    },
  ],
};

export const Germany = Template.bind({});
Germany.args = {
  markers: [
    {
      id: 1,
      latitude: 52.402419,
      longitude: 13.842773,
      isActive: true,
      isPulsating: true,
    },
    {
      id: 2,
      latitude: 53.5584902,
      longitude: 9.7877409,
      isActive: false,
      isPulsating: false,
    },
    {
      id: 3,
      latitude: 53.571634,
      longitude: 9.892816,
      isActive: false,
      isPulsating: false,
    },
    {
      id: 4,
      latitude: 53.614652,
      longitude: 10.111745,
      isActive: false,
      isPulsating: false,
    },
    {
      id: 5,
      latitude: 51.5078636,
      longitude: 7.4002233,
      isActive: true,
      isPulsating: false,
    },
    {
      id: 6,
      latitude: 50.1211277,
      longitude: 8.4964827,
      isActive: false,
      isPulsating: true,
    },
    {
      id: 7,
      latitude: 48.1548895,
      longitude: 11.4717965,
      isActive: false,
      isPulsating: false,
    },
  ],
};

export const Berlin = Template.bind({});
Berlin.args = {
  markers: [
    {
      id: 1,
      latitude: 52.506151,
      longitude: 13.394881,
      isActive: true,
      isPulsating: true,
    },
    {
      id: 2,
      latitude: 52.549991,
      longitude: 13.493398,
      isActive: false,
      isPulsating: false,
    },
    {
      id: 3,
      latitude: 52.486653,
      longitude: 13.426908,
      isActive: true,
      isPulsating: false,
    },
    {
      id: 4,
      latitude: 52.537288,
      longitude: 13.45058,
      isActive: false,
      isPulsating: true,
    },
    {
      id: 5,
      latitude: 52.560679,
      longitude: 13.289054,
      isActive: false,
      isPulsating: false,
    },
  ],
};

export const Park = Template.bind({});
Park.args = {
  markers: [
    {
      id: 1,
      latitude: 52.496221,
      longitude: 13.437321,
      isActive: true,
      isPulsating: true,
    },
    {
      id: 2,
      latitude: 52.495967,
      longitude: 13.439039,
      isActive: false,
      isPulsating: false,
    },
    {
      id: 3,
      latitude: 52.497033,
      longitude: 13.434957,
      isActive: true,
      isPulsating: false,
    },
    {
      id: 4,
      latitude: 52.495207,
      longitude: 13.443127,
      isActive: false,
      isPulsating: true,
    },
    {
      id: 5,
      latitude: 52.49456,
      longitude: 13.441383,
      isActive: false,
      isPulsating: false,
    },
  ],
};
