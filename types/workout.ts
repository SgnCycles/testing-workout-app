export interface Workout {
  id: number;
  name: string;
  workTime: number;
};

export type WorkoutCardProps = {
  workout: Workout;
  handleClick: (workout: Workout) => void;
};