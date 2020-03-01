const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));



let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "In what year was the City of Philadelphia founded?",
        choice1: "1682",
        choice2: "1881",
        choice3: "1776",
        choice4: "1645",
        answer: 1
    },
    {
        question: "What is the name of the Flyers mascot?",
        choice1: "Swoop",
        choice2: "Franklin the Dog",
        choice3: "Gritty",
        choice4: "Phillie Phanatic",
        answer: 3
    },
    {
        question: "What is Philly's favorite parade?",
        choice1: "St. Patrick's Day Parade",
        choice2: "Puerto Rican Day Parade",
        choice3: "Thanksgiving Day Parade",
        choice4: "Mummers parade",
        answer: 4
    },
    {
        question: "Which one of these movies is based in Philly?",
        choice1: "The Departed",
        choice2: "Rocky",
        choice3: "Boyz In The Hood",
        choice4: "The Blues Brothers",
        answer: 2
    },
    {
        question: "Who makes the best cheesesteak in the city?",
        choice1: "Pat's King of Steaks",
        choice2: "Geno's Steak Shop",
        choice3: "Cleavers",
        choice4: "Delassandro's",
        answer: 4
    },
        
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    getNewQuestion();

};


getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){

        return window.location.assign("/end.html");

    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => { 
        
        if(!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        console.log(selectedChoice);
        const slectedAnswer = selectedChoice.dataset["number"]; 


        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; 

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);



        getNewQuestion();

    });
});



startGame();
