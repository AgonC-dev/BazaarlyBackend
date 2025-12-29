import styles from './Categories.module.css';

export default function Categories({icon, title, description, onSelect}) {
    return (
       <>
          <button className={styles.base} onClick={onSelect}>
            <img src={icon} className={styles.icon}/>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </button>  
       
      </> 
    )
}