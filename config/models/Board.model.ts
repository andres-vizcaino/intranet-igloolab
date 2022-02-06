export interface IBoard {
  id: string
  name: string
  description: string
  createdAt: string
  authorId: string
  columns: IColumn[]
}

export interface IColumn {
  id?: string
  title?: string
  createdAt?: string
  boardId?: string
  items: IItemsColumn[]
}

export interface IItemsColumn {
  id: string
  description: string
  columnBoardId: string
  createdAt: string
}
