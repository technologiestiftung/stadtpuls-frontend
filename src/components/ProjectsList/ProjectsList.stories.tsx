import { withNextRouter } from "storybook-addon-next-router";
import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { ProjectsList } from ".";
import { parsedSensors } from "@mocks/supabaseData/sensors";

export default {
  title: "Pages/ProjectsList",
  component: ProjectsList,
  decorators: [withNextRouter],
} as Meta;

const Template: Story = () => (
  <ThemeProvider theme={theme}>
    <ProjectsList sensors={parsedSensors} />
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
