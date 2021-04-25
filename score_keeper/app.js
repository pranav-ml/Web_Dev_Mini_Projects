const p1Button=document.querySelector("#p1Button")
const p2Button=document.querySelector("#p2Button")
const p1Display=document.querySelector("#p1Display")
const p2Display=document.querySelector("#p2Display")
const reset=document.querySelector("#reset")
const playto=document.querySelector("#playto")

var p1score=0
var p2score=0
var winningScore=parseInt(playto.value)

playto.addEventListener('change', function(){
    winningScore=parseInt(this.value)
    resetfunc()
})

p1Button.addEventListener('click', function () {
    if(p1score!==winningScore && p2score!==winningScore)
    {
        p1score++
        p1Display.textContent=p1score
        if(p1score===winningScore)
        {
            p1Display.classList.add("winner")
            p2Display.classList.add("loser")
        }
    }
    
})

p2Button.addEventListener('click', function(){
    if(p1score!==winningScore && p2score!==winningScore)
    {
        p2score++
        p2Display.textContent=p2score
        if(p2score===winningScore)
        {
            p2Display.classList.add("winner")
            p1Display.classList.add("loser")
        }
    }
})

reset.addEventListener('click', resetfunc)

function resetfunc() {
    p1score=0
    p2score=0
    p1Display.textContent=p1score
    p2Display.textContent=p2score
    p1Display.classList.remove("winner","loser")
    p2Display.classList.remove("winner","loser")
}
