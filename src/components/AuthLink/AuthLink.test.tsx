import { AuthProvider } from "@auth/Auth";
import { supabase } from "@auth/supabase";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { AuthLink } from ".";

const oldSessionFuncion = supabase.auth.session.bind(supabase.auth);
const oldLogoutFuncion = supabase.auth.signOut.bind(supabase.auth);

describe("component AuthLink while logged out", () => {
  it("should render Login by default", () => {
    render(<AuthLink />);
    const anmeldung = screen.getByText(/Login/gi);
    expect(anmeldung).toBeInTheDocument();
  });
  it("should render an icon", () => {
    render(<AuthLink />);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});

describe("component AuthLink while logged in", () => {
  afterEach(() => {
    supabase.auth.session = oldSessionFuncion;
    supabase.auth.signOut = oldLogoutFuncion;
  });
  it("should render the user icon and logout if logged in", async () => {
    render(
      <AuthProvider>
        <AuthLink loggedInUserName='JohnDoe' />
      </AuthProvider>
    );
    const logoutLink = screen.getByText(/Logout/gi);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();

    await waitFor(() => expect(logoutLink).toBeInTheDocument());
  });
  it("should call auth's logout function on logout click", async () => {
    const signOutFunction = jest.fn();
    supabase.auth.signOut = signOutFunction;
    render(
      <AuthProvider>
        <AuthLink loggedInUserName='JohnDoe' />
      </AuthProvider>
    );

    const logoutLink = screen.getByText(/Logout/gi);
    fireEvent.click(logoutLink);

    await waitFor(() => expect(signOutFunction).toHaveBeenCalledTimes(1));
  });
});
