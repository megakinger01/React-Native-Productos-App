import React, { useContext, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsProvider';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route, navigation }: Props) => {

    const {loadProductById , updateProducts , addProducts } = useContext(ProductsContext)

    const { name = '', id='' } = route.params
    const {categories , isLoading} = useCategories()
    
    
    const { _id ,categoriaId ,nombre ,img ,form ,onChange, setformValue  } =useForm({
 
        _id:id,
        categoriaId:'',
        nombre:name,
        img:''
    })

    useEffect(() => {
        navigation.setOptions({
            title: (nombre) ? nombre : 'Sin nombre del  Producto'
        })
    }, [nombre])

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = async() => {

        if (id.length === 0) return;
        const product = await loadProductById(id)
        setformValue({
            _id:id,
            categoriaId:product.categoria._id,
            img: product.img || '',
            nombre
        })
    }



    const saveOrUpdate = async() => {
        if (id.length >  0) {
            updateProducts(categoriaId, nombre , id)
            
        } else {
            // const tempCategoriesId = categoriaId || categories[0]._id ; 
         
            const tempCategoriaId = categoriaId || categories[0]._id;
            const newProduct = await addProducts(tempCategoriaId, nombre );
            onChange( newProduct._id, '_id' );
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Nombre del Producto</Text>
            <TextInput
                style={styles.textinput}
                value={ nombre }
                onChangeText={ (value)=>{ onChange(value, 'nombre')} }
            />

            <Text style={styles.label}>Categorías</Text>

            <Picker
                selectedValue={categoriaId}
                onValueChange={ (value) => onChange(value , 'categoriaId') }>

                {
                    categories?.map( c => (

                        <Picker.Item 
                            label={c.nombre} 
                            value={c._id}
                            key={c._id} 
                        />
                    ))
                }
              
            </Picker>



            <Button
                onPress={saveOrUpdate}
                title="Guardar"
                color="#5856D6"
            />

            {
                (_id.length > 0) &&

                (

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:20 }}>
                        <Button
                            onPress={() => { }}
                            title="Cámara"
                            color="#5856D6"
                        />
                        <View style={{width:10}}/>
                        <Button
                            onPress={() => { }}
                            title="Galería"
                            color="#5856D6"
                        />
                    </View>
                )
            }

            {
                img.length > 0 && (
                    <Image
                        source={{ uri: img }}
                        style={{
                            width: '100%',
                            height:300,
                            marginTop:20

                        }}
                    />
                )
            }

          

        </ScrollView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 15
    },

    label: {
        fontSize: 20,
        marginBottom:10
    },
    textinput: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 30,
        height: 45,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 7,
        marginBottom: 10
    }
});