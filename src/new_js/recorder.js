/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.rec = {
    nb_frames : undefined,
    current_frame : undefined,
    frames : undefined
};

RUR.rec.reset = function() {
    RUR.rec.nb_frames = 0;
    RUR.rec.current_frame = 0;
    RUR.rec.frames = [];
};
RUR.rec.reset();

RUR.rec.record_frame = function () {
    // clone current world and store the clone
    
};

RUR.rec.play_frame = function () {
    // set current world to frame being played.
};

RUR.rec.play = function () {
    // play all frames in succession
};
