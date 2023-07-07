const question = [
    {
        question : "In an examination, a student is to choose any 8 questions from a set of 12. If the questions 1 and 3 are compulsory then he can select the questions in",
        answers:[
            {text:"210 ways",correct:true},
            {text:"495 ways",correct:false},
            {text:"615 ways",correct:false},
            {text:"200 ways",correct:false},
        ]
    },
    {
        question : "In an examination there are three multiple choice questions and each question has 4 choices out of which only one is correct. If all the questions are compulsory, then number of ways in which  a student can fail to get all answers correct, is",
        answers:[
            {text:"11",correct:false},
            {text:"12",correct:false},
            {text:"27",correct:false},
            {text:"63",correct:true}
        ]
    },
    {
        question : "A student is to answer 10 out of 13 questions in an examination such that he must choose atleast 4 from the first five questions. The number of choices available to him is",
        answers:[
            {text:"196",correct:true},
            {text:"280",correct:false},
            {text:"346",correct:false},
            {text:"140",correct:false}
        ]
    },
    {
        question : "A question paper consisting of 10 questions is divided into 3 parts with 5, 3, 2 questions. A candidate is to answer 6 questions without neglecting any part. The number of ways in which he can make up his choice is:",
        answers:[
            {text:"175",correct:true},
            {text:"200",correct:false},
            {text:"225",correct:false},
            {text:"150",correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
    resetState();
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("currect");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.lenght}`;
    nextBtn.innerHTML = "play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click",function(){
    if(currentQuestionIndex < question.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});




startQuiz();