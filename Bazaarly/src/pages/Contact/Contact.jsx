import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
const [status, setStatus] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");

    const form = e.target;
    const data = new FormData(form);

    try {
        const response = await fetch('https://formspree.io/f/mnjqagwz', {
            method: "POST",
            body: data,
            headers: { 'Accept': 'application/json'}
        })

        if(response.ok) {
            setStatus("SUCCESS")
            form.reset()
        } else {
            setStatus("ERROR")
        }
    } catch (error) { 
       setStatus("ERROR")
    }
}

 return (
  <div className={styles.container}>
    <h1 className={styles.title}>Get in Touch</h1>
    <p className={styles.subtitle}>Have a question or want to work together? Send me a message!</p>

    {status === "SUCCESS" ? (
      <div className={styles.successBox}>
        <p>Message sent! I'll get back to you soon. 🚀</p>
        <button onClick={() => setStatus("")} className={styles.submitBtn}>
          Send Another
        </button>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="full-name">Name</label>
          <input type="text" name="name" id="full-name" placeholder="Michael Poppins" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" placeholder="email@example.com" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" rows="5" placeholder="Tell me about your opinion..." required></textarea>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={status === "SENDING"}>
          {status === "SENDING" ? "Sending..." : "Send Message"}
        </button>
        
        {status === "ERROR" && (
          <p style={{ color: 'red', marginTop: '10px' }}>Oops! There was an error.</p>
        )}
      </form>
    )}
  </div>
);
}