import PropTypes from "prop-types"
import { useState } from 'react';
import { auth,db } from '../services/firebase.config'; // Import your Firebase configurationx
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {
  // addDoc,
  collection,
  // deleteDoc,
  // doc,
  // getDocs,
  // orderBy,
  // query,
  // runTransaction,
  // serverTimestamp,
} from 'firebase/firestore';

function LoginPage({onExpenseHandle}) {
  const usersCollectionRef = collection(db, 'users');
  console.log("🚀 ~ LoginPage ~ usersCollectionRef:", usersCollectionRef)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); // Track sign-in/sign-up mode

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoginMode) {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
        onExpenseHandle(true)
        console.log('User signed in successfully');
      } else {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Store user data in Firestore (optional)
            db.collection('users').doc(userCredential.user.uid).set({
              email: email,
              password: password
            });
            console.log('User created successfully');
          });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="left-side">
          <h2>Welcome to My App</h2>
        </div>
        <div className="right-side">
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
            <p onClick={toggleMode}>{isLoginMode ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}</p>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onExpenseHandle: PropTypes.func
}

export default LoginPage;