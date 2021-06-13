import React, { createContext, useEffect, useReducer } from "react"
import apiCafe from "../api/cafeApi";
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interface/interface';
import { authReducer, AuthState } from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (logindata: LoginData) => void;
    signIn: (registerData: RegisterData) => void;
    logout: () => void;
    removeError: () => void
}

const AuthInitialState: AuthState = {
    token: null,
    user: null,
    status: 'checking',
    errorMessage: ''
}


export const AuthContext = createContext({} as AuthContextProps)


export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AuthInitialState)

    useEffect(() => {
        checKedToken()
    }, [])


    const checKedToken = async()=> {
        const token = await AsyncStorage.getItem('token')
        
        // Si no hay token ↓
        if (!token) return dispatch({type:'notAuthenticated'})

        // si hay token ↓
         const resp = await apiCafe.get('/auth');
         if ( resp.status !== 200 ) {
             return dispatch({ type: 'notAuthenticated' });
         }
         
         await AsyncStorage.setItem('token', resp.data.token );
         dispatch({ 
             type: 'signUp',
             payload: {
                 token: resp.data.token,
                 usuario: resp.data.usuario
             }
         });
    }

    const signUp = async ({ correo, password }: LoginData) => {

        try {

            const { data } = await apiCafe.post<LoginResponse>('/auth/login', { correo, password })
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    usuario: data.usuario
                }
            })


            await AsyncStorage.setItem('token', data.token )


    
        } catch (error) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.msg  || 'Información incorrecta'
            })
        }
    };

 
    const signIn = async( {nombre, correo, password }:RegisterData) => {
      
        try {

            const { data } = await apiCafe.post<LoginResponse>('/usuarios', { correo, password, nombre })
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    usuario: data.usuario
                }
            })


            await AsyncStorage.setItem('token', data.token )


    
        } catch (error) {
            dispatch({ 
                type: 'addError', 
                payload:  error.response.data.errors[0].msg|| 'Información incorrecta'
            })
        }
     };

    const logout = async() => { 
        await AsyncStorage.removeItem('token')

        dispatch({
            type:'logout'
        })
    };


    const removeError = () => { 
        dispatch({
            type:'removeError'
        })
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logout,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )
}