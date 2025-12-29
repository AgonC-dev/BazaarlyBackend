import { useEffect } from 'react';
import styles from './About.module.css';

export default function About() {

 useEffect(() => {
    window.scrollTo(0, 0);
}, []) 

    return (
        <div className={styles.container}>
          <section className={styles.section1}>
            <h1>About Bazaarly</h1>
          </section> 
          <section className={styles.section2} >
            <h2>How was Bazaarly built</h2>
            <p className={styles.section2Text}><strong>Architecture</strong>Built using React.js for a modular, component-based structure.</p>
            <p className={styles.section2Text}><strong>Navigation</strong>Implemented React Router for complex multi-page routing and persistent state management between views.</p>
            <p className={styles.section2Text}><strong>Dynamic Logic</strong>Developed a custom filtering system using useLocation and useEffect to synchronize category selection across the Home and Product pages.</p>
            <p className={styles.section2Text}><strong>Styling</strong>Utilized CSS Modules for scoped, maintainable styles, ensuring a consistent and responsive design across all devices.</p>
          </section> 
           <section className={styles.section3} >
            <h2>Meet the Developer</h2>
            <p>Hi, I'm Lis. I am a passionate Frontend Developer dedicated to building functional, beautiful, and accessible web applications.
               My journey into development started with a curiosity about how the web works, which quickly evolved into a deep dive into the React ecosystem. I enjoy the challenge of turning complex logic into simple, elegant code. For me, coding isn't just about making things work—it's about understanding the "why" behind every line and constantly refining the user journey.</p>
          </section> 
           <section className={styles.section4} >
             <h2>Lets Connect</h2>
             <p>I am currently open to new opportunities, freelance collaborations. If you are looking for a developer who is detail-oriented, obsessed with clean code, and eager to solve problems, I’d love to hear from you.
                Whether you have a project in mind or just want to talk shop about React, feel free to reach out through any of the channels below!</p>
          </section> 
          <section className={styles.section5}>
            <div className={styles.contactItem}>
              <span className={styles.label}>Email</span>
              <a href="mailto:liscitaku12@gmail.com">liscitaku12@gmail.com</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>GitHub</span>
              <a className={styles.href} href='https://github.com/AgonC-dev' target='_blank' rel='noreferrer'>AgonC-dev</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Location</span>
              <span>Prishtina, Kosovo</span>
             </div>
           </section>
        </div>
    )
}
