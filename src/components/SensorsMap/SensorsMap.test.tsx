import { getPublicSensors } from "@lib/requests/getPublicSensors";
import { screen, render, fireEvent } from "@testing-library/react";
import * as nextRouter from "next/router";
import { SensorsMap } from ".";

const routerPush = jest.fn();
const useRouter = jest.fn();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter.mockReturnValue({
  query: {},
  pathname: "/",
  prefetch: jest.fn(),
  push: routerPush,
});
describe("SensorsMap component", () => {
  it("should render the first sensor", async (): Promise<void> => {
    const { sensors } = await getPublicSensors();
    if (sensors && sensors.length > 0)
      render(
        <SensorsMap
          sensors={sensors}
          paginationProps={{ currentPage: 1, pageCount: 12 }}
        />
      );

    const h1 = screen.getByText(sensors[0].name);
    expect(h1).toBeInTheDocument();
  });
  it("should render without sensors", () => {
    render(<SensorsMap paginationProps={{ currentPage: 1, pageCount: 12 }} />);
  });
  it("should manage the highlighted sensor state", async (): Promise<void> => {
    const { sensors } = await getPublicSensors();
    if (sensors)
      render(
        <SensorsMap
          sensors={sensors}
          paginationProps={{ currentPage: 1, pageCount: 12 }}
        />
      );

    const rows = document.querySelectorAll("li");

    fireEvent.mouseEnter(rows[0]);
    fireEvent.mouseLeave(rows[0]);
    fireEvent.click(rows[0]);
  });
});
