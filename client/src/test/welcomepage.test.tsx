import  WelcomePage from '../components/WelcomePage/WelcomePage'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/vitest"


describe('Welcome Page test', () => {
  it('Should render the Welcome Page', () => {
    render (
    < MemoryRouter>
      < WelcomePage/>
    </ MemoryRouter>
    );
    expect(true).toBeTruthy()
  });

  it ("Takes user to Main Page after clicking 'get started' button", async () => {
    render (
    < MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<WelcomePage />}/>
        <Route path="/home" element={<div data-testid="home-page" />}/>
      </Routes>
    </ MemoryRouter>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  })
})