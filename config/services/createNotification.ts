const URL_CHAT_SPACE_ANUNCIOS =
  'https://chat.googleapis.com/v1/spaces/AAAAF6JOW0A/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=JH6GM8sHrsmFpBTp-bwMuWyi6LXXS5sGYHa9Gpiy4Bs%3D'

export const createNotification = async ({ text }: { text: string }) => {
  await fetch(URL_CHAT_SPACE_ANUNCIOS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      text,
    }),
  })
}
