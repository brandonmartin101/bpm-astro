// global config object
let ttt = {
  board: document.getElementById('board'),
  boardSize: 3,
}

// set up game board
const createBoard = () => {
  // re-initialize game values
  ttt.board.innerHTML = ''
  ttt.cells = []
  ttt.gameOver = false
  ttt.currentPlayer = 'X'

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.dataset.index = i + 1
    cell.addEventListener('click', (e) => {
      const cell = e.target
      if (cell.textContent || ttt.gameOver) return
      cell.textContent = ttt.currentPlayer
      checkWinner()
      ttt.currentPlayer = ttt.currentPlayer === 'X' ? 'O' : 'X'
    })
    ttt.board.appendChild(cell)
    ttt.cells.push(cell)
  }

  const result = document.createElement('div')
  result.id = 'result'
  ttt.board.appendChild(result)
}

const checkWinner = () => {
  let grid = []
  ttt.board.querySelectorAll('.cell').forEach((e) => {
    e.textContent === '' ? grid.push(null) : grid.push(e.textContent)
  })
  console.log(grid)

  // check rows for win
  for (let i = 0; i < ttt.boardSize; i += 3) {
    if (grid[i] === grid[i + 1] && grid[i] === grid[i + 2]) {
      gameOver('win')
      return
    }
  }

  // check columns for win
  for (let i = 0; i < ttt.boardSize; i++) {
    if (grid[i] === grid[i + 3] && grid[i] === grid[i + 6]) {
      gameOver('win')
      return
    }
  }

  // check diagonals for win

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const gameOver = (winDraw) => {
    ttt.gameOver = true
    const result = document.getElementById('result')
    const winner = ttt.currentPlayer === 'X' ? 'X' : 'O'
    if (winDraw === 'draw') {
      result.textContent = "It's a draw!"
    } else {
      result.textContent = `${winner} wins!`
    }
    result.style.left = '0'
  }

  for (const combo of winningCombos) {
    const [a, b, c] = combo
    if (
      ttt.cells[a].textContent &&
      ttt.cells[a].textContent === ttt.cells[b].textContent &&
      ttt.cells[a].textContent === ttt.cells[c].textContent
    ) {
      gameOver('win')
      return
    }
  }

  if (![...ttt.cells].some((cell) => !cell.textContent)) {
    gameOver('draw')
  }
}

//* game init
document.addEventListener('DOMContentLoaded', createBoard)
document.querySelector('#launch-game').addEventListener('click', createBoard)
