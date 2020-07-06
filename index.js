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

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createForm(questionNumber);
  } else {
    $('.question-box').hide();
    results();
  }
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

//DO I REALLY NEED THIS ONE resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.js-score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.start').on('click', '.start-btn', function (event) {
    $('.start').hide();
    $('.questionNumber').text(1);
    $('.question-box, .status-bar').show();
    $('.question-box').prepend(generateQuestion());
  });
}

//creates the html for quiz form
function createForm(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="emphasize">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].choices.forEach(function (choiceValue, choiceIndex) {
    $(`<label class="sizeMe" for="${choiceIndex}">
        <input class="radio" type="radio" id="${choiceIndex}" value="${choiceValue}" name="answer" required>
        <span>${choiceValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<div class='button-container'> <button type="submit" id="submit-button">Submit</button></div>`).appendTo(fieldSelector);
  return formMaker;
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.question-box').on('click', '#submit-button', function (event) {
    event.preventDefault();
    //$('.altBox').hide();
    //$('.response').show();
    let selectAns = $('input:checked').val();
    //let answer = selected.val();
    let correct = STORE[questionNumber].answer;
    if (!selectAns) {
      selectionRequired();
    } else if (selectAns === correct) {
      correctAnswer();
      nextQuestion();
    } else{
      wrongAnswer();
      nextQuestion();
    }
  });
}

//if no answer is selected
function selectionRequired() {
    console.log('The selectionRequired function ran');
    $('.question-box').append(`
    <div class="overlay">
      <div class="popup">
        <h2>Uh un honey, pick an answer.</h2>
        <div class="gif-container">
          <img src="images/pickananswer.gif" alt="Kyle says pick a lane" class="popup-gif">
        </div>
        <div class='button-container'> <button type="button" class="back-button">Back to Question</button></div>
      </div>
    </div>`);
    $('.back-button').click(function () {
        $('.overlay').remove();
    })
} 

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('body').append(`
    <div class="overlay">
      <div class="popup">
        <h2>You got it!</h2>
        <div class="gif-container">
          <img src="images/correct.gif" alt="porsha snaps in approval'" class="popup-gif">
        </div>
        <div class='nxt-btn'> <button type="button" class="next-button">Next Question</button></div>
      </div>
    </div>
    </div>`);
    $('.nxt-btn').click(function () {
      $('.overlay').remove();
    })
    updateScore();
} 

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('body').append(`
    <div class="overlay">
      <div class="popup">
        <h2>So wrong, so wrong.</h2>
        <div class="gif-container">
          <img src='images/wrong1.gif' alt="giselle says oooh that's wrong" class="popup-gif">
        </div>
        <div>
        <span id="correct-answer">The correct answer is</span> <span class='emphasize'>${STORE[questionNumber].answer} </span>
        </div>
        <div class='nxt-btn'> <button type="button" class="next-button">Next Question</button></div>
      </div>
      </div>
    </div>`);
    $('.nxt-btn').click(function () {
        $('.overlay').remove();
    })
  };

//generates the next question
function nextQuestion() {
    //console.log('next question working')
    updateQuestionNumber();
    $('.question-box form').replaceWith(generateQuestion());
  };


//determines final score and will restart the quiz
function results(){
    //console.log('results ran');
    $('.question-box, .status-bar').hide();
    $('.results').show(); 
    $('.results').html(`    
        <h2>Thanks for Playing</h2>
        <p>Your Score is ${score} /5 </p>
        <img src="images/end.gif" alt="gif giselle saying check check check the end" class="gifs">
        <div class='button-container'>
            <button type="submit" id="restart-button">Restart</button>
        </div>`);
}
function restartQuiz(){
  $('.results').on('click', '#restart-button', function (event) {
          event.preventDefault();
          window.location.reload(true);
      });
}
   

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  //nextQuestion();
  restartQuiz();
}

$(makeQuiz)