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

    npm install -g browserify

### Unit testing with tape

For unit testing (of select javascript files) I use tape
(https://github.com/substack/tape) which can also be installed using npm.
I agree with [Eric Elliott's reasons for using tape](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.5sqscrl18).

Tape can be installed either locally for this project using

    npm install tape --save-dev

or globally

    npm install -g tape

Tape output, according to his creator,
_is good for machines and humans that are robots_. As I am neither,
I use the following formatters:

* faucet


This is also a module that can be installed using npm.
In the past, I have also used

* tap-diff
* tap-dot  (a minimal formatter)
* tap-spec
* tap-notify (used in conjunction with any of the others)

but I have found that faucet, written (I believe) by the creator of tape,
did the best job in terms of providing the required information with
reduced clutter.

To run the unit tests, do

    npm run test

or

    npm run tests

I included both versions so as to not have to worry about typos.

It may also be useful to run the batch file unit_test.bat  (or write a similar shell
script for Mac/Linux) as it is a more reliable way to ensure that
proper requirements are included in each file being tested, since using
the global RUR namespace can hide some missing dependencies.

### Integration tests with qunit

See below under the **More complete build** section.

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

### Checking for missing required modules with dependo

To see if any modules might have not been loaded,
I use [dependo](https://www.npmjs.com/package/dependo) with
`dependo -f cjs src\js > depend.html` and view the resulting (messy) graph
in a browser. dependo is yet another module that can be installed with npm.

### Install Python

Using Python 3, I wrote a few script that are useful ... and at least one
that is near-essential to (easily) create the html file used for
integration tests.  So, you should really install Python if you wish to
add new features so that you can run all the tests (and add new ones!)
to ensure that nothing is broken.

### Document new features using jsdoc

I use jsdoc (http://usejsdoc.org/)
to document some "advanced world creation methods".
Currently, these are not found on the site and only live in the
distribution found on github. Install jsdoc using

    npm install -g jsdoc

I also use ink-docstrap as jsdoc templates. Install using

    npm install ink-docstrap


## Building a new version

After making changes, a new version should be built (and tested).

Various scripts used when building and testing are found in the
file package.json.  This file follows the format for npm modules ... but
this repo is not meant to become a node module.  Still, by inspecting
the content of package.json, you may find some reference to additional
scripts not mentioned here.

### Simple build

To simply create a new version of reeborg.js (found in the folder /build),
from a terminal, one can type

    npm run only-build

This will use browserify to concatenate all the relevant javscript files
into a single one (reeborg.js). However, I would recommend instead to type

    npm run build

to first run some unit tests followed by a new build using browserify.
**Important:** you might have to create the folder /build first.


### Documenting some individual Javascript modules

I have started documenting some Javascript modules containing
methods useful for creating "advanced" worlds. To produce the documentation
from these files, use

    npm run jsdoc

The documentation produced is found in api_docs/advanced_world_creation/index.html.
You should read api_docs/readme.md for more details.

### More complete build

[make.bat](https://github.com/aroberge/reeborg/blob/master/make.bat)
contains a more complete build process; this is a Windows batch file which
could be easily translated into a shell script suitable for Mac/Linux.

In addition to creating a normal "build version" and running unit tests,
this script will result in creating two special versions of the html file
(one for purely offline testing, the other making use of libraries found
on CDNs [Content Delivery Networks]) as used in the "normal" reeborg.html.

The special qunit version is basically the normal reeborg.html file with:

* an extra html div that enclose the entire content and is set to be
  invisible (display=none)
* the addition of links to qunit.js and various other tests files.

So, qunit will run automated tests with the fully complete reeborg.html file,
loading worlds, executing programs, testing results, etc.  The entire test suite
currently (June 2017) takes approximately 40 seconds to run.

**Important** The server code is run in Chrome in incognito mode. To do this,
it is necessary to hard-code the Chrome path in the python script.
The current path is that used on my Windows 11 computer. 
If Chrome does not launch for you, you likely need to modify the python script
to select your desired browser (preferably in private/incognito mode).

**Important** When running the entire qunit tests, a few tests
(including `"Storm 3; also tests library"`) fail.
However, if run in isolation, the tests pass. (You should make sure that this
is the case.)
I have not been able to track down the cause of this but I am guessing that this
is due to an async process not terminated when running the full test suite.

Note that, sometimes, the browser may use a cached version of the files;
you may want to do a full refresh of the browser to ensure that any change you
made is properly taken into account.

## Other repositories

There are two other repositories of potential interest:

* https://github.com/aroberge/reeborg-docs contains hand-written documentation
  for users in three languages (English, French, Korean)

* https://github.com/aroberge/reeborg-dist is used to create and store a single zip file
  for easy deployment of Reeborg's World on a server.
