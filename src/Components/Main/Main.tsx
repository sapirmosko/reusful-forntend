import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../../app/authSlice";
import Login from "../Login/Login";
import Register from "../Register/Register";
import CategoriePage from "./CategoriePage/CategoriePage";
import ProductPage from "./CategoriePage/Products/ProductPage/ProductPage";
import Home from "./Home/Home";
import Conversation from "./MessagesPage/Message/Conversation/Conversation";
import MessagesPage from "./MessagesPage/MessagesPage";
import AddProduct from "./Profile/AddProduct/AddProduct";
import Profile from "./Profile/Profile";
import "./Main.css";

function Main(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (authSlice === null) {
            dispatch(logout())
            navigate('/')
        }
    }, []);

    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/categorie/:id" element={<CategoriePage />}></Route>
                <Route path="/addproduct" element={<AddProduct />}></Route>
                <Route path="/productpage/:id" element={<ProductPage />}></Route>
                <Route path="/messages" element={<MessagesPage />}></Route>
                <Route path="/chat/:id" element={<Conversation />}></Route>
            </Routes>
        </div>
    );
}

export default Main;
