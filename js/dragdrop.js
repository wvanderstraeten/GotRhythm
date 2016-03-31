// maak globaal beschikbaar
var origLeft, origTop, origX, origY;

// target elements with the "draggable" class
interact('.draggable').draggable({
  // enable inertia throwing
  inertia: {
    resistance: 10,
    minSpeed: 10,
    endSpeed: 50
  },

  // keep the element within the area of its parent, the body...
  restrict: {
    restriction: "body",
    endOnly: true,
    elementRect: {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1
    }
  },

  // disable autoScroll
  autoScroll: false,

  // call this function on every dragstart event
  onstart: function(event) {
    if (!playingRandomized) stop();
  },

  // call this function on every dragmove event
  onmove: dragMoveListener,

  // call this function on every dragend event
  onend: function(event) {
    var draggableElement = event.target;
    checkDropzone(draggableElement);
    draggableElement.classList.remove('can-drop', 'dragging');
  },

  snap: {
    targets: [checkCoord(document.getElementById('divdrop1')), checkCoord(document.getElementById('divdrop2')), checkCoord(document.getElementById('divdrop3')), checkCoord(document.getElementById('divdrop4'))],
    relativePoints: [{
      x: 0.5,
      y: 0.5
    }],
    // getScrollXY
    // offset: { x: left, y: top },
    range: 90,
    endOnly: true
  }
});

function checkCoord(elem) {
  // var testpar2 = document.getElementById("testpar2");
  var rect = elem.getBoundingClientRect();
  xco = Math.round(rect.left + (rect.right - rect.left) / 2);
  yco = Math.round(rect.top + (rect.bottom - rect.top) / 2);
  // console.log('checkCoord', elem.id, 'xco:', xco, 'yco:', yco);
  return {
    x: xco,
    y: yco
  };
}

function checkDropzone(draggableElement) {
  // als element gedropt wordt in dropzone1
  if (arraysEqual(checkCoord(draggableElement), checkCoord(document.getElementById('divdrop1')))) {
    ifNotEmpty('droppedIn1');
    draggableElement.setAttribute('data-is-dropped', 'droppedIn1');
    draggableElement.classList.add('droppedIn1');
    draggableElement.classList.remove('droppedIn2', 'droppedIn3', 'droppedIn4');
    // console.log(draggableElement.getAttribute('data-oorsprong'), draggableElement.getAttribute('data-is-dropped'));
  }

  // als element gedropt wordt in dropzone2
  else if (arraysEqual(checkCoord(draggableElement), checkCoord(document.getElementById('divdrop2')))) {
    ifNotEmpty('droppedIn2');
    draggableElement.setAttribute('data-is-dropped', 'droppedIn2');
    draggableElement.classList.add('droppedIn2');
    draggableElement.classList.remove('droppedIn1', 'droppedIn3', 'droppedIn4');
    // console.log(draggableElement.getAttribute('data-oorsprong'), draggableElement.getAttribute('data-is-dropped'));
  }

  // als element gedropt wordt in dropzone3
  else if (arraysEqual(checkCoord(draggableElement), checkCoord(document.getElementById('divdrop3')))) {
    ifNotEmpty('droppedIn3');
    draggableElement.setAttribute('data-is-dropped', 'droppedIn3');
    draggableElement.classList.add('droppedIn3');
    draggableElement.classList.remove('droppedIn1', 'droppedIn2', 'droppedIn4');
    // console.log(draggableElement.getAttribute('data-oorsprong'), draggableElement.getAttribute('data-is-dropped'));
  }

  // als element gedropt wordt in dropzone4
  else if (arraysEqual(checkCoord(draggableElement), checkCoord(document.getElementById('divdrop4')))) {
    ifNotEmpty('droppedIn4');
    draggableElement.setAttribute('data-is-dropped', 'droppedIn4');
    draggableElement.classList.add('droppedIn4');
    draggableElement.classList.remove('droppedIn1', 'droppedIn2', 'droppedIn3');
    // console.log(draggableElement.getAttribute('data-oorsprong'), draggableElement.getAttribute('data-is-dropped'));
  } else {
    draggableElement.setAttribute('data-is-dropped', false);
    // console.log(draggableElement.getAttribute('data-oorsprong'), draggableElement.getAttribute('data-is-dropped'));

    // translate the element
    draggableElement.style.webkitTransform =
      draggableElement.style.transform = 'translate(' + origX + 'px, ' + origY + 'px)';

    // update the position attributes
    draggableElement.setAttribute('data-x', origX);
    draggableElement.setAttribute('data-y', origY);
    draggableElement.setAttribute('style', "left: " + origLeft + "px; top: " + origTop + "px;");

    draggableElement.classList.remove('droppedIn1', 'droppedIn2', 'droppedIn3', 'droppedIn4');
  }

}

function arraysEqual(a1, a2) {
  var isEqual = Math.abs(a1.x - a2.x) < 2 && Math.abs(a1.y - a2.y) < 2;
  // console.log('arraysEqual:', 'a1 =', a1, '?== a2 =', a2, isEqual);
  return isEqual;
}

function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the position attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

function ifNotEmpty(droppedIn) {
  var revertEl = document.getElementsByClassName(droppedIn).item(0);
  if (revertEl !== null) {
    var oorsprId = revertEl.getAttribute('data-oorsprong');

    // translate the element
    revertEl.style.webkitTransform =
      revertEl.style.transform = 'translate(' + origX + 'px, ' + origY + 'px)';

    // update the position attributes
    revertEl.setAttribute('data-x', origX);
    revertEl.setAttribute('data-y', origY);
    revertEl.setAttribute('style', "left: " + origLeft + "px; top: " + origTop + "px;");

    revertEl.classList.remove(droppedIn);
    // console.log('ifNotEmpty:', oorsprId, 'moet eruit');
  }
}



// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.yes-drop',
  // overlap: center,

  // listen for drop related events:
  ondropactivate: function(event) {
    var draggableElement = event.relatedTarget,
      dropzoneElement = event.target;
    // add active dropzone feedback
    dropzoneElement.classList.add('drop-active');
    draggableElement.classList.add('dragging');
  },

  ondragenter: function(event) {
    var draggableElement = event.relatedTarget,
      dropzoneElement = event.target;
    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
  },

  ondragleave: function(event) {
    var draggableElement = event.relatedTarget,
      dropzoneElement = event.target;
    // remove the drop feedback style
    dropzoneElement.classList.remove('drop-target');
    draggableElement.classList.remove('can-drop');
  },

  ondrop: function(event) {
    var draggableElement = event.relatedTarget,
      dropzoneElement = event.target;
    // bij het droppen
    draggableElement.classList.remove('can-drop');
    dropzoneElement.classList.add('is-dropped');
  },

  ondropdeactivate: function(event) {
    var draggableElement = event.relatedTarget,
      dropzoneElement = event.target;

    // remove active dropzone feedback
    dropzoneElement.classList.remove('drop-active');
    dropzoneElement.classList.remove('drop-target');
  }
});
