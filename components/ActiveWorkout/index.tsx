import { ActiveWorkoutProps } from "@/types/workout";
import Timer from "../Timer";

const ActiveWorkout = ({workout, goBack}: ActiveWorkoutProps) => {
  return (
    <div className="bg-blue-800">
      <div>
        <button onClick={goBack}>Go Back</button>
      </div>
      <h3>{workout.name}</h3>
      <Timer startTime={workout.workTime}/>
    </div>
  )
}

export default ActiveWorkout