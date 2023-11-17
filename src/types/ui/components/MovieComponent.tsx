import { Image, Text, View, StyleSheet, StyleProp, ViewStyle, Pressable, ActivityIndicator } from "react-native";
import { Movie } from "../../../models/model";
import { color } from "../color";
import Icon from "react-native-vector-icons/MaterialIcons"
import { imageUrl } from "../../../constants/contants";


const MovieComponentPrimary = ({ movie, style = {},onPress }: { movie: Movie, style?: StyleProp<ViewStyle>,onPress:Function }) => {
    const composedStyle = [movieStyle.mainContainer, style]
    return (
        <Pressable style={composedStyle} onPress={()=>onPress(onPress)}>
            <Image style={movieStyle.image} source={{ uri: imageUrl + movie.poster_path }} width={200} height={200} resizeMode="cover"/>
            <View style={movieStyle.row}>
                <View style={movieStyle.averageRow}>
                    <Icon size={30} name="star" color={color.starIcon} />
                    <Text style={movieStyle.text}>
                        {movie.vote_average}
                    </Text>
                </View>
                <Text style={movieStyle.text}>
                    {movie.title}
                </Text>

            </View>
        </Pressable>
    )

}
const movieStyle = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        maxHeight: 300,
        maxWidth: 200,
        padding: 3
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    averageRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 3,
        width: "100%"
    },
    text: {
        fontWeight: "900",
        color: color.secondary
    },
    image: {
        width: 200,
        borderRadius: 10,

    }
})
export { MovieComponentPrimary }