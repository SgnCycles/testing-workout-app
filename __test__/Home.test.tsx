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
    //this is because the Homescreen produces 6 start buttons for each of the cards
    const startWorkoutButton = screen.getAllByRole("button", {
      name: /start workout/i,
    });
    fireEvent.click(startWorkoutButton[0]); // put 3 to check if this really works, cause at least once the first button may be rendered
    //I would select buy role or dataId to make sure the intended button is selected
    const goBackButton = screen.getByText(/go back/i);
    expect(goBackButton).toBeInTheDocument();

    //shouldn't there be rechecking and using"queryByRole" to test if smth is not in the document?
    expect(startWorkoutButton[0]).not.toBeInTheDocument();
    const workoutTitle = screen.queryByRole("heading", {
      level: 2,
      name: /choose your workout/i,
    });
    expect(workoutTitle).not.toBeInTheDocument();
  });

  //I think this test is way too complicated for what it tests
  test("returns to WorkoutSelection when goBack is clicked from ActiveWorkout", () => {
    render(<Home />);
    //isn't there only one button for this? getAll feels unnecessary
    let startWorkoutButton = screen.getAllByRole("button", {
      name: /start workout/i,
    });
    fireEvent.click(startWorkoutButton[0]); // Rob would test and click the third one to test i9f there are more than one
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