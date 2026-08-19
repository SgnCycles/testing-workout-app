// import { render, screen, within } from "@testing-library/react";
// import WorkoutSelection from "@/components/WorkoutSelection";
// import { workouts } from "@/data/workouts";

// describe("The workout selection works ok", () => {
//   test("The subtitle should render correctly with an h2 and specific text", () => {
//     const mockFunction = jest.fn();
//     render(<WorkoutSelection handleClick={mockFunction} />);
//     const subtitle = screen.getByRole("heading", {
//       level: 2,
//       name: /choose your workout/i,
//     });
//     expect(subtitle).toBeInTheDocument();
//   });

//   test("6 workout cards are displayed ", () => {
//     const mockFunction = jest.fn();
//     render(<WorkoutSelection handleClick={mockFunction} />);
//     const workoutSelection = screen.getByTestId("workout-selection");
//     expect(workoutSelection).toBeInTheDocument();
//     const workoutCard = within(workoutSelection).getAllByTestId("workout-card");
//     expect(workoutCard.length).toBe(6);
//   });

//   test("The correct workout is displayed", () => {
//     const mockFunction = jest.fn();
//     render(<WorkoutSelection handleClick={mockFunction} />);
//     const workoutSelection = screen.getByTestId("workout-selection");
//     expect(workoutSelection).toBeInTheDocument();
//     const workoutCard = within(workoutSelection).getAllByTestId("workout-card");
//     expect(workoutCard[0]).toHaveTextContent(workouts[0].name);
//   });
// });