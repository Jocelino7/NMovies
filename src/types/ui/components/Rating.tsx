import { View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { color } from "../color"

const Rating = ({average}:{average:number}) => {
    const avg = Math.round(average/2)
    console.log(avg)
    return <View>
        <View style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            gap: 10,
            marginVertical: 10,
            justifyContent: "center"
        }}>
            {
                Array(avg).fill(avg/avg).splice(0, 5).map((item, index) => (
                    <Icon key={index} name="star" size={20} color={color.starIcon} />
                ))
            }
        </View>
    </View>


}
export default Rating