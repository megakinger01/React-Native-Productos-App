import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { ProductsContext } from '../context/ProductsProvider';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';


interface Props extends StackScreenProps<ProductsStackParams , 'ProductsScreen'>{}


export const ProductsScreen = ({navigation}:Props) => {

    const { products, loadProducts } = useContext(ProductsContext)
    const [ isRefreshing, setIsRefreshing ] = useState( false );

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => ( 
                <TouchableOpacity
                    style={{marginRight:20}}
                    onPress={ ()=>navigation.navigate('ProductScreen', {}) }
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
            )
        })    
    }, [])

    
    const loadProductsFromBackend = async() => {
        setIsRefreshing(true);
        await loadProducts();
        setIsRefreshing(false);
    } 


    return (
        <View style={{flex:1, marginHorizontal:10}}>
            <FlatList 
                data={products}
                keyExtractor={(p)=> p._id }
                renderItem={ ({item}) => (
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('ProductScreen', {
                            id: item._id,
                            name:item.nombre
                        })}
                    >
                        <Text style={styles.textItem}>
                            {item.nombre}
                        </Text>
                    </TouchableOpacity>
                )}

                ItemSeparatorComponent={ () => ( <View style={styles.itemSeparator} /> ) }

                
                refreshControl={
                    <RefreshControl 
                        refreshing={ isRefreshing }
                        onRefresh={ loadProductsFromBackend }
                    />
                }
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    
    textItem:{
        fontSize:25
    },
    itemSeparator:{
        borderBottomWidth:2,
        borderBottomColor:'rgba(0,0,0,0.3)'
    }
});
