import { GestureResponderEvent, StyleSheet, TextInput, View } from "react-native"
import { color } from "../color"
import Icon from "react-native-vector-icons/MaterialIcons"

  const TextField = ({value,onValueChange,onDone}:{value:string, onValueChange:(value:string)=>void, onDone:Function})=> {
    return(
        <View style={style.container}>
            <Icon name="search" size ={30}/>
            <TextInput style={style.textInput} value={value} onChangeText={(value)=>{onValueChange(value)}} onEndEditing={()=>onDone()} />
        </View>
        
    )
}
const style = StyleSheet.create({
    container:{
        backgroundColor:color.secondary,
        borderRadius:10,
        display:"flex",
        flexDirection:"row",
        gap:3,
        alignItems:"center",
        padding:5,
    },
    textInput:{
        width:"100%",
        borderRadius:10,
        padding:3,
        backgroundColor:color.secondary
    }
})
export {TextField}