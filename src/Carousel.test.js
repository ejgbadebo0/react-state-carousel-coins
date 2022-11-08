import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it('renders', () => {
  render(<Carousel />);
})

it('matches snapshot', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it('works when you click on the left arrow', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = queryByTestId('right-arrow');
  const leftArrow = queryByTestId('left-arrow');

  fireEvent.click(rightArrow);
  fireEvent.click(leftArrow);

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it('hides arrows at the start and end of the carousel', () => {
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId('left-arrow');
  const rightArrow = getByTestId('right-arrow');

  expect(leftArrow).toHaveClass('hidden');
  expect(rightArrow).not.toHaveClass('hidden');

  fireEvent.click(getByTestId('right-arrow'));
  expect(leftArrow).not.toHaveClass('hidden');
  expect(rightArrow).not.toHaveClass('hidden');

  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass('hidden');
  expect(rightArrow).toHaveClass('hidden');
});