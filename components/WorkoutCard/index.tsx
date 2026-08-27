import { WorkoutCardProps } from "@/types/workout";

const WorkoutCard = ({ workout, handleClick }: WorkoutCardProps) => {
  
  return (
    <div
      data-testid="workout-card"
      className="bg-background-card rounded-xl mb-4 relative shadow-lg shadow-amber-800 p-2 workout-card"
      data-flip-id={`card-${workout.id}`}
    >
      <div className="flex flex-col justify-around items-start h-full pl-4">
        <h3
          className="font-oswald text-6xl text-text-card-primary workout-card-title"
          data-flip-id={`heading-${workout.id}`}
        >
          {workout.name}
        </h3>
        <p
          data-testid="workout-time"
          className="font-work-sans text-text-card-primary"
        >
          <span className="font-bold">Work time: </span>
          {workout.workTime} seconds
        </p>
        <button
          className="action-button font-work-sans relative h-10 pl-3 pr-3 border-2 border-button-border cursor-pointer"
          onClick={() => handleClick(workout)}
        >
          <span className="z-10 relative text-button text-md tracking-wide font-semibold">
            Start Workout
          </span>
        </button>
      </div>
      <div className="absolute right-0 bottom-0 z-20">
        <img
          className="rounded-xl workout-image"
          src={`/images/${workout.image}`}
          alt="workout"
          width={160}
          height={100}
          data-flip-id={`image-${workout.id}`}
        />
      </div>
    </div>
  );
};

export default WorkoutCard;