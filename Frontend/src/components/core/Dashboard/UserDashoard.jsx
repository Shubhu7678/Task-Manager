
import { useDispatch, useSelector } from "react-redux";
import Card from "../../common/Card";
import { useEffect } from "react";
import { getAllTasksData } from "../../../services/operations/taskHelper";
import { setAllTasks } from "../../../slices/taskSlice";

const UserDashoard = () => {

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { allTasks } = useSelector((state) => state.task);

  useEffect(() => {

    const fetchAllTaskData = async () => {

      try {

        const result = await getAllTasksData(token);
        if (result) {

          dispatch(setAllTasks(result));
          console.log("All tasks fetched successfully : ", result);
        }

      } catch (error) {

        console.log("Error occured in fetchAllTaskData : ", error);
      }

    }

    fetchAllTaskData();
  }, [dispatch, token])
  return (
    <div className="w-full h-[calc(100vh-64px)] bg-gray-900 overflow-y-auto">
      <div className="p-4 ">
        <div className="grid grid-cols-4 gap-4 ">
          {
            allTasks?.map((task, index) => (
              <Card key={index} flag={true} task={task} />
            ))
          }
          <Card flag={false} />
        </div>
      </div>
    </div>
  )
}

export default UserDashoard