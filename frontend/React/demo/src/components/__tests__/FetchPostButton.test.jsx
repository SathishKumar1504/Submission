import { render, screen, fireEvent } from "@testing-library/react";
// import FetchPostButton from "../FetchPostButton";
import FetchPostButton from "../ThreeButtons/FetchPostButton";

test("fetches post data and displays body", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ body: "Mock Post Body" }),
    })
  );

  render(<FetchPostButton />);

  fireEvent.click(screen.getByText("Fetch Post"));

  expect(await screen.findByText(/Mock Post Body/)).toBeInTheDocument();
});
