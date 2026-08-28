import { useEffect, useState } from "react";
import type { BillRequest } from "@/types/bill";
import { createBills } from "@/lib/billApi";
// Props expected by the modal component.
type BillsModalProps = {

  // Function used to close the modal.
  onClose: () => void;
  //Function to update on success  
  onSaveSuccess: () => void;
};

type TempBill = BillRequest & {
  id: string;
};

// Main bills modal component.
export default function BillsModal({
  onClose,
  onSaveSuccess,
}: BillsModalProps) {

  // Stores the list of bills added in this modal.
  const [bills, setBills] = useState<TempBill[]>([]);

  // Stores what the user types for the new bill name.
  const [billName, setBillName] = useState("");

  // Stores what the user types for the new bill amount.
  // Keep it as a string because input values come from the browser as text.
  const [billAmount, setBillAmount] = useState("");

  // Stores what the user types for the due day.
  const [billDueDay, setBillDueDay] = useState("");

  const [billCategory, setBillCategory] = useState("");
  const [billIntervalValue, setBillIntervalValue] = useState("1");
  const [billIntervalUnit, setBillIntervalUnit] = useState("MONTH");
  const [billDueMonth, setBillDueMonth] = useState("");

  // Stores validation errors shown to the user.
  const [error, setError] = useState("");

  // Stores the state when user clicks on save and the backend is processing
  const [isSavingBills, setIsSavingBills] = useState(false);
  const [saveError, setSaveError] = useState("");


  const handleRemoveBill = (id: string) => {
  setBills((currentBills) =>
    currentBills.filter((bill) => bill.id !== id)
  );
};

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
              Set your bills
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your recurring monthly bills. We’ll show the total on your dashboard.
            </p>
          </div>

          {/* Close/X button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isSavingBills}
            className={`text-xl
    ${isSavingBills
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
            Add a new bill
          </h3>

          {/* Responsive grid for the bill inputs */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto]">

            {/* Bill name input */}
            <div>

              <label className="block text-sm font-medium text-slate-700">
                Bill name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="e.g. Rent"
                value={billName}
                onChange={(event) => setBillName(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Bill amount input */}
            <div>

              <label className="block text-sm font-medium text-slate-700">
                Amount <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                placeholder="0.00"
                value={billAmount}
                onChange={(event) => setBillAmount(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Bill due day input */}
            <div>

              <label className="block text-sm font-medium text-slate-700">
                Due day <span className="text-red-500">*</span>
              </label>

              <input
                type="number"

                // Restricts values between 1 and 31.
                min="1"
                max="31"

                placeholder="15"
                value={billDueDay}
                onChange={(event) => setBillDueDay(event.target.value)}

                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Category <span className="text-red-500">*</span>
              </label>

              <select
                value={billCategory}
                onChange={(event) => setBillCategory(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select category</option>
                <option value="HOUSING">Housing</option>
                <option value="UTILITIES">Utilities</option>
                <option value="INSURANCE">Insurance</option>
                <option value="SUBSCRIPTION">Subscription</option>
                <option value="TRANSPORTATION">Transportation</option>
                <option value="CHILDCARE">Child care</option>
                <option value="DEBT">Loan</option>
                <option value="SAVINGS">Savings</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Repeats every <span className="text-red-500">*</span>
              </label>

              <div className="mt-1 flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={billIntervalValue}
                  onChange={(event) => setBillIntervalValue(event.target.value)}
                  className="w-20 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <select
                  value={billIntervalUnit}
                  onChange={(event) => setBillIntervalUnit(event.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="MONTH">Month</option>
                  <option value="WEEK">Week</option>
                  <option value="YEAR">Year</option>
                </select>
              </div>
            </div>


            {billIntervalUnit === "YEAR" && (
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Due month <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  min="1"
                  max="12"
                  step="1"
                  placeholder="1"
                  value={billDueMonth}
                  onChange={(event) => setBillDueMonth(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            )}

            {/* Add bill button */}
            <div
              className="flex items-end">
              <button onClick={handleAddBill}
                type="button"
                disabled={isSavingBills}
                className={`{w-full rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 ${isSavingBills
                  ? "cursor-not-allowed opacity-50"
                  : "text-slate-400 hover:text-slate-700"
                  }`}
              >
                Add bill
              </button>
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
            Your bills
          </h3>
        </div>



        <div className="flex-1 overflow-y-auto pr-1">


          {/* Bills list section */}
          <div className="mt-4 mb-2">


            {bills.length === 0 ? (
              <div className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                No bills added yet.
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {bills.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{bill.name}</p>
                      <p className="text-xs text-slate-500">Due day {bill.dueDay}</p>
                    </div>

                    <p className="font-semibold text-slate-900">
                      {"$" + bill.amount.toLocaleString()}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemoveBill(bill.id)}
                      disabled={isSavingBills}
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

          {isSavingBills && (
            <p className="mt-4 text-sm font-medium text-blue-600">
              Saving your bills... Please wait.
            </p>
          )}

          {/* Cancel button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isSavingBills}
            className={`rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium
    ${isSavingBills
                ? "cursor-not-allowed opacity-50"
                : "text-slate-700 hover:bg-slate-50"
              }`}
          >
            Cancel
          </button>

          {/* Save bills button */}


          {saveError && (
            <p className="mt-4 text-sm font-medium text-red-600">
              {saveError}
            </p>
          )}
          <button
            type="button"
            onClick={handleSaveBills}
            disabled={isSavingBills || bills.length === 0}
            className={`rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700     ${isSavingBills
              ? "cursor-not-allowed opacity-50"
              : "text-slate-400 hover:text-slate-700"
              }`}
          >
            {isSavingBills ? "Saving..." : "Save bills"}
          </button>
        </div>
      </div>
    </div>
  );

  // Adds the typed bill into the bills list.
  function handleAddBill() {

    // Prevents empty bill information from being added.
    if (billName.trim() === "" || billAmount.trim() === "" || billDueDay.trim() === "" ||
      billCategory === "" || billIntervalValue.trim() === "" || billIntervalUnit.trim() === "") {
      // Shows validation message to the user.
      setError("Please fill up all required fields.");
      return;
    }

    if (billIntervalUnit === "YEAR" && billDueMonth.trim() === "" && (Number(billDueMonth) < 1 ||
      Number(billDueMonth) > 12)) {
      setError("Please select a due month between 1 and 12 for yearly bills.");
      return;
    }
    // Clears previous error once validation passes.
    setError("");
    const amount = Number(billAmount);
    const dueDay = Number(billDueDay);
    const dueMonth = billIntervalUnit === "YEAR" ? Number(billDueMonth) : null;

    const newBill: TempBill = {
      id: crypto.randomUUID(),
      name: billName.trim(),
      amount,
      category: billCategory,
      intervalValue: Number(billIntervalValue),
      intervalUnit: billIntervalUnit,
      dueDay,
      dueMonth: billIntervalUnit === "YEAR" ? dueMonth : null,
    };


    setBills([...bills, newBill]);

    // Clears the form after adding the bill.
    setBillName("");
    setBillAmount("");
    setBillDueDay("");
  }

  // Saving Bills to the backend

  async function handleSaveBills() {
    try {
      setIsSavingBills(true);
      setSaveError("");


      // API call will go here next
      setIsSavingBills(true);


          const response = await createBills(bills);

    console.log("createBills response:", response);

      onSaveSuccess()

      onClose();
    } catch (error) {
      setSaveError("Could not save bills. " + error);
      console.log(error)
    } finally {
      setIsSavingBills(false);
    }

  }
}