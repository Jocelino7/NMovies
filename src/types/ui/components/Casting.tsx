import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { color } from "../color"
import { Casting } from "../../../models/model"
import { imageUrl } from "../../../constants/contants"

const CastingComponent = ({ casting, style = {} }: { casting: Casting, style?: StyleProp<ViewStyle> }) => {
    const composeStyle = [actorStyle.mainContainer, style]

    return (
        <View style={composeStyle}>
            <Image style={actorStyle.img} source={{ uri: imageUrl + casting.profile_path }} width={100} height={100} />
            <Text style={actorStyle.text}>
                {casting.name}
            </Text>
            <Text style={actorStyle.text}>
                {casting.character}
            </Text>

        </View>
    )


}
const actorStyle = StyleSheet.create({
    mainContainer: {
        paddingVertical:15,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        maxHeight: 270,
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontWeight: "900",
        color: color.secondary
    },
    img: {
        borderRadius: 15,
        width:"100%",
    }
})
export { CastingComponent }