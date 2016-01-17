
This directory contains most of the non human language specific javascript file
required for Reeborg's World. They have evolved overtime in a bit of an
idiosyncratic fashion which deserves some explanation.

Since the goal of Reeborg's World is to allow the user (student) to
run their own programs, name clashes have to be avoided between functions
created for Reeborg's World and those created by the student.
The imperfect solution I have chosen is to try, as much as possible, to use
a single namespace (`RUR` for Reeborg the UsedRobot, which is also valid
in French as _le Robot Usagé Reeborg_ and refers to the first time the
name **robot** was used [see RUR](https://en.wikipedia.org/wiki/R.U.R).)

To keep things manageable, I have split the content in files, with a different
sub-namespace used for **almost** every file (e.g. `RUR.control` for `control.js`).
The individual files are concatenated into a single file, currently named
`reeborg_dev.js`, using browserify with the command:

    browserify index.js -o reeborg_dev.js
