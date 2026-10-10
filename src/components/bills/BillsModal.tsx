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
  tempId: string;
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

  const [startDate, setStartDate] = useState(() => new Date().toLocaleDateString("en-CA"));

  // Stores what the user types for the due day.
  const [billDueDay, setBillDueDay] = useState("");

  const [billCategory, setBillCategory] = useState("");
  const [billIntervalValue, setBillIntervalValue] = useState("1");
  const [billIntervalUnit, setBillIntervalUnit] = useState("MONTH");
  const [billDueMonth, setBillDueMonth] = useState("");

  const [paymentType, setPaymentType] = useState("FIXED");

  const [autoPay, setAutoPay] = useState(false);

  // Stores validation errors shown to the user.
  const [error, setError] = useState("");

  // Stores the state when user clicks on save and the backend is processing
  const [isSavingBills, setIsSavingBills] = useState(false);
  const [saveError, setSaveError] = useState("");

  const createTempId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;


  const handleRemoveBill = (id: string) => {
    setBills((currentBills) =>
      currentBills.filter((bill) => bill.tempId !== id)
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
                <option value="MORTGAGE">Mortgage</option>
                <option value="UTILITIES">Utilities</option>
                <option value="HOUSING">Housing</option>
                <option value="HOA">HOA</option>
                <option value="FOOD">Food</option>
                <option value="INSURANCE">Insurance</option>
                <option value="SUBSCRIPTION">Subscription</option>
                <option value="TRANSPORTATION">Transportation</option>
                <option value="CHILDCARE">Child care</option>
                <option value="DEBT">Loan</option>
                <option value="SAVINGS">Savings</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Spending date */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700">
                Start date<span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
                 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
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
                  <option value="MONTH">Month(s)</option>
                  <option value="WEEK">Week(s)</option>
                  <option value="YEAR">Year(s)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fixed amount?
              </label>

              <select
                value={paymentType}
                onChange={(e) => {
                  const value = e.target.value;
                  setPaymentType(value);

                  if (value === "VARIABLE") {
                    setAutoPay(false);
                  }
                }}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="FIXED">Yes</option>
                <option value="VARIABLE">No</option>
              </select>
            </div>

            {paymentType === "FIXED" && (<div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Auto-pay?
              </label>

              <select
                value={autoPay ? "yes" : "no"}
                onChange={(e) => setAutoPay(e.target.value === "yes")}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>)
            }

            {/* Add bill button */}
            <div
              className="flex items-end">
              <button onClick={handleAddBill}
                type="button"
                disabled={isSavingBills}
                className={`{w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 ${isSavingBills
                  ? "cursor-not-allowed opacity-50"
                  : "text-slate-400 hover:text-white"
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
                    key={bill.tempId}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {bill.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        Next due: {bill.startDate} · Every {bill.intervalValue}{" "}
                        {bill.intervalUnit.toLowerCase()}
                      </p>

                      <p className="text-xs text-slate-500">
                        {bill.paymentType === "FIXED" ? "Fixed amount" : "Variable amount"}
                        {bill.paymentType === "FIXED" &&
                          ` · Auto-pay: ${bill.autoPay ? "Yes" : "No"}`}
                      </p>
                    </div>

                    <p className="font-semibold text-slate-900">
                      {"$" + bill.amount.toLocaleString()}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleRemoveBill(bill.tempId)}
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
            className={`rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700     ${isSavingBills
              ? "cursor-not-allowed opacity-50"
              : "text-slate-400 hover:text-white"
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
    // Prevents empty bill information from being added.
    if (
      billName.trim() === "" ||
      billAmount.trim() === "" ||
      billCategory === "" ||
      billIntervalValue.trim() === "" ||
      billIntervalUnit === "" ||
      startDate === "" ||
      paymentType === ""
    ) {
      setError("Please fill out all required fields.");
      return;
    }


    // Clears previous error once validation passes.
    setError("");
    const amount = Number(billAmount);

    const newBill: TempBill = {
      tempId: createTempId(),
      name: billName.trim(),
      amount,
      category: billCategory,
      intervalValue: Number(billIntervalValue),
      intervalUnit: billIntervalUnit,
      startDate,
      autoPay,
      paymentType,
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

      console.log(bills);


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