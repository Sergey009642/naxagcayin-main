const questions = [
    {
        question: "Ո՞րն է Նյուտոնի առաջին օրենքը?",
        options: [" Գործողության և հակագործողության օրենք", "Իներտության օրենք", " Էներգիայի պահպանման օրենք", "Զանգվածի պահպանման օրենք"],
        answer: "Իներտության օրենք"
    },
    {
        question: "Ո՞րն է Երկրի ամենախորը կետը?",
        options: [" Էվերեստ լեռան գագաթը", "Մարիանյան փոսը", "Սահարա անապատը", "Հուդսոն ծովածոցը"],
        answer: "Մարիանյան փոսը"
    },
    {
        question: "Ո՞ր գազն է անհրաժեշտ շնչառության համար?",
        options: ["Ածխաթթու գազ (CO₂)", "Ազոտ (N₂)", " Թթվածին (O₂)", " Օզոն (O₃)"],
        answer: " Թթվածին (O₂)"
    },
    {
        question: "Ո՞րն է ջերմության փոխանցման եղանակներից մեկը?",
        options: ["Կոնդուկցիա (ջերմահաղորդություն)", "Ռեֆլեքսիա (արտացոլում)", " Դիֆրակցիա (ծնկում)", "Դիսպերսիա (բաժանում)"],
        answer: "Կոնդուկցիա (ջերմահաղորդություն)"
    },
    {
        question: "Ո՞րն է բույսերի ֆոտոսինթեզի հիմնական արդյունքը?",
        options: ["Ջուր", "Թթվածին", "Ածխաթթու գազ", "Ազոտ"],
        answer: "Թթվածին"
    },
    {
        question: " Որքա՞ն է (a + b)²-ի բացվածքը?",
        options: ["a² + b²", " a² + 2ab + b²", "a² - 2ab + b²", " a² - b²"],
        answer: " a² + 2ab + b²"
    },
    {
        question: " Որքա՞ն է √49-ի արժեքը?",
        options: ["6", "7", "8", "9"],
        answer: "7"
    },
    {
        question: " Որքա՞ն է 2³-ի արժեքը։?",
        options: ["6", "8", "9", "12"],
        answer: "8"
    },
    {
        question: " Ծառին նստած էին 4 թռչուն: Որսորդը հրացանով մեկին խփեց: Քանի՞ թռչուն մնաց ծառի վրա?",
        options: ["3", "4", "0", "1"],
        answer: "0"
    },
    {
        question: "Երկու հայր են, երկու որդի: Ընդամենը երեք հոգի: Հնարավո՞ր է, թե ոչ?",
        options: ["Այո", "Ոչ", "Միայն ընտանիքում", "Միայն հեքիաթում"],
        answer: "Այո"
    },
    {
        question: "Գերանը 12 մասի կտրելու համար քանի՞ տեղից պետք է սղոցել այն?",
        options: ["12", "11", "13", "10"],
        answer: "11"
    },
    {
        question: "Գնացքը կազմված է 10 վագոնից: Գայանեն նստած է վերջից հաշված երրորդ վագոնում: Սկզբից հաշված՝ ո՞րերորդ վագոնում է գտնվում Գայանեն?",
        options: ["3", "7", "8", "9"],
        answer: "7"
    },
    {
        question: "Ավտոմեքենայի ո՞ր անիվը չի պտտվում ընթացքի ժամանակ?",
        options: ["Առաջինը", "Հետինը", "Պահեստայինը", " Բոլորը պտտվում են"],
        answer: "Պահեստայինը"
    },
    {
        question: "Տղան ունի 4 քույր, և յուրաքանչյուր քույր ունի մեկ եղբայր: Քանի՞ երեխա կա ընտանիքում?",
        options: ["5", "8", "9", " 10 "],
        answer: "5"
    },
    {
        question: " Ձին տեղափոխում է 10 կգ ածուխ, իսկ պոնին՝ 10 կգ բամբակ։ Ո՞ւմ բեռն է ավելի ծանր?",
        options: ["Ձիու", "Պոնիի", " Երկուսն էլ հավասար են", " Չի կարելի որոշել "],
        answer: "Երկուսն էլ հավասար են"
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




