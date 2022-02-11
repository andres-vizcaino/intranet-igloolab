import { ITweet } from 'models/Tweet.model'

export const getArrayUsersMoreLikes = (
  arrayTweets: Array<ITweet>
): Array<{ photo: string; likes: number }> => {
  const arrayUsers: Array<{ photo: string; likes: number }> = []
  arrayTweets.forEach((tweet) => {
    const photo = tweet.author.image || ''
    const likes = tweet.likesBy.length
    const index = arrayUsers.findIndex((user) => user.photo === photo)
    if (index === -1) {
      arrayUsers.push({ photo, likes })
    } else {
      arrayUsers[index].likes += likes
    }
  })
  return arrayUsers.sort((a, b) => b.likes - a.likes).slice(0, 3)
}
