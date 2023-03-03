const URL_CHAT_SPACE_MIGRACION =
  'https://chat.googleapis.com/v1/spaces/AAAA2AFHCDA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=R9OdaGu_skX5fwNEIAgDHMGk5rHOTGlb-hzxCLaDaKI%3D'

export const createNotification = async ({ text }: { text: string }) => {
  await fetch(URL_CHAT_SPACE_MIGRACION, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      text,
    }),
  })
}
