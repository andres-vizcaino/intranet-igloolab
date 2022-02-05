export const linkify = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const urlRegex2 = /(^|\s)([\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/g

    return text
        .replace(
            urlRegex,
            '<a class="text-sm" href="$1" target="_blank">$1</a>'
        )
        .replace(
            urlRegex2,
            '$1<a class="text-sm" href="http://$2" target="_blank">$2</a>'
        )
}

export const getLinkFromText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const urlRegex2 = /(^|\s)([\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/g

    return text.match(urlRegex) || text.match(urlRegex2)
}
