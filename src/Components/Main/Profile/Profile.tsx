import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ProductInterface } from "../../../model/productModel";
import { UserInterface } from "../../../model/UserModel";
import { apiService } from "../../../service/ApiService";
import Product from "../CategoriePage/Products/Product";
import "./Profile.css";
import { useForm } from "react-hook-form";
import { profileFunctions } from "../../../functions/ProfileFunctions";

function Profile(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [isCart, setIsCart] = useState<boolean>(true);
    const [user, setUser] = useState<UserInterface>();
    const [userImage, setUserImage] = useState('');
    const { handleSubmit } = useForm();
    const id = authSlice.sub

    useEffect(() => {
        apiService.getUserById(id).then((res: any) => setUser(res))
        apiService.getProductsByUserId(id).then((res) => setProducts(res))
    }, []);

    async function getFile() {
        const formData = new FormData();
        formData.append('userImage', userImage)
        await apiService.addImageUser(formData, id)
    }

    return (
        <div className="Profile">
            <div className="ProfileMain">
                <div className="ProfileMainPersonalDetailsDiv">
                    <div className="ProfileMainPersonalDetailsImage">
                        {
                            user?.userImage == undefined ?
                                <form onSubmit={handleSubmit(getFile)} action="">

                                    <input name="userImage" type="file" onChange={(e: any) => setUserImage(e.target.files[0])} />
                                    <button>Add</button>
                                </form>
                                :
                                <img src={`https://reusfulimages.s3.amazonaws.com/${user?.userImage}`} alt="" />
                        }
                    </div>
                    <div className="ProfileMainPersonalDetails">
                        <p><b>Name: </b>  <br /> {user?.firstName} {user?.lastName}</p>
                        <p><b>Username: </b>  <br /> {user?.username}</p>
                        <p><b>Email: </b>  <br /> {user?.email}</p>
                        <p><b>Country: </b>  <br /> {user?.country}</p>
                        <p><b>City: </b>  <br /> {user?.city}</p>
                    </div>
                </div>
                <div className="ProfileAddNewProduct">
                    <NavLink to={'/addproduct'}>Add Product</NavLink>
                </div>
            </div>
            <div className="ProfileProductsChoose">
            <button onClick={() => profileFunctions.getCartProducts(isCart, setIsCart, id, setProducts)}>{isCart ? 'Click to show Cart' : 'Click to show own listed products'}</button>
                <div className="ProfileProducts">
                    {
                        products.map((p: ProductInterface) => <Product key={p.id} product={p} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;
