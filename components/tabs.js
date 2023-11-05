import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Home from "../screens/Home"
import Learn from "../screens/Learn"
import FAQ from "../screens/FAQ"
import Profile from "../screens/Profile"
import { useFonts } from 'expo-font';
const Tab = createBottomTabNavigator();

const Tabs = () => {
    const [fontsLoaded] = useFonts (
        {
             "Poppins-Header": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
             "Poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf")
      }
      );
      
      if (!fontsLoaded) {
          return undefined
      }
    
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    display: "none"
                  },
                style: {
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    background: "blue",
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow

                }
            }}>
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: "center", justifyContent: "center", top: 10}}>
                            <Image source={require("../assets/images/home.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? "blue" : "black",
                                    }}/>
                            <Text style={styles.text}>HOME</Text>
                        </View>
                    
                    )

                }} />
            <Tab.Screen name="Learn" component={Learn} 
                            options={{headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <View style={{alignItems: "center", justifyContent: "center", top: 10}}>
                                        <Image source={require("../assets/images/brainstorm.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    tintColor: focused ? "blue" : "black",
                                                }}/>
                                        <Text style={styles.text}>LEARN</Text>
                                    </View>
                                
                                )
                            }}/>
            <Tab.Screen name="FAQ" component={FAQ} 
                            options={{headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <View style={{alignItems: "center", justifyContent: "center", top: 10}}>
                                        <Image source={require("../assets/images/question.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    tintColor: focused ? "blue" : "black",
                                                }}/>
                                        <Text style={styles.text}>FAQ</Text>
                                    </View>
                                
                                )
                            }}/>
            <Tab.Screen name="Profile" component={Profile}
                            options={{headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <View style={{alignItems: "center", justifyContent: "center", top: 10}}>
                                        <Image source={require("../assets/images/user.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    tintColor: focused ? "blue" : "black",
                                                }}/>
                                        <Text style={styles.text}>PROFILE</Text>
                                    </View>
                                
                                )
                            }}/>
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
            width: 0,
            height: 10,   
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,

    },

    text: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: 10,
    },
})

export default Tabs