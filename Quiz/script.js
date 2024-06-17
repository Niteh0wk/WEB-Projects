const questions = [
    {
        question: "When did the predecessor SARPBC release?",
        answer: "9. October 2008",
        options: ["23. December 2009", "15. August 2007", "9. October 2008"],
        answered: false
    },
    {
        question: "When did Rocket League release?",
        answer: "7. July 2015",
        options: ["18. April 2014", "4. June 2016", "7. July 2015"],
        answered: false
    },
    {
        question: "What are the first 3 cars you can choose from?",
        answer: "Breakout, Octane, Merc",
        options: ["Breakout, Octane, Dominus", "Breakout, Octane, Merc", "Breakout, Octane, Scarab"],
        answered: false
    },
    {
        question: "What is the highest rank in RL?",
        answer: "Super Sonic Legend",
        options: ["Super Sonic Legend", "Platinum", "Grand Champion"],
        answered: false
    },
    {
        question: "What is the Nr 1. used Car in RL?",
        answer: "Fennec",
        options: ["Octane", "Dominus", "Fennec"],
        answered: false
    },
    {
        question: "Who is called the 'Best Player' right now?",
        answer: "Zen",
        options: ["SquishyMuffinz", "Zen", "Lethamyr"],
        answered: false
    },
    {
        question: "Who won the 2023 RLCS World Championship in Düsseldorf?",
        answer: "Team Vitality",
        options: ["Team NRG", "Team BDS", "Team Vitality"],
        answered: false
    },
    {
        question: "What was the most expensive item before Epic Games removed trading?",
        answer: "The White Hat",
        options: ["The White Hat", "The Alpha-boost", "The White Zombas"],
        answered: false
    },
    {
        question: "How long has RL been Free-To-Play?",
        answer: "Since 2020",
        options: ["Since 2021", "Since 2020", "Since 2019"],
        answered: false
    }
];

let currentQuestionIndex = -1; // Start with -1 to allow selecting any question initially
let progress = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const resultText = document.getElementById('result-text');
const submitAnswerButton = document.getElementById('submit-answer');
const questionButtons = document.getElementsByClassName('question-button');

Array.from(questionButtons).forEach((button, index) => {
    button.addEventListener('click', () => {
        if (!questions[index].answered) {
            showQuestion(index);
        }
    });
});

function showQuestion(id) {
    currentQuestionIndex = id;
    const question = questions[id];
    questionText.innerText = question.question;

    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.id = `option-${index}`;
        radioInput.name = 'options';
        radioInput.value = option;
        radioInput.className = 'radio-input';

        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        label.innerText = option;

        optionElement.appendChild(radioInput);
        optionElement.appendChild(label);

        optionsContainer.appendChild(optionElement);
    });

    resultText.innerText = ''; // Reset result text
}

submitAnswerButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="options"]:checked');
    if (selectedOption) {
        const isCorrect = selectedOption.value === questions[currentQuestionIndex].answer;
        resultText.innerText = isCorrect ? 'Correct!' : 'Try Again!';
        if (isCorrect) {
            resultText.style.textShadow = '2px 1px 1px lightgreen';
            const qButton = document.getElementById((currentQuestionIndex + 1).toString());
            qButton.style.backgroundColor = 'green';
            qButton.style.color = 'black';
            questions[currentQuestionIndex].answered = true;// Mark the question as answered
            progress++;
            if (allQuestionsAnsweredCorrectly()) {
                showPlayAgainPopup();
            }
            updateProgress();
        } else {
            resultText.style.textShadow = '2px 1px 1px red';
        }
    } else {
        resultText.innerText = 'Please select an option.';
    }
});

function allQuestionsAnsweredCorrectly() {
    return questions.every(question => question.answered);
}

function showPlayAgainPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <p>All questions answered correctly!</p>
            <button id="play-again-button">Play Again</button>
        </div>
    `;
    document.body.appendChild(popup);

    const playAgainButton = document.getElementById('play-again-button');
    playAgainButton.addEventListener('click', () => {
        location.reload();
    });
}

function updateProgress(){
    let showProgress = document.getElementById('progress');
    showProgress.innerText = progress + "/9";
}