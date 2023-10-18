import React from "react"
import { ImageBackground } from "react-native/types"

function WelcomeScreen(props)
    return(
        <ImageBackground source={require("../assets/squirtle.png")}></ImageBackground>
    )


    const styles = StyleSheet.create({
        container: {
            flex: 1 ,
            backgroundColor: '#0487e2',
            alignItems: 'center',
            justifyContent: 'center',
          },
    })