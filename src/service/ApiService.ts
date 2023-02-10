import axios from "axios";
import { MessagesInterface } from "../model/MessagesModel";
import { ProductInterface } from "../model/productModel";
import { UserInterface } from "../model/UserModel";
import { BASE_URL } from "./config";

class ApiService {

    // users

    async register(user: UserInterface) {
        try {
            const res = await axios.post(`${BASE_URL}/users/register`, user);
            return res
        } catch (e) {
            console.log(e);
        }
    }

    async login(user: UserInterface) {
        try {
            const res = await axios.post(`${BASE_URL}/users/login`, user);
            return res
        } catch (e) {
            console.log(e);
        }
    }

    async getUserById(id: number) {
        try {
            const res = await axios.get(`${BASE_URL}/users/${id}`);
            return res.data[0]
        } catch (e) {
            console.log(e);
        }
    }

    async addImageUser(file: any, id: number) {
        try {
            const res = await axios.post(`${BASE_URL}/users/addimage/${id}`, file);
            return res
        } catch (e) {
            console.log(e);
        }
    }

    // categories

    async getAllCategories() {
        try {
            const res = await axios.get(`${BASE_URL}/categories`);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    // products 

    async getProductsByCategorieId(id: number) {
        try {
            const res = await axios.get(`${BASE_URL}/products/${id}`);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async AddProduct(product: FormData) {
        try {
            const res = await axios.post(`${BASE_URL}/products/add`, product);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async getProduct(id: number) {
        try {
            const res = await axios.get(`${BASE_URL}/products/single/${id}`);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async getProductsByUserId(id: number) {
        try {
            const res = await axios.get(`${BASE_URL}/products/userid/${id}`);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async deleteProductById(product: ProductInterface | undefined, id: number) {
        try {
            const res = await axios.post(`${BASE_URL}/products/delete/${id}`, product);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async addProductImages(formData: FormData, productId: number) {
        try {
            const res = await axios.post(`${BASE_URL}/products/images/${productId}`, formData);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async getProductImages(id: number) {
        try {
            const res = await axios.post(`${BASE_URL}/products/getimages/${id}`);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async editProduct(product: FormData, id: number) {
        try {
            const res = await axios.post(`${BASE_URL}/products/edit/${id}`, product);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    // cart

    async addToCart(userId: number, productId: number) {
        const data: any = {
            userId: userId,
            productId: productId
        }
        try {
            const res = await axios.post(`${BASE_URL}/cart/add`, data);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async showCartProducts(userId: number) {
        try {
            const res = await axios.get(`${BASE_URL}/cart/show/${userId}`);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async deleteFromCart(userId: number, productId: number) {
        const data: any = {
            userId: userId,
            productId: productId
        }
        try {
            const res = await axios.post(`${BASE_URL}/cart/delete`, data);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async checkIfProductInUserCart(userId: number, productId: number) {
        const data: any = {
            userId: userId,
            productId: productId
        }
        try {
            const res = await axios.post(`${BASE_URL}/cart/check`, data);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    // messages

    async sendMessage(message: MessagesInterface) {
        try {
            const res = await axios.post(`${BASE_URL}/messages/send`, message);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async getMessages(myId: number, otherUserId: any) {
        const ids = {
            myId,
            otherUserId
        }
        try {
            const res = await axios.get(`${BASE_URL}/messages/sent/${myId}/${otherUserId}`);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async addTrueToSeenMessages(chatId: number) {
        try {
            const res = await axios.post(`${BASE_URL}/messages/seen/${chatId}`);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    // chat

    async getChatById(id: number) {
        try {
            const res = await axios.get(`${BASE_URL}/getchat/${id}`);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }
}


export const apiService = new ApiService();