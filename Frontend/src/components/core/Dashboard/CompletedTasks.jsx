
import Card from "../../common/Card";
import { useSelector } from 'react-redux'


const CompletedTasks = () => {

  const { allTasks } = useSelector((state) => state.task);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-gray-900 overflow-y-auto">
      <div className="p-4 ">
        <div className="grid grid-cols-4 gap-4 ">
          {
            allTasks?.map((task, index) => (
              task?.completed && (

                <Card key={index} flag={true} task={task} />
              )
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CompletedTasks