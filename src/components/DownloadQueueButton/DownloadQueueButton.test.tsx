import { render, screen } from "@testing-library/react";
import { DownloadQueueButton } from ".";

const testQueue = {
  1: {
    id: "1",
    title: "Sensor 1",
    progress: 66,
    totalCount: 123,
    callback: () => undefined,
  },
  2: {
    id: "2",
    title: "Sensor 2",
    progress: 75,
    totalCount: 456,
    callback: () => undefined,
  },
};

describe("component DownloadQueueButton", () => {
  it("should render the items in queue", () => {
    render(<DownloadQueueButton queue={testQueue} />);

    const title1 = screen.getByText(testQueue[1].title);
    const progress1 = screen.getByText(`${testQueue[1].progress}%`);
    const title2 = screen.getByText(testQueue[2].title);
    const progress2 = screen.getByText(`${testQueue[2].progress}%`);

    expect(title1).toBeInTheDocument();
    expect(progress1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(progress2).toBeInTheDocument();
  });
  it("should have width when items in queue", () => {
    render(<DownloadQueueButton queue={testQueue} />);

    const wrapper = document.querySelector("button > .w-10");

    expect(wrapper).toBeInTheDocument();
  });
  it("should have width 0 when no items in queue", () => {
    const queue = {};
    render(<DownloadQueueButton queue={queue} />);

    const wrapper = document.querySelector("button > .w-0");

    expect(wrapper).toBeInTheDocument();
  });
});
