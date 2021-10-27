import { ExpenseForm } from "./components/Form";
import { History } from "./components/History";
import { useExpenseTracker } from "./hooks/useExpenseTracker";
import { DarkMode } from "./components/DarkMode";
import { stat } from "fs";

function App() {
  const [state, actions] = useExpenseTracker();
  return (
    <div className="flex justify-center h-full min-h-screen p-5 bg-gray-100 md:items-center dark:bg-black dark:text-white">
      <div className="" style={{ minWidth: 300, width: 450, minHeight: 600 }}>
        <DarkMode />
        <p className="text-sm">YOUR BALANCE</p>
        <h1 className="font-semibold" data-testid={"total"}>
          ${state.total}
        </h1>
        <div className="flex p-4 mt-4 bg-white rounded shadow dark:bg-gray-600">
          <div className="flex-1 border-r">
            <p className="text-center">INCOME</p>
            <p
              className="text-lg font-bold text-center text-green-600"
              data-testid={"income"}
            >
              ${state.income}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-center">EXPENSE</p>
            <p
              className="text-lg font-bold text-center text-red-600"
              data-testid={"expense"}
            >
              ${state.expense}
            </p>
          </div>
        </div>
        <History list={state.history} />

        <div className="mt-6">
          <h4 className="mb-4 font-semibold leading-relaxed text-gray-800 border-b-2 border-gray-300 dark:text-white">
            Add new transaction
          </h4>
          <ExpenseForm
            onAddTransaction={(text: string, amount: string) => {
              if (Number(amount) + Number(state.total) < 0) {
                alert("You do not have sufficient balance");
                return;
              }
              actions.addTransaction(text, amount);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
