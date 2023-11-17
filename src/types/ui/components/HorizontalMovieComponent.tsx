import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { Movie } from "../../../models/model";
import { color } from "../color";
import { imageUrl } from "../../../constants/contants";


const HorizontalMovie =({
    movie,
    onPress

}:{movie:Movie,onPress:Function})=> {
    return(
        <Pressable style={style.mainContainer} onPress={()=>onPress(onPress)}>
            <Image source={{uri:imageUrl+movie.poster_path}} width={150} height={250} resizeMode="cover" />
            <View style={style.column}>
                <Text style={style.text}>
                    {movie.title}
                </Text>
                //stars
            </View>
        </Pressable>
    )

}
const style = StyleSheet.create({
    mainContainer:{
        display:"flex",
        flexDirection:"row",
        gap:5,
        width:"100%",
        padding:3
    },
    column:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        gap:10
    },
    averageRow:{
        display:"flex",
        gap:3
    },
    text:{
        fontWeight:"900",
        color:color.secondary,
        fontSize:15
    }
})
export {HorizontalMovie}