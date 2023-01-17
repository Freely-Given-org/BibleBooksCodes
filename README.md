# Bible Books Codes (BibleOrgSys/BOS BibleBooksCodes)

A set of three-character codes for Bible books files and software

## Introduction

Any basic Bible software needs to be able to iterate through all the books of the Bible.
For Western Protestants, this is typically 66 books consisting of what's called in English, the <i>Old Testament</i> and the <i>New Testament</i>.

Thus many starting programmers write code to iterate through the integers 1..66.
But this fails if you go to add the original manuscripts where, of course, the Hebrew only has books 1..39 and the Greek has books 40..66. It can also fail if you want to view a translation that's incomplete (not all books are there yet so you need to skip that book number), and/or is from a different culture (e.g., includes the Laodiceans letter or more which you don't have a number for, and that and many of the other books occur inside the numbers 1..66, e.g., using say 39a, 39b, etc. for between-Testament books).

Then if you use [USFM](https://ubsicap.github.io/usfm/identification/books.html?highlight=books) files, they often have a three-character book code (e.g., "2CO") in the filename, plus they usually have a two-character <i>number</i> where Matthew is "41".
Note that that's different from your 40 above. Note also that that <i>number</i> can also contain letters (e.g., "A0" for <i>front matter</i>, or "C3" for <i>Letter to the Laodiceans</i>)!

Then you decide to include some [OSIS](https://crosswire.org/osis/) XML files. They can contain two to seven characters like "Ps", "2Cor", and "AddEsth" and are a variant of the [SBL](https://www.sbl-site.org/publications/SBLHandbookofStyle.aspx) abbreviations with any spaces removed.

So now you need to map between two different numbering systems as well as two different book abbreviation systems. The data table in this repository provides our own much wider book code and numbering system, and then provides conversions to other systems, including SBL, OSIS, Sword, CCEL, USFM, USX, Unbound Bible, Bibledit, NETBible, DrupalBible, BibleWorks, and the Robinson-Pierpont Byzantine Greek text books codes.

You can see a short list of the BibleOrgSys Bible Books Codes
[here](https://freely-given.org/Software/BibleOrganisationalSystem/BOSBooksCodes.html).

## Source file

The source file for the data table is XML.
Although not our favourite format, it does allow commenting unlike JSON,
and it has good schema support.

## Derived files

JSON, however, is more popular these days, and so the XML data table is converted into multiple JSON Objects (all within a single JSON file). So too with pickled Python dictionaries and more formats to come. And better documentation to come as well. And schemas for validation.

## Packages

Python, Rust, and Javascript utility packages are/will-be supplied and available on package managers like [PyPI](https://pypi.org/user/FGorg/), [Crates.io](https://crates.io/crates/bos_books_codes) and [NpmJs](https://www.npmjs.com/).

Note that nothing here is at version 1.0 yet. Firstly, we need to take a look at the API (things like naming and error-handling conventions in each of the programming languages, as well as general things like consistency, and symmetry related to the dataset, etc.) and see how it could/should be improved.

If a developer wants the data available in a package for a different language beyond the above three, we'll be happy to incorporate that into this repo as well.
