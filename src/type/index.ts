export type historyType = {
  amount: number;
  text: string;
  type: "expense" | "income";
  id: string;
};

export interface IappState {
  totalAmount: number;
  income: number;
  expense: number;
  history: historyType[];
}
