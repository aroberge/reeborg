About Reeborg's World
============================================

[Reeborg's World](http://reeborg.ca/reeborg.html) is a site designed for 
people wishing to learn computer programming using either Python, Javascript or a Blockly
interface.  It is free to use and does not require login. 

Some documentation which includes information for users (educators and students) 
as well as for potential contributors (developers, translators, artists) can be found at:

* [English version](http://reeborg.ca/docs/en/)
* [French version](http://reeborg.ca/docs/fr/)
* [Korean version](http://reeborg.ca/docs/ko/)

Note that the (human) language can easily be switched using a selector
on the right-hand side of the documentation page.  

The source for the documentation is found in another repository
(https://github.com/aroberge/reeborg-docs).

If you only want a copy of the files to require to run Reeborg's World on your 
own site, please consult this repository: https://github.com/aroberge/reeborg-dist.

Important information for developers
====================================

[![DeepScan grade](https://deepscan.io/api/teams/2513/projects/3632/branches/32005/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2513&pid=3632&bid=32005)

If you wish to make changes to fork this project, you should consult
[this document](https://github.com/aroberge/reeborg/blob/master/dev_tools/readme_for_devel.md). 

Known problems on Mac computers
================================

If you or your students use Mac computers, please consult
[known problems](https://github.com/aroberge/reeborg/blob/master/dev_tools/known_problems.md). 


Offline version
===============

An offline version (reeborg_offline.html) can be used without an Internet connection.
You do need a local webserver running 
as well as a copy of the repository or the 
[separate distribution mentioned above](https://github.com/aroberge/reeborg-dist).
Note that some multimedia files (sound and images) used by the blockly 
version will likely be missing, but everything will still be quite workable.

When using the offline version, you might want to use easylaunch.py,
found here in the root directory.  Make sure you read it (as it contains
important information about its use) and possibly read the content of 
reeborg_menu.txt as well.
