import { CATEGORIES_DATA } from "../../data/CategoriesData"
import { useNavigate } from 'react-router-dom';
import Categories from "./Categories"
import styles from './CategoriesList.module.css'

export default function CatergoriesList() {
const navigate = useNavigate();

function handleSelect(catName) {
  navigate('/products', { state: { chosenCategory: catName}});
}

    return (
        <>
        <div className={styles.container}>
        <p className={styles.head}>Explore Categories</p>
         <div className={styles.baseContainer}>
           {CATEGORIES_DATA.map(categorie => (
            <Categories 
              icon={categorie.icon}
              title={categorie.title}
              description={categorie.description}
              key={categorie.id}
              onSelect={() => handleSelect(categorie.title.toLowerCase())}
            />
           ))} 
          </div> 
        </div>
     </>
    )
}