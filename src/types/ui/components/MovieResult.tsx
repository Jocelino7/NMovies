import { Image, Pressable, StyleSheet, View } from "react-native"
import Rating from "./Rating"
import { Title } from "./Title"
import { Movie } from "../../../models/model"
import { imageUrl } from "../../../constants/contants"

const MovieResult = ( {movie,onPress}:{movie:Movie,onPress:Function})=> {
    return(
        <Pressable style={style.mainContainer} onPress={()=>onPress()}>
            <Image style={style.image}  source = {{uri:imageUrl+movie.backdrop_path}}/>
            <View style={style.container}>
                <Title text={movie.title}/>
                <Rating average={parseInt(movie.vote_average)}/>
            </View>
        </Pressable>
    )
}
const style = StyleSheet.create({
    mainContainer:{
        width:"100%",
        flexDirection:"row",
        paddingHorizontal:10,
        marginVertical:10
    },
    image:{
        flex:1,
        height:200,
        borderRadius:10
    },
    container:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    }
    
})
export default MovieResult