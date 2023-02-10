import { toast } from "react-toastify";

class EditProductFunctions{
    ToastEditedProduct() {
        return toast.success("Product Edited", {
            position: "top-right",
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
}

export const editProductFunctions = new EditProductFunctions()