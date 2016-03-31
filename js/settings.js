window.onload = function() {
  var btn = document.querySelector('.btn'),
    krtjs = document.getElementsByClassName('krt'),
    parent = document.querySelector('#krtjs');

  var mx = 0,
    my = 0,
    w = btn.offsetWidth,
    h = btn.offsetHeight;

  var btnFront = btn.querySelector('#btn-front'),
    btnBack = btn.querySelector('#btn-back'),
    btnSelect = btn.querySelector('#btn-back .select'),
    btnSetBPM = btn.querySelector('#btn-back .metronome'),
    btnSetBars = btn.querySelector('#btn-back .bars'),
    btnGoBack = btn.querySelector('#btn-back .goback');

  var yesdroppers = document.getElementsByClassName('yes-drop'),
    nodroppers = document.getElementsByClassName('no-drop');

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
      case 27: // esc
        if (document.querySelector('.is-open') !== null) GoBack();
        stop();
        break;
      case 80: // p (play)
        RhythmSample.play(false);
        break;
      case 83: // s (stop)
        stop();
        break;
      case 46: // del
        reset();
        break;
      case 82: // r (randomize)
        randomize();
        break;
      case 84: // t (tempo)
        setBPM();
        break;
      case 66: // b (bars)
        setBars();
        break;
      case 76: // l (logo)
        mx = 0;
        my = 0;
        if (document.querySelector('.is-open') == null) showBtnBack();
        break;
      case 68: // d (draggables)
        {
          if (document.querySelector('.is-open') == null) showBtnBack();
          selectBtn();
        }
        break;
    }
  }

  btnFront.addEventListener('click', function(event) {
    mx = (event.clientX - btn.offsetLeft);
    my = (event.clientY - btn.offsetTop);
    showBtnBack(event);
  });

  function showBtnBack(event) {
    // document.getElementById('btn-back').classList.remove('hide');
    toggleDraggable(krtjs);
    btnFront.classList.toggle('hide');
    btnBack.classList.toggle('hide');

    var directions = [{
      id: 'top',
      x: w / 2,
      y: 0
    }, {
      id: 'right',
      x: w,
      y: h / 2
    }, {
      id: 'bottom',
      x: w / 2,
      y: h
    }, {
      id: 'left',
      x: 0,
      y: h / 2
    }];

    directions.sort(function(a, b) {
      return distance(mx, my, a.x, a.y) - distance(mx, my, b.x, b.y);
    });

    btn.setAttribute('data-direction', directions.shift().id);
    btn.classList.add('is-open');
  }

  btnSelect.addEventListener('click', selectBtn);

  function selectBtn(event) {
    btnSelect.classList.toggle('selecting');
    var elem = document.getElementsByClassName('krt');

    if (document.getElementsByClassName('selecting').length) {
      reset();
      parent.addEventListener('click', select, false);
      for (var i = 0; i < elem.length; i++) {
        elem[i].style.cursor = 'pointer';
      };

    } else {
      parent.removeEventListener('click', select, false);
      for (var i = 0; i < elem.length; i++) {
        elem[i].style.cursor = 'initial';
      }
    }
  }

  btnSetBPM.addEventListener('click', setBPM);

  function setBPM(event) {
    stop();

    tempoInput = prompt('BPM = ', tempo);
    if (tempoInput)
      tempo = minmax(tempoInput, 40, 208);

    // document.getElementById('metronome').classList.add('hide');
    // document.getElementById('BPMinput').classList.remove('hide');
  }

  btnSetBars.addEventListener('click', setBars);

  function setBars(event) {
    stop();

    barsInput = prompt('bars = ', bar);
    if (barsInput)
      bar = minmax(barsInput, 1, 100);

    // document.getElementById('metronome').classList.add('hide');
    // document.getElementById('BPMinput').classList.remove('hide');
  }

  btnGoBack.addEventListener('click', GoBack);

  function GoBack() {
    btn.classList.remove('is-open');
    btnFront.classList.toggle('hide');
    btnBack.classList.toggle('hide');
    btnSelect.classList.remove('selecting');
    parent.removeEventListener('click', select, false);
    toggleDraggable(yesdroppers, 'set');
    for (var i = 0; i < yesdroppers.length; i++) {
      yesdroppers[i].style.cursor = 'move';
    };
    toggleDraggable(nodroppers, 'reset');
  }

  function distance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

};

function toggleDraggable(el, SR) {
  for (var i = 0; i < el.length; i++) {
    if (SR == 'set') {
      el[i].classList.add('draggable');
    } else {
      el[i].classList.remove('draggable');
    }
  };

};

function select(el) {
  if (el.target !== el.currentTarget) {
    var krt = el.target.getAttribute('data-oorsprong'),
      krtlist = document.getElementsByClassName(krt);
    for (var i = 0; i < krtlist.length; i++) {
      krtlist[i].classList.toggle('yes-drop');
      krtlist[i].classList.toggle('no-drop');
    };
  };
  el.stopPropagation();

};

function minmax(value, min, max) {
  if (parseInt(value) < min || isNaN(value))
    return min;
  else if (parseInt(value) > max)
    return max;
  else return value;
  // document.getElementById('metronome').classList.remove('hide');
  // document.getElementById('BPMinput').classList.add('hide');
}
