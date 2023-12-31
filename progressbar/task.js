const progress = document.getElementById('progress');
const formUpload = document.getElementById('form');
// элемент - файл успешно загружен 
const fileUploaded = document.querySelector('.file-uploaded');

formUpload.addEventListener('submit', (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE) {
            const response = JSON.parse(xhr.response);
            if (response.success === true) {
                fileUploaded.classList.add('file-uploaded-active');
            };
        };
    });

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

    function updateProgress(evt) {
        let percentComplete = (evt.loaded / evt.total);
        progress.value = percentComplete;
    }

    xhr.upload.onprogress = updateProgress;
    const formData = new FormData(formUpload);
    xhr.send(formData);
});