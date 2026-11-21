// Google Apps Script 웹 앱의 배포 URL(/exec)을 입력하세요.
const rsvpEndpoint = 'https://script.google.com/macros/s/AKfycbwKZhz5qfWZZ-zQ2BYRIKdMP4GrGOgH_iJL6udM7n6Vl6EVkPweuvf1f7O5s3jkf9r5/exec';
const rsvpForm = document.querySelector('#rsvp-form');
const rsvpStatus = document.querySelector('#rsvp-status');
const rsvpSubmit = rsvpForm.querySelector('button');
let submission = null;

if (rsvpEndpoint) {
  rsvpSubmit.disabled = false;
  rsvpStatus.textContent = '';
}

rsvpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!rsvpEndpoint || rsvpSubmit.disabled) return;

  const fields = new FormData(rsvpForm);
  const name = fields.get('name').trim();
  if (!name) {
    rsvpStatus.textContent = '이름을 입력해 주세요.';
    rsvpForm.elements.name.focus();
    return;
  }
  if (submission?.name !== name) {
    submission = { name, id: crypto.randomUUID() };
  }

  rsvpSubmit.disabled = true;
  rsvpStatus.textContent = '응답을 보내고 있어요…';
  try {
    const response = await fetch(rsvpEndpoint, {
      method: 'POST',
      body: new URLSearchParams(submission),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error('Response was not saved');
    rsvpForm.reset();
    rsvpStatus.textContent = '응답을 받았습니다. 알려주셔서 감사합니다!';
  } catch {
    rsvpStatus.textContent = '접수를 확인하지 못했습니다. 잠시 뒤 다시 보내주세요.';
    rsvpSubmit.disabled = false;
  }
});

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
