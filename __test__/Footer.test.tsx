// ADDING MY TEST
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("The footer works ok", () => {
  test("The footer renders and has a specific text", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent(/sgncycles/i)
  });
});