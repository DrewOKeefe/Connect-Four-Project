/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = [];
// array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array.from({ length: WIDTH }));
	}
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	const htmlBoard = document.getElementById('board');

	// creates top row to add game pieces
	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	// adds cells to top row
	for (let x = 0; x < WIDTH; x++) {
		let headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	// creates other columns and rows in board and assigns a coordinant to cells
	for (let y = 0; y < HEIGHT; y++) {
		// iterate through height
		const row = document.createElement('tr'); // to create rows
		for (let x = 0; x < WIDTH; x++) {
			// iterates through columns
			const cell = document.createElement('td'); // to create cells
			cell.setAttribute('id', `${y}-${x}`); // gives cells a coordinate
			row.append(cell); // appends cell to row
		}
		htmlBoard.append(row); // appends rows to board
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
	for (let y = HEIGHT - 1; y >= 0; y--) {
		// iterate through height in reverse
		if (!board[y][x]) {
			// if not on board
			return y; // return top empty y
		}
	}
	return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
	const piece = document.createElement('div'); // creates piece div
	piece.classList.add('piece'); // assigns CSS
	piece.classList.add(`p${currPlayer}`); // assigns CSS player
	piece.style.top = -50 * (y + 2); // assigns location in column

	const spot = document.getElementById(`${y}-${x}`); // assigns coordinate to piece
	spot.append(piece); // appends piece
}

/** endGame: announce game end */

function endGame(msg) {
	// TODO: pop up alert message
	alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	const x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	if (board.every((row) => row.every((cell) => cell))) {
		return endGame('Tie!');
	}
	// switch players
	// TODO: switch currPlayer 1 <-> 2
	currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(
			([y, x]) =>
				y >= 0 &&
				y < HEIGHT &&
				x >= 0 &&
				x < WIDTH &&
				board[y][x] === currPlayer
		);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (var y = 0; y < HEIGHT; y++) {
		//iterates through height
		for (var x = 0; x < WIDTH; x++) {
			// iterates through width
			var horiz = [
				// checks to see horizontal currPlayer match
				[y, x],
				[y, x + 1],
				[y, x + 2],
				[y, x + 3],
			];
			var vert = [
				// checks to see vertical currPlayer match
				[y, x],
				[y + 1, x],
				[y + 2, x],
				[y + 3, x],
			];
			var diagDR = [
				// checks to see daiag down-right currPlayer match
				[y, x],
				[y + 1, x + 1],
				[y + 2, x + 2],
				[y + 3, x + 3],
			];
			var diagDL = [
				// checks to see diag down-left currPlayer match
				[y, x],
				[y + 1, x - 1],
				[y + 2, x - 2],
				[y + 3, x - 3],
			];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
