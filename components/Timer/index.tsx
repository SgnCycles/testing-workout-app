import { TimerProps } from "@/types/workout";

const Timer = ({startTime}: TimerProps) => {
  return (
    <div>{startTime}</div>
  )
}

export default Timer