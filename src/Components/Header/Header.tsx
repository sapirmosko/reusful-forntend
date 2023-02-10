import { NavLink } from "react-router-dom";
import "./Header.css";
import logoBlue from '../../images/logoBlue.png'
import { useSelector } from "react-redux";
import ProfileComponent from "./ProfileComponent/ProfileComponent";

function Header(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);

    return (
        <div className="Header">
            <div className="HeaderHeadline">
                <NavLink to={'/'}>
                    <img src={logoBlue} alt="" />
                </NavLink>
            </div>
            <div className="HeaderLogged">
                {authSlice === null ?
                    <>
                        <NavLink to={'/login'}>Login</NavLink>
                        <NavLink to={'/register'}>Register</NavLink>
                    </>
                    : <>
                        <ProfileComponent />
                    </>}
            </div>
        </div>
    );
}

export default Header;
