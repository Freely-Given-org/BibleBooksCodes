//WARNINGS_GO_HERE

#![allow(non_snake_case)]
// #![allow(unused)]

use std::error::Error;
use std::fmt;

use phf::phf_map;

//STATIC_STRUCTS_GO_HERE


#[derive(Debug, PartialEq)]
pub enum LookupError<'a> {
    AbbrevNotFound(&'a str, &'a str),
    // ValueIsNone(String),
}

impl<'a> fmt::Display for LookupError<'a> {
    #[inline]
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            LookupError::AbbrevNotFound(t,k) => write!(f, "{} abbreviation '{}' not found", t,k),
            // LookupError::ValueIsNone(k) => write!(f, "Key '{}' found but value is None", k),
        }
    }
}

impl Error for LookupError<'_> {}


#[inline]
pub fn is_valid_bos_book_code(bos_book_code: &str) -> bool {
    REFERENCE_ABBREVIATION_MAP.contains_key(bos_book_code)
}

#[inline]
pub fn bos_book_code_to_usfm_abbrev<'a>(
    bos_book_code: &str,
) -> Result<Option<&'static str>, LookupError<'_>> {
    let array_index = *REFERENCE_ABBREVIATION_MAP.get(bos_book_code)
        .ok_or_else(|| LookupError::AbbrevNotFound("Reference", bos_book_code))?;

    Ok(BIBLE_BOOKS_CODES_ARRAY[array_index].USFM_abbreviation)
        // .as_ref()
        // .ok_or_else(|| Box::new(LookupError::ValueIsNone(bos_book_code.to_string())) as Box<dyn Error>)?)
}

#[inline]
pub fn usfm_abbrev_to_bos_book_code<'a>(
    usfm_abbreviation: &'a str,
) -> Result<&'static str, LookupError<'a>> {
    // println!("usfm_abbrev_to_bos_book_code for {}", &usfm_abbreviation);
    // let USFM_ABBREVIATION_MAP: HashMap<&str, usize> = hash_map!{ "NEG"=>1,"OXE"=>2,"VEL"=>3,};
    // println!("The unmutable hash map is {:?}", USFM_ABBREVIATION_MAP);
    // let mut USFMAbbreviationDict: HashMap<&str, usize> = HashMap::new();
    // println!(
    //     "USFMAbbreviationDict length = {}",
    //     USFMAbbreviationDict.len()
    // );

    // if USFMAbbreviationDict.len() == 0 {
    //     // we need to create the index
    //     for (i, el) in BIBLE_BOOKS_CODES_ARRAY.iter().enumerate() {
    //         println!("The current element is {:#?}", el);
    //         USFMAbbreviationDict.insert(el.usfm_abbreviation, i);
    //     }
    //     println!("The new hash map is {:?}", USFMAbbreviationDict);
    // }
    if let Some(&array_index) = USFM_ABBREVIATION_MAP.get(usfm_abbreviation) {
        Ok(BIBLE_BOOKS_CODES_ARRAY[array_index].BOS_book_code)
    } else if let Some(&array_index) = UPPERCASE_USFM_ABBREVIATION_MAP.get(usfm_abbreviation) {
        Ok(BIBLE_BOOKS_CODES_ARRAY[array_index].BOS_book_code)
    } else {
        Err(LookupError::AbbrevNotFound("USFM", usfm_abbreviation))
    }
}

#[inline]
pub fn osis_book_code_to_bos_book_code<'a>(
    osis_book_code: &'a str,
) -> Result<&'static str, LookupError<'a>> {
    if let Some(&array_index) = OSIS_ABBREVIATION_MAP.get(osis_book_code) {
        Ok(BIBLE_BOOKS_CODES_ARRAY[array_index].BOS_book_code)
    } else {
        Err(LookupError::AbbrevNotFound("OSIS", osis_book_code))
    }
}

pub fn english_name_to_bos_book_code(english_name: &str,) -> Option<&'static str> {
    let adj_english_name = english_name.to_uppercase();
    if let Some(&array_index) = ENGLISH_NAME_MAP.get(&adj_english_name) {
        return Some(BIBLE_BOOKS_CODES_ARRAY[array_index].BOS_book_code)
    }

    let pairs = [
        ("1.", "1"), ("I ", "1"), ("I.", "1"),
        ("2.", "2"), ("II ", "2"), ("II.", "2"),
        ("3.", "3"), ("III ", "3"), ("III.", "3"),
        ("4.", "4"), ("IV ", "4"), ("IV.", "4"),
        ("5.", "5"), ("V ", "5"), ("V.", "5"),
        ("6.", "6"), ("VI ", "6"), ("VI.", "6"),
    ];

    for (s1, s2) in pairs {
        if adj_english_name.starts_with(s1) {
            if let Some(&array_index) = ENGLISH_NAME_MAP.get(&format!("{}{}", s2, &adj_english_name[s1.len()..])) {
                return Some(BIBLE_BOOKS_CODES_ARRAY[array_index].BOS_book_code)
            }
        }
    }

    None
}

// pub fn usfm_num_to_usfm_abbreviation(usfm_num_str: &str) -> Result<String, Box<dyn Error>> {
//     println!("usfm_num_to_usfm_bbb for {:?}", usfm_num_str);
//     if !&self.USFMNumberDict.contains_key(usfm_num_str) {
//         return Err("Invalid USFM number: '".to_owned() + &usfm_num_str + "'")?; // I never actually figured out why I need the question mark?
//     }
//     let bbbStringOrListOfStrings =
//         &self.USFMNumberDict[usfm_num_str].USFMAbbreviationOrAbbreviations;
//     match bbbStringOrListOfStrings {
//         StringOrListOfStrings::Abbreviation(bbb) => Ok(bbb.to_string()),
//         StringOrListOfStrings::ListOfAbbreviations(bbb_list) => Ok(bbb_list[0].to_string()),
//     }
// }

// pub fn usfm_num_to_bos_book_code(usfm_num_str: &str) -> Result<String, Box<dyn Error>> {
//     println!("usfm_num_to_usfm_bbb for {:?}", usfm_num_str);
//     if !&self.USFMNumberDict.contains_key(usfm_num_str) {
//         return Err("Invalid USFM number: '".to_owned() + &usfm_num_str + "'")?; // I never actually figured out why I need the question mark?
//     }
//     let bbbStringOrListOfStrings =
//         &self.USFMNumberDict[usfm_num_str].referenceAbbreviationOrAbbreviations;
//     match bbbStringOrListOfStrings {
//         StringOrListOfStrings::Abbreviation(bbb) => Ok(bbb.to_string()),
//         StringOrListOfStrings::ListOfAbbreviations(bbb_list) => Ok(bbb_list[0].to_string()),
//     }
// }

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn loaded_books_codes() {
        println!(
            "    Loaded Bible books codes data for {:?} books.",
            BIBLE_BOOKS_CODES_ARRAY.len()
        );
        assert_eq!(
            BIBLE_BOOKS_CODES_ARRAY.len(),
            REFERENCE_ABBREVIATION_MAP.len()
        );
        assert!(BIBLE_BOOKS_CODES_ARRAY.len() > USFM_ABBREVIATION_MAP.len());
    }

    #[test]
    fn test_is_valid_bos_book_code() {
        assert_eq!(is_valid_bos_book_code("SAM"), true);
        assert_eq!(is_valid_bos_book_code("SIM"), false);
    }

    #[test]
    fn test_bos_book_code_to_usfm_abbrev() {
        assert_eq!(bos_book_code_to_usfm_abbrev("EXO"), Ok(Some("Exo")));
        assert_eq!(bos_book_code_to_usfm_abbrev("CH1"), Ok(Some("1Ch")));
        println!(
            "    bos_book_code_to_usfm_abbrev for 'SAM' got {:?}",
            bos_book_code_to_usfm_abbrev("SAM")
        );
        println!(
            "    bos_book_code_to_usfm_abbrev for 'XyZ' got {:?}",
            bos_book_code_to_usfm_abbrev("XyZ")
        );
        assert_eq!(bos_book_code_to_usfm_abbrev("SAM"), Ok(None));
        assert!(matches!(bos_book_code_to_usfm_abbrev("XyZ"), Err(LookupError::AbbrevNotFound("Reference",ref key)) if *key == "XyZ"));
        assert!(matches!(bos_book_code_to_usfm_abbrev("XyZ"), Err(LookupError::AbbrevNotFound("Reference","XyZ"))));
    }

    #[test]
    fn test_usfm_to_bos_book_code() {
        assert_eq!(usfm_abbrev_to_bos_book_code("Exo"), Ok("EXO"));
        assert_eq!(usfm_abbrev_to_bos_book_code("1Ki"), Ok("KI1"));
        assert_eq!(usfm_abbrev_to_bos_book_code("MAT"), Ok("MAT"));
        assert_eq!(usfm_abbrev_to_bos_book_code("1PE"), Ok("PE1"));
        assert!(usfm_abbrev_to_bos_book_code("XyZ").is_err());
        assert!(matches!(usfm_abbrev_to_bos_book_code("XyZ"), Err(LookupError::AbbrevNotFound("USFM","XyZ"))));
    }

    #[test]
    fn test_osis_to_bos_book_code() {
        assert_eq!(osis_book_code_to_bos_book_code("Exod"), Ok("EXO"));
        assert!(osis_book_code_to_bos_book_code("XyZ").is_err());
        assert!(matches!(osis_book_code_to_bos_book_code("XyZ"), Err(LookupError::AbbrevNotFound("OSIS","XyZ"))));
    }

    #[test]
    fn test_english_name_to_bos_book_code() {
        assert_eq!(english_name_to_bos_book_code("Exodus"), Some("EXO"));
        assert_eq!(english_name_to_bos_book_code("Esther"), Some("EST"));
        assert_eq!(english_name_to_bos_book_code("Ester"), Some("EST"));
        assert_eq!(english_name_to_bos_book_code("Eccle"), Some("ECC"));
        assert_eq!(english_name_to_bos_book_code("1 Cor"), Some("CO1"));
        assert_eq!(english_name_to_bos_book_code("1 Co"), Some("CO1"));
        assert_eq!(english_name_to_bos_book_code("1Cor"), Some("CO1"));
        assert_eq!(english_name_to_bos_book_code("1Co"), Some("CO1"));
        assert_eq!(english_name_to_bos_book_code("1.Cor"), Some("CO1"));
        assert_eq!(english_name_to_bos_book_code("1.Co"), Some("CO1"));
        assert_eq!(english_name_to_bos_book_code("XyZ"), None);
    }
}
