import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import { Controller } from "react-hook-form";
import { useFonts } from 'expo-font';

const CustomInput = ({control, name, rules = {}, placeholder, secureTextEntry}) => {
    const [fontsLoaded] = useFonts (
        {
             "Poppins-Header": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
             "Poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf")
    }
      );
  
      if (!fontsLoaded) {
          return undefined
      }
    return (
        <Controller
            control={control}
            name = {name}
            rules={rules}
            render = {({field: {value, onChange, onBlur}, fieldState:{error}}) =>  (  
            <>
            <View style={[styles.container, {borderColor: error ? 'red' : "white"}]}>
            <TextInput 
                value={value} 
                onChangeText={onChange}
                onBlur={onBlur} 
                placeholder={placeholder}
                style = {styles.input}
                secureTextEntry={secureTextEntry}
                 />
                 </View>
                 {error && (
                    <Text style={{color:"#F25987", fontFamily:"Poppins"}}>{error.message}</Text>
                 )}
                 </>
                 )}
            />
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        padding: 20,
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 2,
        paddingHorizontal: 10,
        marginVertical: 5,

        shadowColor: "black",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,

    },

    input: {
        fontFamily: "Poppins",
        color: "#4B2209",
    }
})
export default CustomInput;