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
  // document.documentElement.style.setProperty('--vh', `${vh}px`);
  const root = document.getElementById('root');
  // root.style.width = window.innerWidth;
  // root.style.height = window.innerHeight;
}

const wechat_mobilecheck = () => {
  let check = false;
  const ua = navigator.userAgent||navigator.vendor||window.opera;
  if(/\bMicroMessenger\//i.test(ua)) {
    check = true;
  };
  return check;
};

document.addEventListener("DOMContentLoaded", function() {
  resize();
  window.addEventListener('resize', resize);

  let clipboard = new ClipboardJS('#hashtag-group', {
    text: () => '#修丽可# #三亚国际免税城#',
  });
  clipboard.on('success', () => {
    _hmt.push(['_trackEvent', 'button', 'click', 'copy-hashtag']);
    showSuccess();
  });

  clipboard.on('error', () => alert('未能复制，请稍候再尝试'));
});

const triggerModal = (event) => {
  if (wechat_mobilecheck()) {
    event.preventDefault();
    document.getElementById('open-in-wechat').style.display = 'block';
    document.getElementById('main-section-content').style.display = 'none';
    _hmt.push(['_trackEvent', 'button', 'click', 'download-video']);
  } else {
    const popupModal = document.getElementById('popup-overlay');
    popupModal.style.display = 'block';
    _hmt.push(['_trackEvent', 'button', 'click', 'download-video']);
  }
}

const closeModal = () => {
  if (wechat_mobilecheck()) {
    document.getElementById('open-in-wechat').style.display = 'none';
    document.getElementById('main-section-content').style.display = 'block';
  } else {
    const popupModal = document.getElementById('popup-overlay');
    popupModal.style.display = 'none';
  }
}

const goToShop = () => {
  _hmt.push(['_trackEvent', 'button', 'click', 'go-shop']);
  window.open('https://ad.doubleclick.net/ddm/clk/485566413;292232190;h', '_blank');
}