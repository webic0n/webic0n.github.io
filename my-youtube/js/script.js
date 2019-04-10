const switcher = document.querySelector('#cbx'),
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item');
      videosWrapper = document.querySelector('.videos__wrapper');

let player;

function bindSlideToggle(trigger, boxBody, content, openClass){
  let button = {
      'element': document.querySelector(trigger),
      'active': false
  };
  const box = document.querySelector(boxBody),
        boxContent = document.querySelector(content);

  button.element.addEventListener('click', () => {
    if (button.active === false){   //проверяем меню на неактивность
      button.active = true;   //если она не активна, то делаем её активной
      box.style.height = boxContent.clientHeight + 'px';
      box.classList.add(openClass);   //активный класс для меню
    } else {
      button.active = false;    //если она активна, то делаем её неактивной
      box.style.height = 0 + 'px';
      box.classList.remove(openClass);
    }
  });
}

bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode(){
  if (night === false){
    night = true;
    document.body.classList.add('night');
    document.querySelectorAll('.hamburger > line').forEach(item =>{
      item.style.stroke = '#fff';
    });

    document.querySelectorAll('.videos__item-descr').forEach(item =>{
      item.style.color = '#fff';
    });

    document.querySelectorAll('.videos__item-views').forEach(item =>{
      item.style.color = '#fff';
    });

    document.querySelector('.header__item-descr').style.color = '#fff';

    document.querySelector('.logo > img').src = 'logo/youtube_night.svg';

  } else {
    night = false;
    document.body.classList.remove('night');
    document.querySelectorAll('.hamburger > line').forEach(item =>{
      item.style.stroke = '#000';
    });
    document.querySelectorAll('.videos__item-descr').forEach(item =>{
      item.style.color = '#000';
    });
    document.querySelectorAll('.videos__item-views').forEach(item =>{
      item.style.color = '#000';
    });
    document.querySelector('.header__item-descr').style.color = '#000';
    document.querySelector('.logo > img').src = 'logo/youtube.svg';
  }
}

let night = false;
switcher.addEventListener('change', () => {
  switchMode();
});

function start() {
  gapi.client.init({
    'apiKey': 'AIzaSyCCUJ7bg6pZtZ_BjXj5B0xiPJUi7g-e_qE',
    'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
  }).then(function () {
    return gapi.client.youtube.playlistItems.list({
      "part": "snippet,contentDetails",
      "maxResults": '6',
      "playlistId": "PLyhufYmBlouShuEkmkHqchVP6sFJ9UhPL"
    })
  }).then(function (response) {
    console.log(response.result);
    response.result.items.forEach(item =>{
     let card = document.createElement('a');
     card.classList.add('videos__item', 'videos__item-active');
      card.setAttribute('data-url', item.contentDetails.videoId);
     card.innerHTML = `
       <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
       <div class="videos__item-descr">
         ${item.snippet.title}
       </div>
       <div class="videos__item-views">
         ${item.snippet.publishedAt}
       </div>
     `;
     videosWrapper.appendChild(card);
     setTimeout(() => {
       card.classList.remove('videos__item-active');
     }, 10);

     if(night === true){
       card.querySelector('.videos__item-descr').style.color = '#fff';
       card.querySelector('.videos__item-views').style.color = '#fff';
     }
    });
    sliceTitle('.videos__item-descr', 50);
    bindModal(document.querySelectorAll('.videos__item'));
  })
}

more.addEventListener('click', () =>{
  more.remove();
  gapi.load('client', start);
});

function search(target) {
  gapi.client.init({
    'apiKey': 'AIzaSyCCUJ7bg6pZtZ_BjXj5B0xiPJUi7g-e_qE',
    'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
  }).then(function () {
    return gapi.client.youtube.search.list({
      'maxResults': '10',
      'part': 'snippet',
      'q': `${target}`,
      'type': ''
    });
  }).then(function (response) {
    videosWrapper.innerHTML = '';
    response.result.items.forEach(item =>{
      let card = document.createElement('a');
      card.classList.add('videos__item', 'videos__item-active');
      card.setAttribute('data-url', item.id.videoId);
      card.innerHTML = `
        <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
        <div class="videos__item-descr">
          ${item.snippet.title}
        </div>
        <div class="videos__item-views">
          ${item.snippet.publishedAt}
        </div>
      `;
      videosWrapper.appendChild(card);
      setTimeout(() => {
        card.classList.remove('videos__item-active');
      }, 10);
 
      if(night === true){
        card.querySelector('.videos__item-descr').style.color = '#fff';
        card.querySelector('.videos__item-views').style.color = '#fff';
      }
     });
     sliceTitle('.videos__item-descr', 50);
     bindModal(document.querySelectorAll('.videos__item'));

  })
}

document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault();
  gapi.load('client', () => {
    search(document.querySelector('.search > input').value);
  });
  document.querySelector('.search > input').value = '';
});

function sliceTitle(selector, count) {
  document.querySelectorAll(selector).forEach(item => {
    item.textContent.trim();

    if (item.textContent.length < count){
      return;
    } else {
      const str = item.textContent.slice(0, count + 1) + "...";
      item.textContent = str;
    }
  });
}

sliceTitle('.videos__item-descr', 50);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
  player.stopVideo();
}

function bindModal(cards) {
  cards.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const id = item.getAttribute('data-url');
      loadVideo(id);
      openModal();
    });
  });
}

bindModal(videos);

function bindNewModal(cards) {
  cards.addEventListener('click', (e) => {
    e.preventDefault();
    const id = cards.getAttribute('data-url');
    loadVideo(id);
    openModal();
  });
}

modal.addEventListener('click', (e) => {
  if (!e.target.classList.contains('modal__body')){
    closeModal();
  }
});

function createVideo() {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  setTimeout(() => {
    player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
    });
  }, 1000);
}

createVideo();

function loadVideo(id) {
  player.loadVideoById({'videoId': `${id}`});
}