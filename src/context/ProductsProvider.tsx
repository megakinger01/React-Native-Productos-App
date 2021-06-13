import React, { createContext, useEffect, useState } from 'react';
import apiCafe from '../api/cafeApi';
import { Producto, ProductsResponse } from '../interface/interface';



type ProductsContextsProps = {
    products: Producto[]
    loadProducts: () => Promise<void>;
    addProducts: (categoryId: string, productsName: string) => Promise<Producto>;
    updateProducts: (categoryId: string, productsName: string, productId: string) => Promise<void>;
    deleteProducts: (id: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    upLoadImage: (data: any, id: string) => Promise<void>;

}

export const ProductsContext = createContext({} as ProductsContextsProps)


export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([])

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        const resp = await apiCafe.get<ProductsResponse>('/productos?limite=50')
        setProducts([ ...resp.data.productos])    
    }


    const addProducts = async( categoryId: string, productName: string ): Promise<Producto> => {
        
        const resp = await apiCafe.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId
        });
        setProducts([ ...products, resp.data ]);
        
        return resp.data;
    }
    

    const updateProducts = async( categoryId: string, productName: string, productId: string ) =>{
        const resp = await apiCafe.put<Producto>(`/productos/${ productId }`, {
            nombre: productName,
            categoria: categoryId
        });
        setProducts( products.map( prod => {
            return (prod._id === productId )
                    ? resp.data
                    : prod;
        }) );
    }


    const deleteProducts = async () => {

    }

    
    const loadProductById = async ( id:string ): Promise<Producto> => {
        const resp = await apiCafe.get<Producto>(`/productos/${id}`)
        return resp.data
    }
    const upLoadImage = async () => {

    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProducts,
            updateProducts,
            deleteProducts,
            loadProductById,
            upLoadImage,


        }}>
            {children}
        </ProductsContext.Provider>
    )
}