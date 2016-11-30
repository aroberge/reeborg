# Important information

This project uses npm and various modules as part of its build process.

## Installing the required tools

### Install node and npm 

Follow the instruction found on https://docs.npmjs.com/getting-started/installing-node.
To know more about npm, please consult https://docs.npmjs.com/.

### Install browserify

To create a single javascript file (reeborg.js) from the various modules,
we use browserify (http://browserify.org/) which can be installed from 
a terminal window as follows: 

`npm install -g browserify`

### Unit testing with tape

For unit testing (of select javascript files) I use tape 
(https://github.com/substack/tape) which can also be installed using npm.
I agree with [Eric Elliott's reasons for using tape](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.5sqscrl18).

Tape can be installed either locally for this project using 

`npm install tape --save-dev`

or globally

`npm install -g tape`

Tape output, according to his creator, 
_is good for machines and humans that are robots_. As I am neither, 
I use one of the three following formatters:

* tape-diff
* tape-dot  (a minimal formatter, used by default)
* tape-spec

These are also modules that can be installed using npm.

### Checking for circular dependencies with madge

Earlier on, I did not use any of the above modules and found that 
the various javascript files I wrote had to be included in a very specific
order to avoid errors. This is what mostly motivated me to start
using browserify. I used [madge](https://github.com/pahen/madge)
to create Module Dependencies Graphs which made it easy to see that 
I had many circular relations between modules.  I now use madge 
exclusively to see if changes I make generate new circular dependencies which 
can lead to errors.

madge is another module that can be installed using npm.

I still have some circular dependencies which are "hidden" from madge as 
I do not include some `require` statements in a few selected files since the 
logic pretty much forces me to have (a few) circular dependencies if I 
want to avoid code duplication. _There might be a way to fix the code to 
avoid this_ ...

### Install Python

Using Python 3, I wrote a few script that are useful ... and at least one 
that is near-essential to (easily) create the html file used for 
integration tests.  So, you should really install Python if you wish to 
add new features so that you can run all the tests (and add new ones!)
to ensure that nothing is broken.

As a Python enthusiast working on Windows, 
I found that installing Python from the 
[Anaconda distribution](https://www.continuum.io/downloads) was preferable
to using the official Python distribution from the PSF as it made 
installing some non-Python native modules (e.g. numpy) much easier.

### Document new features using jsdoc

I use jsdoc (http://usejsdoc.org/) 
to document some "advanced world creation methods".
Currently, these are not found on the site and only live in the 
distribution found on github. Install jsdoc using

`npm install -g jsdoc`

## Building a new version

After making changes, a new version should be built (and tested).

Various scripts used when building and testing are found in the 
file package.json.  This file follows the format for npm modules ... but 
this repo is not meant to become a node module.  Still, by inspecting
the content of package.json, you may find some reference to additional
scripts not mentioned here.

### Simple build

To simply create a new version of reeborg.js (found in the folder /build), 
from a terminal, type:

`npm run only-build`

This will use browserify to concatenate all the relevant javscript files 
into a single one (reeborg.js).

### Unit tests first then build

Type

`npm run build`

to first run some unit tests followed by a new build using browserify.

### Documenting some individual Javascript modules

I have started documenting some Javascript modules containing 
methods useful for creating "advanced" worlds. To produce the documentation
from these files, use 

`npm run jsdoc`

The documentation produced is found in /doc_js/index.html.

### More complete build

[make.bat](https://github.com/aroberge/reeborg/blob/master/make.bat) 
contains a more complete build process; this is a Windows batch file which 
could be easily translated into a shell script suitable for Mac/Linux.

**Important** When running qunit tests, most often the tests for one 
world fails. However, if run in isolation, the tests pass. This is likely 
due to an async process not terminated when running the full test suite.
