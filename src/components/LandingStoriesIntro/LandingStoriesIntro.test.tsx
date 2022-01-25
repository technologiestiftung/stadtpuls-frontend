import { render, screen } from "@testing-library/react";
import { LandingStoriesIntro } from ".";

describe("LandingStoriesIntro component", () => {
  it("should render the story block", () => {
    render(<LandingStoriesIntro />);
    const headline = screen.getByText("Der Puls des Wrangelkiez");
    const subline = screen.getByText("Stadtpuls Story #1");
    const text = screen.getByText(
      "Eine Boombox dröhnt im Park, die U1 quietscht über die Hochbahnstrecke und die Polizei rückt mal wieder mit Sirenen an: Eine typische Soundkulisse im Berliner Szenekiez. Wir haben uns gefragt, welche Rolle Lärm für die Identität eines Kiezes spielt und welche Muster es gibt. Hier erzählen wir die Geschichte von versteckten Hinterhöfen, einem lauten Supermarkt und einer Entführung."
    );
    const link = screen.getByRole("link", { name: "Zur Story" });
    expect(headline).toBeInTheDocument();
    expect(subline).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
