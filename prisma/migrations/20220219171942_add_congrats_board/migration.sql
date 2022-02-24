-- CreateEnum
CREATE TYPE "TypeCongrat" AS ENUM ('THANKS', 'CRACK', 'GOOD_JOB', 'SIUU');

-- CreateTable
CREATE TABLE "Congrat" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "typeCongrat" "TypeCongrat" NOT NULL DEFAULT E'THANKS',
    "authorId" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Congrat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Congrat" ADD CONSTRAINT "Congrat_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Congrat" ADD CONSTRAINT "Congrat_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
