import Sitemap from "../../pages/sitemap.xml";

describe("sitemap.xml", () => {
  it("should call the response handlers with the right params", async (): Promise<void> => {
    const res = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await Sitemap.getInitialProps({ res });
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/xml");
    expect(res.write).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });
});
