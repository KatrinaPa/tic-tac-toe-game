/* 
//Set Up Game Board:
- Create a 3x3 grid using an array. Example: let board = [['','',''], ['','',''], ['','','']].
- Assign a name (or use an index) to each square for easy reference.
- Define currentPlayer to 'X'.

//Player Move and Input Handling:
Function: handleClickCell(cell_index)
- If the current cell is empty, update it with currentPlayer ('X' or 'O').
- With function switchPlayer() switch currentPlayer to the next player (if it is 'X' then update to 'O').

//Check for Win:
Function: checkForWin()
- Define all winning combinations (in total 8 - rows, columns, diagonals) and loop through each combination.
- If a combination is met, display "Player 'X' or 'O' wins!" (and stop the game.)


//Check for Draw:
Function: checkForDraw()
- Check if all cells are filled and no winning combination is met, display message: "It's a draw!" (and stop the game.)

//Reset Game:
Function: resetGame()
- Clear the board and reset currentPlayer to 'X' for a new game.

//User Interface (HTML & CSS):
- Create a 3x3 grid using HTML elements (div's, buttons …).
- Style with CSS.
- Display the current player's turn and game results.
- Add reset button to start a new game.

//Create a visual prototype of the game in Figma.
*/