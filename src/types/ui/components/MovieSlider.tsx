import { Image, Text, StyleSheet, StyleProp, ViewStyle, Dimensions, Pressable } from "react-native";
import { Movie } from "../../../models/model";
import { color } from "../color";
import { imageUrl } from "../../../constants/contants";

 const MovieComponent = ({movie,style={}, onPress}: {movie:Movie,style?:StyleProp<ViewStyle>, onPress:Function}) => {
    const composedStyle = [movieStyle.mainContainer,style]
    return (
        <Pressable style={composedStyle} onPress={()=>onPress()}>
            <Image style={movieStyle.Image} source={{uri:imageUrl+movie.poster_path}} resizeMode="cover" />
            <Text style={movieStyle.title}>
                {movie.title}
            </Text>

        </Pressable>
    )

}
const {width} = Dimensions.get("window")
const movieStyle = StyleSheet.create({
    mainContainer: {
        borderRadius: 10,
        position: "relative",
        minWidth:width,
        maxHeight: 300,
        
    },
    Image: {
        borderRadius: 10,
        width: "100%",
        height: "100%"
    },
    title: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        borderBottomEndRadius:10,
        borderBottomLeftRadius:10,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding:10,
        color:color.secondary
    }
})
export {MovieComponent}