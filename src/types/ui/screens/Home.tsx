import React, { useEffect, useState, } from "react"
import { Alert, FlatList, ScrollView, StyleSheet } from "react-native"
import { TextField } from "../components/TextField"
import { MovieComponent } from "../components/MovieSlider"
import { Genre, Movie, actor } from "../../../models/model"
import { BasicShimmer, GenreShimmer, UpComingMovieShimmer } from "../components/BasicShimmer"
import { StringProvider } from "../../../utils/language"
import { Title } from "../components/Title"
import { ActorComponent } from "../components/ActorComponent"
import { MovieComponentPrimary } from "../components/MovieComponent"
import { Button } from "../components/Button"
import { homeStore } from "../../../stores/HomeStores"
import { RepositoryImpl } from "../../../models/repository/repositoryImpl"
import { StackScreenProps } from "@react-navigation/stack"
import { ScreenProps } from "../../types"
import { color } from "../color"
import { fetch } from "@react-native-community/netinfo"
import { NetWorkModal } from "../components/NetWorkModal"
import { netWorkStore } from "../../../stores/NetworkStore"



type HomeProps = StackScreenProps<ScreenProps, "Home">
const Home = ({ navigation }: HomeProps): JSX.Element => {
    const appString = new StringProvider().getAppStrings()
    const popularMovies = homeStore((state) => state.popularMovies)
    const genres = homeStore((state) => state.genres)
    const upComingMovies = homeStore((state) => state.upComingMovies)
    const actorsInTreanding = homeStore((state) => state.actorsInTreanding)
    const repository = new RepositoryImpl()
    const isPopularMovieLoading = homeStore((state) => state.isPopularMovieLoading)
    const isGenresLoading = homeStore((state) => state.isGenresLoading)
    const isUpComingMoviesLoading = homeStore((state) => state.isUpComingMoviesLoading)
    const isActorLoading = homeStore((state) => state.isActorInTreandingLoading)
    const nowPlaying = homeStore((state) => state.nowPlaying)
    const handleFetch = homeStore((state) => state.handleFetch)
    const setFetchResult = homeStore((state) => state.setFetchResult)
    const textInputValue = homeStore((state) => state.textInputValue)
    const onChange = homeStore((state) => state.onChange)
    const cleanInput = homeStore((state) => state.cleanInput)
    const [showNetInfoModal,setShowNetInfoModa] = useState(false)
    const retry = netWorkStore((state)=>state.retry)
    const setRetry = netWorkStore((state)=>state.setRetry)
  
    async function handleFetchData() {
        const fetchResult = await handleFetch(repository)
        setFetchResult(fetchResult)
    }
    function handleDone(value: string | null) {
        if (value == null)
            return
        if (value.length === 0) {
            Alert.alert("", appString.emptyValue, [
                { text: "Ok", style: "cancel" }
            ],)
            return
        }

        navigation.navigate("Search", { value: textInputValue ? textInputValue : "" })
        cleanInput()
    }
    function handleRetry(){
        setRetry(false)
        handleFetch(repository)
    }
    useEffect(()=>{
        handleFetchData()
    },[])

    useEffect(() => {
       if(retry){
        handleRetry()
       }
    }, [retry]);
    return (
        <ScrollView style={style.mainContainer} scrollEnabled={true} nestedScrollEnabled={true}>
            <TextField value={textInputValue == null ? "" : textInputValue} onValueChange={onChange} onDone={() => handleDone(textInputValue)} />
            <Title text={appString.comingUpMovies} />
            <UpComingMovieShimmer isLoading={isUpComingMoviesLoading}>
                <FlatList
                    horizontal
                    style={style.carrosuel}
                    keyExtractor={(item) => item.id.toString()}
                    data={upComingMovies.results}
                    renderItem={({ item }: { item: Movie }) => {
                        return <MovieComponent movie={item} style={{ margin: 10, flex: 1 }} onPress={() => {
                            navigation.navigate("Detail", item)
                        }} />;
                    }}
                />

            </UpComingMovieShimmer>
            <GenreShimmer isLoading={isGenresLoading}>
                <FlatList
                    horizontal
                    style={style.carrosuel}
                    keyExtractor={(item) => item.id.toString()}
                    data={genres}
                    renderItem={({ item }: { item: Genre }) => {
                        return <Button text={item.name} onPress={() => {
                            navigation.navigate("Search", { genre: item.id })
                        }} />;
                    }}
                />
            </GenreShimmer>
            <Title text={appString.playingNow} />
            <BasicShimmer isLoading={isPopularMovieLoading}>
                <FlatList

                    onEndReached={() => { console.log("reached the end") }}
                    horizontal
                    style={style.carrosuel}
                    keyExtractor={(item) => item.id.toString()}
                    data={nowPlaying.results}
                    renderItem={({ item }: { item: Movie }) => {
                        return <MovieComponentPrimary style={{ margin: 10 }} movie={item}
                            onPress={() => {
                                navigation.navigate("Detail", item)
                            }} />;
                    }}
                />
            </BasicShimmer>

            <Title text={appString.popular} />
            <BasicShimmer isLoading={isPopularMovieLoading}>
                <FlatList

                    horizontal
                    style={style.carrosuel}
                    keyExtractor={(item) => item.id.toString()}
                    data={popularMovies.results}
                    renderItem={({ item }: { item: Movie }) => {
                        return <MovieComponentPrimary style={{ margin: 10 }} movie={item} onPress={() => {
                            navigation.navigate("Detail", item)
                        }} />;
                    }}
                />
            </BasicShimmer>
            <Title text={appString.weeklyActors} />
            <BasicShimmer isLoading={isActorLoading}>
                <FlatList
                    horizontal
                    style={style.carrosuel}
                    keyExtractor={(item) => item.id.toString()}
                    data={actorsInTreanding.results}
                    renderItem={({ item }: { item: actor }) => {
                        return <ActorComponent style={{ margin: 10 }} actor={item} />
                    }}
                />
            </BasicShimmer>
        </ScrollView>




    )
}
const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: color.primary,
        padding: 5,
        paddingTop: 10
    },
    carrosuel: {
        width: "100%"
    },
    carrouselItem: {
        flex: 1,
        margin: 10
    }
})
export { Home }
