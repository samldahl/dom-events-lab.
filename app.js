// As a user, I want to be able to select numbers so that I can perform operations with them.
// As a user, I want to be able to add two numbers together.
// As a user, I want to be able to subtract one number from another.
// As a user, I want to be able to multiply two numbers together.
// As a user, I want to be able to divide one number by another.
// As a user, I want to be able to see the output of the mathematical operation.
// As a user, I want to be able to clear all operations and start from 0.

/* The tricky part here is doing it the right way, through this discovered the
importance of assigning varibles to DOM elements. The goal is to be lazy, to assign
vars to DOM elements, and then reference those varibles as near literal subs.

Then its just 2 big ideas: showing stuff and holding stuff. 
1. When a button is pressed we gotta do suff
1a. What type of button (operator or number) [define those, rules and stuff to do for each]
2. Getting number one (and edge cases defined by varible ifs)
3. Operator defines the break in current and previous numbers
4. Get the second number (or realize that number one is the second number)
5. Calculating... which can just be a function with 3 parameters that we feed based on the inputs



/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');
const calculator = document.querySelector('#calculator');
const displayText = document.getElementById('display-text');

/*-------------------------------- Variables --------------------------------*/
let current = '0';     // what’s in display
let previous = null;   // stored before operator is clicked
let operator = null;   // includes +, -, *, /

/*----------------------------- Event Listeners -----------------------------*/

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.innerText;

    // Handle number input
    if (button.classList.contains('number')) {
    // Looked more into ternary operators, basically this is assigning to current, either the value
    // or current + value depending on if its 0 or not
      current = (current === '0') ? value : current + value;
      updateDisplay();
      return; // return bc we stop checking if we get a hit...
    }

    // Handle clear (proper verbiage)
    if (value === 'C') {
      current = '0';
      previous = null;
      operator = null;
      updateDisplay();
      return;
    }


    // Handle operator input
    if (['+', '-', '*', '/'].includes(value)) {
      if (previous === null) {
        previous = current; // taking what we got on the screen and making it current (if we have it)
      } else {
        previous = calculate(previous, current, operator);
      }
      operator = value;
      current = '0'; // reset current for next number
      return;
    }






    // Handle equals
    if (value === '=') {
      if (previous !== null) {
        current = calculate(previous, current, operator);
        operator = null;
      }
    }

    updateDisplay();
  });
});

/*-------------------------------- Functions --------------------------------*/
function updateDisplay() {
  displayText.textContent = current;
}
// Seperating the actual work, plug and chug
function calculate(prev, curr, op) {
  prev = parseFloat(prev);
  curr = parseFloat(curr);
if (op === '+') {
  return prev + curr;
} else if (op === '-') {
  return prev - curr;
} else if (op === '*') {
  return prev * curr;
} else if (op === '/') {
  if (curr === 0) {
    return 'Error';
  } else {
    return prev / curr;
  }
} else {
  return curr;
}}