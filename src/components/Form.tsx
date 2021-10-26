import { ErrorMessage, Field, Form, Formik } from "formik";
export function ExpenseForm({
  onAddTransaction,
}: {
  onAddTransaction: (text: string, amount: string) => void;
}) {
  return (
    <Formik
      initialValues={{ text: "", amount: "" }}
      validate={(values) => {
        const errors: any = {};
        if (!values.text.trim().length) {
          errors.text = "Text required";
        }
        if (
          Number.isNaN(Number(values.amount.trim())) ||
          Number(values.amount.trim()) === 0
        ) {
          errors.amount = "Amount is not valid";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onAddTransaction(values.text, values.amount);
      }}
    >
      {(formikBag) => (
        <Form>
          <label className="block w-full">
            <span className="block mb-1 text-sm text-gray-800 dark:text-white">
              Text
            </span>
            <Field
              type="text"
              name="text"
              placeholder="..."
              className="w-full text-sm border-gray-300 rounded dark:bg-gray-800 form-input"
            />
            <ErrorMessage
              component="p"
              name="text"
              className="text-sm text-red-600 dark:text-white"
            />
          </label>

          <label className="block w-full mt-4">
            <span className="block text-sm text-gray-800 dark:text-white">
              Amount
            </span>
            <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">
              (negative - expense, positive - income)
            </span>
            <Field
              type="text"
              name="amount"
              placeholder="..."
              className="w-full text-sm border-gray-300 rounded form-input dark:bg-gray-800"
            />
            <ErrorMessage
              name="amount"
              className="text-sm text-red-600 dark:text-white"
              component="p"
            />
          </label>

          <button
            type="submit"
            className="block w-full p-3 mt-6 text-sm text-white bg-indigo-400 rounded shadow dark:bg-white dark:text-black "
          >
            Add transaction
          </button>
        </Form>
      )}
    </Formik>
  );
}
