-- CreateTable
CREATE TABLE "boards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "authorId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "columns_board" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "columns_board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items_column" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "columnBoardId" TEXT NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "items_column_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "columns_board" ADD CONSTRAINT "columns_board_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_column" ADD CONSTRAINT "items_column_columnBoardId_fkey" FOREIGN KEY ("columnBoardId") REFERENCES "columns_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
