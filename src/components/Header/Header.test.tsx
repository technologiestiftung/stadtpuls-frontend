import { AuthProvider } from "@auth/Auth";
import { supabase } from "@auth/supabase";
import { render, screen } from "@testing-library/react";
import { Header } from ".";

describe("Header component", () => {
  it("should render the iot logo", () => {
    render(<Header />);
    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
  });
  it("should render the tsb logo", () => {
    render(<Header />);
    const logo = document.querySelector("svg");
    expect(logo).toBeInTheDocument();
  });
  it("should render the 'authentication' link if logged out", () => {
    render(<Header />);
    const link = screen.getByText(/Anmeldung/g);
    expect(link).toBeInTheDocument();
  });
  it("should render the 'username' link if logged in", () => {
    const oldSessionFuncion = supabase.auth.session.bind(supabase.auth);
    supabase.auth.session = jest
      .fn()
      .mockReturnValue({ user: { email: "contact@example.com" } });
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const email = screen.getByText("contact@example.com");
    expect(email).toBeInTheDocument();
    supabase.auth.session = oldSessionFuncion;
  });
});
