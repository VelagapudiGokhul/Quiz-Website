function addQuestions() {
    const numQuestions = document.getElementById('numQuestions').value;
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    for (let i = 0; i < numQuestions; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<h4>Question ${i + 1}</h4>
                                 <label for="question${i}">Question:</label>
                                 <input type="text" id="question${i}" required name="question" autocomplete="off"><br>
                                 <label for="option1_${i}">Option 1:</label>
                                 <input type="text" id="option1_${i}" required name="option1" autocomplete="off">
                                 <label for="option2_${i}">Option 2:</label>
                                 <input type="text" id="option2_${i}" required name="option2" autocomplete="off">
                                 <label for="option3_${i}">Option 3:</label>
                                 <input type="text" id="option3_${i}" required name="option3" autocomplete="off">
                                 <label for="option4_${i}">Option 4:</label>
                                 <input type="text" id="option4_${i}" required name="option4" autocomplete="off">
                                 <label for="correctOption_${i}">Correct Option:</label>
                                 <input type="number" id="correctOption_${i}" min="1" max="4" name="crctoption" required><br>`;
        questionsContainer.appendChild(questionDiv);
    }

    document.getElementById('addQuestionsBtn').style.display = 'none';
    document.getElementById('createQuizBtn').style.display = 'flex';
    questionsContainer.style.display = 'block';
}

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const numQuestions = document.getElementById('numQuestions').value;
    quizIDDisplay.innerHTML = `<h3>Number of Questions: ${numQuestions}</h3>`;

    const formData = new FormData(this);
    fetch('/save_quiz', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        quizIDDisplay.innerHTML += `<h3>Quiz ID: ${result}</h3>`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

