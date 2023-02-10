import { toast } from "react-toastify";

class ProductPageMessagesFunctions{
    ToastMessageSent() {
        return toast.success("Message Sent", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    ToastMessageEmptyString() {
        return toast.info("Write Message", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    ToastMessageError() {
        return toast.error("Error occured", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    
}

export const productPageMessagesFunctions = new ProductPageMessagesFunctions()