// src/data/mockDashboardData.ts

export const mockDashboardData = {
  user: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
  },

  currentPayPeriod: {
    label: "May 15 – May 30, 2026",
    progress: 40,
  },

  summary: {
    safeToSpend: 1380.5,
    upcomingBills: 2140,
    savingsBalance: 4200,
  },

  upcomingBills: [
    {
      id: 1,
      name: "Rent",
      amount: 1450,
      dueDate: "May 18",
      category: "Housing",
    },
    {
      id: 2,
      name: "Netflix",
      amount: 19.99,
      dueDate: "May 20",
      category: "Entertainment",
    },
    {
      id: 3,
      name: "Car Insurance",
      amount: 180,
      dueDate: "May 22",
      category: "Insurance",
    },
    {
      id: 4,
      name: "Internet",
      amount: 75,
      dueDate: "May 24",
      category: "Utilities",
    },
  ],

  recentTransactions: [
    {
      id: 1,
      name: "Paycheck",
      amount: 2500,
      type: "income",
      date: "May 12",
    },
    {
      id: 2,
      name: "Groceries",
      amount: 82.45,
      type: "expense",
      date: "May 12",
    },
    {
      id: 3,
      name: "Gas",
      amount: 47.12,
      type: "expense",
      date: "May 11",
    },
    {
      id: 4,
      name: "Coffee",
      amount: 6.75,
      type: "expense",
      date: "May 10",
    },
  ],

  savingsGoals: [
    {
      id: 1,
      name: "Emergency Fund",
      currentAmount: 2300,
      targetAmount: 5000,
    },
    {
      id: 2,
      name: "Vacation",
      currentAmount: 1200,
      targetAmount: 3000,
    },
    {
      id: 3,
      name: "School Savings",
      currentAmount: 4200,
      targetAmount: 12000,
    },
  ],
};