import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/theme';

import { WhiteLogoReact } from '../components/WhiteLogoReact';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';


interface Props extends StackScreenProps< any , any >{}

export const RegisterScreen = ({navigation}:Props) => {

    const {signIn, errorMessage, removeError} = useContext(AuthContext)

    
    const { email, password, name, onChange } = useForm({
        name:'',
        email: '',
        password: ''
    })


    useEffect(() => {
        if (errorMessage.length === 0 ) return;

            Alert.alert('Error al Regsitrar', errorMessage, 
                [{ text:'ok' , onPress:removeError}] ) 
            
        
    }, [errorMessage])


    const onRegister = () => {
        signIn({password ,nombre:name, correo:email})
       
        Keyboard.dismiss()

    }
    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor:'#5856D6' }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >

                <View style={loginStyles.containerForm}>

                    {/*LOGO DE REACT */}
                    <WhiteLogoReact />


                    {/* INPUTS */}
                    <Text style={loginStyles.title}>Registro</Text>


                    <Text style={loginStyles.label}>Nombre</Text>
                    <TextInput
                        placeholder="Ingrese su nombre"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        keyboardType="email-address"
                        style={loginStyles.textInputField}

                        onChangeText={(value) => onChange(value, 'name')}
                        onSubmitEditing={onRegister}
                        value={name}

                        autoCapitalize='words'

                    />

                    <Text style={loginStyles.label}>Email</Text>
                    <TextInput
                        placeholder="Ingrese su email"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        keyboardType="email-address"
                        style={loginStyles.textInputField}

                        onChangeText={(value) => onChange(value, 'email')}
                        onSubmitEditing={onRegister}
                        value={email}
                        autoCapitalize='none'

                    />

                    <Text style={loginStyles.label}>Contraseña</Text>
                    <TextInput
                        placeholder="*******"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        secureTextEntry
                        style={loginStyles.textInputField}

                        onChangeText={(value) => onChange(value, 'password')}
                        onSubmitEditing={onRegister}
                        value={password}

                    />

                    {/* BOTONES DE LOGIN Y CREAR REGISTRO */}

                    <View style={loginStyles.btnContainer}>
                        <TouchableOpacity
                            onPress={onRegister}
                            style={{...loginStyles.btn, width:120}}

                        >
                            <Text style={loginStyles.btnText}>Crear Cuenta</Text>

                        </TouchableOpacity>
                    </View>

                    <View style={loginStyles.btnBackRegister}>
                        <TouchableOpacity
                            onPress={() => navigation.replace('LoginScreen')}

                        >
                            <Text style={loginStyles.btnText}>← ir a Login</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
