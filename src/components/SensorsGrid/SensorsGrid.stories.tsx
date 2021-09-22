import { withNextRouter } from "storybook-addon-next-router";
import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { SensorsGrid } from ".";
import { parsedSensors } from "@mocks/supabaseData/sensors";

export default {
  title: "Pages/SensorsGrid",
  component: SensorsGrid,
  decorators: [withNextRouter],
} as Meta;

const Template: Story = () => (
  <ThemeProvider theme={theme}>
    <SensorsGrid sensors={parsedSensors} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  nextRouter: {
    query: {
      id: 1,
    },
  },
};
