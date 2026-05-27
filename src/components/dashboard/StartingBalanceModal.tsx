

import { useState } from "react";
// Props expected by the modal component.
// onClose will be used to close the popup/modal.
type StartingBalanceModalProps = {
    onClose: () => void;
    // Sends the entered balance back to Dashboard.
    onSave: (amount: number) => void;
};

// Main modal component.
export default function StartingBalanceModal({
    onClose,
    onSave,
}: StartingBalanceModalProps) {

    const [balanceInput, setBalanceInput] = useState(
        localStorage.getItem("mariver_starting_balance") ?? ""
    );


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Convert typed value from string to number.
        const amount = Number(balanceInput);

        // Stop if input is empty or not a valid number.
        if (balanceInput.trim() === "" || Number.isNaN(amount)) {
            return;
        }

        localStorage.setItem("mariver_starting_balance", String(amount));

        onSave(amount);
        onClose();
    }

    return (

        // Full-screen dark overlay behind the modal.
        // fixed inset-0 makes it cover the entire screen.
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-[1px]">

            {/* Main modal container */}
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                {/* Header section */}
                <div className="mb-5 flex items-start justify-between">

                    {/* Title + description */}
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Set starting balance
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter how much money you currently have before bills and spending.
                        </p>
                    </div>

                    {/* Close/X button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700"
                    >
                        ✕
                    </button>
                </div>

                {/* Form section */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Current balance input */}
                    <div>

                        {/* Input label */}
                        <label className="block text-sm font-medium text-slate-700">
                            Current balance *
                        </label>

                        {/* Number input */}
                        <input
                            type="number"
                            placeholder="0"

                            // Current value stored in state.
                            value={balanceInput}

                            // Updates state when user types.
                            onChange={(event) => setBalanceInput(event.target.value)}

                            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Bottom action buttons */}
                    <div className="flex justify-end gap-3 pt-2">

                        {/* Cancel button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        {/* Save/submit button */}
                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Save balance
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}