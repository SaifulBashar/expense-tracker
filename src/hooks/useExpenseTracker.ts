import * as React from "react";
import { historyType, IappState } from "../type";

const initialValue = {
  totalAmount: 0,
  income: 0,
  expense: 0,
  history: [],
};

function countReducer(
  state: IappState,
  action:
    | { type: "set_total_amount"; payload: number }
    | { type: "set_income"; payload: { text: string; amount: string } }
    | { type: "set_expense"; payload: { text: string; amount: string } }
) {
  switch (action.type) {
    case "set_total_amount": {
      return { ...state, totalAmount: action.payload };
    }
    case "set_income": {
      const prevState = { ...state };
      prevState.income += Number(action.payload.amount);
      prevState.totalAmount += Number(action.payload.amount);
      prevState.history = [
        ...prevState.history,
        {
          id: new Date().toISOString(),
          amount: Number(action.payload.amount),
          text: action.payload.text,
          type: "income",
        },
      ];
      return prevState;
    }
    case "set_expense": {
      const prevState = { ...state };
      prevState.expense += Number(action.payload.amount);
      prevState.totalAmount -= Number(action.payload.amount);
      prevState.history = [
        ...prevState.history,
        {
          id: new Date().toISOString(),
          amount: Number(action.payload.amount),
          text: action.payload.text,
          type: "expense",
        },
      ];
      return prevState;
    }
    default: {
      throw new Error(`Unhandled action type: `);
    }
  }
}

export function useExpenseTracker(): [
  state: {
    total: number;
    income: number;
    expense: number;
    history: historyType[];
  },
  action: {
    addTransaction: (text: string, amount: string) => void;
  }
] {
  const [state, dispatch] = React.useReducer(countReducer, initialValue);

  function addTransaction(text: string, amount: string) {
    if (Number(amount) > 0) {
      dispatch({
        type: "set_income",
        payload: {
          text,
          amount: amount.startsWith("+") ? amount.substring(1) : amount,
        },
      });
    }
    if (Number(amount) < 0) {
      dispatch({
        type: "set_expense",
        payload: { text, amount: amount.substring(1) },
      });
    }
  }

  return [
    {
      total: state.totalAmount,
      history: state.history,
      income: state.income,
      expense: state.expense,
    },
    { addTransaction },
  ];
}
