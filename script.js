let hasFlipedCard =false
let firstCard,secondCard
let blockBoard = false
function flipCard(card) {
    if (blockBoard || card===firstCard || card.dataset.disabled) return 
    card.classList.add("flip")
    if(!hasFlipedCard) {
        hasFlipedCard =true
        firstCard = card
        return
    }
    secondCard =card
    hasFlipedCard =false
    compareCards(card)
}
function compareCards() {
    if(firstCard.dataset.gem ===secondCard.dataset.gem) {
        firstCard.dataset.disabled = true
        secondCard.dataset.disabled = true
        const cards = document.querySelectorAll('[data-disabled="true"]')
        const board = document.querySelector('.memory-board')
        const congrats = document.querySelector('.congratulations')
        if(cards.length ===16){
            setTimeout(()=> {
                board.style.display = "none"
                congrats.style.display = "block"
               
            },1000)
            setTimeout(()=> {
                const newGame = confirm ("O jogo acabou! \n Deseja jogar novamente?")
                if (newGame) {resetGame()}   
            },6000)
        }
        return
    }
    blockBoard =true
    setTimeout(()=>{
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        blockBoard =false
    },1000)
}
function shuffle(cards){
    cards.forEach(card=> {
        let randomPosition =Math.floor(Math.random()*16)
        card.style.order =randomPosition
    })
}
function resetGame(){
    window.location.reload()
}

document.addEventListener('DOMContentLoaded', ()=> {
    const cards = document.querySelectorAll('.memory-card')
    shuffle(cards)
    cards.forEach(card=> card.addEventListener("click", ()=> flipCard(card)))

})
