import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

    const {logout, user , token} = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                ProtectedScreen
            </Text>
            <Button 
                color="#5856D6"
                title="logout"
                onPress={ logout }
            />

            <Text>
                { JSON.stringify(user , null, 5)}
            </Text>

            <Text>
                { token }
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',   
    },
    text:{
        marginBottom:20
    }
});