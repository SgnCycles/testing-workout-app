// Added footer test

import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("The header works ok", () => {
  test("The header is an H1 and has specific text", () => {
    render(<Footer />);

    const headerTitle = screen.getByRole("heading", {
      level: 1,
      name: /workout timer/i,
    });

    expect(headerTitle).toBeInTheDocument();
  });
});
