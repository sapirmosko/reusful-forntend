import { ProductInterface } from "../model/productModel";
import { apiService } from "../service/ApiService";

class CategoriePageFunctions {

    async getProductsFromDb(setProducts: any, params: any) {
        return apiService.getProductsByCategorieId(Number(params.id)).then((res) => {
            setProducts(res)
        });
    }


    async filterProductsByPrice(e: any, params: any, setProducts: any) {
        const value = Number(e.target.value);
        const allProducts = await apiService.getProductsByCategorieId(Number(params.id))
        if (value === 0) {
            this.getProductsFromDb(setProducts, params);
            return;
        }

        const filteredArr = allProducts.filter((p: ProductInterface) => {
            if (p.productPrice >= value) {
                return p
            }
        });
        setProducts(filteredArr)
    }

    async searchForProduct(e: any,params:any,products:any,setProducts:any) {
        const value = e.target.value;        
        if (value === '') {
            apiService.getProductsByCategorieId(Number(params.id)).then((res) => setProducts(res))
        }
        const newProducts = products?.filter((p: ProductInterface) => {
            return p.productName.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        })
        setProducts(newProducts)
    }
}

export const categoriePageFunctions = new CategoriePageFunctions();