
import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';

import { useForm } from '../hooks/useForm';

import { Background } from '../components/Background'
import { WhiteLogoReact } from '../components/WhiteLogoReact'
import { loginStyles } from '../theme/theme';
import { AuthContext } from '../context/AuthContext';


interface Props extends StackScreenProps<any , any>{}

export const LoginScreen = ({navigation}:Props) => {

    const {signUp , errorMessage, removeError } = useContext(AuthContext)
    // console.log('linea', errorMessage);
    
    

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (errorMessage.length !== 0 ) {

             Alert.alert('Incorrecto', errorMessage, [{ text:'ok' , onPress:removeError}] ) 
        }    
        
    }, [errorMessage])


    const onLogin = () => {
        // console.log({ email, password });
        Keyboard.dismiss()

        signUp({correo:email , password })
    }
    return (
        <>
            {/* BACKGROUND FONDO DEL DISEÑO */}
            <Background />

            <KeyboardAvoidingView
                style={{flex:1}}
                behavior={(Platform.OS === 'ios')? 'padding': 'height'}
            >

                <View style={loginStyles.containerForm}>

                    {/*LOGO DE REACT */}
                    <WhiteLogoReact />


                    {/* INPUTS */}
                    <Text style={loginStyles.title}>Login</Text>
                    <Text style={loginStyles.label}>Email</Text>
                    <TextInput
                        placeholder="Ingrese su email"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        keyboardType="email-address"
                        style={loginStyles.textInputField}

                        onChangeText={(value) => onChange(value, 'email')}
                        onSubmitEditing={onLogin}
                        value={email}

                    />

                    <Text style={loginStyles.label}>Contraseña</Text>
                    <TextInput
                        placeholder="*******"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        secureTextEntry
                        style={loginStyles.textInputField}

                        onChangeText={(value) => onChange(value, 'password')}
                        onSubmitEditing={onLogin}
                        value={password}

                    />

                    {/* BOTONES DE LOGIN Y CREAR REGISTRO */}

                    <View style={loginStyles.btnContainer}>
                        <TouchableOpacity
                            onPress={onLogin}
                            style={loginStyles.btn}

                        >
                            <Text style={loginStyles.btnText}>LOGIN</Text>

                        </TouchableOpacity>
                    </View>

                    <View style={loginStyles.btnNewUserContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.replace('RegisterScreen') }

                        >
                            <Text style={loginStyles.btnText}>New Register</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </>
    )
}
