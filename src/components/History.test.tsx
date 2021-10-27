import { render, screen, within } from "@testing-library/react";
import { History } from "./History";
import { historyType } from "../type";

const history: historyType[] = [
  { amount: 51, id: "2", text: "Book", type: "income" },
  { amount: 100, id: "53", text: "Grocery", type: "expense" },
  { amount: 121, id: "3", text: "Food", type: "expense" },
  { amount: 5, id: "5", text: "GYM", type: "income" },
];
describe("History component", () => {
  function renderOfficeCharacters() {
    render(<History list={history} />);

    return {
      getCharacters() {
        return screen.getAllByTestId("history").map((item) => ({
          text: within(item).getByTestId("text").textContent,
          amount: within(item).getByTestId("amount").textContent,
        }));
      },
    };
  }

  test("Rendering transaction history", async () => {
    const { getCharacters } = renderOfficeCharacters();
    getCharacters().forEach((item) => {
      expect(
        history.findIndex((list) => {
          const amount =
            list.type === "expense" ? `-${list.amount}` : `+${list.amount}`;
          return list.text === item.text && amount === item.amount;
        })
      ).not.toBe(-1);
    });
  });
});
