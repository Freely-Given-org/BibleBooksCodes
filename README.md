# BibleBooksCodes

A set of three-character codes for Bible books files and software

## Introduction

Any basic Bible software needs to be able to iterate through all the books of the Bible.
For Western Protestants, this is typically 66 books consisting of what's called in English, the <i>Old Testament</i> and the <i>New Testament</i>.

Thus many starting programmers write code to iterate through the integers 1..66.
But this fails if you go to add the original manuscripts where, of course, the Hebrew only has books 1..39 and the Greek has books 40..66. It can also fail if you want to view a translation that's incomplete (not all books are there yet so you need to skip that book number), and/or is from a different culture (e.g., includes the book of Laodiceans or more which you don't have a number for, and that and many of the other books occur inside the numbers 1..66, e.g., 39a, 39b, etc.).

Then if you use [USFM](https://ubsicap.github.io/usfm/identification/books.html?highlight=books) files, they often have a three-character book code (e.g., "2CO") in the filename, plus they usually have a two-character <i>number</i> where Matthew is "41".
Note that that's different from your 40 above. Note also that that <i>number</i> can also contain letters!

Then you decide to include some [OSIS](https://crosswire.org/osis/) XML files. They can contain two to seven characters like "Ps", "2Cor", and "AddEsth" and are a variant of the [SBL](https://www.sbl-site.org/publications/SBLHandbookofStyle.aspx) abbreviations any spaces removed.

So now you need to map between two different numbering systems as well as two different book abbreviation systems. The data table in this repository provides a base book code and numbering system, and then provides conversions to other systems, including SBL, OSIS, Sword, CCEL, USFM, USX, Unbound Bible, Bibledit, NETBible, DrupalBible, BibleWorks, and the Robinson-Pierpont Byzantine Greek text.
