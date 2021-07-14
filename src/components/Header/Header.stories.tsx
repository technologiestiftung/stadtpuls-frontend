import React, { useEffect } from "react";
import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import { AuthProvider } from "@auth/Auth";
import theme from "../../style/theme";
import { Header } from ".";
import { supabase } from "@auth/supabase";
import { withNextRouter } from "storybook-addon-next-router";

export default {
  title: "Layout/Header",
  component: Header,
  decorators: [withNextRouter],
} as Meta;

const oldSessionFuncion = supabase.auth.session.bind(supabase.auth);

const Template: Story = args => {
  if (args.loggedIn) {
    supabase.auth.session = () => ({
      user: {
        id: "1",
        email: "contact@example.com",
        app_metadata: {},
        user_metadata: {},
        created_at: new Date().toISOString(),
        aud: "",
      },
      access_token: "",
      refresh_token: "",
      token_type: "",
    });
  }
  useEffect(() => {
    return () => {
      if (args.loggedIn) {
        supabase.auth.session = oldSessionFuncion;
      }
    };
  }, [args.loggedIn]);
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Header {...args} />
      </ThemeProvider>
    </AuthProvider>
  );
};

const parameters = {
  nextRouter: {
    pathname: "/",
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
LoggedOut.parameters = parameters;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  loggedIn: true,
};
LoggedIn.parameters = parameters;
