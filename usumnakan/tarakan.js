const questions = [
    {
        question: "Ո՞րն է տարվա առաջին ամիսը?",
        options: ["Դեկտեմբեր", "Փետրվար", "Հունվար", "Մարտ"],
        answer: "Հունվար"
    },
    {
        question: "Որքա՞ն է 7 + 5։?",
        options: ["11", "12", "13", "10"],
        answer: "12"
    },
    {
        question: " Ո՞ր կենդանին է ապրում ջրում?",
        options: ["Արջը", "Ձուկը", " Կատուն", "Ձի"],
        answer: "Ձուկը"
    },
    {
        question: " Ո՞րն է Հայաստանի ամենաբարձր լեռը?",
        options: ["Արագած", "Արարատ", "Գեղամա", "Սիս"],
        answer: "Արագած"
    },
    {
        question: "Որքա՞ն է 36 բաժանած 6-ի?",
        options: ["5", "6", "7", "8"],
        answer: "6"
    },
    {
        question: "Ինչի՞ց են ստանում թուղթը?",
        options: ["Փայտից", "Քարից", "Ջրից", "Արևից"],
        answer: "Փայտից"
    },
    {
        question: "Որքա՞ն է 9 × 4?",
        options: ["36", "32", "46", "26"],
        answer: "36"
    },
    {
        question: "Ինչքա՞ն է 100-ից 25-ը հանած?",
        options: ["65", "85", "75", "70"],
        answer: "75"
    },
    {
        question: "Ո՞ր կենդանին է գիշատիչ?",
        options: ["Կովը", "Աղվեսը", "Ձի", "Շուն"],
        answer: "Աղվեսը"
    },
    {
        question: "Ո՞րն է Հայաստանի պետական լեզուն?",
        options: ["Անգլերեն", "Ռուսերեն", "Հայերեն", "Ֆրանսերեն"],
        answer: "Հայերեն"
    },
    {
        question: "Եթե 1 օրում կա 24 ժամ, ապա քանի՞ ժամ կա 2 օրում?",
        options: ["36", "48", "50", "24"],
        answer: "48"
    },
    {
        question: "Ո՞ր կենդանին է թռչուն?",
        options: ["Արջ", "Ճայ", "Կատու", "Ձի"],
        answer: "Ճայ"
    },
    {
        question: "Որքա՞ն է 5 × 7 + 3?",
        options: ["38", "35", "37", "43"],
        answer: "38"
    },
    {
        question: "Ո՞ր թիվն է զույգ?",
        options: ["13", "7", "24", "15"],
        answer: "24"
    },
    {
        question: "Ո՞ր ամսին է Հայաստանի անկախության օրը?",
        options: ["Մարտ", "Սեպտեմբեր", "Օգոստոս", "Դեկտեմբեր"],
        answer: "Սեպտեմբեր"
    },
    
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 150;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

function startQuiz() {
    score = 0;
    currentQuestion = 0;
    timeLeft = 150;
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


