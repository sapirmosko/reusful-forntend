import { apiService } from "../service/ApiService";

class ProfileFunctions {
    async getCartProducts(isCart: any, setIsCart: any, id: number, setProducts: any) {
        if (!isCart) {
            await apiService.getProductsByUserId(id).then((res) => setProducts(res))
            setIsCart(!isCart);
        } else {
            await apiService.showCartProducts(id).then((res) => setProducts(res))
            setIsCart(!isCart);
        }
    }
    
}

export const profileFunctions = new ProfileFunctions();