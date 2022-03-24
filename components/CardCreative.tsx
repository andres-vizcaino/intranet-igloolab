import { Category } from '@prisma/client'
import { IUser } from 'models/User.model'
import Image from 'next/image'
import Link from 'next/link'
import { getUrlCloudnaryLowQuality } from 'utils/getUrlCloudnaryLowQuality'

type TProps = {
  image: string
  title: string
  category: Category
  author: IUser
  id: string
}

const CardCreative = ({ image, title, category, author, id }: TProps) => (
  <div className="w-full md:w-1/2 xl:w-1/3 px-4">
    <div className="bg-transparent rounded-lg overflow-hidden mb-10 border-2">
      <Image
        src={getUrlCloudnaryLowQuality(image)}
        alt={title}
        width="100%"
        height="100%"
        layout="responsive"
        className="w-full"
        loading="lazy"
      />
      <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center flex flex-col items-center">
        <h3>
          <a
            className="
                font-semibold
                text-dark text-xl
                sm:text-[22px]
                md:text-xl
                lg:text-[22px]
                xl:text-xl
                2xl:text-[22px]
                
                block
                hover:text-primary
                "
          >
            {title}
          </a>
        </h3>

        <p className=" text-xs font-medium ml-2 ">{category.name}</p>

        <Link href={`/creative/${id}`}>
          <a
            className="
             inline-block
             mt-4
             py-2
             px-7
             border border-[#E5E7EB]
             rounded-full
             text-base text-body-color
             font-medium
             hover:border-primary hover:bg-red-500 hover:text-white
             transition
             "
          >
            Chismosear 🫵🏻
          </a>
        </Link>

        <Link href={`/profile/${author.id}`}>
          <a className="flex mt-5 min-w-fit justify-center items-center m-1 font-medium py-1 px-2  rounded-full text-white bg-red-500 border border-red-300 ">
            <div slot="avatar">
              <div className="flex relative w-4 h-4 justify-center items-center m-1 mr-2 ml-0 my-0 text-xs rounded-full">
                <Image
                  className="rounded-full"
                  alt="A"
                  height={32}
                  width={32}
                  src={author.image}
                />
              </div>
            </div>
            <div className="text-xs font-normal leading-none max-w-full flex-initial flex items-center gap-1">
              {author.name}
            </div>
          </a>
        </Link>
      </div>
    </div>
  </div>
)

export default CardCreative
