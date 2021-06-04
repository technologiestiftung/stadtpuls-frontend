import { PublicProject } from "@lib/hooks/usePublicProjects";
import { Story, Meta } from "@storybook/react";
import { LandingProjectsSlider } from ".";

export default {
  title: "Promotional/LandingProjectsSlider",
  component: LandingProjectsSlider,
} as Meta;

const Template: Story<{
  projects: PublicProject[];
}> = args => <LandingProjectsSlider {...args} />;

const lineChartDates = [
  {
    date: "2021-04-11T12:10:01.908Z",
    value: Math.random() * 100,
  },
  {
    date: "2021-04-10T12:10:01.908Z",
    value: Math.random() * 100,
  },
  {
    date: "2021-04-09T12:10:01.908Z",
    value: Math.random() * 100,
  },
  {
    date: "2021-04-08T12:10:01.908Z",
    value: Math.random() * 100,
  },
  {
    date: "2021-04-07T12:10:01.908Z",
    value: Math.random() * 100,
  },
];

export const fakeProjects = [
  {
    id: 1,
    name: "Temperatur Grundewaldstraße",
    description:
      "Es war einmal die Temperatur Bemeßung in die Grundewaldstraße",
    devicesNumber: 5,
    authorName: "CityLAB",
    category: "Temperatur",
    location: "Berlin",
    records: lineChartDates,
  },
  {
    id: 2,
    name: "CO2 Elbphilharmonie Hamburg.",
    description:
      "Es war einmal die CO2 Bemeßung in die Elbphilharmonie Hamburg.",
    devicesNumber: 4,
    authorName: "Elbphilharmonie",
    category: "CO2",
    location: "Hamburg",
    records: lineChartDates,
  },
  {
    id: 3,
    name: "PAXCounter Schokoladenmuseum Köln",
    description:
      "Es war einmal die PAXCounter Bemeßung in der Schokoladenmuseum Köln",
    devicesNumber: 1,
    authorName: "Schokoladenmuseum",
    category: "PAXCounter",
    location: "Köln",
    records: lineChartDates,
  },
];

export const Default = Template.bind({});
Default.args = {
  projects: fakeProjects,
};
