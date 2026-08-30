import { fireEvent, render, screen } from "@testing-library/react";
import ActiveWorkout from "@/components/ActiveWorkout";

describe("The ActiveWorkout works ok", () => {

  const mockWorkout = {
    id: 1,
    name: "This is a mock workout",
    workTime: 10,
    image: "mockImage.png",
  };
  const mockFunction = jest.fn();

  test("Renders the correct name of the chosen workout", () => {
    render(<ActiveWorkout workout={mockWorkout} goBack={mockFunction} />);
    const chosenWorkout = screen.getByText(mockWorkout.name);
    expect(chosenWorkout).toBeInTheDocument();
  });

  //ADDING MY TEST
  test("Renders the correct name of the chosen workout", () => {
    render(<ActiveWorkout workout={mockWorkout} goBack={mockFunction} />);
    const chosenWorkoutName = screen.getByRole("heading", { level: 3 });
    expect(chosenWorkoutName).toBeInTheDocument();
    expect(chosenWorkoutName).toHaveTextContent(mockWorkout.name);
  });

  //ADDING MY TEST
  test("Renders the correct image with the correct src and alt of the chosen workout", () => {
    render(<ActiveWorkout workout={mockWorkout} goBack={mockFunction} />);
    const chosenWorkoutImage = screen.getByRole("img");
    expect(chosenWorkoutImage).toBeInTheDocument();
    expect(chosenWorkoutImage.getAttribute("src")).toBe(`/images/${mockWorkout.image}`)
    expect(chosenWorkoutImage.getAttribute("alt")).toBe(`${mockWorkout.name} workout`)
  });

  test("calls goback function when goback button is clicked", () => {
    render(<ActiveWorkout workout={mockWorkout} goBack={mockFunction} />);
    let goBack = screen.getByRole("button", { name: /go back/i });
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  test("renders the timer with correct worktime", () => {
    render(<ActiveWorkout workout={mockWorkout} goBack={mockFunction} />);
    const timerValue = screen.getByText(mockWorkout.workTime);
    expect(timerValue).toBeInTheDocument();
  });

  //ADDING MY TEST
  test("renders the timer with correct worktime", () => {
    render(<ActiveWorkout workout={mockWorkout} goBack={mockFunction} />);
    const timerValue = screen.getByTestId("timer");
    expect(timerValue).toBeInTheDocument();
    expect(timerValue).toHaveTextContent(`${mockWorkout.workTime}`);
  });
});