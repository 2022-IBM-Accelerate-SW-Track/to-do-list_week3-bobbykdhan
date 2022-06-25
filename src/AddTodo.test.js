import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
     const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
     const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
     const element = screen.getByRole('button', {name: /Add/i});
     const dueDate = "12/30/2023";
     fireEvent.change(inputTask, { target: { value: "History Test"}});
     fireEvent.change(inputDate, { target: { value: dueDate}});
     fireEvent.click(element);
     const check = screen.getByText(/History Test/i);
     const checkDate = screen.getByText(new RegExp(dueDate, "i"));


     fireEvent.change(inputTask, { target: { value: "History Test"}});
     fireEvent.change(inputDate, { target: { value: dueDate}});
     fireEvent.click(element);


     expect(check).toBeInTheDocument();
     expect(checkDate).toBeInTheDocument();

     const cardCount = screen.getAllByText(/History Test/i);
     expect(cardCount.length).toBe(1)




 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);



     const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
     const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
     const element = screen.getByRole('button', {name: /Add/i});
     const dueDate = "12/30/2023";
     fireEvent.change(inputDate, { target: { value: dueDate}});
     fireEvent.click(element);


     const check = screen.getByText(/You have no todo's left/i)
     expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);


     const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
     const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
     const element = screen.getByRole('button', {name: /Add/i});
     const dueDate = "12/30/2023";
     fireEvent.change(inputTask, { target: { value: "History Test"}});
     fireEvent.click(element);


     const check = screen.getByText(/You have no todo's left/i)
     expect(check).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);

     const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
     const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
     const element = screen.getByRole('button', {name: /Add/i});
     const dueDate = "12/30/2023";
     fireEvent.change(inputTask, { target: { value: "History Test"}});
     fireEvent.change(inputDate, { target: { value: dueDate}});
     fireEvent.click(element);


     const deleteButton = screen.getByRole('checkbox')
     fireEvent.click(deleteButton);

     const check = screen.getByText(/You have no todo's left/i)
     expect(check).toBeInTheDocument();

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
     const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
     const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
     const element = screen.getByRole('button', {name: /Add/i});
     const dueDate = "12/30/2023";
     const dueDate2 = "12/30/2020";
     fireEvent.change(inputTask, { target: { value: "History Test"}});
     fireEvent.change(inputDate, { target: { value: dueDate}});
     fireEvent.click(element);


     fireEvent.change(inputTask, { target: { value: "Math Test"}});
     fireEvent.change(inputDate, { target: { value: dueDate2}});
     fireEvent.click(element);

     const check = screen.getByTestId(/History Test/i).style.background
     const dueCheck = screen.getByTestId(/Math Test/i).style.background





     const colorCheck = (check === dueCheck)
     expect(colorCheck).toBe(false)

 });
