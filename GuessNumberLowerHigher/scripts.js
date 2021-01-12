    // declaration of variables used globally
    let imgNewUrl; // url to img
    let i = 0; // iterator 
    let arr = []; // array to store random 30 numbers
    let imgStr = 'http://roll.diceapi.com/images/poorly-drawn/d6/';
    let sumOfPoints = 0; // store sum of points
    let guessCount = 1; // count rounds
    let higherButtonClicked = false; // check if "higher" button was clicked
    let lowerButtonClicked = false; // check if "lower" button was clicked
    let remainingRounds = 30;
    let imgCorrect = "img/check.svg";
    let imgIncorrect = "img/no.svg";
    let imgEqual = "img/equal.svg";
    let currentRound = 1;
    let historyOfScores  = [];
    let singleRound = {};
    
    // random value generated 
    // generate an array of 30 random numbers
    function generateRandomnumbers(array){
        for (let i = 0; i<30; i++ ){
            array.push(Math.floor(Math.random() * 6 + 1).toString());
        }
        return array;
    }
    
    // set game when the page loads
    window.onload = function(){     
        
        // check if there are any results stored in localSotrage
        // if there is sth stored show restart window
    if(localStorage.getItem('results')){
        restartModal.style.visibility = "visible";
        restartModal.style.display = "flex";
    }else{
        // call a function to generate an array of random numbers
        generateRandomnumbers(arr);
       // console.log("generateRandomnumbers result" + generateRandomnumbers(arr));
        /* build new img src url */
        imgNewUrl = imgStr+ arr[i] +'.png';
        /*set new src url to the img */
        document.getElementById("img-dice").src = imgNewUrl;
       //console.log("ing urs"+ imgNewUrl);
        /* set default number count */
        document.getElementById('round').textContent = remainingRounds;
        document.getElementById('point').textContent = sumOfPoints;
        gameOverModal.style.visibility = "hidden";
        gameOverModal.style.display = "none";
        lowerButtonClicked = false;
        higherButtonClicked = false;
            }   
        }
 
    // refererences to DOM elements that will be updated
    let rounds = document.getElementById('round'); 
    let pointsGained = document.getElementById('point');
    let guessesHistory = document.getElementById('guessesHistory');
    let higherButton = document.getElementById('higher');
    let lowerButton = document.getElementById('lower');
    let gameOverModal = document.getElementById('game-over');
    let restartModal = document.getElementById('restart');
    
    // function to add history of guesses
    function fillGuessHistory(ulElement,imgSrc, roundCounter) {
        let imageElement = document.createElement('img');
        imageElement.src = imgSrc;
        imageElement.className = "img-element-style";
        let liElement = document.createElement("li");
        liElement.className == "li-element-style";
        liElement.textContent = roundCounter;
        liElement.appendChild(imageElement);
        ulElement.appendChild(liElement);
      }
    
    // check which button "higher" or "lower was clicked"
    document.getElementById('lower').addEventListener('click', function () { 
        //console.log("button lower was clicked ");
        lowerButtonClicked = true;
    });
    document.getElementById('higher').addEventListener('click', function () { 
        //console.log("button higher was clicked "); 
        higherButtonClicked = true;
    });
   
    // open new game
   function openNewGame(){
    localStorage.removeItem('results');
    gameOverModal.remove();
    restartModal.remove();
    generateRandomnumbers(arr);
      //  console.log("generateRandomnumbers result" + generateRandomnumbers(arr));
        /* build new img src url */
        imgNewUrl = imgStr+ arr[i] +'.png';
        /*set new src url to the img */
        document.getElementById("img-dice").src = imgNewUrl;
        //console.log("ing urs"+ imgNewUrl);
        /* set default number count */
        document.getElementById('round').textContent = 30;
        document.getElementById('point').textContent = 0;
        gameOverModal.style.visibility = "hidden";
        gameOverModal.style.display = "none";
        window.location.href=window.location.href;
   }
    // close gameover window
    function closeStartModal(){
        localStorage.removeItem('results');
        gameOverModal.remove();
        generateRandomnumbers(arr);
       // console.log("generateRandomnumbers result" + generateRandomnumbers(arr));
        /* build new img src url */
        imgNewUrl = imgStr+ arr[i] +'.png';
        /*set new src url to the img */
        document.getElementById("img-dice").src = imgNewUrl;
       // console.log("ing urs"+ imgNewUrl);
        /* set default number count */
        document.getElementById('round').textContent = 30;
        document.getElementById('point').textContent = 0;
        gameOverModal.style.visibility = "hidden";
        gameOverModal.style.display = "none";
        window.location.href=window.location.href;
        
    }
    // check if the guess was correct
    function checkGuess(){ 
       
         if(remainingRounds == 0) {
           // console.log("You ran out of rounds. Game over");
            remainingRounds = 0;
           rounds.textContent = remainingRounds;
           lowerButton.disabled = true;
           higherButton.disabled = true;
           saveGameResults();
           gameOverModal.style.visibility = "visible";
             gameOverModal.style.display = "flex";
             document.getElementById('final-score').textContent = sumOfPoints;
        }
        else if(remainingRounds>= 1 || remainingRounds <= 30){
            if(lowerButtonClicked && arr[i]>arr[i+1]){
              //  console.log("FUNCTION RESULT button LOWER clicked and YOU GUESSED");
                sumOfPoints += 0.1;
                pointsGained.textContent = sumOfPoints;
                rounds.textContent = remainingRounds;
                //console.log("remaing rounds" + remainingRounds);
                singleRound.id = currentRound;
                singleRound.score = sumOfPoints;
                singleRound.remaining = remainingRounds;
                singleRound.src = imgCorrect;
                //console.log("single round" +singleRound);
                // historyOfScores[currentRound-1] = singleRound;
                historyOfScores.push(singleRound);
               // console.log("history of scores " + historyOfScores.length);
                fillGuessHistory(guessesHistory, imgCorrect, currentRound);
                i++;
                remainingRounds--;
                currentRound++;
                /* build new img src url */
                imgNewUrl = imgStr+ arr[i] +'.png';
                /*set new src url to the img */
                document.getElementById("img-dice").src = imgNewUrl; 
                saveGameResults();   
                         
            }
            else if(lowerButtonClicked && arr[i] < arr[i+1]){
                //console.log("FUNCTION RESULT button LOWER was clicked and YOU FAILED");
                sumOfPoints = sumOfPoints;
                pointsGained.textContent = sumOfPoints;
                rounds.textContent = remainingRounds;
                //console.log("remaing rounds" + remainingRounds);
                singleRound.id = currentRound;
                singleRound.score = sumOfPoints;
                singleRound.remaining = remainingRounds;
                singleRound.src = imgIncorrect;
                //console.log("single round" +singleRound);
                // historyOfScores[currentRound-1] = singleRound;
               historyOfScores.push(singleRound);
               // console.log("history of scores " + historyOfScores.length);
                fillGuessHistory(guessesHistory, imgIncorrect,currentRound);
                i++;
                currentRound++;
                remainingRounds--;
                /* build new img src url */
                imgNewUrl = imgStr+ arr[i] +'.png';
                /*set new src url to the img */
                document.getElementById("img-dice").src = imgNewUrl;
                saveGameResults();
                
            }
            else if(higherButtonClicked && arr[i] < arr[i+1]){
               // console.log(" FUNCTION RESULT button HIGHER clicked AND YOU GUESSED");
                sumOfPoints += 0.1;
                pointsGained.textContent = sumOfPoints;
                rounds.textContent = remainingRounds;
               // console.log("remaing rounds" + remainingRounds);
                singleRound.id = currentRound;
                singleRound.score = sumOfPoints;
                singleRound.remaining = remainingRounds;
                singleRound.src = imgCorrect;
                //console.log("single round" +singleRound);
                // historyOfScores[currentRound-1] = singleRound;
                historyOfScores.push(singleRound);
                //console.log("history of scores " + historyOfScores.length);
                fillGuessHistory(guessesHistory, imgCorrect,currentRound);
                i++;
                currentRound++;
                remainingRounds--;
                /* build new img src url */
                imgNewUrl = imgStr+ arr[i] +'.png';
                /*set new src url to the img */
                document.getElementById("img-dice").src = imgNewUrl;
                saveGameResults();
                
            }
            else if(higherButtonClicked && arr[i] > arr[i+1]){
               // console.log(" FUNCTION RESULT button HIGHER clicked AND YOU FAILED");
                sumOfPoints = sumOfPoints;
                pointsGained.textContent = sumOfPoints;
                rounds.textContent = remainingRounds;
                //console.log("remaing rounds" + remainingRounds);
                singleRound.id = currentRound;
                singleRound.score = sumOfPoints;
                singleRound.remaining = remainingRounds;
                singleRound.src = imgIncorrect;
                //console.log("single round" +singleRound);
                // historyOfScores[currentRound-1] = singleRound;
               historyOfScores.push(singleRound);
               // console.log("history of scores " + historyOfScores.length);
                fillGuessHistory(guessesHistory, imgIncorrect, currentRound);
                i++;
                currentRound++;
                remainingRounds--;
                /* build new img src url */
                imgNewUrl = imgStr+ arr[i] +'.png';
                /*set new src url to the img */
                document.getElementById("img-dice").src = imgNewUrl;
                saveGameResults();
             
            }
            else if ((higherButtonClicked && arr[i] == arr[i+1]) || (lowerButtonClicked && arr[i] == arr[i+1])){
                //console.log('the numbers are qual');
                sumOfPoints = sumOfPoints;
                pointsGained.textContent = sumOfPoints;
                rounds.textContent = remainingRounds;
                //console.log("remaing rounds" + remainingRounds);
                singleRound.id = currentRound;
                singleRound.score = sumOfPoints;
                singleRound.remaining = remainingRounds;
                singleRound.src = imgEqual;
               // console.log("single round" +singleRound);
                // historyOfScores[currentRound-1] = singleRound;
               historyOfScores.push(singleRound);
                //console.log("history of scores " + historyOfScores.length);
                fillGuessHistory(guessesHistory, imgEqual,currentRound);
                i++;
                currentRound++;
                remainingRounds--;
                /* build new img src url */
                imgNewUrl = imgStr+ arr[i] +'.png';
                /*set new src url to the img */
                document.getElementById("img-dice").src = imgNewUrl;
                saveGameResults();
                
            }
        } 
    }

    // convert array of object to objects to an object
    const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     obj[item.id] = item
     return obj
   }, {})

    // save game results
    function saveGameResults(){
    try{
        let gameResults = arrayToObject(historyOfScores);
        localStorage.setItem('results', JSON.stringify(gameResults));
    }catch(err){
       // console.log("Cannot access localStorage data" + "Error: "+err);
    }
    //console.log("Game saved successfully");
}

// restore game results 
function loadGame(){
    let gameLoad = localStorage.getItem('results');
    let retrivedObject = JSON.parse(gameLoad);
   // console.log("restored data: "+ retrivedObject.length);
    sumOfPoints = gameLoad.score;
    pointsGained.textContent = gameLoad.score;
    rounds.textContent = gameLoad.remaining;

    for(let i = 0; i< gameLoad.length; i++){
        fillGuessHistory(guessesHistory,gameLoad.src,gameLoad.id);
    }
}




