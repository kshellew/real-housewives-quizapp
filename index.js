"use strict";

//question database
const STORE = [
    {
        question:'Which city was first?',
        choices:['Beverly Hills', 'Orange County', 'New York', 'New Jersey'],
        answer:'Orange County',
    },
    {
        question:'What do the Housewives of New Jersey hold at the end of the opening title sequence?',
        choices:['Oranges', 'Flowers', 'Champagne Glasses', 'Nothing'],
        answer:'Nothing',
    },
    {
        question:'According to Sheree, when will her joggers line come out?',
        choices:['Spring/Summer', 'Fall', 'Winter', 'Never'],
        answer:'Spring/Summer',
    }, 
    {
        question:'Caroline Manzo’s family is “thick as ____ .” (Fill in the Blank)',
        choices:['Bricks', 'Thieves', 'A Bowl of Oatmeal', 'Blood'],
        answer:'Thieves',
    },
    {
        question:'Which of the following is NOT a tagline of one of the housewives?',
        choices:['The Queen Of Diamonds Always Has An Ace Up Her Sleeve.','I may not read books, but I will read you.', 'There\'s is Nothing Grey About My Gardens.', 'Don\’t Mess With The Boss, Because You Might Get Fired.'],
        answer:'I may not read books, but I will read you.',
    },
]

//variables to store the score, question number, and question index information
let questionNumber = 0;
let score = 0; 
let questionIndex = 0;

//begins the quiz
//hide the intro gif  
// shows the status bar on click 

function startQuiz(){
    $('.start').on('click', '.start-btn', function () {
        console.log('startQuiz ran');
        $('.start').hide();
        $('.quiz-form, .status-bar').show();
        createQuestion();
    })   
}

//renders each question
function createQuestion(){
    if (questionIndex===5){
        console.log('end of questions')
        results()
    } else {
        $('.question-box').html(`
    <form class="js-quiz-form">
        <fieldset name="possible-answers" class="quiz-text">
        <legend class='emphasize'> ${STORE[questionIndex].question}</legend>
          <input type="radio" name="answer" id="answer1" required value ="${STORE[questionIndex].choices[0]}">
          <label for="answer1">${STORE[questionIndex].choices[0]}</label>
          <br>
          <input type="radio" name="answer" id="answer2" required value="${STORE[questionIndex].choices[1]}">
          <label for="answer2">${STORE[questionIndex].choices[1]}</label>
          <br>
          <input type="radio" name="answer" id="answer3" required value="${STORE[questionIndex].choices[2]}">
          <label for="answer3">${STORE[questionIndex].choices[2]}</label>
          <br>
          <input type="radio" name="answer" id="answer4" required value="${STORE[questionIndex].choices[3]}">
          <label for="answer4">${STORE[questionIndex].choices[3]}</label>
          <br>
        </fieldset>
        <div class='button-container'>
            <button type="submit" id="submit-button">Submit</button>
        </div>
    </form>`);

    }
    console.log(questionIndex +'from createQuestion')
    console.log('createQuestion ran')

}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer(){
    $('body').on('click', '#submit-button', function (event) {
        event.preventDefault();
        let selectAns = $('input[name=answer]:checked', '.js-quiz-form').val();

        //If no answer is selected, prompt User
        if (!selectAns) {
            // console.log('selection is required');
            selectionRequired(selectAns);
        } else if (questionIndex < 5) {
            answerChoice(selectAns);     
            createQuestion();
            updateQuestionNumber();
            }
        //After all questions have been asked, Final Score Page is loaded
        else {
            answerChoice(selectAns);
            //if (score === 5) {
                //$('.close').click((event) => perfectScore())
            //}
            results();
            // console.log('Current index is higher than 5');
        }
    })
        let selectAns = ``;
    
    console.log('submitAnswer ran')
}


function answerChoice(sel) {
    if (sel === STORE[questionIndex].answer) {
        //console.log("The answer was correct");
        correctAnswer();
        
       
    } else {
        wrongAnswer();
        //console.log("The answer was incorrect");
    }
    console.log('answerChoice ran')
}

//if no answer is selected
function selectionRequired() {
    console.log('The selectionRequired function ran');
    $('.question-box').append(`
    <div class="overlay">
      <div class="popup">
        <a class="close" href="#">&times;</a>
        <h2>Uh un honey, pick an answer.</h2>
        <div class="gif-container">
          <img src="images/pickananswer.gif" alt="Kyle says pick a lane" class="popup-gif">
        </div>
      </div>
    </div>`);
    $('.close').click(function () {
        $('.overlay').remove();
    })

}

//feedback selected answer is correct
//increments question index by one

function correctAnswer() {
    console.log(`The correctAnswer function ran`);
    updateScore();
    $('body').append(`
    <div class="overlay">
      <div class="popup">
        <a class="close" href="#">&times;</a>
        <h2>You got it!</h2>
        <div class="gif-container">
          <img src="images/correct.gif" alt="porsha snaps in approval'" class="popup-gif">
        </div>
      </div>
    </div>`);
    $('.close').click(function () {
        $('.overlay').remove();
    })
    questionIndex++;
    console.log(questionIndex+'from correctAnswer');
}

//resulting feedback if a selected answer is incorrect
//increments question index by one
function wrongAnswer() {
    
    console.log(`The wrongAnswer function ran`);
    $('body').append(`
    <div class="overlay">
      <div class="popup">
        <a class="close" href="#">&times;</a>
        <h2>So wrong, so wrong.</h2>
        <div class="gif-container">
          <img src='images/wrong1.gif' alt="giselle says oooh that's wrong" class="popup-gif">
        </div>
        <span id="correct-answer">The correct answer is</span> <span class='emphasize'>${STORE[questionIndex].answer} </span>
      </div>
    </div>`);
    $('.close').click(function () {
        $('.overlay').remove();
    })
    questionIndex++;
    console.log(questionIndex+'from wrongAnswer');
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
    score++;
    $('.js-score').text(score);
  }


//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
    questionNumber++;
    $('.js-question-number').text(questionNumber + 1);
  }


//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetProgress(){
    score = 0; 
    questionNumber= 0; 
    questionIndex= 0
    $('.js-question-number').text(0);
    $('.js-score').text(0);
}


//determines final score and feedback at the end of the quiz
function results(){
    console.log('results ran');
    $('.question-box, .status-bar').hide();
    $('.results').show(); 
    $('.results').html(`    
        <div class='button-container'>
            <button type="submit" id="restart-button">Restart</button>
        </div>`);
    //restarts the quiz
    $('.results').on('click', '#restart-button', function (event) {
        event.preventDefault();
        window.location.reload(true);
        //$('.results').hide();
        
        //startQuiz();
        //resetProgress();
        
        //$('.start').show();
    });
    console.log('restartQuiz ran')
}


//takes user back to the starting view to restart the quiz


function runQuiz(){
    startQuiz();
    createQuestion();
    submitAnswer();
    //results();
    //restartQuiz();
    console.log('runQuiz ran')
}

$(runQuiz)