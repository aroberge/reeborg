About Reeborg's World
============================================

Please consult the documentation which can be found at http://reeborg.ca/docs/en/

It includes information for users (educators and students) as well as potential contributors (developers, translators, artists).

Also, note some [known problems](https://github.com/aroberge/reeborg/blob/master/known_problems.md) especially when dealing with saving files on Mac computers.

Permission is given to make copies on some other site, *but* I would request that you contact me to inform me so that I can add the information about where Reeborg is used and so that I can keep you abreast of any new development.

Important information
=====================

This project uses npm and browserify as part of its build process.

Offline version
===============

An offline version (reeborg_offline.html) can be used without an Internet connection.
You do need a local webserver running (I usually do this via `python -m http.server`)
as well as a copy of the repository. After starting the webserver, point your browser to `http://localhost:8000/reeborg_offline.html`.

Note that some multimedia files (sound and images) needed for the blockly version will be missing.
