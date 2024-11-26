import PropTypes from 'prop-types';
import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Expense Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Date of Entry:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Credit:</label>
        <input
          type="number"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
        />
      </div>
      <div>
        <label>Debit:</label>
        <input
          type="number"
          value={debit}
          onChange={(e) => setDebit(e.target.value)}
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ExpenseForm;
