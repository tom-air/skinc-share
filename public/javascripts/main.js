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
  // if( navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1 || typeof navgator.wxuserAgent !== "undefined" ) {
  //   return true;
  // }
  if( typeof WeixinJSBridge !== "undefined" ) {
    return true;
  }
  return false;
};

document.addEventListener("DOMContentLoaded", function() {
  resize();
  window.addEventListener('resize', resize);

  if (!wechat_mobilecheck()) {
    document.getElementById('open-in-wechat').style.display = 'none';
    document.getElementById('main-section-content').style.display = 'block';
  }

  let clipboard = new ClipboardJS('#hashtag-group', {
    text: () => '#修丽可# #三亚国际免税城#',
  });
  clipboard.on('success', () => {
    showSuccess();
  });

  clipboard.on('error', () => alert('未能复制，请稍候再尝试'));
});

const triggerModal = () => {
  const popupModal = document.getElementById('popup-overlay');
  popupModal.style.display = 'block';
}

const closeModal = () => {
  const popupModal = document.getElementById('popup-overlay');
  popupModal.style.display = 'none';
}