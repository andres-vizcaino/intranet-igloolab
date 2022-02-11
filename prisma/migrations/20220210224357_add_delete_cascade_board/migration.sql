-- DropForeignKey
ALTER TABLE "columns_board" DROP CONSTRAINT "columns_board_boardId_fkey";

-- DropForeignKey
ALTER TABLE "items_column" DROP CONSTRAINT "items_column_columnBoardId_fkey";

-- AddForeignKey
ALTER TABLE "columns_board" ADD CONSTRAINT "columns_board_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_column" ADD CONSTRAINT "items_column_columnBoardId_fkey" FOREIGN KEY ("columnBoardId") REFERENCES "columns_board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
