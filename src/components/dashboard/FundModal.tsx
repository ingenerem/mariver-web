
"use client";

import { FormEvent, useState } from "react";
import type { Fund } from "@/types/fund";

// ========================================
// CREATE FUND MODAL
// ========================================

type CreateFundModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, initialAmount: number) => Promise<void>;
};

export default function CreateFundModal({
  open,
  onClose,
  onCreate,
}: CreateFundModalProps) {
  const [name, setName] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount =
      initialAmount.trim() === "" ? 0 : Number(initialAmount);

    if (!name.trim()) {
      setError("Please enter a fund name.");
      return;
    }

    if (!Number.isFinite(amount) || amount < 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await onCreate(name.trim(), amount);
      setName("");
      setInitialAmount("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create fund."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-fund-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="create-fund-title"
          className="text-lg font-semibold text-slate-900"
        >
          Create Savings Fund
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Set aside money for something important to you.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="fund-name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Fund Name
            </label>

            <input
              id="fund-name"
              type="text"
              maxLength={100}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. School Savings"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="initial-allocation"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Initial Allocation (optional)
            </label>

            <input
              id="initial-allocation"
              type="number"
              min="0"
              step="0.01"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
            />

            <p className="mt-1 text-xs text-slate-500">
              This money will be reserved from your available balance.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create Fund"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ========================================
// ALLOCATE FUND MODAL
// ========================================

type AllocateFundModalProps = {
  fund: Fund | null;
  availableBalance: number;
  onClose: () => void;
  onAllocate: (fundId: number, amount: number) => Promise<void>;
};

export function AllocateFundModal({
  fund,
  availableBalance,
  onClose,
  onAllocate,
}: AllocateFundModalProps) {
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!fund) return null;

  const allocation = Number(amount);

  const isValid =
    amount.trim() !== "" &&
    Number.isFinite(allocation) &&
    allocation > 0 &&
    allocation <= availableBalance;

  const formatMoney = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    setSaving(true);
    setError("");

    try {
      await onAllocate(fund.id, allocation);
      setAmount("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to allocate funds."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="allocate-fund-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="allocate-fund-title"
          className="text-lg font-semibold text-slate-900"
        >
          Add Money to {fund.name}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Reserve money from your main balance.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Current Savings
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {formatMoney(Number(fund.balance))}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Available to Allocate
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {formatMoney(availableBalance)}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="allocation-amount"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Amount
            </label>

            <input
              id="allocation-amount"
              type="number"
              min="0.01"
              max={availableBalance}
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
            />

            <button
              type="button"
              disabled={availableBalance <= 0}
              onClick={() =>
                setAmount(availableBalance.toFixed(2))
              }
              className="mt-2 text-xs font-medium text-slate-700 underline disabled:opacity-50"
            >
              Use maximum available
            </button>
          </div>
          

          {isValid && (
            <div className="rounded-xl bg-slate-50 p-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>New Fund Balance</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(Number(fund.balance) + allocation)}
                </span>
              </div>
            </div>
          )}

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || !isValid}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? "Adding..." : "Add Money"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



// ========================================
// RELEASE FUND MODAL
// ========================================

type ReleaseFundModalProps = {
  fund: Fund | null;
  onClose: () => void;
  onRelease: (fundId: number, amount: number) => Promise<void>;
};

export function ReleaseFundModal({
  fund,
  onClose,
  onRelease,
}: ReleaseFundModalProps) {
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!fund) return null;

  const fundBalance = Number(fund.balance);
  const releaseAmount = Number(amount);

  const isValid =
    amount.trim() !== "" &&
    Number.isFinite(releaseAmount) &&
    releaseAmount > 0 &&
    releaseAmount <= fundBalance;

  const formatMoney = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    setSaving(true);
    setError("");

    try {
      await onRelease(fund.id, releaseAmount);
      setAmount("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to release money."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="release-fund-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="release-fund-title"
          className="text-lg font-semibold text-slate-900"
        >
          Release Money from {fund.name}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Move money from this savings fund back to your main balance.
        </p>

        <div className="mt-5 rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">
            Current Fund Balance
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {formatMoney(fundBalance)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="release-amount"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Amount to Release
            </label>

            <input
              id="release-amount"
              type="number"
              min="0.01"
              max={fundBalance}
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
            />

            <button
              type="button"
              disabled={fundBalance <= 0}
              onClick={() => setAmount(fundBalance.toFixed(2))}
              className="mt-2 text-xs font-medium text-slate-700 underline disabled:opacity-50"
            >
              Release full balance
            </button>
          </div>

          {isValid && (
            <div className="rounded-xl bg-slate-50 p-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Remaining Fund Balance</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(fundBalance - releaseAmount)}
                </span>
              </div>
            </div>
          )}

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || !isValid}
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
            >
              {saving ? "Releasing..." : "Release Money"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
