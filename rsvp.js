// 설문 편집 주소 대신 참석자에게 공유할 응답용 HTTPS 주소를 입력하세요.
const surveyUrl = '';

if (URL.canParse(surveyUrl) && new URL(surveyUrl).protocol === 'https:') {
  const survey = document.querySelector('#survey');
  survey.href = surveyUrl;
  survey.hidden = false;
  document.querySelector('#survey-status').hidden = true;
}

const photoViewer = document.querySelector('#photo-viewer');

document.querySelectorAll('.gallery a').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    const photo = photoViewer.querySelector('img');
    photo.src = link.href;
    photo.alt = link.querySelector('img').alt;
    photoViewer.showModal();
  });
});
