import { normalizeURL } from ".";
describe("normalizeURL utility", () => {
  it("should return the url without protocol", () => {
    const url1 = "http://www.example.com";
    const url2 = "https://www.example.com";
    expect(normalizeURL(url1)).toEqual("www.example.com");
    expect(normalizeURL(url2)).toEqual("www.example.com");
  });
  it("should return the url without params", () => {
    const url1 =
      "http://storybook.com/?path=/story/ui-elements-userinfoheader--minimal-infos";
    const url2 =
      "http://www.webanddata.com/suburl/login.aspx?url=http://mailflick.com/Home/Tools/tool?id=123";
    expect(normalizeURL(url1)).toEqual("storybook.com");
    expect(normalizeURL(url2)).toEqual("www.webanddata.com/suburl/login");
  });
  it("should return undefined with invalid url", () => {
    const url1 = "apweufpwqefowqpfe";
    const url2 = 1324515125;
    expect(normalizeURL(url1)).toEqual(undefined);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(normalizeURL(url2)).toEqual(undefined);
  });
});
