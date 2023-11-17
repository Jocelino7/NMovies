import MovieResult from "../components/MovieResult"
import { color } from "../color"
import { ScreenProps } from "../../types"
import { StackScreenProps } from "@react-navigation/stack"
import { Title } from "../components/Title"
import { RepositoryImpl } from "../../../models/repository/repositoryImpl"
import { searchStore } from "../../../stores/searchStore"
import { FlatList, State } from "react-native-gesture-handler"
import { SearchShimmer } from "../components/BasicShimmer"
import { Movie } from "../../../models/model"
import { StringProvider } from "../../../utils/language"
import { useEffect } from "react"
import { View } from "react-native"
import { netWorkStore } from "../../../stores/NetworkStore"
type SearchProps = StackScreenProps<ScreenProps, "Search">
const Search = ({ navigation, route }: SearchProps) => {
    const appString = new StringProvider().getAppStrings()
    const repository = new RepositoryImpl()
    const search = searchStore((state) => state.search)
    const isResultLoading = searchStore((State) => State.isResultLoading)
    const result = searchStore((state) => state.results)
    const getMovieByGenres = searchStore((State) => State.getMovieByGenre)
    const retry = netWorkStore((state)=>state.connected) 
    const setRetry = netWorkStore((state)=>state.setRetry)
    const connected = netWorkStore((state)=>state.connected) 
    function handlePress(movie: Movie) {
        navigation.navigate("Detail", movie)
    }
    function handleFetch(){
        route.params.value ? search(route.params.value, repository) : getMovieByGenres(route.params.genre!, repository)
    }
    useEffect(()=>{
        if(retry){
            if(connected){
                setRetry(false)
                handleFetch()
            }
        }
    },[retry])

    useEffect(() => {
        handleFetch()
    }, [])
    return (
        <View style={{ backgroundColor: color.primary, flex: 1 }}>
            <SearchShimmer isLoading={isResultLoading}>
                {result.results.length === 0 ? <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}><Title text={appString.noResult} /></View>
                    :
                    <FlatList
                        data={result.results}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={(({ item }: { item: Movie }) => {
                            return <MovieResult movie={item} onPress={() => handlePress(item)} />
                        })}
                    />}
            </SearchShimmer>
        </View>
    )

}
export default Search