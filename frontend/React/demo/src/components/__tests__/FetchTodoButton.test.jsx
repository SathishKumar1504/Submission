import { render, screen, fireEvent } from "@testing-library/react";
import FetchTodoButton from "../ThreeButtons/FetchTodoButton";

beforeEach(() => {
  jest.clearAllMocks();
});

// ✅ TEST 1 — Button renders
test("renders Fetch Todo button", () => {
  render(<FetchTodoButton />);
  expect(screen.getByText("Fetch Todo")).toBeInTheDocument();
});

// ✅ TEST 2 — Only tests success path (no branches)
test("fetches todo and displays title", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ title: "Mock Todo" }),
    })
  );

  render(<FetchTodoButton />);

  fireEvent.click(screen.getByText("Fetch Todo"));

  expect(await screen.findByText(/Mock Todo/)).toBeInTheDocument();
});

