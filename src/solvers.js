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
  var solutionObj = {};
  let newBoard = new Board({n: n});
  var count = 0;
  let hashMatrix = createHashMatrix(n);
  newBoard.rowIdx = {}; //Remembers which row we have included a 1
  newBoard.colIdx = {}; //Remember which column we have included a 1

  //Refactor the generation of new key:
  //Ideas: create a hashing function - see Jorge's repl.it
  let findValidRook = function(possibleValues, newBoard) {
    if (possibleValues === 0) {
      let validMatrix = newBoard.attributes;
      // let validMatrixStr = JSON.stringify(validMatrix);
      let hash = generateHashKey(hashMatrix, validMatrix);

      if (!solutionObj[hash]) {
        count ++;
        solutionObj[hash] = count;
      }
      return;
    }

    for (let i = 0; i < newBoard.attributes.n; i++) {
      if (!newBoard.rowIdx[i]) {
        for (let j = 0; j < newBoard.attributes.n; j++) {
          if (!newBoard.colIdx[i]) {
            newBoard.togglePiece(i, j);
            newBoard.rowIdx[i] = true;
            newBoard.colIdx[j] = true;
            findValidRook(possibleValues - 1, newBoard);
            newBoard.togglePiece(i, j);
            newBoard.rowIdx[i] = false;
            newBoard.colIdx[j] = false;
          }
          // if (!newBoard.hasColConflictAt(j)) {
          //   colIdx[j] = true;
          //   //Push current coordinates into changesArr
          //   //Pop off current coordinates into changesArr
          //   newBoard.togglePiece(i, j);
          // } else {
          //   newBoard.togglePiece(i, j);
          // }
        }
      }
    }
  };

  // this.attributes[i][j]

  findValidRook(n, newBoard);
  let solutionCount = count;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.createHashMatrix = function(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    let temp = [];
    for (let j = 0; j < n; j++) {
      temp.push(Math.floor(Math.random() * 100000000000));
    }
    arr.push(temp);
  }
  return arr;
};

window.generateHashKey = function(hashMatrix, validBoard) {
  let hashKey = 0;
  for (let i = 0; i < validBoard.n; i++) {
    for (let j = 0; j < validBoard.n; j++) {
      if (validBoard[i][j] === 0) {
        continue;
      } else {
        hashKey += validBoard[i][j] * hashMatrix[i][j];
      }
    }
  }
  return hashKey;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
