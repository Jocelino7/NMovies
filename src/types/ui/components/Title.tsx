import { Text } from "react-native"
import { color } from "../color"

const Title = ({text}:{text:string})=>{
    return(
        <Text style = {{
            fontSize:18,
            color:color.secondary,
            fontWeight:"bold",
            marginVertical:10
        }}>
            {text}
        </Text>
    )
}
export {Title}