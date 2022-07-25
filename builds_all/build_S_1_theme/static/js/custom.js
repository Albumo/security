"use strict";

$(document).ready(function () {
  var $burger = $('.js-header-burger');
  var $nav = $('.js-header-toggle nav');
  $burger.on('click', function () {
    $(this).toggleClass('open');
    $('.header').toggleClass('open');
    $nav.toggleClass('open');
    $('body').toggleClass('fixed-position');
  });
  $('.popup-btn').click(function () {
    $('.js-header-burger').removeClass('open');
    $('.js-header').removeClass('open');
    $('.popup').addClass('open-popup');
    $('body').addClass('fixed-position');
  });
  $('.js-close').click(function () {
    $('.popup').removeClass('open-popup');
    $('body').removeClass('fixed-position');
  });

  if ($(window).width() <= 1023) {
    var $drop = $('.drop-wrap');
    $drop.on('click', function () {
      $(this).toggleClass('open-drop');
    });
  }

  $('.header__menu-item a').click(function () {
    $('a.active').removeClass('active');
    $(this).addClass('active');
  });
  $('.js-to-item').on('click', function () {
    scrollToItem($(this));
    $('.js-header-burger').removeClass('open');
    $('.header').removeClass('open');
    $('.js-header-toggle nav').removeClass('open');
    $('.header__burger-letter').removeClass('open');
    $('.header__nav').removeClass('open');
    $('body').removeClass('fixed-position');
  });
  $(window).scroll(function () {
    var height = $(window).scrollTop();

    if (height > 1) {
      $('.js-header').addClass('is-scroll');
    } else {
      $('.js-header').removeClass('is-scroll');
    }
  });
}); // SCROLL TO ITEM

function scrollToItem(elem) {
  var el = $(elem).attr('href').slice(1),
      elToScroll = $("#".concat(el)),
      navHeight = $('.js-header').outerHeight() + 20,
      time = 600,
      gap = 20,
      offsetTop = elToScroll.offset().top,
      totalScroll = offsetTop - navHeight - gap;
  $('body,html').animate({
    scrollTop: totalScroll
  }, time);
  return false;
}

moveElem(); // SCROLL TO ITEM END

function moveElem() {
  var blockfrom = $('.js-remove--from').html();
  $('.js-remove--to').html(blockfrom);
  return false;
} //CHANDE LANGUAGE


var select = document.querySelector('.countries__lang');
var allLang = ['ua', 'ru'];
select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
  var lang = select.value;
  location.href = window.location.pathname + '#' + lang;
  location.reload();
}

function changeLanguage() {
  var hash = window.location.hash;
  hash = hash.substr(1);

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#ua';
    location.reload();
  }

  select.value = hash;

  for (var key in langArr) {
    var elem = document.querySelector('.lng-' + key);

    if (elem) {
      elem.innerHTML = langArr[key][hash];
    }
  }
}

changeLanguage(); //CHANDE LANGUAGE END
// SEND MESSAGE

var msg = document.querySelector('.msg');
var gsapMsg = gsap.to('.msg', 0.25, {
  autoAlpha: 1,
  y: -40,
  ease: Expo.inOut,
  paused: true
});
var arrInput = document.querySelectorAll('.aInput');

function send(event, php) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false;

  for (var i = 0, count = arrInput.length; i < count; i++) {
    arrInput[i].classList.remove('inputerror');
  }

  event.target.querySelector('button').disabled = true;
  showMsg('Wait. Sending...', '#b1b1b1');
  var req = new XMLHttpRequest();
  req.open('POST', php, true);
  req.send(new FormData(event.target));

  req.onload = function () {
    event.target.querySelector('button').disabled = false;
    console.log(req);

    if (req.status >= 200 && req.status < 400) {
      var json = JSON.parse(this.response);
      console.log('result:', json.result);
      console.log('status:', json.status);

      if (json.result === 'success') {
        showMsg('Message send', '#36AE46', '1000');
        setTimeout(function () {
          document.getElementsByClassName('msg')[0].style.opacity = '0';
        }, 2000);
        event.target.reset();
      } else if (json.result === 'email') {
        showMsg('Error. Need email', '#DC352F');
        setTimeout(function () {
          document.getElementsByClassName('msg')[0].style.opacity = '0';
        }, 2000);
        document.querySelector('#email').classList.add('inputerror');
      }
    } else {
      showMsg('Server error. number: ' + req.status, '#DC352F');
      setTimeout(function () {
        document.getElementsByClassName('msg')[0].style.opacity = '0';
      }, 2000);
    }
  };

  req.onerror = function () {
    showMsg('Error sending request', '#DC352F');
  }; // req.send(new FormData(event.target));

}

function showMsg(message, color) {
  msg.innerText = message;
  msg.style.background = color;
  gsapMsg.restart();
}

function inputFile(e) {
  var el = e.target.parentNode.querySelector('.count');
  if (e.target.value !== '') el.innerHTML = 'Selected files: ' + e.target.files.length;else el.innerHTML = 'Select file';
}

for (var i = 0, count = arrInput.length; i < count; i++) {
  arrInput[i].addEventListener('focus', function () {
    this.nextElementSibling.classList.add('active');
  });
  arrInput[i].addEventListener('blur', function () {
    if (this.value === false) {
      this.nextElementSibling.classList.remove('active');
    }
  });
}

window.onload = function () {
  var loadPage = gsap.timeline();
  loadPage.to('#form', 0.7, {
    autoAlpha: 1,
    y: 0,
    ease: Expo.inOut
  });
}; // SEND MESSAGE END