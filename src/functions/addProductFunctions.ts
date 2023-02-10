import { toast } from "react-toastify";
import { apiService } from "../service/ApiService";

class AddProductFunctions{
     async getAllCategories(setCategories:any) {
        const categories = await apiService.getAllCategories();
        setCategories(categories);
    }

    ToastAddedProduct() {
        return toast.success("Product Added", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    ToastAddedProblem() {
        return toast.error("Error", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }

    
}

export const addProductFunctions = new AddProductFunctions();