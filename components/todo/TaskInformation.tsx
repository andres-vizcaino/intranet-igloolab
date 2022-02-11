import { ReactNode } from 'react'

const TaskInformation = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col relative justify-center items-start px-4 min-h-min rounded-md bg-white dark:bg-zinc-500 mt-4 ">
    {children}
  </div>
)

export default TaskInformation
