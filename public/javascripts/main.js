const showSuccess = () => {
  const hashtag = document.getElementById('hashtag');
  const msg = document.getElementById('hash-msg');

  msg.style.display = 'block';
  hashtag.style.display = 'none';
  setTimeout(() => {
    msg.style.display = 'none';
    hashtag.style.display = 'block';
  }, 5000);
}

const resize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  const root = document.getElementById('root');
  root.style.width = window.innerWidth;
  root.style.height = window.innerHeight;
}

document.addEventListener("DOMContentLoaded", function() {
  resize();
  window.addEventListener('resize', resize);

  let clipboard = new ClipboardJS('#hashtag-group', {
    text: () => '#修丽可# #三亚国际免税城#',
  });
  clipboard.on('success', () => {
    showSuccess();
  });

  clipboard.on('error', () => alert('未能复制，请稍候再尝试'));
});