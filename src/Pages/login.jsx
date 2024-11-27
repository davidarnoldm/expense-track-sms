import PropTypes from 'prop-types';
import { useState } from 'react';
import { auth, db } from '../services/firebase.config'; // Import your Firebase configurationx
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  addDoc,
  collection,
} from 'firebase/firestore';
import './login.css'

function LoginPage({ onExpenseHandle, onIdHandle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); // Track sign-in/sign-up mode

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoginMode) {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            console.log('User UID:', uid);
            onIdHandle(uid);
          }
        );
        onExpenseHandle(true);
        console.log('User signed in successfully');
      } else {
        // Create a new user with proper error handling
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            // Add user data to Firestore using addDoc
            const userRef = addDoc(collection(db, 'users'), {
              email: user.email,
            });
            console.log('🚀 ~ userRef ~ userRef:', userRef);

            console.log(
              'User created and data added to Firestore with ID:',
              userRef.uid
            );
          })
          .catch((error) => {
            console.error('Error creating user or adding data:', error);
            setError(error.message); // Optionally display the error to the user
          });
      }
    } catch (error) {
      console.error('Error during sign-in/sign-up:', error);
      setError(error.message); // Optionally display the error to the user
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="left-side">
          <h1>Welcome to Expense Tracker Website</h1>
          <h4>This project is built solely for the purpose of College Project</h4>
        </div>
        <div className="right-side">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
            <p onClick={toggleMode}>
              {isLoginMode
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Log In'}
            </p>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onExpenseHandle: PropTypes.func,
  onIdHandle: PropTypes.func,
};

export default LoginPage;
