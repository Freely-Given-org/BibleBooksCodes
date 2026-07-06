use pyo3::prelude::*;
// use std::error::Error;
use ::bos_books_codes::{
    english_name_to_bos_book_code, osis_book_code_to_bos_book_code,
    bos_book_code_to_usfm_abbrev, usfm_abbrev_to_bos_book_code,
};

/// Converts a USFM book code to a BibleOrgSys (BOS) reference abbreviation book code to a USFM book code.
#[pyfunction]
// RUST pub fn usfm_abbrev_to_bos_book_code(bos_book_code: &str) -> Result<&str, Box<dyn Error>> {
fn bos_book_code_to_usfm_abbrev_py(bos_book_code: &str) -> PyResult<String> {
    Ok(bos_book_code_to_usfm_abbrev(bos_book_code)
        .unwrap().unwrap()
        .to_string())
}

/// Converts a USFM book code to a BibleOrgSys (BOS) reference abbreviation book code.
#[pyfunction]
// RUST pub fn usfm_abbrev_to_bos_book_code(usfm_abbreviation: &str) -> Result<&str, Box<dyn Error>> {
fn usfm_abbrev_to_bos_book_code_py(usfm_abbreviation: &str) -> PyResult<String> {
    Ok(usfm_abbrev_to_bos_book_code(usfm_abbreviation)
        .unwrap()
        .to_string())
}

/// Converts an OSIS book code to a BibleOrgSys (BOS) reference abbreviation book code.
#[pyfunction]
// RUST pub fn osis_book_code_to_bos_book_code(osis_book_code: &str) -> Result<&str, Box<dyn Error>> {
fn osis_book_code_to_bos_book_code_py(osis_book_code: &str) -> PyResult<String> {
    // match osis_book_code_to_bos_book_code(osis_book_code) { // From ChatGPT fails
    //     Ok(abbrev) => Ok(abbrev),
    //     Err(err_msg) => Err(pyo3::exceptions::PyValueError::new_err(err_msg)),
    // }
    Ok(osis_book_code_to_bos_book_code(osis_book_code)
        .unwrap()
        .to_string())
}

// Tries to see if an English book name can be narrowed down to a a reference abbreviation book code.
#[pyfunction]
// RUST pub fn english_name_to_bos_book_code(english_name: &str,) -> Option<&'static str> {
fn english_name_to_bos_book_code_py(english_name: &str) -> PyResult<Option<&'static str>> {
    Ok(english_name_to_bos_book_code(english_name))
}

/// A Python module implemented in Rust.
#[pymodule]
// fn bos_books_codes_py(_py: Python, m: &PyModule) -> PyResult<()> { // From ChatGPT gives MANY errors
fn bos_books_codes_py(m: &Bound<'_, PyModule>) -> PyResult<()> {
    // From PyO3 tutorial
    m.add_function(wrap_pyfunction!(bos_book_code_to_usfm_abbrev_py, m)?)?;
    m.add_function(wrap_pyfunction!(usfm_abbrev_to_bos_book_code_py, m)?)?;
    m.add_function(wrap_pyfunction!(osis_book_code_to_bos_book_code_py, m)?)?;
    m.add_function(wrap_pyfunction!(english_name_to_bos_book_code_py, m)?)?;
    Ok(())
}
