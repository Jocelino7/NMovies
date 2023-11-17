import { ActivityIndicator, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { color } from "../color"
import { Title } from "../components/Title"
import { imageUrl } from "../../../constants/contants"
import { StringProvider } from "../../../utils/language"
import { Casting, Movie, MovieDetail, actor } from "../../../models/model"
import Rating from "../components/Rating"
import { ScreenProps } from "../../types"
import { StackScreenProps } from "@react-navigation/stack"
import { detailStore } from "../../../stores/detailStore"
import { useEffect, useRef, useState } from "react"
import { CastingComponent } from "../components/Casting"
import { MovieComponentPrimary } from "../components/MovieComponent"
import { BasicShimmer, DetailShimmer } from "../components/BasicShimmer"
import { State } from "react-native-gesture-handler"
import WebView from "react-native-webview"
import { netWorkStore } from "../../../stores/NetworkStore"

type DetailProps = StackScreenProps<ScreenProps, "Detail">
const MovieDetails = ({ route }: DetailProps) => {
    const [showModal, setShowModal] = useState(false)
    const strings = new StringProvider().getAppStrings()
    const related = detailStore((state) => state.relatedMovie)
    const movie = detailStore((state) => state.movieDetail)
    const castings = detailStore((state) => state.casting)
    const getMovie = detailStore((state) => state.getMovie)
    const getRelated = detailStore((state) => state.getRelated)
    const getVideo = detailStore((state) => state.getMovieVideo)
    const getCasting = detailStore((state) => state.getCastings)
    const isMovieLoading = detailStore((State) => State.isMovieLoading)
    const isRelatedLoading = detailStore((State) => State.isRelateLoading)
    const isCastingLoading = detailStore((State) => State.isCastingLoading)
    const videoInfo = detailStore((state) => state.video)
    const isVideoInfoLoading = detailStore((State) => State.isVideoLoading)
    const webViewRef = useRef<WebView | null>(null);
    const retry = netWorkStore((state)=>state.retry)
    const setRetry = netWorkStore((state)=>state.setRetry)
    const connected = netWorkStore((state)=>state.connected) 
    console.log(videoInfo)
    async function handleFetch(
        id:number
    ) {
        getMovie(id)
        getCasting(id)
        getVideo(id)
        getRelated(id)
    }
    useEffect(()=>{
        console.log(videoInfo[0])

    },[videoInfo])
    useEffect(()=>{
        if(retry){
            if(connected){
                setRetry(false)
                handleFetch(route.params.id)
            }
        }
    },[retry])
    useEffect(() => {
        handleFetch(route.params.id)
        if (webViewRef.current) {
            webViewRef.current.injectJavaScript(`
              document.getElementsByTagName('video')[0].play();
            `);
          }
    }, [])

    return (
        <ScrollView>

            <Modal visible={showModal} animationType="slide" style={{ flex: 1 }}>
                <View style ={style.closeTopBar}>
                    <Icon name="close" size={30} color={color.secondary} onPress={()=>{setShowModal(false)}}/>
                </View>
                {
                    isVideoInfoLoading ?
                        <View style={{ width: "100%", alignItems: "center",padding:10 }}>
                            <ActivityIndicator color={color.redColor} size={60}/>
                        </View>
                        : videoInfo?
                        <WebView ref={webViewRef} allowsFullscreenVideo={true}  source={{ uri: `https://www.youtube.com/embed/${videoInfo[0]["key"]}?autoplay=1&mute=1&modestbranding=1&controls=1&fs=1` }} style={{ flex: 1 }} />
                        :<Title text={strings.no_video_available}/>
                }
 
            </Modal>
            <View style={style.container}>
                <DetailShimmer isLoading={isMovieLoading}>
                    {movie && <Video movie={movie} onPress={()=>setShowModal(true)}/>}
                    <Title text={strings.overview} />
                    <Text style={style.text}>
                        {
                            movie? movie.overview :route.params.overview
                        }
                    </Text>
                </DetailShimmer>

                <BasicShimmer isLoading={isRelatedLoading}>
                    {related.results.length > 0 && <View>
                        <Title text={strings.related} />
                        <FlatList
                            horizontal
                            style={style.flatlist}
                            keyExtractor={(item) => item.id.toString()}
                            data={related.results}
                            renderItem={({ item }: { item: Movie }) => {
                                return <MovieComponentPrimary style={style.flatlistItem} movie={item} onPress={() => {handleFetch(item.id) }} />
                            }}
                        />

                    </View>}

                </BasicShimmer>

                <BasicShimmer isLoading={isCastingLoading}>
                    <Title text={strings.castsAndProduction} />
                    {
                        castings &&
                        <FlatList
                            horizontal
                            style={style.flatlist}
                            keyExtractor={(item) => item.id.toString()}
                            data={castings}
                            renderItem={({ item }: { item: Casting }) => {
                                return <CastingComponent style={style.flatlistItem} casting={item} />
                            }}
                        />
                    }

                </BasicShimmer>


            </View>
        </ScrollView>
    )
}




const Video = ({ movie,onPress }: { movie: MovieDetail,onPress:Function }) => {
    const voteAverage = Math.round(movie.vote_average)
    console.log(voteAverage)
    return (
        <View style={style.mainContainer}>
            <View style={style.ImageContainer}>
                <Image source={{ uri: imageUrl + movie.poster_path }} style={style.image} resizeMode="cover" />
                <Pressable style={style.iconButton} onPress={()=>onPress()}>
                    <Icon name="play-arrow" size={60} color={color.redColor} />
                </Pressable>
            </View>
            <View style={style.titleContainer}>
                <Title text={movie.title} />
            </View>
            <View style={style.movieDetailRow}>
                <Text style={style.text}>{movie.release_date}</Text>
                <Text style={style.text}>{movie.genres[0].name}</Text>
                <Text style={style.text}>{movie.runtime + "m"}</Text>
            </View>
            <Rating average={voteAverage} />
        </View>
    )
}
const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: color.primary,
        width: "100%"

    },
    container: {
        width: "100%",
        padding: 10,
        backgroundColor: color.primary,
        alignItems: "center",
        justifyContent: "center"

    },
    ImageContainer: {
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    movieDetailRow: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        gap: 20,
        marginVertical: 10,
        justifyContent: "center"
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 10
    },
    text: {
        color: "white"
    },
    flatlist: {
        width: "100%",
        marginVertical: 10
    },
    flatlistItem: {
        flex: 1,
        marginHorizontal: 10
    },
    iconButton: {
        position: "absolute",
        padding: 5,
        borderRadius: 100,
        borderColor: color.redColor,
        borderWidth: 5
    },

    titleContainer: {
        width: "100%",
        justifyContent: "center",
        flexDirection: "row"
    },
    closeTopBar:{
        width:"100%",
        padding:10,
        height:50,
        justifyContent:"center",
        alignItems:"flex-end",
        backgroundColor:color.redColor

    }
})
export default MovieDetails

