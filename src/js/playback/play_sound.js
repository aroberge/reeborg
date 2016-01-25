require("jquery");
/** @function _play_sound
 * @memberof RUR.private
 * @instance
 * @summary Plays a predefined sound file to accompany some robot actions, provided
 * that the delay between frames exceeds a threshold value.
 *
 * @param {string} sound_id refers to a source sound file included in the html file.
 *
 */

RUR._play_sound = function (sound_id) {
    "use strict";
    var current_sound;
    current_sound = $(sound_id)[0];
    current_sound.load();
    current_sound.play();
};
