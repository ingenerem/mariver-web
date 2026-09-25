import { createTransactions } from "@/lib/transactionApi";
import { TransactionRequest, TransactionType } from "@/types/transaction";
import { useEffect, useState } from "react";
type IncomeModalProps = {

  // Function used to close the modal.
  onClose: () => void;
  //Function to update on success  
  onSaveSuccess: () => void;
};

type TempTransaction = TransactionRequest & {
  id: string;
};

// type TempIncome = BillRequest & {
//   id: string;
// };

// Main bills modal component.
export default function IncomeModal({
  onClose,
  onSaveSuccess,
}: IncomeModalProps) {


      // Stores the list of bills added in this modal.
  const [incomeList, setIncome] = useState<TempTransaction[]>([]);

  // Stores what the user types for the new bill name.
  const [incomeCategory, setIncomeCategory] = useState("");

  // Stores what the user types for the new bill amount.
  // Keep it as a string because input values come from the browser as text.
  const [IncomeAmount, setIncomeAmount] = useState("");

  // Stores what the user types for the income date
  const [incomeDate, setIncomeDate] = useState(
  () => new Date().toLocaleDateString("en-CA")
);

  const [IncomeType, setIncomeType] = useState("");
  const [description, setDescription] = useState("");

  // Stores validation errors shown to the user.
  const [error, setError] = useState("");

  // Stores the state when user clicks on save and the backend is processing
  const [isSavingIncomes, setIsSavingIncomes] = useState(false);
  const [saveError, setSaveError] = useState("");


  const INCOME_CATEGORIES = [
  "Paycheck",
  "Investment Income",
  "Refund/Reimbursement",
  "Gift",
  "Business Income",
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
              Income
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your income list. We’ll show the list on your dashboard.
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

        {/* Inline bill creation form */}

        <div className="rounded-2xl border border-slate-200 p-4 shadow-sm">

          {/* Small section title */}
          <h3 className="text-base font-semibold text-slate-900">
            Add a new Income
          </h3>

          {/* Responsive grid for the bill inputs */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto]">

            {/* Bill name input */}
            <div>

              <label className="block text-sm font-medium text-slate-700">
                Source <span className="text-red-500">*</span>
              </label>

               <select
                value={incomeCategory}
                onChange={(e) => setIncomeCategory(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              >
                <option value="">Select source</option>

                {INCOME_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

            </div>

            {/* Income amount input */}
            <div>

              <label className="block text-sm font-medium text-slate-700">
                Amount <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                placeholder="0.00"
                value={IncomeAmount}
                onChange={(event) => setIncomeAmount(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Date received*/}
            <div>

              <label className="block text-sm font-medium text-slate-700">
                Income date <span className="text-red-500">*</span>
              </label>

              <input
                type="date"

                // Restricts values between 1 and 31.
                min="1"
                max="31"
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
             focus:border-green-500 focus:outline-none focus:ring-2
             focus:ring-green-200"

               
              />
            </div>


            <div>
            

              <div className="mt-1 flex gap-2">
            
              </div>
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
      placeholder="e.g. Bi-Weekly paycheck"
      rows={2}
      maxLength={255}
      className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm
                 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100
                 md:col-span-9"
    />


    <button
      type="button"
      onClick={handleAddIncome}
      className="w-full rounded-xl bg-green-600 px-5 py-2 text-sm font-medium
                 text-white hover:bg-green-700 md:col-span-3"
    >
      Add income
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
            Your Income list
          </h3>
        </div>



        <div className="flex-1 overflow-y-auto pr-1">


          {/* Bills list section */}
          <div className="mt-4 mb-2">


            {incomeList.length === 0 ? (
              <div className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                No Income added yet.
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {incomeList.map((income) => (
                  <div
                    key={null}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{income.category}</p>
                    </div>

                    <p className="font-semibold text-slate-900">
                      {"$" + income.amount}
                    </p>
                    <button
                      type="button"
        
                      disabled={isSavingIncomes}
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

          {isSavingIncomes && (
            <p className="mt-4 text-sm font-medium text-blue-600">
              Saving your Incomes... Please wait.
            </p>
          )}

          {/* Cancel button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isSavingIncomes}
            className={`rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium
    ${isSavingIncomes
                ? "cursor-not-allowed opacity-50"
                : "text-slate-700 hover:bg-slate-50"
              }`}
          >
            Cancel
          </button>

          {/* Save income button */}


          {saveError && (
            <p className="mt-4 text-sm font-medium text-red-600">
              {saveError}
            </p>
          )}
          <button
            type="button"
            onClick={handleSaveIncomes}
            disabled={isSavingIncomes || incomeList.length === 0}
            className={`rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700     ${isSavingIncomes
              ? "cursor-not-allowed opacity-50"
              : "text-white hover:text-white"
              }`}
          >
            {isSavingIncomes ? "Saving..." : "Save income records"}
          </button>

        </div>
      </div>
    </div>
  );

  // Adds the typed bill into the bills list.
  function handleAddIncome() {

       // Prevents empty information from being added.
        if (incomeCategory.trim() === "" || IncomeAmount.trim() === "") {
          // Shows validation message to the user.
          setError("Please fill up all required fields.");
          return;
        }
    
        // Clears previous error once validation passes.
        setError("");
        const amount = Number(IncomeAmount);
        const date = incomeDate;
    
        const transactionType: TransactionType = "INCOME";
        const newIncome: TempTransaction = {
           id: crypto.randomUUID(),
          amount,
          type: transactionType,
          description: description,
          category: incomeCategory.trim(),
          transactionSource: "INCOME",
          transactionDate: date,
        };
    
        setIncome([...incomeList, newIncome]);
    
        // Clears the form after adding the bill.
        setIncomeAmount("");
        setIncomeCategory("");

  }

  // Saving Bills to the backend

  async function handleSaveIncomes() {

    try {
          setIsSavingIncomes(true);
          setSaveError("");
    
    
          // API call will go here next
          setIsSavingIncomes(true);
    
    
        const response = await createTransactions(incomeList);
    
       console.log("createTransactions response:", response);
      // await new Promise((resolve) => setTimeout(resolve, 5000));
    
          onSaveSuccess()
    
          onClose();
        } catch (error) {
          setSaveError("Could not save bills. " + error);
          console.log(error)
        } finally {
          setIsSavingIncomes(false);
        }
    
      }
   
  
}