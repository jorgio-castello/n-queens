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
  var solution = undefined; //fixme
  //Create a new Board({n: n})
  //after first recursion: board's changes array, will include [permuations of the original board]
  //after second recursion: each of the original board's permuations, will have their changes array populated with their own permutations
  //n recursion:
  // base case

  // an inner function
  // this function will accept possible values, and the current state of the board
  // Loop over the rows - first pass i = 0
  //if the sum of rows[i] elements is equal to 1, do not run nested for loop
    // Loop over the columns - first pass i = 0
  // Toggle the element at [i][i]
  // See if the current board passes its respective tests (rook) && if the board isn't already fully populated
  // parameterBoard.changes.push(generatePermutations(possibleValues - 1, ))

  // get a fully populated board

  // recurse(possibleValues, newBoard)

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
