import Image from 'next/image'

type Props = {
  photo: string
  name: string
  date: number
}

const Chip = ({ photo, name, date }: Props) => (
  <div className="flex justify-center items-center m-1 font-medium py-1 px-2  rounded-full text-purple-700 bg-purple-100 border border-purple-300 ">
    <div slot="avatar">
      <div className="flex relative w-8 h-8 justify-center items-center m-1 mr-2 ml-0 my-0 text-xs rounded-full">
        <Image
          className="rounded-full"
          alt="A"
          height={100}
          width={100}
          src={photo}
        />
      </div>
    </div>
    <div className="text-sm font-normal leading-none max-w-full flex-initial flex items-center gap-1">
      🎂 {name} {date === 0 && 'hoy! 🎇'}{' '}
      {date != 0 && `en ${date} día${date === 1 ? '' : 's'}`}
    </div>
  </div>
)

export default Chip
