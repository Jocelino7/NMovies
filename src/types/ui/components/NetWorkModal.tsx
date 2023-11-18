import { Modal, View, Button } from "react-native";
import { Title } from "./Title";
import { StringProvider } from "../../../utils/language";
import { color } from "../color";


export const NetWorkModal = ({ show, onButtonPress }: { show: boolean, onButtonPress: Function }) => {
    const strings = new StringProvider().getAppStrings()
    return (
        <Modal animationType="slide" visible={show} >
            <View style={
                { backgroundColor: color.primary, justifyContent: "center", alignItems: "center", flex: 1 }
            }>
                <View style={
                    {
                        backgroundColor: color.primary,
                        borderRadius: 10,
                        padding: 10,
                        minHeight: 250,
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }>
                    <Title text={strings.noInternetConnection} />
                    <Button title={strings.retry} color={color.redColor} onPress={() => onButtonPress()} />

                </View>

            </View>


        </Modal>
    )

}