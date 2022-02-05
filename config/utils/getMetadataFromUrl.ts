import axios from 'axios'
import { formatStringWithChar } from './formatStringWithChar'

export const getMetadataFromUrl = async (url: string) => {
    const { data } = await axios.get(
        `https://url-metadata.herokuapp.com/api/metadata?url=${url}`
    )
    return {
        title: `${formatStringWithChar(data.data.title)}`,
        description: data.data.description,
        image: data.data.image,
        siteName: data.data.siteName,
        hostname: new URL(url).hostname,
    }
}
