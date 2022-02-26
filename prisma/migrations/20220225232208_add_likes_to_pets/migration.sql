-- CreateTable
CREATE TABLE "_likesPet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likesPet_AB_unique" ON "_likesPet"("A", "B");

-- CreateIndex
CREATE INDEX "_likesPet_B_index" ON "_likesPet"("B");

-- AddForeignKey
ALTER TABLE "_likesPet" ADD FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likesPet" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
