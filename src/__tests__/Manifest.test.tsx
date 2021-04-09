import Manifest from "../../pages/manifest.json";

describe("manifest.json", () => {
  it("should call the response handlers with the right params", () => {
    const res = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Manifest.getInitialProps({ res });
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/manifest+json"
    );
    expect(res.write).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
});
