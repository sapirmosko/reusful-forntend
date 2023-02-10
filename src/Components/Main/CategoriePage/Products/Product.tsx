import { ProductInterface } from "../../../../model/productModel";
import "./Product.css";
import { NavLink } from "react-router-dom";

function Product({ product }: { product: ProductInterface }): JSX.Element {
    return (
        <div className="ProductAll">
            <NavLink to={'/productpage/' + product.id}>
                <div className="Product">
                    <div className="ProductImage">
                        <img src={`https://reusfulimages.s3.amazonaws.com/${product.productImage}`} alt="" />
                    </div>
                    <div className="ProductDetails">
                        <p>{product.productName}</p>
                        <p>{product.productPrice}$</p>
                    </div>
                    <div className="ProductSeller">
                    </div>
                </div>
            </NavLink>
        </div>

    );
}

export default Product;
