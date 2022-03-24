#![allow(non_snake_case)]
// #![allow(unused)]

// use std::path::Path;
// use std::fs::File;
use std::collections::HashMap;
use std::error::Error;
use std::fs;

// use lazy_static::lazy_static;

use serde::Deserialize;
// use serde::Deserialize;
// use serde::de::Error;
//use serde_json::{Map, Value};

#[derive(Debug, Deserialize, Clone)]
#[serde(untagged)]
enum StringOrListOfStrings {
    Abbreviation(String),
    ListOfAbbreviations(Vec<String>),
}

#[derive(Debug, Deserialize, Clone)]
struct ReferenceNumber(u16); // 1..999

#[derive(Debug, Deserialize, Clone)]
struct AbbreviationEntry {
    // for Bibleworks, Byzantine
    referenceNumber: ReferenceNumber,
    referenceAbbreviation: String,
}

#[derive(Debug, Deserialize, Clone)]
struct AbbreviationOrAbbreviationsEntry {
    // for SBL, OSIS, Sword, CCEL, NET, Drupal
    referenceNumber: ReferenceNumber,
    referenceAbbreviationOrAbbreviations: StringOrListOfStrings,
}

#[derive(Debug, Deserialize, Clone)]
struct USFMAbbreviationEntry {
    referenceNumber: ReferenceNumber,
    USFMAbbreviationOrAbbreviations: StringOrListOfStrings,
    USFMNumberStringOrStrings: Option<StringOrListOfStrings>,
}

#[derive(Debug, Deserialize, Clone)]
struct USFMNumberEntry {
    referenceNumber: ReferenceNumber,
    referenceAbbreviationOrAbbreviations: StringOrListOfStrings,
    USFMAbbreviationOrAbbreviations: StringOrListOfStrings,
}

#[derive(Debug, Deserialize, Clone)]
struct GeneralNumberEntry {
    // for USX, unboundBible, Bibledit
    referenceNumber: ReferenceNumber,
    referenceAbbreviation: String,
    USFMAbbreviation: String,
}

#[derive(Debug, Deserialize, Clone)]
struct ReferenceAbbreviationEntry {
    referenceNumber: ReferenceNumber,
    originalLanguageCode: String,
    bookName: String,
    shortAbbreviation: Option<String>,
    SBLAbbreviation: Option<String>,
    OSISAbbreviation: Option<String>,
    SwordAbbreviation: Option<String>,
    CCELNumberString: Option<String>,
    USFMAbbreviation: Option<String>,
    USFMNumberString: Option<String>,
    USXNumberString: Option<String>,
    UnboundCodeString: Option<String>,
    BibleditNumberString: Option<String>,
    NETBibleAbbreviation: Option<String>,
    DrupalBibleAbbreviation: Option<String>,
    ByzantineAbbreviation: Option<String>,
    numExpectedChaptersString: Option<String>,
    possibleAlternativeBooksList: Option<Vec<String>>,
    bookNameEnglishGuide: String,
    typicalSection: String,
}

#[derive(Debug, Deserialize, Clone)]
struct ReferenceNumberEntry {
    referenceAbbreviation: String,
    originalLanguageCode: String,
    bookName: String,
    shortAbbreviation: Option<String>,
    SBLAbbreviation: Option<String>,
    OSISAbbreviation: Option<String>,
    SwordAbbreviation: Option<String>,
    CCELNumberString: Option<String>,
    USFMAbbreviation: Option<String>,
    USFMNumberString: Option<String>,
    USXNumberString: Option<String>,
    UnboundCodeString: Option<String>,
    BibleditNumberString: Option<String>,
    NETBibleAbbreviation: Option<String>,
    DrupalBibleAbbreviation: Option<String>,
    ByzantineAbbreviation: Option<String>,
    numExpectedChaptersString: Option<String>,
    possibleAlternativeBooksList: Option<Vec<String>>,
    bookNameEnglishGuide: String,
    typicalSection: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct BibleBooksCodes { // This is public so we can return it
    BibleWorksAbbreviationDict: HashMap<String, AbbreviationEntry>,
    BibleditNumberDict: HashMap<String, GeneralNumberEntry>,
    ByzantineAbbreviationDict: HashMap<String, AbbreviationEntry>,
    CCELDict: HashMap<String, AbbreviationOrAbbreviationsEntry>,
    DrupalBibleAbbreviationDict: HashMap<String, AbbreviationOrAbbreviationsEntry>,
    EnglishNameDict: HashMap<String, AbbreviationEntry>,
    NETBibleAbbreviationDict: HashMap<String, AbbreviationOrAbbreviationsEntry>,
    OSISAbbreviationDict: HashMap<String, AbbreviationOrAbbreviationsEntry>,
    SBLAbbreviationDict: HashMap<String, AbbreviationOrAbbreviationsEntry>,
    SwordAbbreviationDict: HashMap<String, AbbreviationOrAbbreviationsEntry>,
    USFMAbbreviationDict: HashMap<String, USFMAbbreviationEntry>,
    USFMNumberDict: HashMap<String, USFMNumberEntry>,
    USXNumberDict: HashMap<String, GeneralNumberEntry>,
    UnboundCodeDict: HashMap<String, GeneralNumberEntry>,
    allAbbreviationsDict: HashMap<String, String>,
    referenceAbbreviationDict: HashMap<String, ReferenceAbbreviationEntry>,
    referenceNumberDict: HashMap<String, ReferenceNumberEntry>,
}

impl BibleBooksCodes {
    pub fn usfm_to_bbb(&self, usfm_bbb: &str) -> Result<String, Box<dyn Error>> {
        // println!("usfm_to_bbb for {:?}", &usfm_bbb);
        if ! &self.USFMAbbreviationDict.contains_key(usfm_bbb) {
            return Err("Invalid USFM abbreviation: '".to_owned() + usfm_bbb + "'")?; // I never actually figured out why I need the question mark?
        }
        let bbbStringOrListOfStrings = &self.USFMAbbreviationDict[usfm_bbb].USFMAbbreviationOrAbbreviations;
        match bbbStringOrListOfStrings {
            StringOrListOfStrings::Abbreviation(bbb) => Ok(bbb.to_string()),
            StringOrListOfStrings::ListOfAbbreviations(bbb_list) => Ok(bbb_list[0].to_string()),
        }
    }

    pub fn usfm_num_to_usfm_abbrev(&self, usfm_num_str: &str) -> Result<String, Box<dyn Error>> {
        // println!("usfm_num_to_usfm_abbrev for {:?}", usfm_num_str);
        if ! &self.USFMNumberDict.contains_key(usfm_num_str) {
            return Err("Invalid USFM number: '".to_owned() + &usfm_num_str + "'")?; // I never actually figured out why I need the question mark?
        }
        let bbbStringOrListOfStrings = &self.USFMNumberDict[usfm_num_str].USFMAbbreviationOrAbbreviations;
        match bbbStringOrListOfStrings {
            StringOrListOfStrings::Abbreviation(bbb) => Ok(bbb.to_string()),
            StringOrListOfStrings::ListOfAbbreviations(bbb_list) => Ok(bbb_list[0].to_string()),
        }
    }

    pub fn usfm_num_to_bbb(&self, usfm_num_str: &str) -> Result<String, Box<dyn Error>> {
        // println!("usfm_num_to_bbb for {:?}", usfm_num_str);
        if ! &self.USFMNumberDict.contains_key(usfm_num_str) {
            return Err("Invalid USFM number: '".to_owned() + &usfm_num_str + "'")?; // I never actually figured out why I need the question mark?
        }
        let bbbStringOrListOfStrings = &self.USFMNumberDict[usfm_num_str].referenceAbbreviationOrAbbreviations;
        match bbbStringOrListOfStrings {
            StringOrListOfStrings::Abbreviation(bbb) => Ok(bbb.to_string()),
            StringOrListOfStrings::ListOfAbbreviations(bbb_list) => Ok(bbb_list[0].to_string()),
        }
    }
}

#[cfg(test)]
mod tests {
    #[test]

fn it_works() {
        use crate::{load_from_json, BibleBooksCodes};
        // let data_folderpath = Path::new("DataFiles/");
        let data_folderpath = String::from("../");
        let bible_books_codes: BibleBooksCodes = load_from_json(&data_folderpath).unwrap();
        assert_eq!(bible_books_codes.referenceNumberDict["42"].referenceAbbreviation, "LUK");
        assert_eq!(bible_books_codes.usfm_to_bbb("JAS").unwrap(), "JAM");
        assert_eq!(bible_books_codes.usfm_num_to_usfm_abbrev("41").unwrap(), "Mat");
        assert_eq!(bible_books_codes.usfm_num_to_bbb("42").unwrap(), "MRK");
    }
}


// fn print_type_of<T>(_: &T) {
//     println!("{}", std::any::type_name::<T>())
// }


pub fn load_from_json(data_folderpath: &String) -> Result<BibleBooksCodes, Box<dyn Error>> {
    println!("  In bos_books_codes::load_from_json()…");

    let filepath = data_folderpath.to_owned() + "derivedFormats/BibleBooksCodes_Tables.json";
    // let the_file = File::open(filepath)?;
    let the_file_contents =
        fs::read_to_string(filepath).expect("Something went wrong reading the Books Codes JSON file");
    let bible_books_codes: BibleBooksCodes =
        serde_json::from_str(&the_file_contents).expect("Books codes JSON was not well-formatted");
    println!(
        "    Loaded Bible books codes data for {:?} books.",
        bible_books_codes.referenceNumberDict.len()
    );
    println!(
        "      Book 42 is {:?}: {:?}",
        bible_books_codes.referenceNumberDict["42"].referenceAbbreviation,
        bible_books_codes.referenceNumberDict["42"].bookNameEnglishGuide
    );

    Ok(bible_books_codes)
}
