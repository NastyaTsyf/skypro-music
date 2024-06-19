
import { getPlaylist } from "@/api/tracks"
import Centerblock from "@/components/Centerblock/Centerblock"


type CategoryPageType = {
    params: { id: string }
}

export default async function CategoryPage({ params }: CategoryPageType) {
    const tracks = await getPlaylist(params.id)

    let categoryName = ""

    if (params.id === "1") {
        categoryName = "Плейлист дня"
    } 
    if (params.id === "2") {
        categoryName = "100 танцевальных треков"
    } 
    if (params.id === "3") {
        categoryName = "Инди-заряд"
    } 

    return (
        <Centerblock tracks={tracks} playlist={tracks} isCategory={true} categoryName={categoryName} />
    )
}