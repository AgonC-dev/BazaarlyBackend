import styles from './Profile.module.css';
import { useState, useEffect } from 'react';
import { auth } from '../../api/firebase';
import { 
  onAuthStateChanged, 
  updateEmail, 
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider,
  deleteUser,
  signOut
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
const navigate = useNavigate()

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);

const [isEditingEmail, setIsEditingEmail] = useState(false);
const [ newEmail, setNewEmail] = useState('');

const [isDeleting, setIsDeleting] = useState(false)
const [confirmCheck, setConfirmCheck] = useState(false);

const [isEditingPass, setIsEditingPass] = useState(false);
const [passwords, setPassword] = useState({ current: '', next: ''});

const [status, setStatus] = useState({msg: '', type: ''});

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) setNewEmail(currentUser.email);
        setLoading(false)
    });
    return () => unsubscribe();
}, [])

const verifyUser = async (currentPassword) => {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(auth.currentUser, credential);
};

const handleDeleteUser = async (e) => {

  if (e) e.preventDefault()
  const confirmed = confirmCheck === true
  if(!confirmed) return

  try {
    await verifyUser(passwords.current);
    await deleteUser(auth.currentUser);
    navigate('/')
    
  } catch (error) {
    setStatus({ msg: 'Please Confirm password to delete account', type: "error"})
  } 
}



const handleUpdateEmail = async (e) => {
    e.preventDefault()
    


    try {
      setStatus({ msg: 'Updating...', type: '' });
      await verifyUser(passwords.current);
      await updateEmail(auth.currentUser, newEmail);
      setIsEditingEmail(false);
      setStatus({ msg: 'Email updated successfully!', type: 'success' });
    } catch (error) {
      setStatus({ msg: 'Failed to update email. Ensure password is correct.', type: 'error' });
    }
}

const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      setStatus({ msg: 'Updating...', type: '' });
      await verifyUser(passwords.current);
      await updatePassword(auth.currentUser, passwords.next);
      setIsEditingPass(false);
      setPassword({ current: '', next: '' });
      setStatus({ msg: 'Password updated successfully!', type: 'success' });
    } catch (error) {
      setStatus({ msg: 'Failed to update password. Check your current password.', type: 'error' });
    }
  };

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (!user) return <div className={styles.center}>Please log in to view profile.</div>;

 return (
    <div className={styles.container}>
      <h1 className={styles.title}>Account Settings</h1>

      {/* --- EMAIL SECTION --- */}
      <section className={styles.EmSection}>
        <p className={styles.label}>Email Address:</p>
        {isEditingEmail ? (
          <form className={styles.editRow} onSubmit={handleUpdateEmail}>
            <input 
              type="email" 
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)}
              className={styles.input}
              placeholder='New Email'
              required
            />
            <input 
             type='password'
             placeholder='Current Password'
             value={passwords.current}
             onChange={(e) => setPassword({ ...passwords, current: e.target.value})}
             className={styles.input}
             required
            />
            <button type="submit" className={styles.saveBtn} >Set</button>
            <button type="button" onClick={() => setIsEditingEmail(false)} className={styles.cancelBtn}>Cancel</button>
          </form>
        ) : (
          <div className={styles.viewRow}>
            <p className={styles.value}>{user.email}</p>
            <button onClick={() => setIsEditingEmail(true)} className={styles.editBtn}>Edit</button>
          </div>
        )}
      </section>

      {/* --- PASSWORD SECTION --- */}
      <section className={styles.section}>
        <p className={styles.label}>Password</p>
        {isEditingPass ? (
          <form className={styles.passForm} onSubmit={handleUpdatePassword}>
            <input 
              type="password" 
              placeholder="Current Password" 
              value={passwords.current}
              onChange={(e) => setPassword({...passwords, current: e.target.value})}
              className={styles.input}
              required
            />
            <input 
              type="password" 
              placeholder="New Password" 
              value={passwords.next}
              onChange={(e) => setPassword({...passwords, next: e.target.value})}
              className={styles.input}
              required
            />
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveBtn}>Update Password</button>
              <button type="button" onClick={() => setIsEditingPass(false)} className={styles.cancelBtn}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className={styles.viewRow}>
            <p className={styles.value}>••••••••••••</p>
            <button onClick={() => setIsEditingPass(true)} className={styles.editBtn}>Change</button>
          </div>
        )}
      </section>
     <section className={styles.deleteCon}>
  <h3 className={styles.dangerTitle}>Danger Zone</h3>
  
  {!isDeleting ? (
    /* PHASE 1: Just the warning button */
    <button 
      type="button" 
      onClick={() => setIsDeleting(true)} 
      className={styles.deleteInitBtn}
    >
      Delete Account
    </button>
  ) : (
    /* PHASE 2: The actual verification form */
    <form onSubmit={handleDeleteUser} className={styles.deleteForm}>
      <p className={styles.warningText}>
        Please enter your password to confirm permanent account deletion.
      </p>
      <input 
        type='password'
        placeholder='Current Password'
        value={passwords.current}
        onChange={(e) => setPassword({ ...passwords, current: e.target.value })}
        className={styles.input}
        required
      />
      <div className={styles.checkboxRow}>
      <input 
       type="checkbox" 
       id="deleteCheck"
       checked={confirmCheck} 
       onChange={(e) => setConfirmCheck(e.target.checked)} // Update state to true/false
       className={styles.checkbox}
      />
    <label htmlFor="deleteCheck" className={styles.checkboxLabel}>
      I understand that deleting my account is permanent and cannot be undone.
    </label>
  </div>
      <div className={styles.buttonGroup}>
        <button type='submit' className={styles.deleteConfirmBtn} disabled={!confirmCheck}>
          Confirm Delete
        </button>
        <button 
          type='button' 
          onClick={() => {
            setIsDeleting(false);
            setConfirmCheck(false)
            setPassword({...passwords, current: ''}); // Clear the input on cancel
          }} 
          className={styles.cancelBtn}
        >
          Cancel
        </button>
      </div>
    </form>
  )}
</section>
      
      

      {/* Feedback Messages */}
      {status.msg && (
        <p className={status.type === 'error' ? styles.errorMsg : styles.successMsg}>
          {status.msg}
        </p>
      )}
    </div>
  );
}