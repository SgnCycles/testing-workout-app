import { WorkoutCardProps } from "@/types/workout";

const WorkoutCard = ({ workout, handleClick }: WorkoutCardProps) => {
  
  return (
    <div
      data-testid="workout-card"
      className="bg-background-card rounded-xl mb-4 relative workout-card"
    >
      <div className="flex flex-col justify-around items-start h-full pl-4">
        <h3
          className="font-oswald text-6xl text-text-card-primary workout-card-title"
          data-flip-id={`heading-${workout.id}`}
        >
          {workout.name}
        </h3>
        <p data-testid="workout-time" className="font-work-sans">
          Work time: {workout.workTime} seconds
        </p>
        <button
          className="cursor-pointer w-30 p-1 rounded-2xl bg-background-button text-heading font-semibold text-sm"
          onClick={() => handleClick(workout)}
        >
          Start Workout
        </button>
      </div>
      <div className="absolute right-0 bottom-0 z-20">
        <img
          className="rounded-xl workout-image"
          src={`/images/${workout.image}`}
          alt="workout"
          width={150}
          height={90}
          data-flip-id={`image-${workout.id}`}
        ></img>
      </div>
    </div>
  );
};

export default WorkoutCard;