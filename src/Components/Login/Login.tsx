import "./Login.css";
import { useForm } from "react-hook-form";
import { UserInterface } from "../../model/UserModel";
import { apiService } from "../../service/ApiService";
import { useDispatch } from "react-redux";
import { login } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";
import market from '../../images/market.png'
import { loginFunctions } from "../../functions/LoginFunctions";

function Login(): JSX.Element {
    const { register, handleSubmit } = useForm<UserInterface>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function LoginForm(user:UserInterface){
        const res = await apiService.login(user);        
        if(res?.status===200){
            dispatch(login(res.data));
            loginFunctions.ToastLogin()
            navigate('/')
        } else{
            loginFunctions.ToastLoginError()
        }
    }

    return (
        <div className="Register">
            <div className="RegisterForm">
                <form onSubmit={handleSubmit(LoginForm)} action="">
                    <label htmlFor="">Username: </label>
                    <input type="text" {...register('username')}/>
                    <label htmlFor="">Password: </label>
                    <input type="password" {...register('password')}/>
                    <button>Login</button>
                </form>
            </div>
            <div className="RegisterSecondary">
                <img src={market} alt="" />
            </div>

        </div>
    );
}

export default Login;
