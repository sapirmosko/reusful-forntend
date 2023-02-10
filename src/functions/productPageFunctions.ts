import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiService } from "../service/ApiService";
import Geocode from "react-geocode";

class ProductPageFunctions {
    ToastError() {
        return toast.error("Login or register", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    ToastError404() {
        return toast.error("Error", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    ToastSuccess() {
        return toast.success("Added", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    ToastRemoved() {
        return toast.info("Removed from cart", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    ToastDeletedProduct() {
        return toast.info("Product deleted", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }

    async addToCart(authSlice: number, userId: number, productId: number, setInCart: any) {
        if (authSlice === null) {
            this.ToastError()
        } else {
            const res = await apiService.addToCart(userId, productId)
            setInCart(true)
            this.ToastSuccess()
        }

    }

    

    async removeFromCart(userId: number, productId: number, setInCart: any) {
        try {
            await apiService.deleteFromCart(userId, productId);
            this.ToastRemoved()
            setInCart(false)
        } catch (e) {
            this.ToastError404()
        }
    }


    async checkIfProductInCart(userId: number, productId: number, setInCart: any) {
        const response: any = await apiService.checkIfProductInUserCart(userId, productId);
        if (Array.isArray(response) && response.length === 0) {
            setInCart(false)
        } else {
            setInCart(true);
        }
    }

    getlanAndLat(address: any,setLat:any,setLng:any) {
        Geocode.setApiKey("");
        Geocode.setLanguage("en");
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat)
                setLng(lng)
            },
            (error) => {
                console.error(error);
            }
        );
    }
}

export const productPageFunctions = new ProductPageFunctions();