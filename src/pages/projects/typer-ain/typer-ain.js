let ain = {
  gameArea: document.querySelector('#ain-game'),
  scoreArea: {
    currentScore: document.querySelector('#ain-current-score'),
    highScore: document.querySelector('#ain-high-score'),
    speed: document.querySelector('#ain-speed'),
  },
  currentScore: 0,
  highScore: 0,
  speed: 1,
  chars: [], // [{ letter:'a', x:0, y:0 },...]
  getRandomChar: () => {
    //TODO add uppercase or special characters
    // const upperCase = Math.random() < 0.5
    // const charCode = upperCase
    //   ? Math.floor(Math.random() * 26) + 65
    //   : Math.floor(Math.random() * 26) + 97

    //* caseless
    const charCode = Math.floor(Math.random() * 26) + 97
    return String.fromCharCode(charCode)
  },
}

//* Main loop once the game starts
const ainLoop = () => {
  const ctx = ain.gameArea.getContext('2d')
  ctx.clearRect(0, 0, ain.gameArea.width, ain.gameArea.height)

  ctx.font = '18px monospace'

  // generate char
  if (Math.random() < ain.charSpawnRate) {
    const newChar = {
      letter: ain.getRandomChar(),
      x: Math.round(Math.random() * ain.gameArea.width),
      y: 0,
    }
    ain.chars.push(newChar)
  }

  ain.chars.forEach((char, index) => {
    // move chars
    //TODO make the speed variable for each char
    char.y += 1 * ain.speed
    // place chars on screen
    ctx.fillText(char.letter, char.x, char.y)
  })

  if (ain.chars.length > 20) {
    ain.chars.shift()
  }

  ain.scoreArea.currentScore.textContent = `CurrentScore: ${ain.currentScore}`
  ain.scoreArea.highScore.textContent = `High Score: ${ain.highScore}`
  ain.scoreArea.speed.textContent = `Speed: ${ain.speed}`
  requestAnimationFrame(ainLoop)
}

//* Event Listeners
document.addEventListener('keypress', (e) => {
  let matched = false
  for (let i = 0; i < ain.chars.length; i++) {
    if (e.key === ain.chars[i].letter) {
      matched = true
      ain.currentScore++
      ain.chars.splice(i, 1)
      break
    }
  }
  if (!matched) {
    console.log('bad key press')
    ain.currentScore--
  }
})
document.querySelector('#ain-start').addEventListener('click', (e) => {
  e.target.toggleAttribute('disabled')
  ain.currentScore = 0
  ain.charSpawnRate = 0.03
  ain.speed = 1
  ainLoop()
})
