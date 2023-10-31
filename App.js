import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from "./screens/SignInScreen"
import SignUpScreen from './screens/SignUpScreen';
import Navigation from './navigation';
import Tabs from './components/tabs';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <Navigation>
      <SignInScreen>
      </SignInScreen>
    </Navigation>


  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
