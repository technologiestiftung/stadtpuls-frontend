import { Story, Meta } from "@storybook/react";
import { InvalidPageId } from "./InvalidPageId";
import { NoAccess } from "./NoAccess";
import { PleaseLogin } from "./PleaseLogin";
import { SensorNotFound } from "./SensorNotFound";
import { ServerError } from "./ServerError";

export default {
  title: "UI Elements/PageError",
} as Meta;

const InvalidPageIdTemplate: Story<{
  pageType: string;
  id: string;
}> = args => <InvalidPageId {...args} />;
const SensorNotFoundTemplate: Story<{
  sensorId: number;
}> = args => <SensorNotFound {...args} />;
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

export const SensorNotFoundError = SensorNotFoundTemplate.bind({});
SensorNotFoundError.args = {
  sensorId: 1234,
};

export const NoAccessError = NoAccessTemplate.bind({});
NoAccessError.args = {};

export const PleaseLoginError = PleaseLoginTemplate.bind({});
PleaseLoginError.args = {};

export const ServerErrorError = ServerErrorTemplate.bind({});
ServerErrorError.args = {
  error:
    "Too many concurrent requests on your origin server can cause some of the requests to not complete within the specified time resulting in a 504 error at the proxy server end. If you seeing 504 consistently then that would mean a network issue between the proxy server and the origin server.",
};
