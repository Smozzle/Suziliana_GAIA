import { useState } from "react";

function ExpenseTracker() {
  // State variables
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  // Add a new expense
  const addExpense = () => {
    if (!description || !amount || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      description: description,
      amount: Number(amount),
      category: category,
    };

    setExpenses([...expenses, newExpense]);

    // Clear the form
    setDescription("");
    setAmount("");
    setCategory("");
  };

  // Delete an expense
  const deleteExpense = (id) => {
    setExpenses(
      expenses.filter((expense) => expense.id !== id)
    );
  };

  // Filter expenses
  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter(
          (expense) => expense.category === filter
        );

  // Calculate total expenses
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div>
      <h2>Personal Expense Tracker</h2>

      {/* Add Expense Form */}
      <h2>Add Expense</h2>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>

      <button onClick={addExpense}>
        Add Expense
      </button>

      <hr />

      {/* Expense List */}
      <h2>Expenses</h2>

      {/* Category Filter */}
      <label>Filter by Category: </label>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>

      {/* Display Expenses */}
      {filteredExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        filteredExpenses.map((expense) => (
          <div key={expense.id}>
            <p>
              <strong>{expense.description}</strong>
              {" - "}
              RM{expense.amount}
              {" - "}
              {expense.category}

              {" "}

              <button
                onClick={() => deleteExpense(expense.id)}
              >
                Delete
              </button>
            </p>
          </div>
        ))
      )}

      <hr />

      {/* Total */}
      <h2>Total Expenses: RM{total.toFixed(2)}</h2>
    </div>
  );
}

export default ExpenseTracker;