import { historyType } from "../type";

export function History({ list }: { list: historyType[] }) {
  function renderAmount(type: string, amount: number) {
    return type === "expense" ? `-${amount}` : `+${amount}`;
  }
  return (
    <div className="mt-6">
      <h4 className="mb-4 font-semibold leading-relaxed text-gray-800 border-b-2 border-gray-300 dark:text-white">
        History
      </h4>
      {list.length ? (
        <ul>
          {list.map((item) => {
            return (
              <li key={item.id}>
                <div
                  className={`flex justify-between p-3 mb-3 bg-white border-r-4 ${
                    item.type === "expense"
                      ? "border-red-600"
                      : "border-green-600"
                  } rounded shadow`}
                >
                  <span>{item.text}</span>
                  <span>{renderAmount(item.type, item.amount)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="p-8 bg-gray-300 rounded dark:bg-gray-700 ">
          <p className="text-sm text-center text-gray-700 dark:text-white">
            No history found
          </p>
        </div>
      )}
    </div>
  );
}
