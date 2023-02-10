import { useEffect, useState } from "react";
import { CategoriesInterface } from "../../../model/CategorieInterface";
import { apiService } from "../../../service/ApiService";
import Categorie from "./Categorie/Categorie";
import "./Home.css";
import WelcomeComponent from "./WelcomeComponent/WelcomeComponent";

function Home(): JSX.Element {
    const [categories, setCategories] = useState<CategoriesInterface[]>([]);

    useEffect(() => {
        apiService.getAllCategories().then((cate: any) => setCategories(cate));
    }, []);

    return (
        <div className="Home">
            <div className="WelcomeComponentDiv">
                <WelcomeComponent />
            </div>

            <div className="CategoriesDiv">
                {
                    categories.map((cat: CategoriesInterface) => <Categorie key={cat.id} categorieName={cat} />)
                }
            </div>
        </div>
    );
}

export default Home;
