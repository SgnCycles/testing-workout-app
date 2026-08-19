import { fireEvent, render, screen } from "@testing-library/react";
import WorkoutCard from "@/components/WorkoutCard";

describe("The workout card works ", () => {
  const mockFunction = jest.fn();
  const mockWorkout = { id: 1, name: "this is a mock name", workTime: 10 };

  test("Renders the workoutCard", () => {
    render(<WorkoutCard handleClick={mockFunction} workout={mockWorkout} />);
    const card = screen.getByTestId("workout-card");
    expect(card).toBeInTheDocument();
  });

  test("Every card should have a title name with h3", () => {
    render(<WorkoutCard handleClick={mockFunction} workout={mockWorkout} />);
    const cardTitle = screen.getByRole("heading", {
      level: 3,
      name: mockWorkout.name,
    });
    expect(cardTitle).toBeInTheDocument();
  });

  test("The seconds for the workout are shown", () => {
    render(<WorkoutCard handleClick={mockFunction} workout={mockWorkout} />);
    const seconds = screen.getByTestId("workout-time");
    expect(seconds).toHaveTextContent(
      `Work time: ${mockWorkout.workTime} seconds`,
    );
  });
  test("The handleClick is not called before the button is clicked", () => {
    render(<WorkoutCard handleClick={mockFunction} workout={mockWorkout} />);
    expect(mockFunction).not.toHaveBeenCalled();
  });

  test("The button calls the function when clicked", () => {
    render(<WorkoutCard handleClick={mockFunction} workout={mockWorkout} />);
    const button = screen.getByRole("button", { name: /start workout/i });
    fireEvent.click(button);
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith(mockWorkout);
  });
});