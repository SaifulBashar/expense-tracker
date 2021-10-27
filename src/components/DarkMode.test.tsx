import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DarkMode } from "./DarkMode";

test("Checking dark mode button toggle action", () => {
  render(<DarkMode />);
  userEvent.click(
    screen.getByRole("button", {
      name: /dark_mode/i,
    })
  );
  expect(
    screen.queryByRole("button", {
      name: /dark_mode/i,
    })
  ).toBeNull();

  userEvent.click(
    screen.getByRole("button", {
      name: /light_mode/i,
    })
  );
  expect(
    screen.queryByRole("button", {
      name: /light_mode/i,
    })
  ).toBeNull();
});
