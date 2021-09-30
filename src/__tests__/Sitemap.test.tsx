import Sitemap from "../../pages/sitemap.xml";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createSupabaseUrl } from "@lib/requests/createSupabaseUrl";
import { sensors } from "@mocks/supabaseData/sensors";

describe("sitemap.xml", () => {
  it("should call the response handlers with the right params", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/sensors`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(sensors));
      })
    );
    server.listen();

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

    server.resetHandlers();
    server.close();
  });
});
