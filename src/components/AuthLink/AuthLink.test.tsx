import { AuthProvider } from "@auth/Auth";
import { supabase } from "@auth/supabase";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { AuthLink } from ".";

const oldSessionFuncion = supabase.auth.session.bind(supabase.auth);
const oldLogoutFuncion = supabase.auth.signOut.bind(supabase.auth);

describe("component AuthLink while logged out", () => {
  it("should render Anmeldung by default", () => {
    render(<AuthLink />);
    const anmeldung = screen.getByText("Anmeldung");
    expect(anmeldung).toBeInTheDocument();
  });
  it("should render an icon", () => {
    render(<AuthLink />);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
  it("should have gray styles by default", () => {
    render(<AuthLink />);
    const icon = document.querySelector("span");
    const anmeldung = screen.getByText("Anmeldung");
    expect(icon?.getAttribute("class")?.includes("text-gray-400")).toBe(true);
    expect(anmeldung?.getAttribute("class")?.includes("text-black")).toBe(true);
  });
});
describe("component AuthLink while logged in", () => {
  beforeAll(() => {
    supabase.auth.session = jest
      .fn()
      .mockReturnValue({ user: { email: "contact@example.com" } });
  });

  afterAll(() => {
    supabase.auth.session = oldSessionFuncion;
    supabase.auth.signOut = oldLogoutFuncion;
  });
  it("should render the user email if logged in", () => {
    render(
      <AuthProvider>
        <AuthLink />
      </AuthProvider>
    );
    const email = screen.getByText("contact@example.com");
    expect(email).toBeInTheDocument();
  });
  it("should render the word Profile if logged in with empty email", () => {
    supabase.auth.session = jest.fn().mockReturnValue({ user: {} });
    render(
      <AuthProvider>
        <AuthLink />
      </AuthProvider>
    );
    const email = screen.getByText("Profile");
    expect(email).toBeInTheDocument();
  });
  it("should have primary styles if logged in", () => {
    render(<AuthLink />);
    const icon = document.querySelector("span");
    const anmeldung = screen.getByText("Anmeldung");
    expect(icon?.getAttribute("class")?.includes("text-primary")).toBe(true);
    expect(anmeldung?.getAttribute("class")?.includes("text-primary")).toBe(
      true
    );
  });
  it("should render the Dropdown menu links", () => {
    render(
      <AuthProvider>
        <AuthLink />
      </AuthProvider>
    );
    const projectsLink = screen.getByText("Meine Projekte");
    const accountLink = screen.getByText("Account");
    const logoutLink = screen.getByText("Logout");
    expect(projectsLink).toBeInTheDocument();
    expect(accountLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });
  it("should call auth's logout function on logout click", () => {
    const signOutFunction = jest.fn();
    supabase.auth.signOut = signOutFunction;
    render(
      <AuthProvider>
        <AuthLink />
      </AuthProvider>
    );

    const logoutLink = screen.getByText("Logout");
    fireEvent.click(logoutLink);
    expect(signOutFunction).toHaveBeenCalledTimes(1);
  });
});
