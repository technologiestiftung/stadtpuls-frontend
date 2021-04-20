import { Story, Meta } from "@storybook/react";
import { InvalidPageId } from "./InvalidPageId";
import { NoAccess } from "./NoAccess";
import { PleaseLogin } from "./PleaseLogin";
import { ServerError } from "./ServerError";

export default {
  title: "PageError",
} as Meta;

const InvalidPageIdTemplate: Story<{
  pageType: string;
  id: string;
}> = args => <InvalidPageId {...args} />;
const NoAccessTemplate: Story = args => <NoAccess {...args} />;
const PleaseLoginTemplate: Story = args => <PleaseLogin {...args} />;
const ServerErrorTemplate: Story<{
  error: string;
}> = args => <ServerError {...args} />;

export const InvalidPageIdError = InvalidPageIdTemplate.bind({});
InvalidPageIdError.args = {
  id: "1234",
  pageType: "Projekt",
};

export const NoAccessError = NoAccessTemplate.bind({});
NoAccessError.args = {};

export const PleaseLoginError = PleaseLoginTemplate.bind({});
PleaseLoginError.args = {};

export const ServerErrorError = ServerErrorTemplate.bind({});
ServerErrorError.args = {
  error: "Server error goes here",
};
