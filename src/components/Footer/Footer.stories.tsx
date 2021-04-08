import { Story, Meta } from '@storybook/react';
import { ThemeProvider } from 'theme-ui';

import theme from '../../style/theme';
import { Footer } from '.';

export default {
  title: 'Footer',
  component: Footer,
} as Meta;

const Template: Story = (args) => (
  <ThemeProvider theme={theme}>
    <Footer {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};

