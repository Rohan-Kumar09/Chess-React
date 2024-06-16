"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./ChessBoard.css");
var chessPieces = _interopRequireWildcard(require("./assets/index.js"));
var _exportSound = require("./assets/exportSound.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/*

NOTE: turn set to white for debugging
reset button is not well tested - don't trust it.

TODO:
king checks

add arrows on right click
Add piece style chooser drop down menu.
Add Valid Move Shower For Beginners.

en passant
checkmate detection
castling

pins - don't allow the king to move if it's in check

forks - attack two pieces at once

dont allow the king to move to a square that is attacked by the opponent

notation system
*/

function ChessBoard() {
  var audio = new Audio(_exportSound.moveSound); // sound for moving pieces
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    history = _useState2[0],
    setHistory = _useState2[1]; // history of moves

  var _useState3 = (0, _react.useState)(function () {
      return InitializeBoard();
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    board = _useState4[0],
    setBoard = _useState4[1];
  var _useState5 = (0, _react.useState)({
      piece: ' ',
      row: -1,
      col: -1,
      name: 'empty'
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    selectedPiece = _useState6[0],
    setSelectedPiece = _useState6[1];
  var _useState7 = (0, _react.useState)('white'),
    _useState8 = _slicedToArray(_useState7, 2),
    turn = _useState8[0],
    setTurn = _useState8[1];
  var color = 'white';
  turn == 'white' ? color = 'rgb(104, 121, 214)' : color = 'darkblue';
  var _useState9 = (0, _react.useState)('rotate(0deg)'),
    _useState10 = _slicedToArray(_useState9, 2),
    playAs = _useState10[0],
    setPlayAs = _useState10[1];
  // const [pieceStyle, setPieceStyle] = useState(0);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "game-display"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "chess-board",
    style: {
      transform: playAs
    }
  }, /*#__PURE__*/_react["default"].createElement(RenderBoard, {
    selectedPiece: selectedPiece,
    setSelectedPiece: setSelectedPiece,
    board: board,
    setBoard: setBoard,
    turn: turn,
    setTurn: setTurn,
    playAs: playAs,
    audio: audio
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "buttons"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "toggle-btn",
    onClick: function onClick() {
      playAs === 'rotate(180deg)' ? setPlayAs('rotate(0deg)') : setPlayAs('rotate(180deg)');
    }
  }, "\uD83D\uDD03"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "reset-btn",
    onClick: function onClick() {
      setBoard(InitializeBoard());
      setTurn('white');
      setSelectedPiece({
        piece: ' ',
        row: -1,
        col: -1,
        name: 'empty'
      });
    }
  }, "\uD83D\uDD04")), /*#__PURE__*/_react["default"].createElement("table", {
    className: "move-table"
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", {
    className: "title"
  }, /*#__PURE__*/_react["default"].createElement("th", null, "Move"), /*#__PURE__*/_react["default"].createElement("th", null, "White"), /*#__PURE__*/_react["default"].createElement("th", null, "Black"))), /*#__PURE__*/_react["default"].createElement("tbody", {
    className: "move-history"
  }, /*#__PURE__*/_react["default"].createElement("tr", {
    className: "move"
  }, /*#__PURE__*/_react["default"].createElement("td", null, "1"), /*#__PURE__*/_react["default"].createElement("td", null, "e4"), /*#__PURE__*/_react["default"].createElement("td", null, "e5")), /*#__PURE__*/_react["default"].createElement("tr", {
    className: "move"
  }, /*#__PURE__*/_react["default"].createElement("td", null, "2"), /*#__PURE__*/_react["default"].createElement("td", null, "..."), /*#__PURE__*/_react["default"].createElement("td", null, "..."))))), /*#__PURE__*/_react["default"].createElement("div", {
    id: "info"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    id: "turn-variable"
  }, "Turn: "), /*#__PURE__*/_react["default"].createElement("h1", {
    id: "turn-variable",
    style: {
      color: color
    }
  }, turn)));
}
var _default = exports["default"] = ChessBoard;
function RenderBoard(_ref) {
  var selectedPiece = _ref.selectedPiece,
    setSelectedPiece = _ref.setSelectedPiece,
    board = _ref.board,
    setBoard = _ref.setBoard,
    turn = _ref.turn,
    setTurn = _ref.setTurn,
    playAs = _ref.playAs,
    audio = _ref.audio;
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    squares = _useState12[0],
    setSquares = _useState12[1];
  var classColor = 'White-Square';
  (0, _react.useEffect)(function () {
    var newSquares = [];
    var _loop = function _loop(i) {
      var _loop2 = function _loop2(j) {
        (j - i) % 2 === 0 ? classColor = "White-Square" : classColor = "Black-Square";
        newSquares.push( /*#__PURE__*/_react["default"].createElement("button", {
          style: {
            transform: playAs
          },
          id: "Squares",
          className: classColor,
          key: "".concat(i, "-").concat(j),
          draggable: true,
          onDragStart: function onDragStart(e) {
            e.dataTransfer.effectAllowed = "move";
            setSelectedPiece({
              piece: board[i][j].emoji,
              row: i,
              col: j,
              name: board[i][j].name
            });
            var img = new Image();
            img.src = chessPieces[board[i][j].name];
            e.dataTransfer.setDragImage(img, 50, 50);
          },
          onDragOver: function onDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          },
          onDrop: function onDrop() {
            MakeAMove(selectedPiece, i, j, setBoard, board, setSelectedPiece, turn, setTurn, audio);
          },
          onClick: function onClick(e) {
            e.preventDefault();
            console.log(i, j, board[i][j].name, board[i][j].coordinate);
            // only select a piece if it's the right turn
            if (turn === 'white' && board[i][j].name[0] === 'W') {
              setSelectedPiece({
                piece: board[i][j].emoji,
                row: i,
                col: j,
                name: board[i][j].name
              });
            } else if (turn === 'black' && board[i][j].name[0] === 'B') {
              setSelectedPiece({
                piece: board[i][j].emoji,
                row: i,
                col: j,
                name: board[i][j].name
              });
            } else if (turn === 'white' && board[i][j].name[0] !== 'W' || turn === 'black' && board[i][j].name[0] !== 'B') {
              // then make a move
              MakeAMove(selectedPiece, i, j, setBoard, board, setSelectedPiece, turn, setTurn, audio);
            }
          },
          onContextMenu: function onContextMenu(e) {
            e.preventDefault();
            console.log('right click at position: ', board[i][j].coordinate);
            if (e.currentTarget.style.backgroundColor === 'red') {
              if (classColor === 'White-Square') {
                var element = document.querySelector('.White-Square');
                var style = window.getComputedStyle(element);
                e.currentTarget.style.backgroundColor = style.backgroundColor;
              } else if (classColor === 'Black-Square') {
                var _element = document.querySelector('.Black-Square');
                var _style = window.getComputedStyle(_element);
                e.currentTarget.style.backgroundColor = _style.backgroundColor;
              }
            } else {
              e.currentTarget.style.backgroundColor = 'red';
            }
          }
        }, " ", /*#__PURE__*/_react["default"].createElement("img", {
          className: "chess-piece",
          src: chessPieces[board[i][j].name],
          alt: board[i][j].emoji
        })));
      };
      for (var j = 0; j < 8; j++) {
        _loop2(j);
      }
    };
    for (var i = 0; i < 8; i++) {
      _loop(i);
    }
    setSquares(newSquares);
  }, [board, selectedPiece, playAs]);
  return squares;
}

// PreCondition: selectedPiece is a valid piece
// PostCondition: moves the selected piece to the goToRow and goToCol
//                Switches turn to other player's turn and sets the new board
//                Promotes pawns if they reach the end of the board
function MakeAMove(selectedPiece, goToRow, goToCol, setBoard, board, setSelectedPiece, turn, setTurn, audio) {
  var isValidPieceMove = FindValidMoves(selectedPiece, goToRow, goToCol, board, turn, setTurn, audio);
  var newBoard = board;
  var pieces = Pieces();
  if (isValidPieceMove) {
    if (selectedPiece.name[0] === 'W' && board[goToRow][goToCol].name[0] === 'W') {
      // if white captures white piece, return
      setSelectedPiece({
        emoji: ' ',
        row: -1,
        col: -1,
        name: 'empty'
      });
      return;
    } else if (selectedPiece.name[0] === 'B' && board[goToRow][goToCol].name[0] === 'B') {
      // if black captures black piece, return
      setSelectedPiece({
        emoji: ' ',
        row: -1,
        col: -1,
        name: 'empty'
      });
      return;
    } else {
      // if it's a valid move
      audio.play();
      newBoard[selectedPiece.row][selectedPiece.col] = {
        emoji: ' ',
        name: 'empty',
        coordinate: board[selectedPiece.row][selectedPiece.col].coordinate
      }; // remove the piece from the old square
      newBoard[goToRow][goToCol] = {
        emoji: selectedPiece.piece,
        name: selectedPiece.name,
        coordinate: board[goToRow][goToCol].coordinate
      }; // place the piece in the new square

      if (selectedPiece.name === 'Wpawn' && goToRow === 0) {
        // if white pawn on promotion square
        board[goToRow][goToCol] = {
          emoji: pieces.Wqueen.emoji,
          name: pieces.Wqueen.name
        }; // promote the pawn to a queen
      } else if (selectedPiece.name === 'Bpawn' && goToRow === 7) {
        // if black pawn on promotion square
        board[goToRow][goToCol] = {
          emoji: pieces.Bqueen.emoji,
          name: pieces.Bqueen.name
        }; // promote the pawn to a queen
      }
      setSelectedPiece({
        emoji: ' ',
        row: -1,
        col: -1,
        name: 'empty'
      }); // remove the selected piece
    }
  } else if (!isValidPieceMove) {
    // remove selected piece if invalid move
    setSelectedPiece({
      emoji: ' ',
      row: -1,
      col: -1,
      name: 'empty'
    });
    return; // if invalid move then don't change turn.
  }
  switchTurn(turn, setTurn);
  setBoard(newBoard);
}

// PreCondition: selectedPiece is a valid piece
// PostCondition: returns true if there's a piece blocking the selected piece from moving to goToRow and goToCol
function isBlocked(selectedPiece, goToRow, goToCol, board) {
  if (selectedPiece.name === 'Bpawn') {
    if (board[selectedPiece.row + 1][selectedPiece.col].name[0] !== 'e') {
      return true;
    }
  } else if (selectedPiece.name === 'Wpawn') {
    if (board[selectedPiece.row - 1][selectedPiece.col].name[0] !== 'e') {
      return true;
    }
  } else if (selectedPiece.name === 'Brook' || selectedPiece.name === 'Wrook') {
    if (goToRow < selectedPiece.row) {
      // if going up the board
      for (var i = selectedPiece.row - 1; i > goToRow; i--) {
        if (board[i][selectedPiece.col].name[0] !== 'e') {
          return true;
        }
      }
    } else if (goToRow > selectedPiece.row) {
      // if going down the board
      for (var _i = selectedPiece.row + 1; _i < goToRow; _i++) {
        if (board[_i][selectedPiece.col].name[0] !== 'e') {
          return true;
        }
      }
    } else if (goToCol < selectedPiece.col) {
      // if going left the board
      for (var _i2 = selectedPiece.col - 1; _i2 > goToCol; _i2--) {
        if (board[selectedPiece.row][_i2].name[0] !== 'e') {
          return true;
        }
      }
    } else {
      for (var _i3 = selectedPiece.col + 1; _i3 < goToCol; _i3++) {
        if (board[selectedPiece.row][_i3].name[0] !== 'e') {
          return true;
        }
      }
    }
  } else if (selectedPiece.name === 'Bbishop' || selectedPiece.name === 'Wbishop') {
    if (selectedPiece.col > goToCol && selectedPiece.row < goToRow) {
      // if going down and left
      console.log('going down and left');
      for (var _i4 = selectedPiece.row + 1, j = selectedPiece.col - 1; _i4 < goToRow; _i4++, j--) {
        if (board[_i4][j].name[0] !== 'e') {
          return true;
        }
      }
    } else if (selectedPiece.col < goToCol && selectedPiece.row < goToRow) {
      // if going down and right
      console.log('going down and right');
      for (var _i5 = selectedPiece.row + 1, _j = selectedPiece.col + 1; _i5 < goToRow; _i5++, _j++) {
        if (board[_i5][_j].name[0] !== 'e') {
          return true;
        }
      }
    } else if (selectedPiece.col > goToCol && selectedPiece.row > goToRow) {
      // if going up and left
      console.log('going up and left');
      for (var _i6 = selectedPiece.row - 1, _j2 = selectedPiece.col - 1; _i6 > goToRow; _i6--, _j2--) {
        if (board[_i6][_j2].name[0] !== 'e') {
          return true;
        }
      }
    } else if (selectedPiece.col < goToCol && selectedPiece.row > goToRow) {
      // if going up and right
      console.log('going up and right');
      for (var _i7 = selectedPiece.row - 1, _j3 = selectedPiece.col + 1; _i7 > goToRow; _i7--, _j3++) {
        if (board[_i7][_j3].name[0] !== 'e') {
          return true;
        }
      }
    }
  } else if (selectedPiece.name === 'Bqueen' || selectedPiece.name === 'Wqueen') {
    if (goToRow === selectedPiece.row || goToCol === selectedPiece.col) {
      // rook move
      if (isBlocked({
        name: 'Brook',
        row: selectedPiece.row,
        col: selectedPiece.col,
        piece: '♜'
      }, goToRow, goToCol, board)) {
        console.log('queen blocked');
        return true;
      }
    } else if (goToRow + goToCol === selectedPiece.row + selectedPiece.col || goToRow - goToCol === selectedPiece.row - selectedPiece.col) {
      // bishop move
      if (isBlocked({
        name: 'Bbishop',
        row: selectedPiece.row,
        col: selectedPiece.col,
        piece: '♝'
      }, goToRow, goToCol, board)) {
        console.log('queen blocked');
        return true;
      }
    }
  }
  return false;
}

// PreCondition: selectedPiece is a valid piece
// PostCondition: returns true if the piece move is valid, false otherwise
function FindValidMoves(selectedPiece, goToRow, goToCol, board, turn, setTurn, audio) {
  // NOTE: out of bound errors can never happen because the board is 8x8
  // it's impossible to go out of bounds
  if (goToRow === selectedPiece.row && goToCol === selectedPiece.col) return false;
  if (turn == 'white' && selectedPiece.name[0] != 'W') return false;
  if (turn == 'black' && selectedPiece.name[0] != 'B') return false;
  var pieces = Pieces();
  var isValidPieceMove = false;
  switch (selectedPiece.piece) {
    // white pieces
    case pieces.Wpawn.emoji:
      if (selectedPiece.col === goToCol // check if on same col
      && selectedPiece.row === 6 // check if on starting row
      && goToRow === selectedPiece.row - 2 // let it move 2 squares if on starting row
      || selectedPiece.col === goToCol // if on the same col but not on starting row
      && goToRow === selectedPiece.row - 1 // let it move 1 square
      ) {
        if (board[goToRow][goToCol].name[0] === 'B') {
          // if goint forward and there's a piece in front of it
          break; // if there's a piece in front of it
        }
        if (goToRow === 4) {
          // if it's moving 2 squares
          if (isBlocked(selectedPiece, goToRow, goToCol, board)) {
            break;
          }
        }
        isValidPieceMove = true;
      } else if (selectedPiece.row - 1 === goToRow && (selectedPiece.col - 1 === goToCol || selectedPiece.col + 1 === goToCol)
      // if going diagonally and there's a capturable piece
      && board[goToRow][goToCol].name[0] === 'B') {
        isValidPieceMove = true;
        if (goToRow === 0) {
          // promote the pawn
          audio.play();
          board[goToRow][goToCol] = {
            emoji: pieces.Wqueen.emoji,
            name: pieces.Wqueen.name
          };
          board[selectedPiece.row][selectedPiece.col] = {
            emoji: ' ',
            name: 'empty'
          };
          switchTurn(turn, setTurn);
          break; // return false because the pawn has been promoted
        }
      }
      break;
    case pieces.Wrook.emoji:
      // if moving to the same row or col, let it move
      if (goToRow === selectedPiece.row || goToCol === selectedPiece.col) {
        if (isBlocked(selectedPiece, goToRow, goToCol, board)) {
          // if there's a friendly piece in the way or trying to capture an enemy piece over another piece
          break;
        }
        isValidPieceMove = true;
      }
      break;
    case pieces.Wknight.emoji:
      if (goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col + 1 || goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col - 1 || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col + 1 || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col - 1 || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col + 2 || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col - 2 || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col + 2 || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col - 2) {
        isValidPieceMove = true;
      }
      break;
    case pieces.Wbishop.emoji:
      // Diagonal moves is when either the sum or difference of the row and col is the same
      if (goToRow + goToCol === selectedPiece.row + selectedPiece.col || goToRow - goToCol === selectedPiece.row - selectedPiece.col) {
        if (isBlocked(selectedPiece, goToRow, goToCol, board)) {
          break;
        }
        isValidPieceMove = true;
      }
      break;
    case pieces.Wqueen.emoji:
      if (goToRow + goToCol === selectedPiece.row + selectedPiece.col || goToRow - goToCol === selectedPiece.row - selectedPiece.col || goToRow === selectedPiece.row || goToCol === selectedPiece.col) {
        if (isBlocked(selectedPiece, goToRow, goToCol, board)) {
          break;
        }
        isValidPieceMove = true;
      }
      break;
    case pieces.Wking.emoji:
      if (goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col + 1 || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col - 1 || goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col - 1 || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col + 1 || goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col || goToRow == selectedPiece.row && goToCol == selectedPiece.col + 1 || goToRow == selectedPiece.row && goToCol == selectedPiece.col - 1) {
        isValidPieceMove = true;
      }
      break;

    // black pieces
    case pieces.Bpawn.emoji:
      if (selectedPiece.col === goToCol // check if on same col
      && selectedPiece.row === 1 // check if on starting row
      && goToRow === selectedPiece.row + 2 // let it move 2 squares if on starting row
      || selectedPiece.col === goToCol // if on the same col but not on starting row
      && goToRow === selectedPiece.row + 1 // let it move 1 square
      ) {
        if (board[goToRow][goToCol].name[0] === 'W') {
          break; // if there's a piece in front of it
        }
        if (goToRow === 3) {
          // if it's moving 2 squares
          if (isBlocked(selectedPiece, goToRow, goToCol, board)) {
            break;
          }
        }
        isValidPieceMove = true;
      } else if (selectedPiece.row + 1 === goToRow && (selectedPiece.col + 1 === goToCol || selectedPiece.col - 1 === goToCol) && board[goToRow][goToCol].name[0] === 'W') {
        if (goToRow === 7) {
          audio.play();
          board[goToRow][goToCol] = {
            emoji: pieces.Bqueen.emoji,
            name: pieces.Bqueen.name
          };
          board[selectedPiece.row][selectedPiece.col] = {
            emoji: ' ',
            name: 'empty'
          };
          switchTurn(turn, setTurn);
          break; // return false because the pawn has been promoted
        }
        isValidPieceMove = true;
      }
      break;
    case pieces.Brook.emoji:
      if (goToRow === selectedPiece.row || goToCol === selectedPiece.col) {
        if (isBlocked(selectedPiece, goToRow, goToCol, board)) {
          break;
        }
        isValidPieceMove = true;
      }
      break;
    case pieces.Bknight.emoji:
      if (goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col + 1 || goToRow === selectedPiece.row + 2 && goToCol === selectedPiece.col - 1 || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col + 1 || goToRow === selectedPiece.row - 2 && goToCol === selectedPiece.col - 1 || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col + 2 || goToRow === selectedPiece.row + 1 && goToCol === selectedPiece.col - 2 || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col + 2 || goToRow === selectedPiece.row - 1 && goToCol === selectedPiece.col - 2) {
        isValidPieceMove = true;
      }
      break;
    case pieces.Bbishop.emoji:
      if (goToRow + goToCol === selectedPiece.row + selectedPiece.col || goToRow - goToCol === selectedPiece.row - selectedPiece.col) {
        if (isBlocked(selectedPiece, goToRow, goToCol, board)) {
          break;
        }
        isValidPieceMove = true;
      }
      break;
    case pieces.Bqueen.emoji:
      if (goToRow + goToCol === selectedPiece.row + selectedPiece.col || goToRow - goToCol === selectedPiece.row - selectedPiece.col || goToRow === selectedPiece.row || goToCol === selectedPiece.col) {
        if (isBlocked(selectedPiece, goToRow, goToCol, board)) {
          break;
        }
        isValidPieceMove = true;
      }
      break;
    case pieces.Bking.emoji:
      if (goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col + 1 || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col - 1 || goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col - 1 || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col + 1 || goToRow == selectedPiece.row + 1 && goToCol == selectedPiece.col || goToRow == selectedPiece.row - 1 && goToCol == selectedPiece.col || goToRow == selectedPiece.row && goToCol == selectedPiece.col + 1 || goToRow == selectedPiece.row && goToCol == selectedPiece.col - 1) {
        isValidPieceMove = true;
      }
      break;
    default:
      // in case something goes wrong
      console.log("wtf are you selecting?");
      break;
  }
  return isValidPieceMove;
}
function Pieces() {
  var pieces = {
    Bpawn: {
      emoji: '♟',
      name: 'Bpawn'
    },
    Brook: {
      emoji: '♜',
      name: 'Brook'
    },
    Bknight: {
      emoji: '♞',
      name: 'Bknight'
    },
    Bbishop: {
      emoji: '♝',
      name: 'Bbishop'
    },
    Bqueen: {
      emoji: '♛',
      name: 'Bqueen'
    },
    Bking: {
      emoji: '♚',
      name: 'Bking'
    },
    Wpawn: {
      emoji: '♙',
      name: 'Wpawn'
    },
    Wrook: {
      emoji: '♖',
      name: 'Wrook'
    },
    Wknight: {
      emoji: '♘',
      name: 'Wknight'
    },
    Wbishop: {
      emoji: '♗',
      name: 'Wbishop'
    },
    Wqueen: {
      emoji: '♕',
      name: 'Wqueen'
    },
    Wking: {
      emoji: '♔',
      name: 'Wking'
    }
  };
  return pieces;
}
function InitializeBoard() {
  var board = [[{
    emoji: '♜',
    name: 'Brook',
    coordinate: 'a8'
  }, {
    emoji: '♞',
    name: 'Bknight',
    coordinate: 'b8'
  }, {
    emoji: '♝',
    name: 'Bbishop',
    coordinate: 'c8'
  }, {
    emoji: '♛',
    name: 'Bqueen',
    coordinate: 'd8'
  }, {
    emoji: '♚',
    name: 'Bking',
    coordinate: 'e8'
  }, {
    emoji: '♝',
    name: 'Bbishop',
    coordinate: 'f8'
  }, {
    emoji: '♞',
    name: 'Bknight',
    coordinate: 'g8'
  }, {
    emoji: '♜',
    name: 'Brook',
    coordinate: 'h8'
  }], [{
    emoji: '♟',
    name: 'Bpawn',
    coordinate: 'a7'
  }, {
    emoji: '♟',
    name: 'Bpawn',
    coordinate: 'b7'
  }, {
    emoji: '♟',
    name: 'Bpawn',
    coordinate: 'c7'
  }, {
    emoji: '♟',
    name: 'Bpawn',
    coordinate: 'd7'
  }, {
    emoji: '♟',
    name: 'Bpawn',
    coordinate: 'e7'
  }, {
    emoji: '♟',
    name: 'Bpawn',
    coordinate: 'f7'
  }, {
    emoji: '♟',
    name: 'Bpawn',
    coordinate: 'g7'
  }, {
    emoji: '♟',
    name: 'Bpawn',
    coordinate: 'h7'
  }], [{
    emoji: ' ',
    name: 'empty',
    coordinate: 'a6'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'b6'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'c6'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'd6'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'e6'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'f6'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'g6'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'h6'
  }], [{
    emoji: ' ',
    name: 'empty',
    coordinate: 'a5'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'b5'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'c5'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'd5'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'e5'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'f5'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'g5'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'h5'
  }], [{
    emoji: ' ',
    name: 'empty',
    coordinate: 'a4'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'b4'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'c4'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'd4'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'e4'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'f4'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'g4'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'h4'
  }], [{
    emoji: ' ',
    name: 'empty',
    coordinate: 'a3'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'b3'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'c3'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'd3'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'e3'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'f3'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'g3'
  }, {
    emoji: ' ',
    name: 'empty',
    coordinate: 'h3'
  }], [{
    emoji: '♙',
    name: 'Wpawn',
    coordinate: 'a2'
  }, {
    emoji: '♙',
    name: 'Wpawn',
    coordinate: 'b2'
  }, {
    emoji: '♙',
    name: 'Wpawn',
    coordinate: 'c2'
  }, {
    emoji: '♙',
    name: 'Wpawn',
    coordinate: 'd2'
  }, {
    emoji: '♙',
    name: 'Wpawn',
    coordinate: 'e2'
  }, {
    emoji: '♙',
    name: 'Wpawn',
    coordinate: 'f2'
  }, {
    emoji: '♙',
    name: 'Wpawn',
    coordinate: 'g2'
  }, {
    emoji: '♙',
    name: 'Wpawn',
    coordinate: 'h2'
  }], [{
    emoji: '♖',
    name: 'Wrook',
    coordinate: 'a1'
  }, {
    emoji: '♘',
    name: 'Wknight',
    coordinate: 'b1'
  }, {
    emoji: '♗',
    name: 'Wbishop',
    coordinate: 'c1'
  }, {
    emoji: '♕',
    name: 'Wqueen',
    coordinate: 'd1'
  }, {
    emoji: '♔',
    name: 'Wking',
    coordinate: 'e1'
  }, {
    emoji: '♗',
    name: 'Wbishop',
    coordinate: 'f1'
  }, {
    emoji: '♘',
    name: 'Wknight',
    coordinate: 'g1'
  }, {
    emoji: '♖',
    name: 'Wrook',
    coordinate: 'h1'
  }]];
  return board;
}
function switchTurn(turn, setTurn) {
  if (turn === 'white') {
    setTurn('black');
  } else if (turn === 'black') {
    setTurn('white');
  }
}
