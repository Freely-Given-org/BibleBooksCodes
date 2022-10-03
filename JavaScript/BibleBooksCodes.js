/*
Module handling BibleBooksCodes functions.

BibleOrgSys uses a three-character book code to identify books.
These referenceAbbreviations are nearly always represented as BBB in the program code
    (although formally named referenceAbbreviation
and possibly still represented as that in some of the older code),
    and in a sense, this is the centre of the BibleOrgSys.
The referenceAbbreviation/BBB always starts with a letter, and letters are always UPPERCASE
    so 2 Corinthians is 'CO2' not '2Co' or anything.
This was because early versions of HTML ID fields used to need
    to start with a letter (not a digit),
(and most identifiers in computer languages still require that).
*/

const LAST_MODIFIED_DATE = "2022-02-18";
const SHORT_PROGRAM_NAME = "BibleBooksCodes";
const PROGRAM_NAME = "Bible Books Codes handler";
const PROGRAM_VERSION = "0.87";
const PROGRAM_NAME_VERSION = `${SHORT_PROGRAM_NAME} v${PROGRAM_VERSION}`;
const DEBUGGING_THIS_MODULE = false;

class BibleBooksCodes {
  /*
  Class for handling BibleBooksCodes.
   This class doesn't deal at all with XML, only with JSON.
   Note: BBB is used in this class to represent the three-character referenceAbbreviation.
  */
  constructor() {
    /*
    Loads the JSON data file and imports it to dictionary format (if not done already).
    */
//    console.warn(`("Loading BibleBooksCodes…");
    this.dataDicts = require('./BibleBooksCodes_Tables');
    // console.warn(`(`this.dataDicts=${typeof this.dataDicts} with ${Object.keys(this.dataDicts).length} keys: ${Object.keys(this.dataDicts)}`);
    }

  toString() {
    /*
    This method returns the string representation of a Bible book code.
     @return: the name of a Bible object formatted as a string
    @rtype: string
    */
    let indent, result;
    indent = 2;
    result = "BibleBooksCodes object";
    result += (result ? "\n" : "") + " " * indent + `Number of entries = ${Object.keys(this.dataDicts["referenceAbbreviationDict"]).length}`
    return result;
  }

  get length() {
    /*
    Return the number of available codes.
    */
    console.assert(Object.keys(this.dataDicts["referenceAbbreviationDict"]).length === Object.keys(this.dataDicts["referenceNumberDict"]).length);
    return Object.keys(this.dataDicts["referenceAbbreviationDict"]).length;
  }

  contains(BBB) {
    /*  Returns True or False.  */
    return BBB in this.dataDicts["referenceAbbreviationDict"];
  }

  getBBBlist() {
    /*  Returns a list of BBBs. */
    const result = [];
    for (const BBB of Object.keys(this.dataDicts["referenceAbbreviationDict"])) {
      result.push(BBB);
    }
    return result;
  }

  isValidBBB(BBB) {
    /*
    Returns True or False.
    */
    return BBB in this.dataDicts["referenceAbbreviationDict"];
  }

  getBBBFromReferenceNumber(referenceNumber) {
    /*
    Return the referenceAbbreviation for the given book number (referenceNumber).
     This is probably only useful in the range 1..66 (GEN..REV).
    (After that, it specifies our arbitrary order.)
    */
    if (typeof referenceNumber === "string" || referenceNumber instanceof String) {
      referenceNumber = Number.parseInt(referenceNumber);
    }

    if (!(1 <= referenceNumber && referenceNumber <= 999)) {
      throw ValueError;
    }

    return this.dataDicts["referenceNumberDict"][referenceNumber]["referenceAbbreviation"];
  }

  getAllReferenceAbbreviations() {
    /*  Returns a list of all possible BBB codes.  */
    /*  Returns a list of BBBs. */
    const result = [];
    for (const BBB of Object.keys(this.dataDicts["referenceAbbreviationDict"])) {
      result.push(BBB);
    }
    return result;
  }

  getReferenceNumber(BBB) {
    /*  Return the referenceNumber 1..999 for the given book code (referenceAbbreviation).  */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["referenceNumber"];
  }

  getSequenceList(myList = null) {
    /*
    Return a list of BBB codes in a sequence that could be used for the print order if no further information is available.
    If you supply a list of books, it puts your actual book codes into the default order.
    Your list can simply be a list of BBB strings, or a list of tuples with the BBB as the first entry in the tuple.
    */
    let BBB, BBB2, resultList;
    // console.log(`getSequenceList(${myList})`);

    if (myList === null) {
      return this.dataDicts["sequenceList"];
    }

    if (!myList) {
      return [];
    }

    for (let something, c = 0, a = myList, b = a.length; c < b; ++c) {
      something = a[c];
      BBB = typeof something === "string" || something instanceof String ? something : something[0];

      console.assert(this.isValidBBB(BBB), null);
    }

    resultList = [];

    for (let BBB1, c = 0, a = this.dataDicts["sequenceList"], b = a.length; c < b; ++c) {
      BBB1 = a[c];

      for (let something, f = 0, d = myList, e = d.length; f < e; f += 1) {
        something = d[f];
        BBB2 = typeof something === "string" || something instanceof String ? something : something[0];

        if (BBB2 === BBB1) {
          resultList.push(something);
          break;
        }
      }
    }

    console.assert(resultList.length === myList.length, null);

    return resultList;
  }

  _getFullEntry(BBB) {
    /*
    Return the full dictionary for the given book (code).
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB];
  }

  getCCELNumber(BBB) {
    /*  Return the CCEL number string for the given book code (referenceAbbreviation).  */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["CCELNumberString"];
  }

  getShortAbbreviation(BBB) {
    /*  Return the short abbreviation string for the given book code (referenceAbbreviation).  */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["shortAbbreviation"];
  }

  getSBLAbbreviation(BBB) {
    /*  Return the SBL abbreviation string for the given book code (referenceAbbreviation).  */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["SBLAbbreviation"];
  }

  getOSISAbbreviation(BBB) {
    /*  Return the OSIS abbreviation string for the given book code (referenceAbbreviation).  */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["OSISAbbreviation"];
  }

  getSwordAbbreviation(BBB) {
    /*  Return the Sword abbreviation string for the given book code (referenceAbbreviation).  */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["SwordAbbreviation"];
  }

  getUSFMAbbreviation(BBB) {
    /*  Return the USFM abbreviation string for the given book code (referenceAbbreviation).  */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["USFMAbbreviation"];
  }

  getUSFMNumber(BBB) {
    /*  Return the two-digit USFM number string for the given book code (referenceAbbreviation).  */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["USFMNumberString"];
  }

  getUSXNumber(BBB) {
    /*  Return the three-digit USX number string for the given book code (referenceAbbreviation).  */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["USXNumberString"];
  }

  getUnboundBibleCode(BBB) {
    /*
    Return the three character (two-digits and one uppercase letter) Unbound Bible code
    for the given book code (referenceAbbreviation).
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["UnboundCodeString"];
  }

  getBibleditNumber(BBB) {
    /*
    Return the one or two-digit Bibledit number string for the given book code (referenceAbbreviation).
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["BibleditNumberString"];
  }

  getNETBibleAbbreviation(BBB) {
    /*
    Return the NET Bible abbreviation string for the given book code (referenceAbbreviation).
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["NETBibleAbbreviation"];
  }

  getDrupalBibleAbbreviation(BBB) {
    /*
    Return the DrupalBible abbreviation string for the given book code (referenceAbbreviation).
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["DrupalBibleAbbreviation"];
  }

  getByzantineAbbreviation(BBB) {
    /*
    Return the Byzantine abbreviation string for the given book code (referenceAbbreviation).
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["ByzantineAbbreviation"];
  }

  getBBBFromOSISAbbreviation(osisAbbreviation, strict = false) {
    /*
    Return the reference abbreviation string for the given OSIS book code string.
     Also tries the Sword book codes unless strict is set to True.
    */
//    console.log(osisAbbreviation, this.dataDicts["OSISAbbreviationDict"][osisAbbreviation.toUpperCase()]);
    if (strict)
        return this.dataDicts["OSISAbbreviationDict"][osisAbbreviation.toUpperCase()][1];
    //else {
    try { return this.dataDicts["OSISAbbreviationDict"][osisAbbreviation.toUpperCase()][1];
    } catch (e) {
        return this.dataDicts["SwordAbbreviationDict"][osisAbbreviation.toUpperCase()][1];
    }
  }

  getBBBFromUSFMAbbreviation(USFMAbbreviation, strict = false) {
    /*
    Return the reference abbreviation string for the given USFM (Paratext) book code string.
    */
    let result;

    console.assert(USFMAbbreviation.length === 3, null);

    result = this.dataDicts["USFMAbbreviationDict"][USFMAbbreviation.upper()][1];

    if (typeof result === "string" || result instanceof String) {
      return result;
    }

    if (strict) {
      console.warn(`getBBBFromUSFMAbbreviation is assuming that the best fit for USFM ID '{USFMAbbreviation}' is the first entry in ${result}`);
    }

    return result[0];
  }

  getBBBFromUnboundBibleCode(UnboundBibleCode) {
    /*
    Return the reference abbreviation string for the given Unbound Bible book code string.
    */
    return this.dataDicts["UnboundCodeDict"][UnboundBibleCode.upper()][1];
  }

  getBBBFromDrupalBibleCode(DrupalBibleCode) {
    /*
    Return the reference abbreviation string for the given DrupalBible book code string.
    */
    return this.dataDicts["DrupalBibleAbbreviationDict"][DrupalBibleCode.upper()][1];
  }

  getBBBFromText(someText) {
    /*
    Attempt to return the BBB reference abbreviation string for the given book information (text).
     Only works for English.
    BibleBooksNames.py has a more generic version.
     Returns BBB or None.
    */
    let SomeUppercaseText, foundBBB, matchCount;
    // console.log(`BibleBooksCodes.getBBBFromText( ${someText} )`);
    console.assert(someText && (typeof someText === "string" || someText instanceof String), null);

    SomeUppercaseText = someText.toUpperCase();

    if (SomeUppercaseText in this.dataDicts["referenceAbbreviationDict"]) {
      return SomeUppercaseText;
    }

    if (SomeUppercaseText in this.dataDicts["allAbbreviationsDict"]) {
      return this.dataDicts["allAbbreviationsDict"][SomeUppercaseText];
    }

    [matchCount, foundBBB] = [0, null];

    for (let BBB, c = 0, a = this.dataDicts["referenceAbbreviationDict"], b = a.length; c < b; ++c) {
      BBB = a[c];

      if (BBB in SomeUppercaseText) {
        matchCount += 1;
        foundBBB = BBB;
      }
    }

    if (matchCount === 1) {
      return foundBBB;
    }
  }

  getExpectedChaptersList(BBB) {
    /*
    Gets a list with the number of expected chapters for the given book code (referenceAbbreviation).
    The number(s) of expected chapters is left in string form (not int).
     Why is it a list?
    Because some books have alternate possible numbers of chapters depending on the Biblical tradition.
    */
    let eC;

    // if (!"numExpectedChapters" in this.dataDicts["referenceAbbreviationDict"][BBB] || this.dataDicts["referenceAbbreviationDict"][BBB]["numExpectedChapters"] === null) {
    //   return [];
    // }

    eC = this.dataDicts["referenceAbbreviationDict"][BBB]["numExpectedChapters"];

    if (eC) {
      return function () {
        let a = [],
            b = eC.split(",");

        for (let c = 0, d = b.length; c < d; ++c) {
          let v = b[c];

          a.push(v);
        }

        return a;
      }.call(this);
    }
  }

  getMaxChapters(BBB) {
    /*
    Returns an integer with the maximum number of chapters to be expected for this book.
    */
    let intNC, maxChapters;
    maxChapters = -1;

    for (let numChapters, c = 0, a = this.getExpectedChaptersList(BBB), b = a.length; c < b; ++c) {
      numChapters = a[c];

      try {
        intNC = Number.parseInt(numChapters);
      } catch (e) {
        if (e instanceof ValueError) {
          intNC = -1;
        } else {
          throw e;
        }
      }

      if (intNC > maxChapters) {
        maxChapters = intNC;
      }
    }

    return maxChapters;
  }

  getSingleChapterBooksList() {
    /*
    Makes up and returns a list of single chapter book codes (BBB).
    */
    const results = [];
    for (const BBB of this.getAllReferenceAbbreviations())
      if (this.dataDicts["referenceAbbreviationDict"][BBB]["numExpectedChapters"] !== null && this.dataDicts["referenceAbbreviationDict"][BBB]["numExpectedChapters"] === "1")
        results.push(BBB);
    return results;
  }

  isSingleChapterBook(BBB) {
    /*
    Returns True or False if the number of chapters for the book is only one.
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["numExpectedChapters"] === "1";
  }

  isChapterVerseBook(BBB) {
    /*
    Returns True or False if this book is expected to have chapters and verses.
    */
    return "numExpectedChapters" in this.dataDicts["referenceAbbreviationDict"][BBB]
        && this.dataDicts["referenceAbbreviationDict"][BBB]["numExpectedChapters"] !== null;
  }

  getOSISSingleChapterBooksList() {
    /*  Gets a list of OSIS single chapter book abbreviations.  */
    let osisAbbrev, results;
    results = [];

    for (let BBB, c = 0, a = this.getSingleChapterBooksList(), b = a.length; c < b; ++c) {
      BBB = a[c];
      osisAbbrev = this.getOSISAbbreviation(BBB);

      if (osisAbbrev !== null) {
        results.push(osisAbbrev);
      }
    }

    return results;
  }

  getAllOSISBooksCodes() {
    /*
    Return a list of all available OSIS book codes (in no particular order).
    */
    return function () {
      let a = [],
          b = this.dataDicts["OSISAbbreviationDict"];

      for (let c = 0, d = b.length; c < d; ++c) {
        let bk = b[c];

        a.push(bk);
      }

      return a;
    }.call(this);
  }

  getAllUSFMBooksCodes(toUpper = false) {
    /*
    Return a list of all available USFM book codes.
    */
    let pA, result;
    result = [];
    pA = values["USFMAbbreviation"];

    if (pA !== null) {
      if (toUpper) {
        pA = pA.upper();
      }

      if (!in_es6(pA, result)) {
        result.push(pA);
      }
    }

    return result;
  }

  getAllUSFMBooksCodeNumberTriples() {
    /*
    Return a list of all available USFM book codes.
     The list contains tuples of:
    USFMAbbreviation, USFMNumber, referenceAbbreviation/BBB
    */
    const found=[], result=[];
    for (const [BBB, values] of Object.entries(this.dataDicts['referenceAbbreviationDict'])) {
        const pA = values["USFMAbbreviation"];
        const pN = values["USFMNumberString"];

        if (pA !== null && pN !== null) {
        if (!found.hasOwnProperty(pA)) {
            result.push([pA, pN, BBB]);
            found.push(pA);
            }
        }
    }

    return result;
  }

  getAllUSXBooksCodeNumberTriples() {
    /*
    Return a list of all available USX book codes.
     The list contains tuples of: USFMAbbreviation, USXNumber, referenceAbbreviation
    */
     const found=[], result=[];
     for (const [BBB, values] of Object.entries(this.dataDicts['referenceAbbreviationDict'])) {
        const pA = values["USFMAbbreviation"];
        const pN = values["USXNumberString"];

        if (pA !== null && pN !== null) {
        if (!found.hasOwnProperty(pA)) {
            result.push([pA, pN, BBB]);
            found.push(pA);
            }
        }
    }
    return result;
  }

  getAllBibleditBooksCodeNumberTriples() {
    /*
    Return a list of all available Bibledit book codes.
     The list contains tuples of: USFMAbbreviation, BibleditNumber, referenceAbbreviation
    */
     const found=[], result=[];
     for (const [BBB, values] of Object.entries(this.dataDicts['referenceAbbreviationDict'])) {
         const pA = values["USFMAbbreviation"];
         const pN = values["BibleditNumberString"];

        if (pA !== null && pN !== null) {
            if (!found.hasOwnProperty(pA)) {
                result.push([pA, pN, BBB]);
                found.push(pA);
            }
        }
    }

    return result;
  }

  getPossibleAlternativeBooksCodes(BBB) {
    /*
    Return a list of any book reference codes for possible similar alternative books.
     Returns None (rather than an empty list) if there's none.
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["possibleAlternativeBooks"];
  }

  getTypicalSection(BBB) {
    /*
    Return typical section abbreviation.
    OT, OT+, NT, NT+, DC, PS, FRT, BAK
     Returns None (rather than an empty list) if there's none.
    */
//    console.log("getTypicalSection(" + BBB + ")", this.dataDicts["referenceAbbreviationDict"][BBB]);
    return this.dataDicts["referenceAbbreviationDict"][BBB]["typicalSection"];
  }

  continuesThroughChapters(BBB) {
    /*
    Returns True if the storyline of the book continues through chapters,
    i.e., the chapter divisions are artificial.
     Returns False for books like Psalms where chapters are actual units.
     Note that this is a bit of a hack,
    because ideally this information should be encoded in the XML file, not here in the code.
    TODO: Fix this
    */
    if (BBB in ["PSA", "PS2", "LAM"]) {
      return false;
    }

    return true;
  }

  BCVReferenceToInt(BCVReferenceTuple) {
    /*
    Convert a BCV or BCVS reference to an integer
    especially so that references can be sorted.
    */
    let BBB, C, S, V, V1, intC, intS, intV, result;

    try {
      [BBB, C, V] = BCVReferenceTuple;
      S = "";
    } catch (e) {
      [BBB, C, V, S] = BCVReferenceTuple;
      console.log(BCVReferenceTuple);
      halt;
    }

    result = this.getReferenceNumber(BBB);

    try {
      intC = Number.parseInt(C);
    } catch (e) {
      if (e instanceof ValueError) {
        console.log(repr(C));
        halt;
      } else {
        throw e;
      }
    }

    result = result * 100 + intC;
    V1 = V.split("-")[0];

    try {
      intV = Number.parseInt(V1);
    } catch (e) {
      if (e instanceof ValueError) {
        console.log(repr(V));
        halt;
      } else {
        throw e;
      }
    }

    result = result * 150 + intV;

    try {
      intS = S ? {
        "a": 0,
        "b": 1
      }[S.lower()] : 0;
    } catch (e) {
      if (e instanceof ValueError) {
        console.log(repr(S));
        halt;
      } else {
        throw e;
      }
    }

    result = result * 10 + intS;
    return result;
  }

  sortBCVReferences(referencesList) {
    /*
    Sort an iterable containing 3-tuples of BBB,C,V
    or 4-tuples of BBB,C,V,S
    */
    let sortedList;
    sortedList = sorted(referencesList, {
      "key": this.BCVReferenceToInt
    });
    return sortedList;
  }

  getBookName(BBB) {
    /*
    Returns the original language name for a book.
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["bookName"];
  }

  getEnglishName_NR(BBB) {
    /*
    Returns the first English name for a book. (Options are separated by forward slashes.)
     Remember: These names are only intended as comments or for some basic module processing.
    They are not intended to be used for a proper international human interface.
    The first one in the list is supposed to be the more common.
    */
    return this.dataDicts["referenceAbbreviationDict"][BBB]["bookNameEnglishGuide"].split("/", 1)[0].trim();
  }

  getEnglishNameList_NR(BBB) {
    /*
    Returns a list of possible English names for a book.
     Remember: These names are only intended as comments or for some basic module processing.
    They are not intended to be used for a proper international human interface.
    The first one in the list is supposed to be the more common.
    */
    return function () {
      let a = [],
          b = this.dataDicts["referenceAbbreviationDict"][BBB]["bookNameEnglishGuide"].split("/");

      for (let c = 0, d = b.length; c < d; ++c) {
        const name = b[c];

        a.push(name.trim());
      }

      return a;
    }.call(this);
  }

  isOldTestament_NR(BBB) {
    /*
    Returns True if the given referenceAbbreviation indicates a European Protestant Old Testament book (39).
    NOTE: This is not truly international so it's not a recommended function.
    */
    return this.getReferenceNumber(BBB)>=1 && this.getReferenceNumber(BBB) <= 39;
  }

  isNewTestament_NR(BBB) {
    /*
    Returns True if the given referenceAbbreviation indicates a European Protestant New Testament book (27).
    NOTE: This is not truly international so it's not a recommended function.
    */
    return this.getReferenceNumber(BBB)>=40 && this.getReferenceNumber(BBB) <= 66;
  }

  isDeuterocanon_NR(BBB) {
    /*
    Returns True if the given referenceAbbreviation indicates a European Deuterocanon/Apocrypha book (15).
    NOTE: This is not truly international so it's not a recommended function.
    */
    return BBB in ["TOB", "JDT", "ESG", "WIS", "SIR", "BAR", "LJE", "PAZ", "SUS", "BEL", "MA1", "MA2", "GES", "LES", "MAN"];
  }

//   createLists(outputFolder = null) {
//     /*
//     Writes a list of Bible Books Codes to a text file in the BOSOutputFiles folder
//     and also to an HTML-formatted table.
//     */
//     if (!outputFolder) {
//       outputFolder = "BOSOutputFiles/";
//     }

//     if (!os.access(outputFolder, os.F_OK)) {
//       os.makedirs(outputFolder);
//     }

//     if (0) {
//       txtFile.write("NUM BBB English name\n");
//       htmlFile.write("<html><body><table border=\"1\">\n<tr><th>NUM</th><th>BBB</th><th>English name</th></tr>\n");

//       for (let BBB, c = 0, a = this.dataDicts["referenceAbbreviationDict"], b = a.length; c < b; ++c) {
//         BBB = a[c];
//         txtFile.write("{:3} ${} ${}\n".format(this.getReferenceNumber(BBB), BBB, this.getEnglishName_NR(BBB)));
//         htmlFile.write("<tr><td>${}</td><td>${}</td><td>${}</td></tr>\n".format(this.getReferenceNumber(BBB), BBB, this.getEnglishName_NR(BBB)));
//       }

//       htmlFile.write("</table></body></html>\n");
//     }
//   }

}

function tidyBBB(BBB) {
  /*
  Change book codes like SA1 to the conventional 1SA.
   BBB is always three characters starting with an UPPERCASE LETTER.
  */
  return BBB[2].isdigit() ? BBB[2] + BBB.slice(0, 2) : BBB;
}

function tidyBBBs(BBBs) {
  /*
  Change a list of book codes like SA1 to the conventional 1SA.
  */
  return function () {
    let a = [],
        b = BBBs;

    for (let c = 0, d = b.length; c < d; ++c) {
      let BBB = b[c];

      a.push(tidyBBB(BBB));
    }

    return a;
  }.call(this);
}

module.exports = BibleBooksCodes;
