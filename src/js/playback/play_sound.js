
RUR._play_sound = function (sound_id) {
    "use strict";
    var current_sound;
    current_sound = $(sound_id)[0];
    current_sound.load();
    current_sound.play();
    //TODO see if rewinding to zero instead of load() might not be a better
    //way to do things. In particular, this might enable the removal of
    //the minimum time limit for the sound.
};
