import { useEffect, useState } from "react";
// Props expected by the modal component.
type PresetBillsModalProps = {

  // Function used to close the modal.
  onClose: () => void;
};

type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDay: number;
};

// Main preset bills modal component.
export default function PresetBillsModal({
  onClose,
}: PresetBillsModalProps) {

  // Stores the list of bills added in this modal.
  const [bills, setBills] = useState<Bill[]>([]);

  // Stores what the user types for the new bill name.
  const [billName, setBillName] = useState("");

  // Stores what the user types for the new bill amount.
  // Keep it as a string because input values come from the browser as text.
  const [billAmount, setBillAmount] = useState("");

  // Stores what the user types for the due day.
  const [billDueDay, setBillDueDay] = useState("");

  // Stores validation errors shown to the user.
  const [error, setError] = useState("");

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
              Set your preset bills
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your recurring monthly bills. We’ll show the total on your dashboard.
            </p>
          </div>

          {/* Close/X button */}
          <button
            type="button"
            onClick={onClose}
            className="text-xl text-slate-400 hover:text-slate-700"
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

            {/* Add bill button */}
            <div onClick={handleAddBill}
              className="flex items-end">
              <button
                type="button"
                className="w-full rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
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
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Bottom action buttons */}
        <div className="mt-6 flex justify-end gap-3">

          {/* Cancel button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          {/* Save bills button */}
          <button
            type="button"
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Save bills
          </button>
        </div>
      </div>
    </div>
  );

  // Adds the typed bill into the bills list.
  function handleAddBill() {

    // Prevents empty bill information from being added.
    if (
      billName.trim() === "" ||
      billAmount.trim() === "" ||
      billDueDay.trim() === ""
    ) {
      // Shows validation message to the user.
      setError("Please fill up all required fields.");
      return;
    }
    // Clears previous error once validation passes.
    setError("");
    const amount = Number(billAmount);
    const dueDay = Number(billDueDay);

    const newBill: Bill = {
      id: crypto.randomUUID(),
      name: billName,
      amount: amount,
      dueDay: dueDay,
    };

    setBills([...bills, newBill]);

    // Clears the form after adding the bill.
    setBillName("");
    setBillAmount("");
    setBillDueDay("");
  }
}