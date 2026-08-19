import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("the homepage works ok", () => {
  
  test("Header an WorkoutSelection is rendered on homepage", () => {
    render(<Home />);
    const header = screen.getByRole("heading", {
      level: 1,
      name: /workout timer/i,
    });
    const workoutTitle = screen.getByRole("heading", {
      level: 2,
      name: /choose your workout/i,
    });
    expect(header).toBeInTheDocument();
    expect(workoutTitle).toBeInTheDocument();
  });

  test("Switches to ActiveWorkout when a workout is selected", () => {
    render(<Home />);
    const startWorkoutButton = screen.getAllByRole("button", {
      name: /start workout/i,
    });
    fireEvent.click(startWorkoutButton[0]);
    const goBackButton = screen.getByText(/go back/i);
    expect(goBackButton).toBeInTheDocument();
    expect(startWorkoutButton[0]).not.toBeInTheDocument();
    const workoutTitle = screen.queryByRole("heading", {
      level: 2,
      name: /choose your workout/i,
    });
    expect(workoutTitle).not.toBeInTheDocument();
  });

  test("returns to WorkoutSelection when goBack is clicked from ActiveWorkout", () => {
    render(<Home />);
    let startWorkoutButton = screen.getAllByRole("button", {
      name: /start workout/i,
    });
    fireEvent.click(startWorkoutButton[0]);
    let goBackButton = screen.getByText(/go back/i);
    expect(goBackButton).toBeInTheDocument();
    fireEvent.click(goBackButton);
    expect(goBackButton).not.toBeInTheDocument();
    startWorkoutButton = screen.getAllByRole("button", {
      name: /start workout/i,
    });
    expect(startWorkoutButton[0]).toBeInTheDocument();
  });
});