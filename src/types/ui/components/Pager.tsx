import PagerView from "react-native-pager-view"

 const Pager = ({component}: {component:JSX.Element}) => {
    return (
        <PagerView>
            {component}
        </PagerView>

    )
}
export {Pager}