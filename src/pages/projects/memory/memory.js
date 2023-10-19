const cards = document.querySelectorAll('.memory-card')
let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

function flipCard() {
  if (lockBoard) return
  if (this === firstCard) return
  this.classList.add('flip')
  if (!hasFlippedCard) {
    hasFlippedCard = true
    firstCard = this
    return
  }
  secondCard = this
  checkForMatch()
}

function checkForMatch() {
  let isMatch = firstCard.dataset.pattern === secondCard.dataset.pattern
  isMatch ? disableCards() : unflipCards()
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
  resetBoard()
}

function unflipCards() {
  lockBoard = true
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetBoard()
  }, 1000)
}

function resetBoard() {
  ;[hasFlippedCard, lockBoard] = [false, false]
  ;[firstCard, secondCard] = [null, null]
}

;(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12)
    card.style.order = randomPos
  })
})()

cards.forEach((card) => card.addEventListener('click', flipCard))

//TODO add score of some kind
//? timer for score? lose points for missing a match?
//? increase score for card flip, lowest score with all matches is best?
//TODO add button to play again
