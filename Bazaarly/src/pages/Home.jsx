import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Header/Header";

import ProductsList from "../components/Product/ProductsList";
import CatergoriesList from "../components/Categories/CategoriesList";
import Footer from "../components/Footer/Footer";
import { STATIC_DATA } from "../data/StaticData";
import Cart from "./Cart/Cart";

export default function Home() {
    return (
        <>
          <Header />
          <ProductsList />
          <CatergoriesList />
          <Footer />
        </>
    )
}