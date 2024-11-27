import { useState } from 'react';
import ExpenseTracker from './Pages/expenseTracker';
import Login from './Pages/login';

function App() {
  const [showExpense, setShowExpense] = useState(false);

  return (
    <>
      {showExpense ? (
        <ExpenseTracker />
      ) : (
        <Login onExpenseHandle={() => setShowExpense(true)} />
      )}
    </>
  );
}

export default App;
