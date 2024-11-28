import PropTypes from 'prop-types';
import { useState } from 'react';
import './styles.css'

const ExpenseForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that either credit or debit is entered
    if (credit === 0 && debit === 0) {
      alert('Please enter either credit or debit amount.');
      return;
    }

    const newExpense = {
      name,
      date,
      credit,
      debit,
    };
    onSubmit(newExpense);
    setName('');
    setDate('');
    setCredit(0);
    setDebit(0);
  };

  return (
    <div className="expense-form-container">
      <form onSubmit={handleSubmit}>
        <div className="expense-form-card">
          <h3>Add Expense</h3>
          <div className="form-group">
            <label htmlFor="expenseName">Expense Name:</label>
            <input
              type="text"
              id="expenseName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter expense name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateEntry">Date of Entry:</label>
            <input
              type="date"
              id="dateEntry"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="credit">Credit:</label>
            <input
              type="number"
              id="credit"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              placeholder="Enter credit amount"
            />
          </div>
          <div className="form-group">
            <label htmlFor="debit">Debit:</label>
            <input
              type="number"
              id="debit"
              value={debit}
              onChange={(e) => setDebit(e.target.value)}
              placeholder="Enter debit amount"
            />
          </div>
          <button className="add-expense" type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ExpenseForm;
