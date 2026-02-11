const questions = [
    { question: "Which language runs in browser?", options: ["Java", "C", "Python", "JavaScript"], answer: "JavaScript" },
    { question: "HTML stands for?", options: ["Hyper Tool", "Hyper Text Markup Language", "High Text", "None"], answer: "Hyper Text Markup Language" },
    { question: "CSS is used for?", options: ["Logic", "Design", "Database", "Server"], answer: "Design" },
    { question: "Which tag for JS?", options: ["<js>", "<script>", "<code>", "<java>"], answer: "<script>" },
    { question: "JS is ___ language", options: ["Markup", "Styling", "Programming", "None"], answer: "Programming" },
    { question: "Which symbol for comments?", options: ["//", "<!--", "**", "##"], answer: "//" },
    { question: "DOM stands for?", options: ["Data Object", "Document Object Model", "Digital Object", "None"], answer: "Document Object Model" },
    { question: "Which company created JS?", options: ["Microsoft", "Google", "Netscape", "Apple"], answer: "Netscape" },
    { question: "let keyword is used for?", options: ["Variable", "Function", "Loop", "Class"], answer: "Variable" },
    { question: "JS file extension?", options: [".java", ".js", ".html", ".css"], answer: ".js" }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");

const feedback = document.createElement("p");
document.querySelector(".quiz-container").appendChild(feedback);

function loadQuestion() {
    answered = false;
    feedback.innerText = "";
    questionEl.innerText = questions[currentQuestion].question;

    optionBtns.forEach((btn, index) => {
        btn.innerText = questions[currentQuestion].options[index];
        btn.style.backgroundColor = "";
        btn.disabled = false;
    });
}

optionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;

        const correctAnswer = questions[currentQuestion].answer;

        optionBtns.forEach(button => {
            button.disabled = true;
            if (button.innerText === correctAnswer) {
                button.style.backgroundColor = "lightgreen";
            }
        });

        if (btn.innerText === correctAnswer) {
            score++;
            feedback.innerText = "Correct Answer!";
            feedback.style.color = "green";
        } else {
            btn.style.backgroundColor = "salmon";
            feedback.innerText = "Wrong Answer!";
            feedback.style.color = "red";
        }
    });
});

nextBtn.addEventListener("click", () => {
    if (!answered) {
        feedback.innerText = "Please select an answer!";
        feedback.style.color = "orange";
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    let performanceMessage = "";

    if (score >= 8) {
        performanceMessage = "Excellent Performance!";
    } else if (score >= 5) {
        performanceMessage = "Good Job!";
    } else {
        performanceMessage = "Keep Practicing!";
    }

    document.querySelector(".quiz-container").innerHTML = `
        <h2>Quiz Completed!</h2>
        <h3>Your Score: ${score} / ${questions.length}</h3>
        <p>${performanceMessage}</p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}

loadQuestion();


