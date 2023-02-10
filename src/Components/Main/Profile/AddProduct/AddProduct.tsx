import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductFunctions } from "../../../../functions/addProductFunctions";
import { CategoriesInterface } from "../../../../model/CategorieInterface";
import { ProductInterface } from "../../../../model/productModel";
import { apiService } from "../../../../service/ApiService";
import "./AddProduct.css";

function AddProduct(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth)
    const [categories, setCategories] = useState<[]>([]);
    const [selectedFile, setSelectedFile] = useState<any>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [productImage1, setProductImage1] = useState<any>();
    const [productImage2, setProductImage2] = useState<any>();
    const { register, handleSubmit } = useForm<ProductInterface>();
    const navigate = useNavigate();

    async function firstStep(Product: ProductInterface) {
        setIsSubmitting(true);
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
            formData.append('productImage', selectedFile)
            formData.append('categorieId', Product.categorieId.toString())
            formData.append('productDate', nowTime)

            const productSQLres = await apiService.AddProduct(formData);
            const productId = productSQLres.insertId

            const formDataFiles = new FormData();
            formDataFiles.append('productImage', productImage1)
            formDataFiles.append('productImage', productImage2)

            await apiService.addProductImages(formDataFiles, productId)
            addProductFunctions.ToastAddedProduct();
            navigate('/')
        } catch (e) {
            addProductFunctions.ToastAddedProblem()
            setIsSubmitting(false)
        }
    };

    useEffect(() => {
        addProductFunctions.getAllCategories(setCategories)
    }, [])

    return (
        <div className="AddProduct">
            <div className="AddProductForm">
                <form onSubmit={handleSubmit(firstStep)} action="">
                    <label htmlFor="">Product Name: </label>
                    <input required type="text" {...register('productName')} />
                    <label htmlFor="">Product Description: </label>
                    <textarea required id="" {...register('productDescription')}></textarea>
                    <label htmlFor="">Product Price: </label>
                    <input required type="number" {...register('productPrice')} />
                    <label htmlFor="">Product Status: </label>
                    <select required id="" {...register('productStatus')}>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                        <option value="Old">Old</option>
                    </select>
                    <label htmlFor="">Product main image: </label>
                    <input onChange={(e: any) => setSelectedFile(e.target.files[0])} required type="file" />
                    <label htmlFor="">Product Imagess: </label>
                    <input onChange={(e: any) => setProductImage1(e.target.files[0])} required type="file" />
                    <input onChange={(e: any) => setProductImage2(e.target.files[0])} required type="file" />
                    {/* <input onChange={(e: any) => setProductImage3(e.target.files[0])} type="file" />
                    <input onChange={(e: any) => setProductImage4(e.target.files[0])} type="file" />
                    <input onChange={(e: any) => setProductImage5(e.target.files[0])} type="file" /> */}
                    <label htmlFor="">Categorie: </label>
                    <select required id="" {...register('categorieId')}>
                        {categories.map((cate: CategoriesInterface) => (
                            <option key={cate.id} value={cate.id}>{cate.categorieName}</option>
                        ))}
                    </select>
                    {isSubmitting === false ?

                        <button>Add</button>
                        :
                        <div className="RollerDiv"> <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                    }
                </form>
            </div>
        </div>
    );
}

export default AddProduct;


// const [step, setStep] = useState<number>(0);
//     const [productImage1, setProductImage1] = useState<any>();
//     const [productImage2, setProductImage2] = useState<any>();
//     const [productImage3, setProductImage3] = useState<any>();
//     const [productImage4, setProductImage4] = useState<any>();
//     const [productImage5, setProductImage5] = useState<any>();
//     const [step1Data, setStep1Data] = useState<any>()

// async function secondStep(product: any) {



//     const formData = new FormData();
//     formData.append('productsImage', productImage1)
//     formData.append('productsImage', productImage2)
//     formData.append('productsImage', productImage3)
//     formData.append('productsImage', productImage4)
//     formData.append('productsImage', productImage5)

//     const step1DataVar = step1Data

//     await apiService.addProductImages(formData, step1DataVar)
// }




{/* <div className="AddProductForm">
<form action="" onSubmit={handleSubmit(secondStep)}>
    <label htmlFor="">Product images: </label>
    <input type="file" onChange={(e: any) => setProductImage1(e.target.files[0])} />
    <input type="file" onChange={(e: any) => setProductImage2(e.target.files[0])} />
    <input type="file" onChange={(e: any) => setProductImage3(e.target.files[0])} />
    <input type="file" onChange={(e: any) => setProductImage4(e.target.files[0])} />
    <input type="file" onChange={(e: any) => setProductImage5(e.target.files[0])} />



    {isSubmitting === false ?
        <div className="Step2Buttons">
            <button onClick={() => setStep(0)} type="button">Return</button>
            <button type="submit">Submit</button>
        </div>
        :
        <div className="RollerDiv"> <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    }
</form>

</div> */}