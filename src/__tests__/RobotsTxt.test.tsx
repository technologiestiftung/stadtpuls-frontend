import RobotsTxt from "../../pages/robots.txt";

describe("robots.txt", () => {
  it("should call the response handlers with the right params", () => {
    const res = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    RobotsTxt.getInitialProps({ res });
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/txt");
    expect(res.write).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
});
