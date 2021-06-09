import { render, screen, waitFor } from "@testing-library/react";
import { FC, useEffect, useState } from "react";
import { usePrevious } from ".";

const ComponentWithPrevious: FC = () => {
  const [val, setVal] = useState<string>("A");
  const prevVal = usePrevious<string>(val);

  useEffect(() => {
    const to = setTimeout(() => setVal("B"), 200);
    return () => clearTimeout(to);
  }, [setVal]);

  return <div>{`${val}-${prevVal || ""}`}</div>;
};

describe("hook usePrevious", () => {
  it("should return the previous value", async (): Promise<void> => {
    render(<ComponentWithPrevious />);

    await waitFor(() => expect(screen.getByText(/B-A/gi)).toBeInTheDocument());
  });
});
