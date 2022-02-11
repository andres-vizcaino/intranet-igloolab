import Image from 'next/image'

type Props = {
  photo: string
  likes: number
}

const Chip = ({ photo, likes }: Props) => (
  <div className="flex justify-center items-center m-1 font-medium py-1 px-2  rounded-full text-purple-700 bg-purple-100 border border-purple-300 ">
    <div slot="avatar">
      <div className="flex relative w-8 h-8 bg-orange-500 justify-center items-center m-1 mr-2 ml-0 my-0 text-xs rounded-full">
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
      </svg>
      {likes}
    </div>
  </div>
)

export default Chip
