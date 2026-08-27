import { fireEvent, render, screen } from "@testing-library/react";
import ActiveWorkout from "@/components/ActiveWorkout";

describe("The ActiveWorkout works ok", () => {
  
  const mockWorkout = { id: 1, name: "This is a mock workout", workTime: 10, image: "mockImage.png" };
  const mockFunction = jest.fn();

  test("Renders the correct name of the chosen workout", () => {
    render(<ActiveWorkout workout={mockWorkout} goBack={mockFunction} />);
    // I would target here the precise element and then check if it has the text content of the mockWorkout.name
    const chosenWorkout = screen.getByText(mockWorkout.name);
    expect(chosenWorkout).toBeInTheDocument();
  });

  test("calls goback function when goback button is clicked", () => {
    render(<ActiveWorkout workout={mockWorkout} goBack={mockFunction} />);
    let goBack = screen.getByRole("button", { name: /go back/i });
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);
    //isn't it enough to just haveBeenCalled? Why it is important to have called 1x?
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  test("renders the timer with correct worktime", () => {
    render(<ActiveWorkout workout={mockWorkout} goBack={mockFunction} />);
    // I would target here the precise element and then check if it has the text content of it is the  mockWorkout.workTime
    const timerValue = screen.getByText(mockWorkout.workTime);
    expect(timerValue).toBeInTheDocument();
  });
});