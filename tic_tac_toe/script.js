// Defining winning combinations
const winCombinations = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6]
];

let board = [
    ['', '', ''],//index: 0,1,2
    ['', '', ''],//index: 3,4,5
    ['', '', '']//index: 6,7,8
];

let currentPlayer = 'X';
let player1Wins = 0;
let player2Wins = 0;
let round = 1;

const statusDisplay = document.getElementById('status');//also: querySelector('#status')
const roundNumberDisplay = document.getElementById('round-number');
const cells = document.querySelectorAll('.cell');
const player1WinsDisplay = document.getElementById('player1-wins');
const player2WinsDisplay = document.getElementById('player2-wins');
let gameOver = false;  // Flag to track if the game is over

// Set initial round and player status
statusDisplay.textContent = `Player ${currentPlayer} turn`; 
roundNumberDisplay.textContent = `${round}`;

// Function to handle cell clicks
function handleClickCell(event) {
  if (gameOver) return;  // Prevent moves after the game is over

  const cell = event.target;
  const cellIndex = cell.getAttribute('data-cell');//(data-cell="0", data-cell="1" attribute uniquely identify each cell by index)

  // Calculate row and column from the cell index
  const row = Math.floor(cellIndex / 3);// example cellIndex = 5: Row: 1 (second row in the board, since indexing starts at 0)
  const column = cellIndex % 3;// example cellIndex = 5: Column: 2 (third column)

  // Check if the cell is empty
  if (board[row][column] === '') {
    board[row][column] = currentPlayer;
    
    // Render a cross or circle
    if (currentPlayer === 'X') {
      const cross = document.createElement('div');
      cross.classList.add('cross');
      cell.appendChild(cross);
    } else {
      const circle = document.createElement('div');
      circle.classList.add('circle');
      cell.appendChild(circle);
    }

    // Check for win or draw here
    if (checkForWin()) {
      statusDisplay.textContent = `Player ${currentPlayer} wins!`;
      highlightWinningCells(); // Highlight the winning cells
      updateWinCount(currentPlayer);
      gameOver = true;  // Set game over flag
      return;
    } else if (checkForDraw()) {
      statusDisplay.textContent = `It's a draw!`;
      gameOver = true;  // Set game over flag
      return;
    }

    // Switch Player
    currentPlayer = currentPlayer === 'X'? 'O': 'X';
    statusDisplay.textContent = `Player ${currentPlayer} turn`;
  }
}

// Function to check for a WIN
function checkForWin() {
  // Flatten board for easier access to win combinations
  const flatBoard = board.flat();//It will produce a 1D array: ['', '', '', '', '', '', '', '', '']. 

  // Check each win combination
  return winCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
        flatBoard[a] &&  // Ensure the cell isn't empty
        flatBoard[a] === flatBoard[b] &&  // Cells a and b should be the same value
        flatBoard[a] === flatBoard[c]    // Cells a and c should also be the same value
      );
  });
}

// Function to check for a draw
function checkForDraw() {
  return board.flat().every(cell => cell !== '');
}
  
// Function to reset the game
function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.innerHTML = ''; 
    cell.style.backgroundColor = '';
    cell.style.color = '';
  });
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  gameOver = false;  // Reset game over flag

  // Increment round and update round number display
  round++;
  roundNumberDisplay.textContent = `${round}`;
}

  // Function to highlight the winning cells
function highlightWinningCells() {
  const flatBoard = board.flat();
  winCombinations.forEach(combination => {
    const [a, b, c] = combination;
      if (flatBoard[a] === flatBoard[b] && flatBoard[a] === flatBoard[c] && flatBoard[a] !== '') {
        combination.forEach(index => {
          const cell = document.querySelectorAll('.cell')[index];
          cell.style.backgroundColor = '#F9D459'; // Highlight the cell background to Yellow
          cell.style.color = '#F34954'; // Highlight to Red
          
          // Change the colors of the cross or circle inside the cell
          const symbol = cell.querySelector('.cross') || cell.querySelector('.circle');
          if (symbol) {
            if (symbol.classList.contains('cross')) {
              // Add the 'winning' class to the cross
              symbol.classList.add('winning');
            } else if (symbol.classList.contains('circle')) {
              // Change the circle's border color for the win
              symbol.style.borderColor = '#F34954';
            }
          }
        });
      }
  });
}

function updateWinCount(player) {
  if (player === 'X') {
    player1Wins++;
    player1WinsDisplay.textContent = player1Wins;
  } else {
    player2Wins++;
    player2WinsDisplay.textContent = player2Wins;
  }
}
  
// Event listeners for cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleClickCell));
document.getElementById('reset').addEventListener('click', resetGame);