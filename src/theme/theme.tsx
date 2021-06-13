import { StyleSheet } from "react-native";









export const loginStyles = StyleSheet.create({

    containerForm:{
        flex:1,
        paddingHorizontal:20,
        justifyContent:"center" 
    },
    title:{
        fontSize:25,
        fontWeight:"bold",
        color:'white',
    },
    label:{
        marginTop:20,
        fontWeight:'bold',
        color:'white'
    },
    textInputField:{
        borderBottomColor:'white',
        borderBottomWidth:1,
        paddingBottom:0,
        color:'white'
    },
    btnContainer:{
        alignItems:"center",
        marginTop:20,
    },
    btn:{
        alignItems:"center",
        justifyContent:"center",
        borderWidth:2,
        borderColor:'white',
        borderRadius:20,
        width:80,
        height:30,      
    },
    btnText:{
        color:'white',
    },
    btnNewUserContainer:{
        alignItems:'flex-end',

    },
    btnBackRegister:{
        position:'absolute',
        top:20,
        left:20,
        borderWidth:1,
        padding:10,
        borderRadius:15,
        borderColor:'white'
    }


    
});