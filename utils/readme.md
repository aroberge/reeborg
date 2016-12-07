This folder contains two files that are kept mostly for archival purpose.

conversion.html is used to convert old worlds (including those for rur-ple)
into a suitable format for the new site. As this document is written,
the permalink conversion should not be trusted since the permalink scheme
has changed (yet again) in a way that it essentially impossible to 
convert from the old style.  It is also much, much simpler and can 
easily be written by hand.

This folder contains conversion.js; on the site, it is located under
/src/misc/ which is hard-coded in the html file. To do any kind of local
test, either move conversion.js to a newly created folder on this repo - 
or, preferably, temporarily change the source link in the html file so 
that it uses the local version of conversion.js.