import { useState } from 'react';
import ExpenseTracker from './Pages/expenseTracker';
import Login from './Pages/login';

function App() {
  const [showExpense, setShowExpense] = useState(false);
  const [uidValue, setUidValue] = useState('');

  return (
    <>
      {showExpense ? (
        <ExpenseTracker userUidValue={uidValue} />
      ) : (
        <Login
          onExpenseHandle={() => setShowExpense(true)}
          onIdHandle={(value) => setUidValue(value)}
        />
      )}
    </>
  );
}

export default App;
