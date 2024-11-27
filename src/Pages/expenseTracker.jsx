import { useState, useEffect } from 'react';
import './ExpenseTracker.css'; // Import your CSS file
import ExpenseForm from '../components/expenseForm';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [isAddExpenseFormVisible, setIsAddExpenseFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingField, setEditingField] = useState(null); // New state

  useEffect(() => {
    // Fetch expenses from a data source (e.g., API, local storage)
    const fetchedExpenses = [
      { id: 1, name: 'Rent', date: '2023-11-26', credit: 0, debit: 1000 },
      { id: 2, name: 'Salary', date: '2023-11-26', credit: 2000, debit: 0 },
    ];
    setExpenses(fetchedExpenses);

    // Calculate total debit and credit
    const initialDebit = fetchedExpenses.reduce(
      (acc, expense) => acc + expense.debit,
      0
    );
    const initialCredit = fetchedExpenses.reduce(
      (acc, expense) => acc + expense.credit,
      0
    );
    setTotalDebit(initialDebit);
    setTotalCredit(initialCredit);
  }, []);

  const handleAddExpense = () => {
    setIsAddExpenseFormVisible(true);
  };

  const handleExpenseSubmit = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    // Update total debit and credit based on the new expense
    setTotalDebit(totalDebit + Number(newExpense.debit));
    setTotalCredit(totalCredit + Number(newExpense.credit));
    setIsAddExpenseFormVisible(false);
  };
  const handleEditExpense = (expense) => {
    setIsEditing(true);
    setEditingExpense(expense);
    setEditingField(null); // Reset editing field on new edit
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);

    // Update total debit and credit after deletion
    const newTotalDebit = updatedExpenses.reduce(
      (acc, expense) => acc + expense.debit,
      0
    );
    const newTotalCredit = updatedExpenses.reduce(
      (acc, expense) => acc + expense.credit,
      0
    );
    setTotalDebit(newTotalDebit);
    setTotalCredit(newTotalCredit);
  };

  // const handleEdit = (expense) => {
  //   setIsEditing(true);
  //   setEditingExpense(expense);
  // };

  const handleSaveEdit = (editedExpense) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === editedExpense.id) {
        return editedExpense;
      }
      return expense;
    });
    setExpenses(updatedExpenses);

    // Update total debit and credit after editing
    const newTotalDebit = updatedExpenses.reduce(
      (acc, expense) => acc + expense.debit,
      0
    );
    const newTotalCredit = updatedExpenses.reduce(
      (acc, expense) => acc + expense.credit,
      0
    );
    setTotalDebit(newTotalDebit);
    setTotalCredit(newTotalCredit);

    setIsEditing(false);
    setEditingExpense(null);
    setEditingField(null);
  };

  return (
    <div className="expense-tracker">
      <button onClick={handleAddExpense}>Add New Expense</button>

      {isAddExpenseFormVisible && (
        <ExpenseForm onSubmit={handleExpenseSubmit} />
      )}
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Expense Name</th>
            <th>Date of Entry</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id}>
              <td>{index + 1}</td>
              <td>
                {isEditing &&
                expense.id === editingExpense.id &&
                editingField === 'name' ? (
                  <input
                    key={`name-${expense.id}`}
                    type="text"
                    value={editingExpense.name}
                    onChange={(e) =>
                      setEditingExpense({
                        ...editingExpense,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div>{expense.name}</div>
                )}
                {isEditing &&
                expense.id === editingExpense.id &&
                editingField === 'name' ? (
                  <button onClick={() => handleSaveEdit(editingExpense)}>
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleEditExpense(expense);
                      setEditingField('name');
                    }}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td>{expense.date}</td>
              <td>
                {isEditing &&
                expense.id === editingExpense.id &&
                editingField === 'credit' ? (
                  <input
                    key={`credit-${expense.id}`}
                    type="number"
                    value={editingExpense.credit}
                    onChange={(e) =>
                      setEditingExpense({
                        ...editingExpense,
                        credit: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  <div>{expense.credit}</div>
                )}
                {isEditing &&
                expense.id === editingExpense.id &&
                editingField === 'credit' ? (
                  <button onClick={() => handleSaveEdit(editingExpense)}>
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleEditExpense(expense);
                      setEditingField('credit');
                    }}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td>
                {isEditing &&
                expense.id === editingExpense.id &&
                editingField === 'debit' ? (
                  <input
                    key={`debit-${expense.id}`}
                    type="number"
                    value={editingExpense.debit}
                    onChange={(e) =>
                      setEditingExpense({
                        ...editingExpense,
                        debit: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  <div>{expense.debit}</div>
                )}
                {isEditing &&
                expense.id === editingExpense.id &&
                editingField === 'debit' ? (
                  <button onClick={() => handleSaveEdit(editingExpense)}>
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleEditExpense(expense);
                      setEditingField('debit');
                    }}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td>
                {/* {isEditing && expense.id === editingExpense.id ? (
                  <button onClick={() => handleSaveEdit(editingExpense)}>
                    Save
                  </button>
                ) : ( */}
                  <button onClick={() => handleDeleteExpense(expense.id)}>
                    Delete
                  </button>
                {/* )} */}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="total-label">
              Total
            </td>
            <td>{totalCredit}</td>
            <td>{totalDebit}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTracker;
