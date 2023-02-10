import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ProductInterface } from "../../../../../model/productModel";
import { apiService } from "../../../../../service/ApiService";
import "./ProductPage.css";
import { useSelector } from "react-redux";
import { productPageFunctions } from "../../../../../functions/productPageFunctions";
import 'react-awesome-slider/dist/styles.css';
import EditProduct from "../EditProduct/EditProduct";
import ProductPageMessage from "./ProductPageMessage/ProductPageMessage";
import Carousel from "nuka-carousel";
import MapComponent from "./Map/MapComponent";
import Geocode from "react-geocode";
import MapIcon from '@mui/icons-material/Map';


function ProductPage(): JSX.Element {
    const navigate = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = useState<ProductInterface>()
    const authSlice = useSelector((state: any) => state.auth);
    const [inCart, setInCart] = useState<boolean>(false);
    const [productImages1, setProductImages1] = useState<any>([])
    const [productImages2, setProductImages2] = useState<any>([])
    const productId = Number(id);
    const [userId, setUserId] = useState(authSlice !== null ? authSlice.sub : 0);
    const [refreshProduct, setRefreshProduct] = useState<boolean>(false)
    const [lat, setLat] = useState<number>(0)
    const [lng, setLng] = useState<number>(0)
    const [showMap, setShowMap] = useState<boolean>(false)

    useEffect(() => {
        try {
            apiService.getProductImages(Number(id)).then(res => setProductImages1(res[0]));
            apiService.getProductImages(Number(id)).then(res => setProductImages2(res[1]));
        } catch (e) {
            console.log(e);
        }
        apiService.getProduct(Number(id)).then((p: any) => {
            setProduct(p)
            productPageFunctions.checkIfProductInCart(userId, productId, setInCart)
            apiService.getUserById(p.userId).then((res) => {
                const country = res.country
                const city = res.city
                const streetAddress = res.streetAddress
                productPageFunctions.getlanAndLat(`${country},${city},${streetAddress}`, setLat, setLng)
            });
        })
    }, [refreshProduct]);

    async function deleteProduct() {
        try {
            const results = await apiService.deleteProductById(product, productId);
            if (results.affectedRows === 1) {
                productPageFunctions.ToastDeletedProduct()
                navigate('/')
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="ProductPage">
            <div className="ProductPageContent">
                <div className="ProductPageUsername">
                    {product?.userId !== userId && product ?
                        <ProductPageMessage product={product} />
                        : "Me"}
                </div>
                <div className="ProductPageTitle">
                    <h3>{product?.productName}</h3>

                </div>
                <div className="ProductPageImage">
                    <Carousel wrapAround={true}>
                        <img src={`https://reusfulimages.s3.amazonaws.com/${product?.productImage}`} alt="" />
                        <img src={`https://reusfulimages.s3.amazonaws.com/${productImages1.productsImage}`} alt="" />
                        <img src={`https://reusfulimages.s3.amazonaws.com/${productImages2.productsImage}`} alt="" />
                    </Carousel>
                </div>

                <div className="ProductPageDescription">
                    <b>Description: </b> <br /> <br />
                    <span>{product?.productDescription}</span>
                </div>
            </div>

            <div className="ProductPageSecondaryInfo">
                <div onClick={() => setShowMap(!showMap)} className="ProductPageShowMap">
                    <MapIcon fontSize="large" />
                    {showMap ?
                        <div className="UserLocationMap">
                            <div className="overlay"></div>
                            <MapComponent lat={lat} lng={lng} />
                        </div>
                        : <></>}
                </div>

                <div className="ProductPageCategorieName">
                    <b>Categorie: </b>
                    <span>{product?.categorieName}</span>
                </div>

                <div className="ProductPageStatus">
                    <b>Status: </b>
                    <span>{product?.productStatus}</span>
                </div>

                <div className="ProductPageDate">
                    <b>Upload date: </b>
                    <span>{product?.productDate}</span>
                </div>

                <div className="ProductPagePrice">
                    <b>Price: </b>
                    <span>{product?.productPrice}$</span>
                </div>
                {
                    product?.userId === userId ?
                        <>
                            <div className="ProductPageEdit">
                                <EditProduct product={product} refreshProduct={refreshProduct} setRefreshProduct={setRefreshProduct} />
                            </div>
                            <div onClick={() => deleteProduct()} className="ProductPageAddToCart">
                                <span>Delete Product</span>
                            </div>
                        </>
                        :

                        inCart
                            ? <div onClick={() => productPageFunctions.removeFromCart(userId, productId, setInCart)} className="ProductPageAddToCartOrRemove">
                                <span>Remove from cart</span>
                            </div>
                            : <div onClick={() => productPageFunctions.addToCart(authSlice, userId, productId, setInCart)} className="ProductPageAddToCartOrRemove">
                                <span>Add To Cart</span>
                            </div>
                }
            </div>
        </div>
    );
}

export default ProductPage;
