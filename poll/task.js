const xhr = new XMLHttpRequest();
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

function getPollResults(id, index) {
    const xhrResults = new XMLHttpRequest();
    xhrResults.addEventListener('readystatechange', () => {
        if (xhrResults.readyState === xhrResults.DONE) {
            pollAnswers.textContent = '';

            const response = JSON.parse(xhrResults.response);

            const totalCountVotes = response.stat.reduce((total, curr) => total + curr.votes, 0)
            
            response.stat.forEach(answ => {
                const answerDiv = document.createElement('div');
                answerDiv.classList.add('poll__answer');
                answerDiv.textContent = answ.answer;

                const percent = document.createElement('b');
                percent.textContent = ' ' + (answ.votes / totalCountVotes  * 100).toFixed(2) + ' %';

                answerDiv.appendChild(percent);
                pollAnswers.appendChild(answerDiv);
            });
        };
    });

    xhrResults.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhrResults.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhrResults.send(`vote=${id}&answer=${index}`);
}

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        response = JSON.parse(xhr.response);

        const pollId = response.id;

        pollTitle.textContent = response.data.title;
        response.data.answers.forEach((answ, index) => {
            const btnAnswer = document.createElement('button');
            btnAnswer.classList.add('poll__answer');
            btnAnswer.textContent = answ;

            btnAnswer.addEventListener('click', () => {
                alert('Спасибо, ваш голос засчитан!');
                getPollResults(pollId, index);
            })
            pollAnswers.appendChild(btnAnswer);
        });
    };
});

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();