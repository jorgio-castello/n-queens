/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// Brute Force
// Don’t check past invalids
// Look forward
// Once you place something on a row, skip that row




window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme
  //Create a new Board({n: n})
  var newBoard = new Board({'n': n});
  //Declare chessBoard and assign it to newBoard.rows()
  // var chessBoard = newBoard.rows();

  // define recursive function findValidRook with parameters possibleValues and newBoard
  var findValidRook = function(possibleValues, newBoard) {
    // base case to end recursion
    if (possibleValues === 0) {
      return newBoard.rows();
    }
    // loop over the chessBoard's rows (using attributes method and n length)
    for (let i = 0; i < newBoard.attributes.n; i++) {
      // if the sum of the rows' column indexes = zero
      if ((newBoard.attributes[i].reduce((accum, element) => accum + element)) === 0) {
        // iterate over the columns
        for (let j = 0; j < newBoard.attributes.n; j++) {
          // toggle the value at i
          newBoard.togglePiece(i, j);
          // if test chessBoard on hasAnyRooksConflicts method is false
          if (newBoard.hasAnyRooksConflicts() === false) {
            // recurse findValidRook with parameters (possibleValues - 1, chessBoard)
            return findValidRook(possibleValues - 1, newBoard);
          // otherwise
          } else {
            // toggle
            newBoard.togglePiece(i, j);
          }
        }
      }
    }
  };

  let solution = findValidRook(n, newBoard);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let newBoard = new Board({n: n});
  var count = 0;

  //Refactor the generation of new key:
  //Ideas: create a hashing function - see Jorge's repl.it
  let findValidRook = function(row, possibleValues, newBoard) {
    if (row === possibleValues) {
      count++;
      return;
    }

    //Loop through the columns
    for (let i = 0; i < possibleValues; i++) {
      //Toggle at row, i
      newBoard.togglePiece(row, i);
      if (!newBoard.hasAnyRooksConflicts()) {
        findValidRook(row + 1, possibleValues, newBoard);
      }
      newBoard.togglePiece(row, i);
    }

    return count;
  };

  findValidRook(0, n, newBoard);
  let solutionCount = count;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // make new board
  var newBoard = new Board({n: n});

  // declare a find queens function
  let queensCurse = function(row, possibleValues, newBoard) {
    // if the current row index is equal to possible values
    if (row === possibleValues) {
      // return board.rows();
      return newBoard.rows();
    }

    // loop throuhg columns, incrmeneting by 1
    for (let i = 0; i < n; i++) {
      // toogle the piece at row, i
      newBoard.togglePiece(row, i);
      // check if its valid by queens tests
      if (!newBoard.hasAnyQueensConflicts()) {
        // let result = findqueens function (row + 1, posvals, newboard)
        let result = queensCurse(row + 1, possibleValues, newBoard);
        // if result true
        if (result) {
          // return result
          return result;
        }
      }
      // toggle the piece at row i if no conflicts
      newBoard.togglePiece(row, i);
    }
  };

  //var solution = queens function(0);
  let solution = queensCurse(0, n, newBoard);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution || newBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let newBoard = new Board({n: n});
  var solutionCount = 0;

  //Define an inner function to determine number of possible valid boards for a given n-dimensional setup
  //The goal here is to loop through the columns and recurse through the rows
  let findNQueens = function(row, possibleValues, newBoard) {
    //Base Case: Recurse until rows reach the value of n
    if (row === possibleValues) {
      solutionCount++;
      return; //Get out of this recursive call
    }

    //Loop through the columns
    for (let i = 0; i < n; i++) {
      //For each position of (row, column) toggle the value
      newBoard.togglePiece(row, i);
      //Check to see if there are any issues with our conflictsQueen method
      if (!newBoard.hasAnyQueensConflicts()) {
        //If no conflicts, invoke the inner function on row + 1, possible values, and the current state of the board
        findNQueens(row + 1, possibleValues, newBoard);
      }
      //Toggle the value from 1 to 0
      newBoard.togglePiece(row, i);
    }
  };

  //Invoke the inner function on row = 0, n, and the newBoard
  findNQueens(0, n, newBoard);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
