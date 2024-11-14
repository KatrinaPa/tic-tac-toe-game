let board = [
    ['', '', ''],//index: 0,1,2
    ['', '', ''],//index: 3,4,5
    ['', '', '']//index: 6,7,8
];

let currentPlayer = 'X';
const statusDisplay = document.getElementById('status');//also: querySelector('#status')
const cells = document.querySelectorAll('.cell');
let gameOver = false;  // Flag to track if the game is over

// Display current player's turn
statusDisplay.textContent = `Player ${currentPlayer} turn`;

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
        cell.textContent = currentPlayer;

        // Check for win or draw here
        if (checkForWin()) {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;  // Set game over flag
            return;
        } else if (checkForDraw()) {
            statusDisplay.textContent = `It's a draw!`;
            gameOver = true;  // Set game over flag
            return;
        }

        // Switch Player
        currentPlayer = currentPlayer === 'X'? 'O': 'X';// condition ? valueIfTrue : valueIfFalse
        statusDisplay.textContent = `Player ${currentPlayer} turn`;
    }
}

// Function to check for a WIN
function checkForWin() {
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

    // Flatten board for easier access to win combinations
    const flatBoard = board.flat();//It will produce a 1D array: ['', '', '', '', '', '', '', '', '']. 
    //Example: Index 3 in flatBoard corresponds to the cell at position (1, 0) in the 2D array (middle-left).
    //Example: first row of the original 2D array ['', '', ''] -> flatBoard[0], flatBoard[1], flatBoard[2]

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
    cells.forEach(cell => (cell.textContent = ''));
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
  
  // Event listeners for cells and reset button
  cells.forEach(cell => cell.addEventListener('click', handleClickCell));
  document.getElementById('reset').addEventListener('click', resetGame);
