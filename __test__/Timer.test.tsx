// import { fireEvent, render, screen } from "@testing-library/react";
import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import Timer from "@/components/Timer";
// import { act } from "react"; can be moved inside the @testing-library/react import line

describe("The timer works", () => {
  
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("The start button and starttime shows", () => {
    render(<Timer startTime={10} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    //shouldn't we select where it should be showing 10?
    const initialTime = screen.getByText("10");
    expect(initialTime).toBeInTheDocument();
  });

  // this did not make sense, why "Lets go" is a button with no function? //
  test("Start changes to LETS GO when clicked", () => {
    render(<Timer startTime={10} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    expect(startButton).not.toHaveTextContent(/start/i);
    expect(startButton).toHaveTextContent(/lets go/i);
  });

  // MY TEST for the "Let's go text":
  test("text 'LETS GO' appears when the start button is clicked", () => {
    render(<Timer startTime={10} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    expect(
      screen.queryByRole("button", { name: /start/i }),
    ).not.toBeInTheDocument();
    const cheerText = screen.getByTestId("cheer");
    expect(cheerText).toBeInTheDocument();
  });

  //shouldn't there be the old value stored?
  test("Timer counts down correctly", () => {
    //if there are several useFakeTimers, to keep the code DRY it can be moved to the top to execute before and after each test.
    // jest.useFakeTimers();
    render(<Timer startTime={10} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // console.log(screen.getByTestId("timer").textContent);
    const newTime = screen.getByText(9);
    expect(newTime).toBeInTheDocument();
    // jest.useRealTimers();
  });

  //MY TEST
  test("Timer counts down correctly", async () => {
    render(<Timer startTime={10} />);
    const startTime = screen.getByTestId("timer");
    expect(startTime).toHaveTextContent("10");
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(screen.getByTestId("timer")).toHaveTextContent("9");
    });
    // screen.debug();
  });

  test("Shows victory screen at 0 sec and reset button works correctly", () => {
    // jest.useFakeTimers();
    render(<Timer startTime={1} />);
    let startButton = screen.getByRole("button", { name: /start/i });
    //shouldn't there be selecting a specific element to check that it holds this text to avoid false duplicated values
    let victoryMessage = screen.queryByText(/you did it/i);
    expect(victoryMessage).not.toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    screen.debug();
    victoryMessage = screen.getByText(/you did it/i); //queryBy text; repeat the query by again to test the same thing if this appears
    expect(victoryMessage).toBeInTheDocument();

    //Resetbutton
    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);
    victoryMessage = screen.queryByText(/you did it/i);
    expect(victoryMessage).not.toBeInTheDocument();
    startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    const startTime = screen.getByText(1);
    expect(startTime).toBeInTheDocument();
    // jest.useRealTimers();
  });

  //MY TEST
  test("Shows victory text at 0 sec and reset button works correctly", async () => {
    render(<Timer startTime={1} />);
    let startButton = screen.getByRole("button", { name: /start/i });
    let victoryMessage = screen.queryByTestId("victory-message");
    expect(victoryMessage).not.toBeInTheDocument();
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(screen.getByTestId("victory-message")).toBeInTheDocument();
    });
    // screen.debug();
    victoryMessage = screen.getByTestId("victory-message");
    expect(victoryMessage).toHaveTextContent(/you did it/i);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    victoryMessage = screen.queryByTestId("victory-message");
    expect(victoryMessage).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /reset/i }),
    ).not.toBeInTheDocument();
    const startTime = screen.getByText(1);
    expect(startTime).toBeInTheDocument();
  });

  test("The timer does not count below 0", () => {
    // jest.useFakeTimers();
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
    // jest.useRealTimers();
  });

  //MY TEST
  test("The timer does not count below 0", async () => {
    render(<Timer startTime={1} />);
    let startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(screen.getByTestId("timer")).toHaveTextContent("0");
    });
    const time = screen.getByTestId("timer");
    expect(time).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => {
      expect(screen.queryByTestId("timer")).not.toHaveTextContent("-1");
    });
  });
});