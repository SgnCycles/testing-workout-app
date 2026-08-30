import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import Timer from "@/components/Timer";

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
    const initialTime = screen.getByText("10");
    expect(initialTime).toBeInTheDocument();
  });

  //ADDING MY TEST
  test("The start button and starttime shows", () => {
    render(<Timer startTime={10} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    const timer = screen.getByTestId("timer");
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent("10");
  });

  // this did not make sense, why "Lets go" is still a button with no function?
  test("Start changes to LETS GO when clicked", () => {
    render(<Timer startTime={10} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    expect(startButton).not.toHaveTextContent(/start/i);
    expect(startButton).toHaveTextContent(/lets go/i);
  });

  // ADDING MY TEST for the "Lets go text":
  test("text 'LETS GO' appears when the start button is clicked", () => {
    render(<Timer startTime={10} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    expect(
      screen.queryByRole("button", { name: /start/i }),
    ).not.toBeInTheDocument();
    const cheerText = screen.getByTestId("cheer");
    expect(cheerText).toBeInTheDocument();
    expect(cheerText).toHaveTextContent(/lets go/i);
  });

  test("Timer counts down correctly", () => {
    render(<Timer startTime={10} />);
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const newTime = screen.getByText(9);
    expect(newTime).toBeInTheDocument();
  });

  //ADDING MY TEST
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
  });

  test("Shows victory screen at 0 sec and reset button works correctly", () => {
    render(<Timer startTime={1} />);
    let startButton = screen.getByRole("button", { name: /start/i });
    let victoryMessage = screen.queryByText(/you did it/i);
    expect(victoryMessage).not.toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    victoryMessage = screen.getByText(/you did it/i);
    expect(victoryMessage).toBeInTheDocument();
    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);
    victoryMessage = screen.queryByText(/you did it/i);
    expect(victoryMessage).not.toBeInTheDocument();
    startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
    const startTime = screen.getByText(1);
    expect(startTime).toBeInTheDocument();
  });

  //ADDING MY TEST
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
  });

  //ADDING MY TEST
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