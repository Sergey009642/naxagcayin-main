const questions = [
    {
        question: "Գտնել հաջորդ թիվը շարքում՝ 2, 4, 8, 16,?",
        options: ["18", "24", "32", "36"],
        answer: "32"
    },
    {
        question: "Գրեք բանաստեղծություն տասնչորս տառով?",
        options: ["Մորս համար գազել", "Տաղ անձնական", "բանաստեղծություն", "Շունն ու կատուն"],
        answer: "բանաստեղծություն"
    },
    {
        question: " Տղամարդը գնում է գնացքով և երազում տեսնում, որ նա նստած է հատակի վրա, իսկ հատակի տախտակները պոկվում ու ընկնում են ցած։ Ու միայն մի տախտակ է մնացել։ Ի՞նչ պետք է անի տղամարդը, որպեսզի չընկնի?",
        options: ["Մնալ տախտակի վրա", "Արթնանալ", " Քնի", "Չի կարող"],
        answer: "Արթնանալ"
    },
    {
        question: "Ո՞ր ծովում ջուր չկա?",
        options: ["Սև", "Քարտեզի վրայի", "Կարմիր", "Կասպիծ"],
        answer: "Քարտեզի վրայի"
    },
    {
        question: "Որտե՞ղ է հնարավոր, որ ձին թռչի ձիու վրայով?",
        options: ["Օդում", "Ջրում", "Շախմատում", "Լուսնի վրա"],
        answer: "Շախմատում"
    },
    {
        question: "Ինչպես ջուրը տեղափոխել մաղով?",
        options: ["Ջուրը սառեցնել", "Եռացնել ջուրը", "Հնարավոր չէ", "Մաղը շրջել"],
        answer: "Ջուրը սառեցնել"
    },
    {
        question: "Եթե երեկվանից հետո եկող օրն է հինգշաբթի, ապա ի՞նչ օր է այսօր?",
        options: ["Երեքշաբթի", "Չորեքշաբթի", "Երկուշաբթի", "Ուրբաթ"],
        answer: "Երեքշաբթի"
    },
    {
        question: "Ավտոբուսում նստած են 20 մարդ։ Եթե կանգառում նստում են ևս 5 մարդ ու իջնում՝ 3-ը, քանի՞ մարդ կա ավտոբուսում?",
        options: ["22", "23", "25", "28"],
        answer: "22"
    },
    {
        question: "Նշված բառերից ո՞ր մեկն է տարբեր?",
        options: ["Ծառ", "Բույս", "Սունկ", "Թուփ"],
        answer: "Սունկ"
    },
    {
        question: "Եթե երեք խնձորն արժեն 150 դրամ, ապա 4 խնձորն արժեն?",
        options: ["180 դրամ", " 200 դրամ", "210 դրամ", "250 դրամ"],
        answer: " 200 դրամ"
    },
    {
        question: "Եթե մեքենան մեկ ժամում անցնում է 60 կմ, ապա քանի՞ ժամում կանցնի 180 կմ?",
        options: ["1.5", "2", "3", "4"],
        answer: "3"
    },
    {
        question: "Եթե երկու գլուխ կաղամբն արժե 800 դրամ, ապա երեք գլուխն արժե?",
        options: ["1000", "1200", "1400", "1600"],
        answer: "1200"
    },
    {
        question: "Եթե մեկ ժամում մի մարդ կարող է փորել 1 փոս, ապա քանի՞ փոս կփորեն 6 մարդ մեկ ժամում?",
        options: ["1", "2", "6", "9"],
        answer: "6"
    },
    {
        question: "Ո՞ր բառը տառադարձությամբ ետ կարդալիս մնում է նույնը?",
        options: ["Մատիտ", "Կոկ", "Նավ", "Բանան"],
        answer: "Կոկ"
    },
    {
        question: "Սաթենիկն ունի այնքան քույր, որքան եղբայր, իսկ նրա եղբայրները յուրաքանչյուրն ունեն երկու անգամ ավելի շատ քույր, քան եղբայր։ Քանի՞ երեխաներ կան ընտանիքում?",
        options: ["3", "4", "5", "7"],
        answer: "5"
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


