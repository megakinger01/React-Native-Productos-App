import { Usuario } from '../interface/interface';


export interface AuthState {

    status: 'checking' |'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: Usuario | null;

}



type AuthAction =       
    | { type:'signUp' ,  payload: {token:string , usuario:Usuario}}
    | { type:'addError' ,  payload: string }
    | { type:'removeError'}
    | { type:'notAuthenticated'}
    | { type:'logout' } 



export const authReducer = ( state:AuthState, action:AuthAction ):AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                status:'not-authenticated',
                token:null,
                errorMessage:action.payload,
                user:null
            }
            
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }

        case 'signUp':
            return {
                ...state,
                status:'authenticated',
                token: action.payload.token,
                user:action.payload.usuario,
                errorMessage:''
            }

        case 'logout':    
        case 'notAuthenticated':
            return {
                ...state,
                status:'not-authenticated',
                token:null,
                user:null
            }
            
    
        default:
            return state
    }
}