import { fireEvent, render, screen } from "@testing-library/react";
import Timer from "@/components/Timer";
import { act } from "react";

describe("The timer works", () => {
  test("The start button and starttime shows", () => {
    render(<Timer startTime={10} />);

    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();

    const initialTime = screen.getByText("10");
    expect(initialTime).toBeInTheDocument();
  });

  test("Start changes to LETS GO when clicked", () => {
    render(<Timer startTime={10} />);

    const startButton = screen.getByRole("button", { name: /start/i });

    fireEvent.click(startButton);

    expect(startButton).not.toHaveTextContent(/start/i);
    expect(startButton).toHaveTextContent(/lets go/i);
  });

  test("Timer counts down correctly", () => {
    jest.useFakeTimers();
    render(<Timer startTime={10} />);

    const startButton = screen.getByRole("button", { name: /start/i });

    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const newTime = screen.getByText(9);

    expect(newTime).toBeInTheDocument();

    jest.useRealTimers();
  });

  test("Shows victory screen at 0 sec and reset button works correctly", () => {
    jest.useFakeTimers();
    render(<Timer startTime={1} />);

    let startButton = screen.getByRole("button", { name: /start/i });

    let victoryMessage = screen.queryByText(/you did it/i);

    expect(victoryMessage).not.toBeInTheDocument();

    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    victoryMessage = screen.getByText(/you did it/i);

    expect(victoryMessage).toBeInTheDocument();

    // Resetbutton

    const resetButton = screen.getByRole("button", { name: /reset/i });

    fireEvent.click(resetButton);

    victoryMessage = screen.queryByText(/you did it/i);

    expect(victoryMessage).not.toBeInTheDocument();

    startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();

    const startTime = screen.getByText(1);
    expect(startTime).toBeInTheDocument();

    jest.useRealTimers();
  });

  test("The timer does not count below 0", () => {
    jest.useFakeTimers();
    render(<Timer startTime={1} />);

    let startButton = screen.getByRole("button", { name: /start/i });

    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const time = screen.getByText(0);
    expect(time).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const minusTime = screen.queryByText(-1);
    expect(minusTime).not.toBeInTheDocument();
    expect(time).toBeInTheDocument();

    jest.useRealTimers();
  });
});
