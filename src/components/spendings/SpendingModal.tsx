import { createTransactions } from "@/lib/transactionApi";
import { TransactionRequest, TransactionType } from "@/types/transaction";
import { useEffect, useState } from "react";
type SpendingModalProps = {

  // Function used to close the modal.
  onClose: () => void;
  //Function to update on success  
  onSaveSuccess: () => void;
};


type TempTransaction = TransactionRequest & {
  id: string;
};

// type TempSpending = BillRequest & {
//   id: string;
// };

// Main bills modal component.
export default function SpendingsModal({
  onClose,
  onSaveSuccess,
}: SpendingModalProps) {


  // Stores the list of bills added in this modal.
  const [spendings, setSpendings] = useState<TempTransaction[]>([]);

  // Stores what the user types for the new bill name.
  const [spendingCategory, setSpendingCategory] = useState("");

  // Stores what the user types for the new bill amount.
  // Keep it as a string because input values come from the browser as text.
  const [spendingAmount, setSpendingAmount] = useState("");

  // Stores what the user types for the due day.
  const [spendingDate, setSpendingDate] = useState(() => new Date().toLocaleDateString("en-CA"));

  const [spendingType, setSpendingType] = useState("");
  const [description, setDescription] = useState("");

  const [isSavingTransactions, setIsSavingTransactions] = useState(false);

  // Stores validation errors shown to the user.
  const [error, setError] = useState("");

  // Stores the state when user clicks on save and the backend is processing
  const [isSavingSpendings, setIsSavingSpendings] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [incomeDate, setIncomeDate] = useState("");


  const SPENDING_CATEGORIES = [
    "Groceries",
    "Dining",
    "Transportation",
    "Household",
    "Clothing",
    "Entertainment",
    "Personal Care",
    "Health",
    "Education",
    "Childcare",
    "Travel",
    "Gifts",
    "Alcohol",
    "Other",
  ] as const;


  //   const handleRemoveBill = (id: string) => {
  //   setBills((currentBills) =>
  //     currentBills.filter((bill) => bill.id !== id)
  //   );
  // };



  return (

    // Full-screen overlay behind the modal.
    // fixed + inset-0 makes it cover the whole screen.
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-[1px]">

      {/* Main modal container */}
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col rounded-2xl bg-white p-6 shadow-xl">

        {/* Header section */}
        <div className="mb-5 flex items-start justify-between">

          {/* Modal title + description */}
          <div>

            <h2 className="text-xl font-semibold text-slate-900">
              Spendings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your spending Spendings. We’ll show the list on your dashboard.
            </p>
          </div>

          {/* Close/X button */}
          <button
            type="button"
            onClick={onClose}
            disabled={false}
            className={`text-xl
            ${false
                ? "cursor-not-allowed opacity-50"
                : "text-slate-400 hover:text-slate-700"
              }`}
          >
            ✕
          </button>
        </div>

        {/* Inline spendings creation form */}

        <div className="rounded-2xl border border-slate-200 p-4 shadow-sm">

          {/* Small section title */}
          <h3 className="text-base font-semibold text-slate-900">
            Add a new Spending
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">

            {/* Source */}
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-slate-700">
                Category <span className="text-red-500">*</span>
              </label>

              <select
                value={spendingCategory}
                onChange={(e) => setSpendingCategory(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
             outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Select category</option>

                {SPENDING_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

            </div>

            {/* Amount */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-slate-700">
                Amount <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                placeholder="0.00"
                value={spendingAmount}
                onChange={(event) => setSpendingAmount(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
                 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>


            {/* Spending date */}
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-slate-700">
                Spending date <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                value={spendingDate}
                onChange={(event) => setSpendingDate(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
                 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Description + Add Spending */}
            <div className="md:col-span-12">
              <label className="block text-sm font-medium text-slate-700">
                Description
              </label>

              <div className="mt-1 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="e.g. Weekly groceries"
                  rows={2}
                  maxLength={255}
                  className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm
                 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100
                 md:col-span-9"
                />

                <button
                  type="button"
                  onClick={handleAddSpending}
                  className={`{w-full rounded-xl bg-orange-600 px-5 py-2 text-sm font-medium
                 text-white hover:bg-orange-700 md:col-span-3 ${isSavingTransactions
                      ? "cursor-not-allowed opacity-50"
                      : "text-slate-400 hover:text-white"
                    }`}
                >
                  Add Spending
                </button>
              </div>
            </div>

          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-slate-900">
            Your Spendings
          </h3>
        </div>



        <div className="flex-1 overflow-y-auto pr-1">


          {/* Bills list section */}
          <div className="mt-4 mb-2">


            {spendings.length === 0 ? (
              <div className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                No Spendings added yet.
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {spendings.map((spending) => (
                  <div
                    key={spending.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{spending.category}</p>
                      {/* <p className="text-xs text-slate-500">Due day {null}</p> */}
                    </div>

                    <p className="font-semibold text-slate-900">
                      {"$" + spending.amount}
                    </p>
                    <button
                      type="button"

                      disabled={isSavingSpendings}
                      className="text-sm font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Bottom action buttons */}
        <div className="mt-6 flex justify-end gap-3">

          {isSavingSpendings && (
            <p className="mt-4 text-sm font-medium text-blue-600">
              Saving your Spendings... Please wait.
            </p>
          )}


          <button
            type="button"
            onClick={onClose}
            disabled={isSavingSpendings}
            className={`rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium
    ${isSavingSpendings
                ? "cursor-not-allowed opacity-50"
                : "text-slate-700 hover:bg-slate-50"
              }`}
          >
            Cancel
          </button>




          {saveError && (
            <p className="mt-4 text-sm font-medium text-red-600">
              {saveError}
            </p>
          )}
          <button
            type="button"
            onClick={handleSaveSpendings}
            disabled={isSavingSpendings || spendings.length === 0}
            className={`rounded-xl bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700     ${isSavingSpendings
              ? "cursor-not-allowed opacity-50"
              : "text-slate-400 hover:text-white"
              }`}
          >
            {isSavingSpendings ? "Saving..." : "Save spendings"}
          </button>
        </div>
      </div>
    </div>
  );

  // Adds the typed spendings into the transactions list.
  function handleAddSpending() {
    // Prevents empty information from being added.
    if (spendingCategory.trim() === "" || spendingAmount.trim() === "") {
      // Shows validation message to the user.
      setError("Please fill up all required fields.");
      return;
    }

    // Clears previous error once validation passes.
    setError("");
    const amount = Number(spendingAmount);
    const date = spendingDate;

    const transactionType: TransactionType = "EXPENSE";
    const newSpending: TempTransaction = {
      id: crypto.randomUUID(),
      amount,
      type: transactionType,
      description: description,
      category: spendingCategory.trim(),
      transactionSource: "SPENDING",
      transactionDate: date,
    };

    setSpendings([...spendings, newSpending]);

    // Clears the form after adding the bill.
    setSpendingAmount("");
    setSpendingCategory("");
  }



  // Saving Bills to the backend

  async function handleSaveSpendings() {

    try {
      setIsSavingSpendings(true);
      setSaveError("");


      // API call will go here next
      setIsSavingSpendings(true);


      const response = await createTransactions(spendings);

      console.log("createTranactions response:", response);

      onSaveSuccess()
      onClose();
    } catch (error) {
      setSaveError("Could not save transactions. " + error);
      console.log(error)
    } finally {
      setIsSavingSpendings(false);
    }


  }
}