// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      // this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //Declare row & grab the row from attributes based on the index
      let row = this.attributes[rowIndex];
      //Declare an empty array
      let conflictArr = [];
      //Iterate through the row -
      for (let i = 0; i < row.length; i++) {
        //If the current element is === 1
        if (row[i] === 1) {
        //push into the emptyArr
          conflictArr.push(row[i]);
        }
      }
      //return emptyArr.length > 1
      return conflictArr.length > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (let i = 0; i < this.attributes['n']; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let rows = this.rows();
      let conflictArr = [];

      for (let i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1) {
          conflictArr.push(rows[i][colIndex]);
        }
      }
      return conflictArr.length > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (let i = 0; i < this.attributes['n']; i++ ) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(rowStartIndex, majorDiagonalColumnIndexAtFirstRow) {
      //Declare conflictArr
      let conflictArr = [];
      //Declare rows = this.rows();
      let rows = this.rows();

      //Loop through the rows
      while (this._isInBounds(rowStartIndex, majorDiagonalColumnIndexAtFirstRow)) {
        if (rows[rowStartIndex][majorDiagonalColumnIndexAtFirstRow] === 1) {
          conflictArr.push(rows[rowStartIndex][majorDiagonalColumnIndexAtFirstRow]);
        }
        rowStartIndex++;
        majorDiagonalColumnIndexAtFirstRow++;
      }

      return conflictArr.length > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //Iterate through the rows
      for (let i = 0; i < this.attributes.n - 1; i++) {
        if (this.hasMajorDiagonalConflictAt(i, 0)) {
          return true;
        }
      }
      //Iterate through the columns - starting at 1 because iterating through the rows will handle the first major diagonal
      for (let i = 1; i < this.attributes.n - 1; i++) {
        //For each diagonal, it should invoke hasMajorDiagonalConflict
        if (this.hasMajorDiagonalConflictAt(0, i)) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(rowStartIndex, minorDiagonalColumnIndexAtFirstRow) {
      // assign conflict array
      let conflictArr = [];
      // assign this.rows() to rows
      let rows = this.rows();

      while (this._isInBounds(rowStartIndex, minorDiagonalColumnIndexAtFirstRow)) {
        if (rows[rowStartIndex][minorDiagonalColumnIndexAtFirstRow] === 1) {
          conflictArr.push(rows[rowStartIndex][minorDiagonalColumnIndexAtFirstRow]);
        }
        rowStartIndex++;
        minorDiagonalColumnIndexAtFirstRow--;
      }

      return conflictArr.length > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // iterate through columns
      for (let i = this.attributes.n - 1; i > 0; i--) {
        if (this.hasMinorDiagonalConflictAt(0, i)) {
          return true;
        }
      }

      //iterate through rows
      for (let i = 1; i < this.attributes.n - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i, this.attributes.n - 1)) {
          return true;
        }

      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
