Prior to excution by Python, non-breaking spaces are converted into regular space characters
to allow copy-pasting code samples from this documentation and have them
viewed as valid Python code.

### Detailed explanation

A non-breaking space is a space character that prevents a line break from
occuring at that position. Visually, a non-breaking space looks the same
as a regular space. In HTML, a non-breaking space can be represented as
either `&nbsp;` or `&#160;`. In Python, the output of `chr()` for a
non-breaking space is 160, whereas it is 32 for a regular space character.

In Reeborg's World, when executing Python code that contains non-breaking spaces
(perhaps in some strings), these characters are replaced by regular spaces.
The reason for doing so is that code samples that appear in this
documentation are formatted by [JSDoc](http://usejsdoc.org/) and either
JSDoc itself, or the [DocStrap template](https://github.com/docstrap/docstrap)
with the [Sunlight syntax highlighting](http://sunlightjs.com/)
inserts some non-breaking spaces in the code where regular spaces would appear.
Python does not recognize non-breaking spaces as valid space characters;
Javascript does not appear to make a distinction between the two.
Automatically converting the non-breaking spaces into regular spaces prior to
execution makes it easier for you to try out the code samples provided in this
documentation by simply copy-pasting them into the editor.
