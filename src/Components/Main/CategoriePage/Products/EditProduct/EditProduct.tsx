import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { addProductFunctions } from "../../../../../functions/addProductFunctions";
import { CategoriesInterface } from "../../../../../model/CategorieInterface";
import { ProductInterface } from "../../../../../model/productModel";
import { apiService } from "../../../../../service/ApiService";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import "./EditProduct.css";
import { editProductFunctions } from "../../../../../functions/EditProductFunctions";

function EditProduct({ product, refreshProduct, setRefreshProduct }: { product: ProductInterface | undefined, refreshProduct: any, setRefreshProduct: any }): JSX.Element {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit } = useForm<ProductInterface>();
    const [categories, setCategories] = useState<[]>([]);
    const authSlice = useSelector((state: any) => state.auth)

    async function firstStep(Product: ProductInterface) {
        try {
            const date = new Date();
            const yyyy = date.getFullYear();
            const mm = ('0' + (date.getMonth() + 1)).slice(-2); // adding leading zero and slice last 2 digit
            const dd = ('0' + date.getDate()).slice(-2); // adding leading zero and slice last 2 digit
            const hh = ('0' + date.getHours()).slice(-2);
            const min = ('0' + date.getMinutes()).slice(-2);
            const sec = ('0' + date.getSeconds()).slice(-2);
            const nowTime: string = `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;

            const formData = new FormData();
            formData.append('userId', authSlice.sub)
            formData.append('productName', Product.productName)
            formData.append('productDescription', Product.productDescription)
            formData.append('productStatus', Product.productStatus)
            formData.append('productPrice', Product.productPrice.toString())
            formData.append('categorieId', Product.categorieId.toString())
            formData.append('productDate', nowTime)
            
            await apiService.editProduct(formData, product?.id ? product.id : 0)
            setRefreshProduct(!refreshProduct)
            editProductFunctions.ToastEditedProduct();
            setOpen(false)
        } catch (e) {
            setOpen(false)
            addProductFunctions.ToastAddedProblem()
        }
    };

    useEffect(() => {
        addProductFunctions.getAllCategories(setCategories)
    }, [])


    return (
        <div>
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="EditProduct">
                    <div className="EditProductForm">
                        <form onSubmit={handleSubmit(firstStep)} action="">
                            <label htmlFor="">Product Name: </label>
                            <input defaultValue={product?.productName} required type="text" {...register('productName')} />
                            <label htmlFor="">Product Description: </label>
                            <textarea defaultValue={product?.productDescription} required id="" {...register('productDescription')}></textarea>
                            <label htmlFor="">Product Price: </label>
                            <input defaultValue={product?.productPrice} required type="number" {...register('productPrice')} />
                            <label htmlFor="">Product Status: </label>
                            <select defaultValue={product?.productStatus} required id="" {...register('productStatus')}>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                                <option value="Old">Old</option>
                            </select>
        
                            <label htmlFor="">Categorie: </label>
                            <select defaultValue={product?.categorieId} required id="" {...register('categorieId')}>
                                {categories.map((cate: CategoriesInterface) => (
                                    <option key={cate.id} value={cate.id}>{cate.categorieName}</option>
                                ))}
                            </select>
                            <button>Update</button>
                        </form>
                    </div>
                </div >
            </Modal>
        </div>
    );
}

export default EditProduct;
