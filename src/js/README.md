
This directory contains all the non human language specific javascript file
required for Reeborg's World. They have evolved overtime in a bit of an
idiosyncratic fashion which deserves some explanation.

Since the goal of Reeborg's World is to allow the user (student) to
run their own programs, name clashes have to be avoided between functions
created for Reeborg's World and those created by the student.
The imperfect solution I have chosen is to try, as much as possible, to use
a single namespace [`RUR` for Reeborg the UsedRobot, which is also valid
in French as _le Robot Usagé Reeborg_ and refers to the first time the
name **robot** was used [RUR](https://en.wikipedia.org/wiki/R.U.R).]

To keep things manageable, I have split the content in files, with a different
sub-namespace used for **almost** every file (e.g. `RUR.control` for `control.js`).
The individual files are concatenated into a single file, currently named
`reeborg_dev.js`, using a windows batch file.

The concatenation is done alphabetically.  For clarity, I have chosen to
include at the very end the almost all the files whose content is
executed after the html document has been loaded
[i.e. using the `$(document).ready(function() {...});` idiom]
by naming it `zzz_doc_ready.js`.  As this file's content became unwieldy,
I decided to create individual files prefixed by `zz_dr_`
[`zz_` to be included near the end, `dr` short for `doc_ready`]
whose content often includes only one type of initialization
(e.g. determine what happens when one click on various elements).
The one exception to this rule is for `custom_dialogs.js` which is loaded
earlier mostly for historical reasons
[Nothing would be gained by changing the way it is dealt with currently.]
