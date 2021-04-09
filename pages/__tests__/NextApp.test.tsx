import { render } from "@testing-library/react";
import * as nextRouter from "next/router";

import NextApp from "../_app";

describe("404 page", () => {
  it("should render without failing", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      query: { id: 1 },
      prefetch: () => Promise.resolve(true),
    }));
    render(<NextApp Component={() => <span />} pageProps={{}} />);
  });
});
