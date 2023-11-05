import { useFonts } from 'expo-font';

const [fonts] = () => useFonts({
        Poppins_Header: require("../assets/fonts/Poppins/Poppins-Black.ttf"),
        Poppins: require("../assets/fonts/Poppins/Poppins.ttf")
    })

export default fonts
