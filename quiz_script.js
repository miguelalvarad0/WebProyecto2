// PREGUNTAS

let questions = [
    {
        question: "¿Cual es el deporte mas bonito del mundo?",
        options: [
            "Tenis",
            "Futbol",
            "Ajedrez"            
        ],
        correct: 0
    },

    {
        question: "¿Cual es el mejor torneo de tenis?",
        options: [
            "Roland Garros",
            "Wimbledon",
            "US Open"
        ],
        correct: 1
    },

    {
        question: "¿Cuál es el jugador con mas titulos?",
        options: [
            "Federer",
            "Nadal",
            "Djokovic"
        ],
        correct: 2
    },

    {
        question: "¿Quien fue el campeon de Wimbledon 2026?",
        options: [
            "Sinner",
            "Alcaraz",
            "Zverev"
        ],
        correct: 0
    },

    {
    question: "Quien es el actual numero 1 del ranking?",
        options: [
            "Djokovic",
            "Sinner",
            "Alcaraz"
        ],
        correct: 1
    }
];


// VARIABLES DE QUIZ

let currentQuestion = 0;
let userScore = 0;


// ELEMENTOS DEL DOM

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const editScreen = document.getElementById("edit-screen");

const startBtn = document.getElementById("start-btn");
const editBtn = document.getElementById("edit-btn");
const restartBtn = document.getElementById("restart-btn");
const backBtn = document.getElementById("back-btn");

const questionContainer =
    document.getElementById("question-container");

const progress =
    document.getElementById("progress");

const score =
    document.getElementById("score");

const feedback =
    document.getElementById("feedback");

const nextBtn =
    document.getElementById("next-btn");

const finalScore =
    document.getElementById("final-score");

const editContainer =
    document.getElementById("edit-container");

const addQuestionBtn =
    document.getElementById("add-question-btn");

const saveBtn =
    document.getElementById("save-btn");


// CAMBIAR PANTALLA

function showScreen(screen) {

    startScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    editScreen.classList.add("hidden");

    screen.classList.remove("hidden");
}


// INICIAR QUIZ

function startQuiz() {

    currentQuestion = 0;
    userScore = 0;

    showScreen(quizScreen);

    renderQuestion();
}


// MOSTRAR PREGUNTA

function renderQuestion() {

    questionContainer.innerHTML = "";
    feedback.innerHTML = "";

    nextBtn.classList.add("hidden");

    const current = questions[currentQuestion];

    progress.textContent =
        `Pregunta ${currentQuestion + 1} de ${questions.length}`;

    score.textContent =
        `Puntaje: ${userScore}`;


    // Crear título de la pregunta
    const questionTitle = document.createElement("h2");

    questionTitle.classList.add("question-title");

    questionTitle.textContent = current.question;

    questionContainer.appendChild(questionTitle);


    // Crear contenedor de opciones
    const optionsContainer =
        document.createElement("div");

    optionsContainer.classList.add("options");


    // Crear cada opción dinámicamente
    current.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.textContent = option;

        button.classList.add("option-btn");

        button.addEventListener("click", () => {

            checkAnswer(index, button);

        });

        optionsContainer.appendChild(button);
    });


    questionContainer.appendChild(optionsContainer);
}


// VERIFICAR RESPUESTA

function checkAnswer(selectedIndex, selectedButton) {

    const current = questions[currentQuestion];

    const optionButtons =
        document.querySelectorAll(".option-btn");


    // Desactivar todos los botones
    optionButtons.forEach(button => {
        button.disabled = true;
    });


    // Respuesta correcta
    if (selectedIndex === current.correct) {

        userScore++;
        feedback.textContent = "Respuesta correcta";

    }

    // Respuesta incorrecta
    else {


        feedback.textContent =
            `Incorrecto. La respuesta correcta es: 
            ${current.options[current.correct]}`;



        // Mostrar cuál era la correcta
        optionButtons[current.correct]
            .classList.add("correct");
    }


    score.textContent =
        `Puntaje: ${userScore}`;

    nextBtn.classList.remove("hidden");
}


// SIGUIENTE PREGUNTA

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        renderQuestion();

    } else {

        showResults();
    }
}



// RESULTADOS

function showResults() {

    showScreen(resultScreen);

    finalScore.textContent =
        `${userScore} respuesta(s) correctas.`;
}

// EDITAR PREGUNTAS

function openEditor() {

    showScreen(editScreen);

    renderEditor();
}


function renderEditor() {

    editContainer.innerHTML = "";


    questions.forEach((question, questionIndex) => {

        // Contenedor de una pregunta
        const questionDiv =
            document.createElement("div");

        questionDiv.classList.add("edit-question");


        // Título
        const title =
            document.createElement("h3");

        title.textContent =
            `Pregunta ${questionIndex + 1}`;

        questionDiv.appendChild(title);


        // Input de pregunta
        const questionLabel =
            document.createElement("label");

        questionLabel.textContent =
            "Pregunta:";

        questionDiv.appendChild(questionLabel);


        const questionInput =
            document.createElement("input");

        questionInput.type = "text";

        questionInput.value = question.question;

        questionInput.classList.add("question-input");

        questionDiv.appendChild(questionInput);


        // Opciones
        question.options.forEach((option, optionIndex) => {

            const optionDiv =
                document.createElement("div");

            optionDiv.classList.add("option-edit");


            // Radio button
            const radio =
                document.createElement("input");

            radio.type = "radio";

            radio.name = `correct-${questionIndex}`;

            radio.checked =
                optionIndex === question.correct;

            radio.classList.add("correct-radio");

            radio.dataset.optionIndex = optionIndex;


            // Input de opción
            const optionInput =
                document.createElement("input");

            optionInput.type = "text";

            optionInput.value = option;

            optionInput.classList.add("option-input");


            optionDiv.appendChild(radio);
            optionDiv.appendChild(optionInput);

            questionDiv.appendChild(optionDiv);
        });


        // Botón eliminar
        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "Eliminar pregunta";


        deleteButton.addEventListener("click", () => {

            questions.splice(questionIndex, 1);

            renderEditor();
        });


        questionDiv.appendChild(deleteButton);

        editContainer.appendChild(questionDiv);
    });
}

// GUARDAR CAMBIOS

function saveQuestions() {

    const questionDivs =
        document.querySelectorAll(".edit-question");


    questionDivs.forEach((div, questionIndex) => {

        // Obtener pregunta
        const questionInput =
            div.querySelector(".question-input");

        questions[questionIndex].question =
            questionInput.value;


        // Obtener opciones
        const optionInputs =
            div.querySelectorAll(".option-input");

        optionInputs.forEach((input, optionIndex) => {

            questions[questionIndex].options[optionIndex] =
                input.value;
        });


        // Obtener respuesta correcta
        const radios =
            div.querySelectorAll(".correct-radio");

        radios.forEach((radio, optionIndex) => {

            if (radio.checked) {

                questions[questionIndex].correct =
                    optionIndex;
            }
        });
    });


    alert("Preguntas guardadas correctamente.");

    showScreen(startScreen);
}

// AGREGAR NUEVA PREGUNTA

function addQuestion() {

    questions.push({

        question: "Nueva pregunta",

        options: [
            "Opción 1",
            "Opción 2",
            "Opción 3"
        ],

        correct: 0
    });


    renderEditor();
}

// EVENT LISTENERS

startBtn.addEventListener("click", startQuiz);

editBtn.addEventListener("click", openEditor);

restartBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", nextQuestion);

backBtn.addEventListener("click", () => {

    showScreen(startScreen);
});

addQuestionBtn.addEventListener("click", addQuestion);

saveBtn.addEventListener("click", saveQuestions);