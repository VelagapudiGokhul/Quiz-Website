document.addEventListener('DOMContentLoaded', function() {
    const quizIdInput = document.getElementById('quizIdInput');
    const loadQuizButton = document.getElementById('loadQuizButton');
    const quizContainer = document.getElementById('quizContainer');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const scoreDisplay = document.getElementById('scoreDisplay');

    let currentQuestionIndex = 0;
    let quizData = null;
    let userResponses = [];
    let totalScore = 0;

    const fetchDataFromJSONFile = async () => {
        try {
            const response = await fetch('quizDB.quizzes.json');
            const data = await response.json();
            quizData = data;
            displayQuestion();
        } 
        catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    };

    loadQuizButton.addEventListener('click', function() {
        const quizId = quizIdInput.value.trim();
        if (quizId === '') {
            alert('Please enter a Quiz ID.');
            return;
        }
        quizData = findQuizById(quizId);
        if (quizData) {
            currentQuestionIndex = 0;
            userResponses = [];
            displayQuestion();
        } else {
            alert('Quiz not found. Please enter a valid Quiz ID.');
        }
    });

    const findQuizById = (quizId) => {
        return quizData.find(quiz => quiz.quizID === quizId);
    };

    const displayQuestion = () => {
        const currentQuestion = quizData.question[currentQuestionIndex];
        quizContainer.innerHTML = `
            <h2>${currentQuestion}</h2>
            <ul class="option_group">
                <li class="option"><label><input type="radio" name="option" value="1">${quizData.option1[currentQuestionIndex]}</label></li>
                <li class="option"><label><input type="radio" name="option" value="2">${quizData.option2[currentQuestionIndex]}</label></li>
                <li class="option"><label><input type="radio" name="option" value="3">${quizData.option3[currentQuestionIndex]}</label></li>
                <li class="option"><label><input type="radio" name="option" value="4">${quizData.option4[currentQuestionIndex]}</label></li>
            </ul>
        `;

        if (currentQuestionIndex > 0) {
            prevButton.removeAttribute('disabled');
        } else {
            prevButton.setAttribute('disabled', 'disabled');
        }
    };

    nextButton.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            userResponses[currentQuestionIndex] = selectedOption.value;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex >= quizData.question.length) {
            calculateScore();
            alert(`Quiz completed! Your total score: ${totalScore}`);
            return;
        }
        displayQuestion();
    });

    prevButton.addEventListener('click', function() {
        currentQuestionIndex--;
        displayQuestion();
    });

    const calculateScore = () => {
        totalScore = 0;
        for (let i = 0; i < userResponses.length; i++) {
            if (userResponses[i] === quizData.crctoption[i]) {
                totalScore++;
            }
        }
        scoreDisplay.textContent = `Total Score: ${totalScore}`;
    };
    fetchDataFromJSONFile();
});

window.onload = function() {
    var loadQuizButton = document.getElementById("loadQuizButton");
    var quizBody = document.getElementById("quizBody");

    loadQuizButton.addEventListener("click", function() {
        quizBody.style.display = "block";
    });
};