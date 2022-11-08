import React from "react";
import { render } from "@testing-library/react";
import image1 from "./image1.jpg";
import Card from './Card';

it('renders', () => {
    render(<Card src={image1} caption='Caption for rendering.'/>);
    /*
    const { getByText } = render(<Card src={image1} caption='Caption for rendering.'/>);
    const comp = getByText('Card');
    expect(comp).toHaveClass('Card');
    expect(comp).toBeInDocument();*/
})

it('matches snapshot', () => {
    const { asFragment } = render(<Card src={image1} caption='Caption for rendering.'/>);
    expect(asFragment()).toMatchSnapshot();
})