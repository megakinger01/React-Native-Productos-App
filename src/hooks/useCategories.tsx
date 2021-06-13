import { useEffect, useState } from "react"
import apiCafe from "../api/cafeApi"
import { Categoria, CategoriesResponse } from '../interface/interface';


export const useCategories = () => {
 
    const [ isLoading, setIsLoading ] = useState( true )
    const [ categories, setCategories ] = useState<Categoria[]>([]);
    
    useEffect(() => {
        getCategories();
    }, [])


    const getCategories = async() => {
        const resp = await apiCafe.get<CategoriesResponse>('/categorias');
        setCategories( resp.data.categorias );
        setIsLoading(false);
    }


    return {
        isLoading,
        categories
    }
}
