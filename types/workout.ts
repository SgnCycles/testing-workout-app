export interface Workout {
  id: number;
  name: string;
  workTime: number;
};

export type WorkoutCardProps = {
  workout: Workout;
  handleClick: (workout: Workout) => void;
};

export type WorkoutSelectionProps = {
  handleClick: (workout: Workout) => void;
};