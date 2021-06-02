import { screen, render } from "@testing-library/react";
import { ProjectPreview } from ".";
import { getPublicProjects } from "@lib/hooks/usePublicProjects";

const defaultProject = {
  id: 0,
  name: "Title",
  location: "Berlin",
  description: "Description",
  records: [],
  authorName: "Lucas",
  devicesNumber: 0,
};

describe("ProjectPreview component", () => {
  it("should render the title, subtitle and text", async (): Promise<void> => {
    const data = await getPublicProjects(500);
    if (data) render(<ProjectPreview {...defaultProject} />);

    const title = screen.getByText(/Title/gi);
    const city = screen.getByText(/Berlin/gi);
    const description = screen.getByText(/Description/gi);
    expect(title).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
  it("should render the sensors amount in singular, if 0", async (): Promise<void> => {
    const data = await getPublicProjects(500);
    if (data) render(<ProjectPreview {...defaultProject} />);

    const singular = screen.getByText(/0 Sensor/gi);
    const plural = screen.queryByText(/Sensoren/gi);
    expect(singular).toBeInTheDocument();
    expect(plural).not.toBeInTheDocument();
  });
  it("should render the sensors amount in singular, if 1", async (): Promise<void> => {
    const data = await getPublicProjects(500);
    if (data) render(<ProjectPreview {...defaultProject} devicesNumber={1} />);

    const singular = screen.getByText(/1 Sensor/gi);
    const plural = screen.queryByText(/Sensoren/gi);
    expect(singular).toBeInTheDocument();
    expect(plural).not.toBeInTheDocument();
  });
  it("should render the sensors amount in plural, if 2 or more", async (): Promise<void> => {
    const data = await getPublicProjects(500);
    if (data) render(<ProjectPreview {...defaultProject} devicesNumber={2} />);

    const plural = screen.getByText(/2 Sensoren/gi);
    const singular = screen.queryByText(/Sensor$/gi);
    expect(plural).toBeInTheDocument();
    expect(singular).not.toBeInTheDocument();
  });
  it("should render the author name", async (): Promise<void> => {
    const data = await getPublicProjects(500);
    if (data) render(<ProjectPreview {...defaultProject} />);

    const author = screen.getByText(/Lucas/gi);
    const dots = screen.getAllByText(/·/gi);
    expect(author).toBeInTheDocument();
    expect(dots).toHaveLength(2);
  });
  it("not should not render the author name if null", async (): Promise<void> => {
    const data = await getPublicProjects(500);
    if (data) render(<ProjectPreview {...defaultProject} authorName={null} />);

    const author = screen.queryByText(/Lucas/gi);
    const dots = screen.getAllByText(/·/gi);
    expect(author).not.toBeInTheDocument();
    expect(dots).toHaveLength(1);
  });
});
