# GhostToJekyll

A little script to go through a Ghost export file and convert it to Jekyll. I don't even sanitize inputs, so please don't use this until you've read and understood it!

to invoke:
``node index.js [path-to-ghost-export-file] [path to jekyll posts directory]``

It doesn't preserve categories/tags because the ghost export format for those is kinda weird.
