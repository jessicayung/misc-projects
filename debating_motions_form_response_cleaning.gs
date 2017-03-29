// Step 1
function rearrangeColumns() {
  // Origin sheet
  var form_responses_ss = SpreadsheetApp.openById("1h7xK-ltABnPOEmJKpae3o0fs3RzvqmpuWqHF-TUjxOI");
  var origin_sheet = form_responses_ss.getSheetByName("Form responses");
  var rows_start = 64; // Edit as required
  var rows_end = 64; // Edit as required
  var rows_to_edit = rows_end - rows_start + 1;
  // Target sheet 
  var target_sheet = form_responses_ss.getSheetByName("target_sheet");
  var target_row_start = 9; // Edit as required
  var form_columns = 11;
  var map_columns_dict = {
    2: 6, // B: F Tournament Name
    3: 7, // C: G CAs
    4: 1, // D: A Tournament Date
    5: 3, // E: C Country
    6: 2, // F: B Circuit
    7: 15, // G: O Event Link
    8: 18 // H: R  Motions
  }
  // for row
  for (i = 0; i < rows_to_edit; i++) {
    // for key in map_columns
    origin_row = rows_start + i;
    target_row = target_row_start + i;
    for (var key in map_columns_dict) {
      // copy row[key] and paste to target_row[value].
      data = origin_sheet.getRange(origin_row, key);
      target_col = map_columns_dict[key];
      data.copyTo(target_sheet.getRange(target_row, target_col));
    }   
  }
  
}

// Step 2

function copyCountry() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var col = 3;
  var row_start = 2; // Edit as required
  var row_end = 84; // Edit as required
  for (i = row_start; i < row_end + 1; i++) {
    country = sheet.getRange(i, col);
    country.copyTo(sheet.getRange(i, col+1));
  
  }

}

function setInternational() {
  // Currently sets all Intl = 0
  var sheet = SpreadsheetApp.getActiveSheet();
  var col = 5;
  var row_start = 2; // Edit as required
  var row_end = 84; // Edit as required
  var intl_default = 0;
  for (i = row_start; i < row_end + 1; i++) {
    // TODO: add IF clauses for WUDC etc. 
    sheet.getRange(i, col).setValue(intl_default);   
  }
}

function splitCAs() {
  // works for tournaments with 7 or fewer CAs
  var sheet = SpreadsheetApp.getActiveSheet();
  var row_start = 3; // Edit as required
  var row_end = 8; // Edit as required
  var ca_col = 7;
  var separator = "CHAR(10)";
  for (i = row_start; i < row_end + 1; i++) {
    // ca_data = sheet.getRange(i, ca_col);
    cell_ca2 = sheet.getRange(i, ca_col + 1);
    cell_ca2.setFormulaR1C1("=SPLIT(R[0]C[-1], " + separator + ")");
    // TODO: Copy CA names over by one cell to the left
    // ca_data = sheet.getRange(i, ca_col + 1, 1, 7);
    // ca_data.copyValuesToRange(sheet, ca_col + 1, ca_col + 7, i, i); // sheet, col, colend, row, rowend
  }
}

/* target_sheet columns:
ca: 7
motion: 18
*/

// TODO: I want to pass an argument (column) to this function.
// e.g. splitCol(18) for motions
function splitCol() {
  var col = 18; // EDIT to change split target
  var sheet = SpreadsheetApp.getActiveSheet();
  var row_start = 2; // Edit as required
  var row_end = 9; // Edit as required
  var separator = "CHAR(10)";
  for (i = row_start; i < row_end + 1; i++) {
    // ca_data = sheet.getRange(i, ca_col);
    cell2 = sheet.getRange(i, col + 1);
    cell2.setFormulaR1C1("=SPLIT(R[0]C[-1], " + separator + ")");
    // TODO: Copy CA names over by one cell to the left
    // ca_data = sheet.getRange(i, ca_col + 1, 1, 7);
    // ca_data.copyValuesToRange(sheet, ca_col + 1, ca_col + 7, i, i); // sheet, col, colend, row, rowend
  }
}

function countNumberOfSplits(row) {
  // var row = 2; // Edit as required
  // col = col of subject. 
  // start counting splits from col + 1
  var col = 18; // EDIT to change split target
  var sheet = SpreadsheetApp.getActiveSheet();
  var number_of_splits = 0;
  var cell = sheet.getRange(row, col + 1);
  while (!(cell.isBlank())) {
    number_of_splits += 1;
    cell = sheet.getRange(row, col + 1 + number_of_splits);
  }
  sheet.getRange(1, 25).setValue(number_of_splits);
  return number_of_splits
}

function addRowsBelowForRounds() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var col = 18; // EDIT to change split target
  var row_start = 48; // Edit as required
  var row_end = 51; // Edit as required
  var added_rows = 0;
  for (i = row_start; i < row_end + 1; i++) {
    j = i;
    j += added_rows;
    rows_to_insert = countNumberOfSplits(j);
    // add number_of_rows_to_add below row
    sheet.insertRows(j + 1, rows_to_insert);
    added_rows += rows_to_insert;
  }

}
  
function transposeMotions() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var col = 18; // EDIT to change split target
  var row_start = 22; // Edit as required
  var row_end = 84; // Edit as required
  // for each row
  for (i = row_start; i < row_end + 1; i++) {
    tournament_date = sheet.getRange(i, 1);
    // if the row is a CONTENT row (vs added blank)
    if (!(tournament_date.isBlank())) {
      // 
      transpose_cell = sheet.getRange(i + 1, col + 1);
      number_of_splits = countNumberOfSplits(i);
      splits_minus_one = number_of_splits - 1;
      transpose_cell.setFormulaR1C1("=TRANSPOSE(R[-1]C[0]:R[-1]C[" + (number_of_splits -1) + "])");
      sheet.getRange(1, 25).setValue(number_of_splits);
    }
  }
}

// IMPORTANT: Copy and paste sheet as values before continuing

function shiftCAs() {
  var row_start = 22; // Edit as required
  var row_end = 84; // Edit as required
  var col = 7;
  // TODO: fix (should be max=8, oh well event link in the way)
  var cas_max = 7;
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i = row_start; i < row_end + 1; i++) {
    // ca_data = sheet.getRange(i, ca_col);
    cas = sheet.getRange(i, col+1, 1, cas_max);
    cas.copyValuesToRange(sheet, col, col+cas_max-1, i, i);
  }
}

function fillBlankTournamentInfo() {
  // Note: You need to copy and paste as VALUES (vs formulae) for this to have its intended effects.
  var sheet = SpreadsheetApp.getActiveSheet();
  var row_start = 22; // Edit as required
  var row_end = 88; // Edit as required
  var number_of_columns = 15;
  var recent_tournament_info = sheet.getRange(row_start, 1, 1, number_of_columns);
  for (i = row_start + 1; i < row_end + 1; i++) {
    current_row = sheet.getRange(i, 1, 1, number_of_columns);
    tournament_date = sheet.getRange(i, 1);
    if (tournament_date.isBlank()) {
      recent_tournament_info.copyTo(current_row);  
    } else {
      recent_tournament_info = current_row;
    }
  }
}

// TODO: Change date format (can do in sheet)

// TODO: Trim all cells (can do in sheet)