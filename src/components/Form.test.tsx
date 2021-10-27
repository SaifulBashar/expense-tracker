import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpenseForm } from "./Form";

test("Rendering and submitting a Form component", async () => {
  const handleSubmit = jest.fn();
  render(<ExpenseForm onAddTransaction={handleSubmit} />);

  userEvent.type(screen.getByLabelText(/transaction name/i), "Book");
  userEvent.type(screen.getByLabelText(/amount/i), "+51");

  userEvent.click(screen.getByRole("button", { name: /Add transaction/i }));

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith("Book", "+51"));
});
