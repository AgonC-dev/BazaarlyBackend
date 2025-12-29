
import styles from './LogIn.module.css';
import { useState } from 'react';
import Google from '../../assets/google.svg';
import Facebook from '../../assets/facebook2.svg';
import { sendPasswordResetEmail } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth'; 
import { auth } from '../../api/firebase'

export default function LogIn() {
const [email, setEmail] = useState('');
const [ resetSent, setResetSent] = useState(false)
const [password, setPassword] = useState('');
const [error, setIsError] = useState('')
const [isPending, setIsPending] = useState(false)
const navigate = useNavigate();
const location = useLocation();

function handleSignUp() {
    navigate('/signup')
}

async function handleReset() {
  try {
   setIsPending(true) 
   await sendPasswordResetEmail(auth, email);
   setResetSent(true);
   setIsError('')
  } catch (err) {
    setIsError('Check if the email is correct')
  } finally {
    setIsPending(false)
  }
}

const from = location.state?.from?.pathname || "/";


async function handleSubmit(e)  {
    e.preventDefault();
    setIsError('');
    setIsPending(true)
    try {
      const user = await login(email, password)
      navigate(from, { replace: true})
    } catch (err) {
      setIsError('Invalid email or password')
    } finally {
      setIsPending(false)
    }



    if(!email) {
        setIsError('Please enter a valid email')
    } else if (!password) {
        setIsError('Please enter a password')
    } else  if (password.length < 6) {
        setIsError('Password needs to be longer than 6 characters')
    } else if (!email.includes('@')) {
       setIsError('Email needs to include @')
    } else {
        console.log({email, password})
    }
     return ;
    
}

    return (
        <div className={styles.logContainer}>
         
         <p className={styles.title}>Welcome Back</p>
         <p className={styles.text}>Login to your Bazaarly account</p>
         <form onSubmit={handleSubmit}>
           <div className={styles.emailCon}>
             <label htmlFor='email' className={styles.label}>Email</label>
             <input 
               value={email} 
               onChange={(e) => {
                setEmail(e.target.value);
                setIsError('')
                setResetSent(false)
              }} 
               placeholder='Email' 
               type='email' 
               name='email'
               className={styles.input}
               required
             />
           </div>
           <div className={styles.emailCon}>
            <label htmlFor='password' className={styles.label}>Password</label>
            <input 
              value={password} 
              onChange={(e) => {
                setPassword(e.target.value);
                setIsError('')
                setResetSent(false)
              }} 
              placeholder='Password' 
              type='password' 
              name='password'
              className={styles.input}
              required
            />
            {resetSent && (
              <div className={styles.successBox}>
                <p>📧 Reset link sent! Check your inbox (and spam folder).</p>
                <button onClick={() => setResetSent(false)} className={styles.closeBtn}>✕</button>
              </div>
            )}
            <button className={styles.resetBtn} onClick={handleReset} type='button'><p className={styles.forget}>Forgot your password?</p></button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type='submit' className={styles.logIn} disabled={isPending}>
              {isPending ? 'Logging In' : 'Log In'}
            </button>

            <p className={styles.middle}>OR CONTINUE WITH</p>
            <div className={styles.continue}>
              <button type="button" className={styles.blackButton}><img src={Google} />Continue with Google</button>
              <button type="button" className={styles.blackButton}><img src={Facebook} />Continue with FaceBook</button>
              {/* <button type="button" className={styles.blackButton}><img src={Apple} />Continue with Apple</button> */}
            </div>
            <div className={styles.accDiv}>
              <p className={styles.accountText}>Dont have an account?
                <button type="button" className={styles.button} onClick={handleSignUp}>Sign Up</button>
              </p>
            </div>
            
         </form>
         
        </div>
    )
    
} 