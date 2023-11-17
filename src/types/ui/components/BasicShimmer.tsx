import { ReactNode } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { View } from "react-native"
import { ScrollView } from "react-native"
import { color } from "../color"

type ShimmerProps = {
    isLoading: Boolean,
    children: ReactNode,
}


const BasicShimmer = ({ isLoading, children }: ShimmerProps) => {
    return (
        <View style={style.container}>
            {isLoading ?
                <ScrollView horizontal style={style.container}>
                    <View style={style.items}></View>
                    <View style={style.items}></View>
                    <View style={style.items}></View>
                    <View style={style.items}></View>
                    <View style={style.items}></View>
                    <View style={style.items}></View>
                    <View style={style.items}></View>
                </ScrollView>
                : children
            }
        </View>
    )

}
const UpComingMovieShimmer = ({ isLoading, children }: ShimmerProps) => {
    return (
        <View style={style.container}>
            {isLoading ?
                <ScrollView horizontal style={style.container}>
                    <View style={style.upComingItem}></View>
                    <View style={style.upComingItem}></View>
                    <View style={style.upComingItem}></View>
                    <View style={style.upComingItem}></View>
                    <View style={style.upComingItem}></View>
                    <View style={style.upComingItem}></View>
                </ScrollView>
                : children
            }

        </View>
    )

}
const GenreShimmer = ({ isLoading, children }: ShimmerProps) => {
    return (
        <View style={style.container}>
            {isLoading ?
                <ScrollView horizontal style={style.container}>
                    <View style={style.genre}></View>
                    <View style={style.genre}></View>
                    <View style={style.genre}></View>
                    <View style={style.genre}></View>
                    <View style={style.genre}></View>
                    <View style={style.genre}></View>
                </ScrollView>
                : children
            }

        </View>
    )
}
const MovieResultShimmer = () => {
    return (
        <View style={style.mainResultContainer}>
            <View style={style.dummyResultimage}></View>
            <View style={style.Resultcontainer}>
                <View style={style.resultRow}></View>
                <View style={style.resultRow}></View>
            </View>
        </View>
    )


}

const SearchShimmer = ({ isLoading, children }: ShimmerProps) => {
    return (
        <View style={style.container}>
            {isLoading ?
                <View style={style.container}>
                    <MovieResultShimmer />
                    <MovieResultShimmer />
                    <MovieResultShimmer />
                    <MovieResultShimmer />
                    <MovieResultShimmer />
                </View>
                : children
            }

        </View>
    )
}
const DetailShimmer = ({ isLoading, children }: ShimmerProps) => {
    return (
        <View style={[style.container,{justifyContent:"center",alignItems:"center"}]}>
            {isLoading ?
                <View style={{justifyContent:"center", alignItems:"center", width:"100%"}}>
                    <View style={{ width: "100%", height: 400, backgroundColor: color.shimmerColor, alignItems: "center", borderRadius: 10 }}></View>
                    <View style={style.row}></View>
                    <View style={style.row}></View>
                    <View style={style.row}></View>
                    <View style={{ width: "100%", borderRadius:10, height: 100, backgroundColor: color.shimmerColor, marginVertical: 20 }}></View>
                </View>
                : children
            }

        </View>
    )
}
const style = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        marginVertical: 10
    },
    items: {
        width: 200,
        height: 200,
        borderRadius: 10,
        backgroundColor: color.shimmerColor,
        marginHorizontal: 10
    },
    upComingItem: {
        minWidth: 320,
        height: 300,
        borderRadius: 10,
        backgroundColor: color.shimmerColor,
        padding: 10,
        marginHorizontal: 10
    },
    genre: {
        width: 100,
        height: 30,
        padding: 10,
        borderRadius: 10,
        backgroundColor: color.shimmerColor,
        margin: 10
    },
    search: {

    },
    mainResultContainer: {
        width: Dimensions.get("screen").width,
        flexDirection: "row",
        padding: 10,
        marginVertical: 10,
        height: 250,
    },
    dummyResultimage: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: color.shimmerColor
    },
    Resultcontainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: "100%"

    },
    resultRow: {
        width: "90%",
        backgroundColor: color.shimmerColor,
        padding: 10,
        marginVertical: 10,

    },
    row: {
        borderRadius: 10,
        width: "50%",
        backgroundColor: color.shimmerColor,
        padding: 10,
        marginVertical: 10,

    }

})
export { BasicShimmer, UpComingMovieShimmer, GenreShimmer, SearchShimmer, DetailShimmer }