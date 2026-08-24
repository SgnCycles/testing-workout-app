export interface Workout {
  id: number;
  name: string;
  workTime: number;
  image: string;
}

export type WorkoutCardProps = {
  workout: Workout;
  handleClick: (workout: Workout) => void;
};

export type WorkoutSelectionProps = {
  handleClick: (workout: Workout) => void;
};

export type ActiveWorkoutProps = {
  workout: Workout;
  goBack: () => void;
};

export type TimerProps = {
  startTime: number;
};