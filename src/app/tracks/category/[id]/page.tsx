
import { getPlaylist } from "@/api/tracks"
import Centerblock from "@/components/Centerblock/Centerblock"


type CategoryPageType = {
    params: { id: string }
}

export default async function CategoryPage({ params }: CategoryPageType) {
    const tracks = await getPlaylist(params.id)

    return (
        <Centerblock tracks={tracks} playlist={tracks} isCategory={true} />
    )
}