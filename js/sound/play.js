var RhythmSample = [],
    tempo = 90,
    bar = 1,
    introBeats = 0,
    rhythm = [],
    sources = [],
    stopTime,
    timer;

RhythmSample.play = function(randomized) {
  stop();
  if (randomized) {
    playingRandomized = true;
    document.getElementById('playRandomized').classList.add('hide');
    document.getElementById('stopRandomized').classList.remove('hide');
  }
  else {
    document.getElementById('play').classList.add('hide');
    document.getElementById('stop').classList.remove('hide');
  }

    var kick = BUFFERS.kick,
        snare = BUFFERS.snare,
        hihat = BUFFERS.hihat,
        claves = BUFFERS.claves,
        snaps = BUFFERS.snaps,
        sound = claves;

    var quarterNoteTime = 60 / tempo,
        eighthNoteTime = quarterNoteTime / 2,
        tripletNoteTime = quarterNoteTime / 3,
        sixteenthNoteTime = quarterNoteTime / 4,
        barTime = 4 * quarterNoteTime,
        snap = true;

    sources = [];

    function playSound(buffer, time) {
        source = context.createBufferSource();
        sources.push(source);
        source.buffer = buffer;
        source.connect(context.destination);
        if (!source.start)
            source.start = source.noteOn;
        source.start(time);
    };

    // We'll start playing the rhythm 100 milliseconds from "now"
    var introTime = context.currentTime + 0.100,
        startTime = introTime + introBeats * quarterNoteTime;

    var totbeats = introBeats + bar * 4,
        beatTimeOut = new Array(totbeats),
        time = startTime + bar * 4 * quarterNoteTime;

    // snaps
    if (snap) {
      for (var i = 0; i < totbeats; i++)
          playSound(snaps, introTime + i * quarterNoteTime);
    }
    else {
      for (var i = 0; i < introBeats; i++)
          playSound(snaps, introTime + i * quarterNoteTime);
    }

    stopTime = (0.200 + totbeats * quarterNoteTime) * 1000;

    timer = setTimeout('stop()', stopTime);

    rhythm[0] = droppedEl('.droppedIn1'),
        rhythm[1] = droppedEl('.droppedIn2'),
        rhythm[2] = droppedEl('.droppedIn3'),
        rhythm[3] = droppedEl('.droppedIn4');

    bars = [];
    for (var i = 0; i < bar; i++) {
      if (randomized) {
        bars.push(rhythmRandomized[0],rhythmRandomized[1],rhythmRandomized[2],rhythmRandomized[3]);
        }
      else {
        bars.push(rhythm[0],rhythm[1],rhythm[2],rhythm[3]);
        }
    }

    for (var i = 0; i < beatTimeOut.length; i++)
      beatTimeOut[i] = i * quarterNoteTime;

    for (var i = 0; i < totbeats; i++)
        playkrt(bars[i], beatTimeOut[i]);

    function droppedEl(el) {
        if (document.querySelector(el) !== null) {
            return document.querySelector(el).getAttribute('data-oorsprong');
        } else {
            return 'krt02';
        }
    }

    function playkrt(krt, beatTime) {
        switch (krt) {
            case 'krt01':
                playSound(sound, startTime + beatTime);
                break;

            case 'krt02':
                break;

            case 'krt03':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + eighthNoteTime);
                break;

            case 'krt04':
                playSound(sound, startTime + beatTime + eighthNoteTime);
                break;

            case 'krt05':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + tripletNoteTime);
                playSound(sound, startTime + beatTime + 2 * tripletNoteTime);
                break;

            case 'krt06':
                playSound(sound, startTime + beatTime + tripletNoteTime);
                playSound(sound, startTime + beatTime + 2 * tripletNoteTime);
                break;

            case 'krt07':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + 2 * tripletNoteTime);
                break;

            case 'krt08':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + tripletNoteTime);
                break;

            case 'krt09':
                playSound(sound, startTime + beatTime + 2 * tripletNoteTime);
                break;

            case 'krt10':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + sixteenthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime + sixteenthNoteTime);
                break;

            case 'krt11':
                playSound(sound, startTime + beatTime + sixteenthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime + sixteenthNoteTime);
                break;

            case 'krt12':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + eighthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime + sixteenthNoteTime);
                break;

            case 'krt13':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + sixteenthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime + sixteenthNoteTime);
                break;

            case 'krt14':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + sixteenthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime);
                break;

            case 'krt15':
                playSound(sound, startTime + beatTime + eighthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime + sixteenthNoteTime);
                break;

            case 'krt16':
                playSound(sound, startTime + beatTime + sixteenthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime + sixteenthNoteTime);
                break;

            case 'krt17':
                playSound(sound, startTime + beatTime + sixteenthNoteTime);
                playSound(sound, startTime + beatTime + eighthNoteTime);
                break;

            case 'krt18':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + eighthNoteTime + sixteenthNoteTime);
                break;

            case 'krt19':
                playSound(sound, startTime + beatTime);
                playSound(sound, startTime + beatTime + sixteenthNoteTime);
                break;

            case 'krt20':
                playSound(sound, startTime + beatTime + sixteenthNoteTime);
                break;

            case 'krt21':
                playSound(sound, startTime + beatTime + eighthNoteTime + sixteenthNoteTime);
                break;
        }
    }
};
