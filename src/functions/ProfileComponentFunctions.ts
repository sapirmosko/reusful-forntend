import { toast } from "react-toastify"

class ProfileComponentFunctions{
    ToastLogOut(){
        toast.info('Logged out',{
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })
    }
}

export const profileComponentFunctions = new ProfileComponentFunctions()