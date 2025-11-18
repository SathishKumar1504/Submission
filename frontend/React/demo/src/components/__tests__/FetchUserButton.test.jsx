import { render, screen, fireEvent } from "@testing-library/react";
// import FetchUserButton from "../FetchUserButton";
import FetchUserButton from "../ThreeButtons/FetchUserButton";

test("fetches user data and displays name", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: "Mock User" }),
    })
  );

  render(<FetchUserButton />);

  fireEvent.click(screen.getByText("Fetch User"));

  expect(await screen.findByText(/Mock User/)).toBeInTheDocument();
});
