const BibleBooksCodes = require('./BibleBooksCodes');

/*
Full demo to check class is working
*/
const bbc = new BibleBooksCodes();

console.log(Object.keys(bbc.dataDicts));
console.log(`Esther has ${bbc.getExpectedChaptersList('EST')} expected chapters`);
console.log(`Apocalypse of Ezra has ${bbc.getExpectedChaptersList("EZA")} expected chapters`);
console.log(`Psalms has ${bbc.getMaxChapters("PSA")} expected chapters`);
console.log("Names for Genesis are:", bbc.getEnglishNameList_NR("GEN"));
console.log("Names for Sirach are:", bbc.getEnglishNameList_NR("SIR"));
console.log("All BBBs:", bbc.getAllReferenceAbbreviations().length, bbc.getAllReferenceAbbreviations());
console.log("All BBBs in a print sequence", bbc.getSequenceList().length, bbc.getSequenceList());
myBBBs = ["GEN", "EXO", "PSA", "ISA", "MAL", "MAT", "REV", "GLS"];
console.log("My BBBs in sequence", myBBBs.length, myBBBs, "now", bbc.getSequenceList(myBBBs).length, bbc.getSequenceList(myBBBs));

for (let BBB, c = 0, a = myBBBs, b = a.length; c < b; ++c) {
    BBB = a[c];
    console.log(`${BBB} is typically in ${bbc.getTypicalSection(BBB)} section`);
}

myBBBs = ["REV", "CO2", "GEN", "PSA", "CO1", "ISA", "SA2", "MAT", "GLS", "JOB"];
console.log("My BBBs in sequence", myBBBs.length, myBBBs, "now", bbc.getSequenceList(myBBBs).length, bbc.getSequenceList(myBBBs));

for (let BBB, c = 0, a = myBBBs, b = a.length; c < b; ++c) {
    BBB = a[c];
    console.log(`${BBB} is typically in ${bbc.getTypicalSection(BBB)} section`);
}

console.log("USFM triples:", bbc.getAllUSFMBooksCodeNumberTriples().length, bbc.getAllUSFMBooksCodeNumberTriples());
console.log("USX triples:", bbc.getAllUSXBooksCodeNumberTriples().length, bbc.getAllUSXBooksCodeNumberTriples());
console.log("Bibledit triples:", bbc.getAllBibleditBooksCodeNumberTriples().length, bbc.getAllBibleditBooksCodeNumberTriples());
console.log(`Single chapter books (and OSIS):\n  ${bbc.getSingleChapterBooksList()}\n  ${bbc.getOSISSingleChapterBooksList()}`);
console.log(`Possible alternative  books to Esther: ${bbc.getPossibleAlternativeBooksCodes("EST")}`);

for (const someText of ["PE2", "2Pe", "2 Pet", "2Pet", "Job"])
    console.log(`Text '${someText}' -> ${bbc.getBBBFromText(someText)}`);

for (const osisCode of ["Gen", "1Kgs", "Ps", "Mal", "Matt", "2John", "Rev", "EpLao", "3Meq"])
    console.log(`Osis '${osisCode}' -> ${bbc.getBBBFromOSISAbbreviation(osisCode)}`);

const sections = {};
for (const BBB of bbc.getAllReferenceAbbreviations()) {
    sectionName = bbc.getTypicalSection(BBB);

    if (!sections.hasOwnProperty(sectionName))
        sections[sectionName] = [];
    sections[sectionName].push(BBB);
}

console.log(`\n${bbc.length} book codes in ${Object.keys(sections).length} sections`);
for (const sectionName of Object.keys(sections))
    console.log(`  ${sectionName} section: (${sections[sectionName].length}) ${sections[sectionName]}`);
