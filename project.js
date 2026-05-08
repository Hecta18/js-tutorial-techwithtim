// know bet
// lines of bet
// collect bet
// spin
// won?
// payout
// reset

//imports
const prompt = require('prompt-sync')();

//global variables
const ROWS = 3;
const COLS = 3;

const SYMBOLS = {
  A: 2,
  B: 4,
  C: 6,
  D: 8
}

const SYMBOLS_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2
}

//functions
const deposit = () => {
  const amount = prompt('How much would you like to deposit? $');
  const valid_amount = parseFloat(amount);

  if (isNaN(valid_amount) || valid_amount <= 0) {
    console.log('Please enter a valid amount.');
    return deposit();
  }
  return valid_amount;
}

const lines = () => {
  const amount = prompt('On which lines would you like to bet? (1-3): ');
  const valid_amount = parseInt(amount);

  if (isNaN(valid_amount) || valid_amount < 1 || valid_amount > 3) {
    console.log('Please enter a valid position.');
    return lines();
  }
  return valid_amount;
}

const bet = () => {
  const amount = prompt('How much would you like to bet per line? $');
  const valid_amount = parseFloat(amount);

  if (isNaN(valid_amount) || valid_amount <= 0 || valid_amount > balance / lines) {
    console.log('Please enter a valid amount.');
    return bet();
  }
  return valid_amount;
}

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reel_symbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const random_index = Math.floor(Math.random() * reel_symbols.length);
      const selected_symbol = reel_symbols[random_index];
      reels[i].push(selected_symbol);
      reel_symbols.splice(random_index, 1);
    }
  }
  return reels;
}

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
}

const rowString = (rows) => {
  let rows_strings = '';
  for (const row of rows) {
    let row_string = '';
    for (const [i, symbol] of row.entries()) {
      row_string += symbol + ' ';
    }
    rows_strings += row_string + '\n';
  }
  return rows_strings;
}

const getWinnings = (rows, bet_amount, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let all_same = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        all_same = false;
        break;
      }
    }
    if (all_same) {
      winnings += bet_amount * SYMBOLS_VALUE[symbols[0]];
    }
  }
  return winnings;
}

const game = () => {
  let balance = 0;
  while (balance >= 0) {
    console.log(`Your balance is: $${balance}`);
    balance += deposit();
    const lines_amount = lines();
    const bet_amount = bet() * lines_amount;
    balance -= bet_amount;
    const reels = spin();
    const rows = transpose(reels);
    const row_string = rowString(rows);
    console.log(row_string);
    const winnings = getWinnings(rows, bet_amount, lines_amount);
    console.log(`You won: $${winnings}`);
    balance += winnings;
    if (prompt('Do you want to play again? (y/n): ').toLowerCase() != 'y') break;
  }
  console.log('You are out of money!');
}