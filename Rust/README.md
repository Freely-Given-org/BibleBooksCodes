# bos_books_codes

This is a Rust crate (library package) for reading and mapping books codes for the Bible Organisational System (BibleOrgSys).

Written late 2020 by a total Rust novice. Updated March 2021 to implement the Clone trait and to correctly include the JSON data file contents.

It currently only contains minimal functions -- more will be added for OSIS and other systems -- the data is all there already.

Note that BBB (or bbb) below refers to a 3-character Bible book code (uppercase letters and digits only, starting with a letter).

pub fn usfm_to_bbb(&self, usfm_abbrev: &str) -> Result<String, Box>
    - convert a USFM abbreviation (e.g., "1Ki") to the native BBB abbreviation ("KI1")
pub fn usfm_num_to_usfm_abbrev(&self, usfm_num_str: &str) -> Result<String, Box>
    - convert a USFM number string (e.g., "41") to the USFM abbreviation ("Mat")
pub fn usfm_num_to_bbb(&self, usfm_num_str: &str) -> Result<String, Box>
    - convert a USFM number string (e.g., "66") to the native BBB abbreviation ("JDE")
