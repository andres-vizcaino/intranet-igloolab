import { ReactNode } from 'react'

const TaskInformation = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col justify-center items-start px-4 min-h-min rounded-md bg-white mt-4 ">
    {children}
  </div>
)

export default TaskInformation
