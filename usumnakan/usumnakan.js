const questions = [
    {
        question: "Հայաստանի մայրաքաղաքը?",
        options: ["Բեռլին", "Լոնդոն", "Երևան", "Մադրիդ"],
        answer: "Երևան"
    },
    {
        question: "Ով Է ստեղծել Հայոց գրերը?",
        options: ["Ագաթանգեղոս", "Մեսրոպ Մաշտոց", "Մոսվսես Խորենացի", "Եղիշե"],
        answer: "Մեսրոպ Մաշտոց"
    },
    {
        question: "Երբ է հիմնադրվել Երևան քաղաքը?",
        options: ["Ք․ա 781թ", "Ք․ա 783թ", "Ք․ա 682թ", "Ք․ա 782թ"],
        answer: "Ք․ա 782թ"
    },
    {
        question: "Որ մարզում է գտնվում Սևանը?",
        options: ["Գեղարքունիք", "Արարատ", "Սյունիք", "Տավուշ"],
        answer: "Գեղարքունիք"
    },
    {
        question: "Ինչ միավորով է չափվում երկարությունը?",
        options: ["կիլոգրամ", "վարկյան", "մետր", "լիտր"],
        answer: "մետր"
    },
    {
        question: "Քանի տարեկան է Մխչյանի միյնակարգ դպրոցը?",
        options: ["140տ․", "142տ․", "157տ․", "132տ․"],
        answer: "142տ․"
    },
    {
        question: "Որն է Երկրին ամենամոտ մոլորակը?",
        options: ["Սատուրն", "Մարս", "Վեներա", "Ուրան"],
        answer: "Վեներա"
    },
    {
        question: "Որ կենդանին է դասվում  կաթնասունների դասին?",
        options: ["Սարդ", "Թռչուն", "Շուն", "Օձ"],
        answer: "Շուն"
    },
    {
        question: "որն է մարդու ամենամեծ օրգանը?",
        options: ["Սիրտ", "Մաշկ", "թոքեր", "Ուղեղ"],
        answer: "Մաշկ"
    },
    {
        question: "Ով է <<Անուշ>> պոեմի հեղինակը?",
        options: ["Ավետիք Իսահակյան", "Հովհաննես Թումանյան", "Դերենիկ Դեմիրճյան", "Եղիշե Չարենց"],
        answer: "Հովհաննես Թումանյան"
    },
    {
        question: "Ինչի՞ է պատասխանում ստորոգյալը?",
        options: ["Ո՞վ", "Ի՞նչ է անում", "Ո՞ւր", "Ի՞նչ է"],
        answer: "Ի՞նչ է անում"
    },
    {
        question: "Որն է 16²?",
        options: ["356", "256", "156", "128"],
        answer: "256"
    },
    
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 120;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

function startQuiz() {
    score = 0;
    currentQuestion = 0;
    timeLeft = 120;
    scoreEl.textContent = score;
    restartBtn.style.display = "none";
    showQuestion();
    startTimer();
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(btn, option);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selectedBtn, selectedOption) {
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.disabled = true);

    const correctAnswer = questions[currentQuestion].answer;

    allButtons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "#4caf50"; // Green
            btn.style.color = "#fff";
        } else if (btn === selectedBtn && selectedOption !== correctAnswer) {
            btn.style.backgroundColor = "#f44336"; // Red
            btn.style.color = "#fff";
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
        scoreEl.textContent = score;
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    questionEl.textContent = "Quiz Over!";
    optionsEl.innerHTML = `
      <p>You got <strong>${score}</strong> out of <strong>${questions.length}</strong> correct ✅</p>
    `;
    restartBtn.style.display = "inline-block";
}

restartBtn.onclick = startQuiz;

startQuiz();




