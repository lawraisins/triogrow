import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Home from "../screens/Home"
import FAQ from "../screens/FAQ"
import Profile from "../screens/Profile"
import Post from "../screens/Post"
import SearchUsers from "../screens/SearchUsers";
import { useFonts } from 'expo-font';
const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
    style={{
        justifyContent: "center",
        alignItems: "center",
    }}
    onPress = {onPress}
    >
        <View style={{
            width:40,
            height:40,
            borderRadius: 35,
            backgroundColor: "#F25987",
            marginHorizontal: 20,
        }}>
            {children}
        </View>
    </TouchableOpacity>
)
const Tabs = () => {
    const [fontsLoaded] = useFonts (
        {
             "Poppins-Header": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
             "Poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
             "Arial-Rounded": require("../assets/fonts/Poppins/Arial-Rounded.ttf")
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
                tabBarStyle: {
                    position: "absolute",
                    elevation: 0,
                    // alignContent: "center",
                    alignItems: "center",
                    height: 70,
                    ...styles.shadow,
                    backgroundColor: '#FAF4E6',
                    justifyContent:"space-around"
                    

                }
            }}>
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Image source={require("../assets/images/home.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? "black" : '#FAF4E6',
                                    }}/>
                            {/* <Text style={styles.text}>HOME</Text> */}
                        </View>
                    
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )

                }} />
        <Tab.Screen 
                name="Search"
                component={SearchUsers}
                options={{headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Image source={require("../assets/images/search.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? "black" :'#FAF4E6',
                                    }}/>
                        
                            {/* <Text style={styles.text}>SEARCH</Text> */}
                        </View>
                    
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )

                }} />
            <Tab.Screen name="Post" component={Post} 
                            options={{headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <Image source={require("../assets/images/plus.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? "black" :'#FAF4E6',
                                    }}></Image>
                                ),
                                tabBarButton: (props) => (
                                    <CustomTabBarButton {...props} />
                                )
                            }}></Tab.Screen>
            <Tab.Screen name="Learn" component={FAQ} 
                            options={{headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        <Image source={require("../assets/images/brainstorm.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor: focused ? "black" :'#FAF4E6',
                                                }}/>
                                        {/* <Text style={styles.text}>LEARN</Text> */}
                                    </View>
                                
                                ),
                                tabBarButton: (props) => (
                                    <CustomTabBarButton {...props} />
                                )
                            }}/>
            <Tab.Screen name="Profile" component={Profile}
                            options={{headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        <Image source={require("../assets/images/user.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor: focused ? "black" :'#FAF4E6',
                                                }}/>
                                        {/* <Text style={styles.text}>PROFILE</Text> */}
                                    </View>
                                
                                ),
                                tabBarButton: (props) => (
                                    <CustomTabBarButton {...props} />
                                )
                            }}/>
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 10,   
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,

    },

    text: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: 10,
    },
})

export default Tabs