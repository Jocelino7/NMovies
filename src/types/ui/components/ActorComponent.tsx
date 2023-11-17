import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { color } from "../color"
import { actor } from "../../../models/model"
import { imageUrl } from "../../../constants/contants"

const ActorComponent = ({ actor,style={} }: { actor:actor,style?:StyleProp<ViewStyle> }) => {
    const composeStyle = [actorStyle.mainContainer,style]
    
    return (
        <View style={composeStyle}>
            <Image style={actorStyle.img} source={{ uri: imageUrl+actor.profile_path }} width={100} height={100} />
            <Text style={actorStyle.text}>
                    {actor.name}
                </Text>
        </View>
    )
            

}
const actorStyle = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        gap:5,
        maxHeight: 250,
        width:100,
        alignItems:"center",
        justifyContent:"center"
    },
    text: {
        fontWeight: "900",
        color: color.secondary
    },
    img:{
        borderRadius:15,
    }
})
export {ActorComponent}