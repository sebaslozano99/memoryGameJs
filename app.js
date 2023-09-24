const startEl = document.querySelector("#start-btn");
const scoreEl = document.querySelector("#score");
const counterEl = document.querySelector("#counter");
const pixelledCardsEl = document.querySelectorAll(".pixelled");
const pixelledCardsArray = Array.from(pixelledCardsEl);  
const iconImagesEl = document.querySelectorAll(".icon");



startEl.addEventListener("click", () => { //only when start pressed, we'll execute code below

    pixelledCardsArray.forEach(pixel => { //for Each html element with class "pixelled" will add the class "active"
        pixel.classList.add("active");
        shuffleCards(iconImagesEl); 
    })

    flipCard(pixelledCardsArray);
}, {once:true})



//shuffle cards function 
function shuffleCards(array){
    for(let i = 0; i < array.length; i++){
        let tempCard = array[i].src;
        let randomIndex = Math.floor(Math.random() * array.length);
        let randomCard = array[randomIndex].src;

        array[i].src = randomCard;
        array[randomIndex].src = tempCard;
    }
}



function flipCard(){
    let score = 0;
    const chosenIndex = []; //Store the only 2 items at a time which are index of flipped up cards
    const twoElements = []; //Store only 2 items at a time which are the html elements flipped up
    const elementChosenIcon = []; //store the src of the ICONS place in the index of the chosenIndex above
    const matchesFound = []; //will store the src of the images that matches

    pixelledCardsArray.forEach(element => element.addEventListener("click", () => {

        if(chosenIndex.length === 0 ){
            if(!matchesFound.includes(iconImagesEl[pixelledCardsArray.indexOf(element)].src)){
                counterEl.textContent = `Counter: ${chosenIndex.length + 1}`;
                chosenIndex.push(pixelledCardsArray.indexOf(element));
                elementChosenIcon.push(iconImagesEl[chosenIndex[0]].src);
                twoElements.push(element);
                element.classList.remove("active");
            }
            else{
                alert("Cannot pick that one, you idiot!");
            }
        }
        else if(chosenIndex.length < 2 ){
            if(!chosenIndex.includes(pixelledCardsArray.indexOf(element)) && !matchesFound.includes(iconImagesEl[pixelledCardsArray.indexOf(element)].src)){
                counterEl.textContent = `Counter: ${chosenIndex.length + 1}`;
                chosenIndex.push(pixelledCardsArray.indexOf(element));
                elementChosenIcon.push(iconImagesEl[chosenIndex[1]].src);
                twoElements.push(element);
                element.classList.remove("active");


                if(elementChosenIcon[0] === elementChosenIcon[1]){
                    chosenIndex.length = 0;
                    counterEl.textContent = `Counter: ${chosenIndex.length}`;
                    score++;
                    scoreEl.textContent = `Score: ${score}`;

                    setTimeout(()=>{
                        alert("Good Job!");

                    }, 400)


                    matchesFound.push(...elementChosenIcon);
                    twoElements.length = 0;
                    elementChosenIcon.length = 0;

                    if(score === 8){
                        setTimeout(() => {
                            alert("You fucking did it!");
                            location.reload();
                        }, 2000);
                    }
                }
                else{
                    setTimeout(() => {
                        chosenIndex.length = 0;
                        counterEl.textContent = `Counter: ${chosenIndex.length}`;
                        twoElements[0].classList.add("active");
                        twoElements[1].classList.add("active");
                        twoElements.length = 0;
                        elementChosenIcon.length = 0;
                    },300)
                }
            }
            else{
                alert("You're trying to flip up a flipped up card, mtf!");
                
            }
        }
        
    }))
}