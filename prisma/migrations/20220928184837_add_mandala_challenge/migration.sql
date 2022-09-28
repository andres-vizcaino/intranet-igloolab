-- CreateTable
CREATE TABLE "Mandala" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mandala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_likesMandala" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Mandala_ownerId_key" ON "Mandala"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "_likesMandala_AB_unique" ON "_likesMandala"("A", "B");

-- CreateIndex
CREATE INDEX "_likesMandala_B_index" ON "_likesMandala"("B");

-- AddForeignKey
ALTER TABLE "Mandala" ADD CONSTRAINT "Mandala_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likesMandala" ADD FOREIGN KEY ("A") REFERENCES "Mandala"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likesMandala" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
