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

//variables to store the quiz score and question number information
let score = 0; 
let questionNumber = 0;

//hide the intro on click 

$('.start').on('click', '.start-btn', function () {
    $('.start').hide()
    $('.quiz-form').show()
    setQuestion(objState)
    renderScoreboard(objState)
});


//template to generate each question

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view

//begins the quiz

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly

//creates html for question form

//resulting feedback if a selected answer is correct
//increments user score by one

//resulting feedback if a selected answer is incorrect

//generates the next question

//determines final score and feedback at the end of the quiz

//takes user back to the starting view to restart the quiz