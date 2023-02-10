import { toast } from "react-toastify";

class LoginFunctions{

    ToastLogin(){
        toast.success('Logged in',{
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })
    }

    ToastLoginError(){
        toast.error('Username or password incorrect',{
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })
    }
}

export const loginFunctions = new LoginFunctions();