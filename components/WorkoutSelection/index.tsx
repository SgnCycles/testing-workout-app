import { workouts } from "@/data/workouts";
import WorkoutCard from "@/components/WorkoutCard";
import { WorkoutSelectionProps } from "@/types/workout";

const WorkoutSelection = ({ handleClick }: WorkoutSelectionProps) => {
  return (
    <div className="flex flex-col grow">
      <h2>Choose your workout</h2>
      <div data-testid="workout-selection" className="flex grow">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              handleClick={handleClick}
            />
          ))}
      </div>
    </div>
  );
};

export default WorkoutSelection;