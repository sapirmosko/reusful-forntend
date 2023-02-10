import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { categoriePageFunctions } from "../../../functions/CategoriePageFunctions";
import { ProductInterface } from "../../../model/productModel";
import "./CategoriePage.css";
import Product from "./Products/Product";

function CategoriePage(): JSX.Element {
    const params = useParams();
    const [products, setProducts] = useState<ProductInterface[]>();

    useEffect(() => {
        categoriePageFunctions.getProductsFromDb(setProducts, params);
    }, [])

    return (
        <div className="CategoriePage">

            <div className="CategoriePageContent">
                <div className="CategoriePageSearch">
                    <input type="text" placeholder="Search" onChange={(e) => categoriePageFunctions.searchForProduct(e,params,products,setProducts)} />
                </div>

                <div className="CategoriePageProducts">
                    {
                        products?.map((p: ProductInterface) => <Product key={p.id} product={p} />)
                    }
                </div>
            </div>

            <div className="CategoriePageFilters">
                <h1>Filters: </h1>
                <hr />
                <div className="Filters">
                    <h4>Price range:</h4>
                    <div className="FiltersPriceRange">
                        <select onChange={(e) => categoriePageFunctions.filterProductsByPrice(e, params, setProducts)} name="" id="">
                            <option value='0'>All</option>
                            <option value='100'>From 100$</option>
                            <option value="500">From 500$</option>
                            <option value="1000">From 1000$</option>
                            <option value="2000">From 2000$</option>
                            <option value="5000">From 5000$</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CategoriePage;
