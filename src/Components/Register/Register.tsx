import "./Register.css";
import { useForm } from "react-hook-form";
import { UserInterface } from "../../model/UserModel";
import { apiService } from "../../service/ApiService";
import { useDispatch } from "react-redux";
import { login } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";
import log from '../../images/market.png'

function Register(): JSX.Element {
    const { register, handleSubmit } = useForm<UserInterface>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function registerForm(user:UserInterface){
        const res = await apiService.register(user);
        if(res?.status===200){
            dispatch(login(res.data));
            navigate('/')
        } else{
            alert('problem')
        }
    }

    return (
        <div className="Register">
            <div className="RegisterForm">
                <form onSubmit={handleSubmit(registerForm)} action="">
                    <label htmlFor="">First Name:</label>
                    <input type="text" {...register('firstName')}/>
                    <label htmlFor="">Last Name: </label>
                    <input type="text" {...register('lastName')}/>
                    <label htmlFor="">Username: </label>
                    <input type="text" {...register('username')}/>
                    <label htmlFor="">Email: </label>
                    <input type="email" {...register('email')}/>
                    <label htmlFor="">Country: </label>
                    <input type="text" {...register('country')}/>
                    <label htmlFor="">City: </label>
                    <input type="text" {...register('city')}/>
                    <label htmlFor="">Street Address: </label>
                    <input type="text" {...register('streetAddress')}/>
                    <label htmlFor="">Password: </label>
                    <input type="password" {...register('password')}/>
                    <button>Register</button>
                </form>
            </div>
            <div className="RegisterSecondary">
                    <img src={log} alt="" />
            </div>

        </div>
    );
}

export default Register;
