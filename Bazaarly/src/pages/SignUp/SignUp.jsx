import styles from './SignUp.module.css';
import Photo from '../../assets/signup.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';


export default function SignUp() {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!checked) {
      setError('You must agree to Terms and Privacy Policy to continue');
      return;
    }

    if (password !== confirm) {
      setError('Passwords must match');
      return;
    }

    setIsPending(true)

    try {
      await register(name, email, password);
      navigate('/login');
    } catch (err) {
      switch(err.code) {
        case 'auth/email-already-in-use':
          setError("Email already in use")
          break;
        
        case 'auth/invalid-email':
          setError('Please enter a valid email')
          break;

        case 'auth/weak-password':
          setError('Enter a strong password')
          break;

        default: 
          setError('Something went wrong. Try again later.')
      }
      
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className={styles.signUpContainer}>
      
      <div className={styles.leftCon}>
        <p className={styles.title}>Create Your Bazaarly Account</p>
        <p className={styles.text}>
          Join us today to discover exclusive products <br />
          and seamless shopping.
        </p>

        {/* FORM STARTS HERE */}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputCon}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input
              name="name"
              type="text"
              className={styles.input}
              placeholder="Enter Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputCon}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              className={styles.input}
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputCon}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              className={styles.input}
              placeholder="Enter a Strong Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputCon}>
            <label htmlFor="confirmPass" className={styles.label}>Confirm your password</label>
            <input
              name="confirmPass"
              type="password"
              className={styles.input}
              placeholder="Enter Your Password Again"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <div className={styles.termsCon}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <div className={styles.outerSquare}>
                <svg width="12" height="10" viewBox="0 0 12 10">
                  <path d="M1 5L4 8L11 1" strokeWidth="2" stroke="white" fill="none" />
                </svg>
              </div>
            </label>

            <p className={styles.terms}>
              I agree to the Terms of Service and Privacy Policy
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && <p className={styles.error}>{error}</p>}

          {/* SUBMIT BUTTON NOW CORRECTLY INSIDE THE FORM */}
          <button className={styles.signUpBtn} type="submit" disabled={isPending}>
            { isPending ? 'Sending Data' : 'Sign Up'} 
          </button>
        </form>
        {/* FORM ENDS HERE */}

        <div className={styles.accQuestionCon}>
          <p className={styles.questionText}>Already have an account?</p>
          <Link className={styles.questionLink} to="/login">Log In</Link>
        </div>
      </div>

      <div className={styles.right}>
        <img className={styles.image} src={Photo} />
      </div>

    </div>
  );
}
