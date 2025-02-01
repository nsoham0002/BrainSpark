const questions = [
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Processor Utility", "Control Processing Unit"],
        answer: "Central Processing Unit"
    },
    {
        question: "Which programming language is primarily used for developing Android apps?",
        options: ["Swift", "Java", "Python", "C#"],
        answer: "Java"
    },
    {
        question: "What is the main function of an operating system?",
        options: ["Manage hardware resources", "Edit documents", "Run antivirus software", "Browse the internet"],
        answer: "Manage hardware resources"
    },
    {
        question: "Which data structure follows the LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        answer: "Stack"
    },
    {
        question: "Which protocol is used to transfer web pages over the internet?",
        options: ["HTTP", "FTP", "SMTP", "SSH"],
        answer: "HTTP"
    },
    {
        question: "Which company developed the C programming language?",
        options: ["Microsoft", "Apple", "AT&T Bell Labs", "Google"],
        answer: "AT&T Bell Labs"
    },
    {
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        answer: "MongoDB"
    },
    {
        question: "What does RAM stand for?",
        options: ["Random Access Memory", "Read And Modify", "Run Access Memory", "Remote Access Memory"],
        answer: "Random Access Memory"
    },
    {
        question: "Which of the following is not an object-oriented programming language?",
        options: ["Java", "C++", "Python", "C"],
        answer: "C"
    },
    {
        question: "What is the full form of HTML?",
        options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Hyperlink Text Management Language", "Home Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30; // Timer set to 30 seconds per question
let progressBarUpdated = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";
    timeLeft = 30; // Reset the timer for each question

    // Reset progress bar width
    progressBar.style.width = "0%";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(option, button);
        optionsEl.appendChild(button);
    });

    startTimer(); // Start the timer when the question loads
    updateProgressBar(); // Update the progress bar
}

function startTimer() {
    timer = setInterval(() => {
        timerEl.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer("", null); // Automatically check answer if time runs out
        } else {
            timeLeft--;
        }
    }, 1000);
}

function updateProgressBar() {
    if (currentQuestionIndex < questions.length) {
        let progress = ((currentQuestionIndex + 1) / questions.length) * 100; // Exclude the "Restart Quiz" button from progress
        progressBar.style.width = `${progress}%`;
    }

    // Once all questions have been attempted, change the progress bar color to green
    if (currentQuestionIndex === questions.length && !progressBarUpdated) {
        progressBar.style.backgroundColor = "#4CAF50";
        progressBarUpdated = true;
    }
}

function checkAnswer(selectedOption, button) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const options = document.querySelectorAll(".option");

    options.forEach(option => option.disabled = true); // Disable buttons after selection

    if (selectedOption === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else if (selectedOption !== "") {
        button.classList.add("wrong");
    }

    // Highlight correct answer if user selected wrong answer
    const correctButton = Array.from(options).find(option => option.textContent === correctAnswer);
    if (correctButton && selectedOption !== correctAnswer) {
        correctButton.classList.add("correct");
    }

    nextBtn.style.display = "block";
    clearInterval(timer); // Stop the timer once the question is answered
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextBtn.style.display = "none";
    } else {
        displayScore();
    }
    updateProgressBar(); // Update the progress bar after each click
});

function displayScore() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
    scoreEl.style.display = "block";
    nextBtn.textContent = "Restart Quiz";
    nextBtn.onclick = () => location.reload();
    updateProgressBar(); // Make sure the progress bar is updated even after quiz completion
}

loadQuestion();
