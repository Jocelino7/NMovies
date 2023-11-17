import { StyleSheet, Text, TouchableHighlight } from "react-native"
import { color } from "../color"

const Button = ({text,onPress}: {text:string,onPress:Function}) => {
    return (
        <TouchableHighlight style={style.button} onPress={()=>onPress()}>
            <Text style={style.text}>
                {text}
            </Text>
        </TouchableHighlight>

    )
}
const style = StyleSheet.create({
    button: {
        minWidth:80,
        padding: 10,
        borderRadius: 15,
        textAlign:"center",
        backgroundColor: color.tertiary,
        margin:10
    },
    text:{
        color:color.secondary,
        textAlign:"center",
        width:"100%"
    }
})
export {Button}