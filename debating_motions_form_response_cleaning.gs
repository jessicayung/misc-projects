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

// Delete rows with all motions in a tournament
function deleteAllMotionsRowPerTournament() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var motions_col = 18;
  var row_start = 20; // Edit as required
  var row_end = 20; // Edit as required
  for (i = row_start; i < row_end + 1; i++) {
    motions_barrage = sheet.getRange(i, motions_col);
    if (!(motions_barrage.isBlank())) {
      sheet.deleteRow(i); 
    }
  }
}

// Don't think I want to do this
function shiftMotions() {
  var row_start = 2; // Edit as required
  var row_end = 20; // Edit as required
  var col = 18;
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i = row_start; i < row_end + 1; i++) {
    motion = sheet.getRange(i, col + 1);
    motion.copyTo(sheet.getRange(i, col));
    motion.setValue("");
  }
}

// Split motions
function splitMotions() {
  var row_start = 2; // Edit as required
  var row_end = 20; // Edit as required
  var col = 18 + 1;
  var separator = ":";
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i = row_start; i < row_end + 1; i++) {
    round_cell = sheet.getRange(i, col - 2)
    round_cell.setFormulaR1C1("=SPLIT(R[0]C[2], \"" + separator + "\")");
  }
}


/*
Mark as infoslide:
- if it has two colons in it
- if the part before the colon doesn't have any of 
  - a number 
  - 'r' or 'R'
  - final or semifinal or ...
- Infoslide types: 
  - [ROUND]: INFOSLIDE: [INFOSLIDE] MOTION: [MOTION]
  - Hey we can just use the formula I had before, right?
- 
*/

// TODO: Change rounds with infoslides to format [ROUND]: INFOSLIDE: [INFOSLIDE] MOTION: [MOTION]
// (Have done this manually)


function splitMotionsWithInfoslides() {
  var row_start = 21; // Edit as required
  var row_end = 55; // Edit as required
  var col = 19 + 1;
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i = row_start; i < row_end + 1; i++) {
    round_cell = sheet.getRange(i, col - 3);
    motion_cell = sheet.getRange(i, col - 2);
    infoslide_cell = sheet.getRange(i, col - 1);
    round_cell.setFormulaR1C1("=IF(RegExMatch(R[0]C[3],\":\"),LEFT(R[0]C[3],FIND(\":\",R[0]C[3])-1),\"\")");
    motion_cell.setFormulaR1C1("=IF(REGEXMATCH(R[0]C[2],\":.+:.+:\"),TRIM(RIGHT(R[0]C[2],LEN(R[0]C[2])-FIND(\":\",R[0]C[2],FIND(\":\",R[0]C[2],FIND(\":\",R[0]C[2])+2)+2))),IF(RegExMatch(R[0]C[2],\":\"),TRIM(RIGHT(R[0]C[2],LEN(R[0]C[2])-FIND(\":\",R[0]C[2]))),\"\"))");
    infoslide_cell.setFormulaR1C1("=IF(RegExMatch(R[0]C[1],\":.+:.+:\"),TRIM(LEFT(TRIM(RIGHT(R[0]C[1],LEN(R[0]C[1])-(FIND(\":\",R[0]C[1],FIND(\":\",R[0]C[1])+2)))),FIND(\":\",R[0]C[1],FIND(\":\",R[0]C[1],FIND(\":\",R[0]C[1])+2)+2)-(FIND(\":\",R[0]C[1])+IF(EQ(RIGHT(LEFT(R[0]C[1],FIND(\":\",R[0]C[1])+1)),\" \"),1,0))-7)),\"\")");    
  }
}

// IMPORTANT: Copy and paste sheet as values before continuing

function removeBlankRows() {
  var row_start = 2; // Edit as required
  var row_end = 55; // Edit as required
  var col = 19 + 1;
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i = row_start; i < row_end + 1; i++) {
    motion_cell = sheet.getRange(i, col)
    if (motion_cell.isBlank()) {
      sheet.deleteRow(i);
    }
  }
}

function clearRoundMotionTextCell() {
  var row_start = 2; // Edit as required
  var row_end = 55; // Edit as required
  var col = 19 + 1;
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i = row_start; i < row_end + 1; i++) {
    motion_cell = sheet.getRange(i, col)
    motion_cell.setValue("");
  }
}

function parseRoundRow() {
  var row_start = 11; // Edit as required
  var row_end = 47; // Edit as required
  var col = 17;
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i = row_start; i < row_end + 1; i++) {
    round_cell = sheet.getRange(i, col);
    round_str = round_cell.getValue();    
    var round_array = parseRound(round_str);
    var round = round_array[0];
    var highlight = round_array[1];
    Logger.log("Type of Round: ".concat(typeof round));
    round = String(round);
    Logger.log("Round: ".concat(round));
    Logger.log("Highlight: ".concat(highlight))
    // put Round value in RoundCode column first for me to check 
    // cells we're not sure about.
    round_code_cell = sheet.getRange(i, col -1);
    round_code_cell.setValue(round);
    if (highlight) {
      round_code_cell.setBackground('yellow');
    }
  }
  
  
}

function parseRound(round_text) {
  // Takes the contents of 'Round' cell and returns stdised round 
  /*
    if it is only an int, leave it as it is
    if it contains an int and the letter 'r', then convert to the int
    else mark it as an outround / indeterminate.
    - assign variables: lang_cat, outround. default: 0 (indeterminate).
    if it contains the word 'quarter', outround = quarter. etc.
    - sometimes will have spaces, sometimes not.
    if it contains ESL, ... then assign value (str, we don't need to optimise for speed that much).
    - ESL, EFL, Novice, Pro-am (and all alternate spellings and caps combos)
    if at the end outround = 0, then highlight the cell yellow.
    */ 
  // case: only an int
  Logger.log("Text: ".concat(round_text))
  // In-rounds
  if (!(isNaN(round_text))) {
    Logger.log("In-round 1");
    return [round_text, 0]
  }
  else if (round_text.search(/r.*[0-9]$/i) > -1) {
    // TODO: get int
    var round_number_index = round_text.search(/[0-9]/);
    var round_number = round_text[round_number_index];
    var round_number_two = round_text[round_number_index + 1];
    Logger.log(round_number_two);
    if (round_text.length < 10) {
    return [round_number, 0]
    } 
    else {
    // raise indet bc not sure if there's a problem
    return [round_number, 1]
    }
  }
  // Out-rounds (or indeterminate)
  else {
    var lang_cat = 0;
    var outround = 0;
    var indet = 0;
    
    Logger.log("Outround");
    
    // 1. determine outround level
    if (round_text.search(/semi/i) > -1) {
      outround = 'Semis';
    }
    else if (round_text.search(/quarter/i) > -1) {
      outround = 'Quarters';
    }
    else if (round_text.search(/semi/i) > -1) {
      outround = 'Octos';
    }
    else if (round_text.search(/partial.*double.*octo/i) > 0) {
      outround = 'Partial_Double_Octos';
    }
    else if (round_text.search(/sf/i) > -1) {
      outround = 'Semis';
    }
    else if (round_text.search(/qf/i) > -1) {
      outround = 'Quarters';
    }
    else if (round_text.search(/nf/i) > -1) {
      return ['Novice_Final', 1];
    }
    else if (round_text.search(/\sfinal.$/i) > -1) {
      outround = 'Final';
    } else {
      outround = 'Final';
      indet = 1;
    }
    Logger.log("Outround")
    
    // 2. determine language category
    if (round_text.search(/esl/i) > -1) {
      lang_cat = 'ESL';
    }
    else if (round_text.search(/efl/i) > -1) {
      lang_cat = 'EFL';
    }
    else if (round_text.search(/novice/i) > -1) {
      lang_cat = 'Novice';
    }
    else if (round_text.search(/pro.*am/i) > -1) {
      lang_cat = 'ProAm';
    }
    else {
      // default Open, TODO may want to edit.
      lang_cat = 'Open';
    }
    
    // 3. Return the value
    label = lang_cat.concat('_', outround);
    Logger.log(label);
    Logger.log(typeof label);
    return [label, indet]
  }
}

// CHECK cells with highlighted (yellow) backgrounds before continuing

// TODO: Round_Code and Round (correct Round value in RoundCode column)
function fillRoundCodes() {
  var row_start = 44; // Edit as required
  var row_end = 46; // Edit as required
  var col_roundcode = 16;
  var col_round = 17;
  var sheet = SpreadsheetApp.getActiveSheet();
  var round_dict = {
    'Open_Final': 'Open_Z',
    // 'Finals': 'Open_Z',
    'Open_Semis': 'Open_Y',
    'Open_Semi': 'Open_Y',
    'Open_Semi_1': 'Open_Y1',
    'Open_Semi_2': 'Open_Y2',
    'Open_Semi_3': 'Open_Y3',
    'Open_Semi_4': 'Open_Y4',
    'Open_Semi_5': 'Open_Y5',
    'Open_Semis_1': 'Open_Y1',
    'Open_Semis_2': 'Open_Y2',
    'Open_Semis_3': 'Open_Y3',
    'Open_Semis_4': 'Open_Y4',
    'Open_Semis_5': 'Open_Y5',
    'Open_Quarters': 'Open_X',
    'Open_Quarter_Finals': 'Open_X',
    'Open_Quarters_Partial': 'Open_X',
    'Open_Octos': 'Open_W',
    'Open_Octo_Finals': 'Open_W',
    'Open_Partial_Double_Octos': 'Open_V',
    'Open_Octos': 'Open_W',
    'ESL_Final': 'ESL_Z',
    'ESL_Semis': 'ESL_Y',
    'ESL_Quarters': 'ESL_X',
    'EFL_Final': 'EFL_Z',
    'EFL_Semis': 'EFL_Y',
    'EFL_Quarters': 'EFL_X',
    'Novice_Final': 'Novice_Z',
    'Novice_Semis': 'Novice_Y',
    'ProAm_Final': 'Nov_ProAm_Z'
  };
  for (i = row_start; i < row_end + 1; i++) {
    round_cell = sheet.getRange(i, col_round);
    roundcode_cell = sheet.getRange(i, col_roundcode);
    // reset roundcode cell background
    roundcode_cell.setBackground('white');
    round_val = roundcode_cell.getValue();
    round_cell.setValue(round_val);
    if (round_val in round_dict) {
      roundcode_cell.setValue(round_dict[round_val]);
    }
    else if (!(isNaN(round_val))){
    }
    else {
      roundcode_cell.setBackground('yellow');
    }
  }
}

// TODO: Change date format (can do in sheet)
function changeDateFormat() {
  var row_start = 2; // Edit as required
  var row_end = 47; // Edit as required
  var col = 1;
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i = row_start; i < row_end + 1; i++) {
    cell = sheet.getRange(i, col);
    cell.setNumberFormat("yyyy-mm-dd");
  }
}
// TODO: Trim all cells (can do in sheet)

// TODO: change THO to TH Opposes, THP to TH Prefers


function template() {
  var row_start = 2; // Edit as required
  var row_end = 2; // Edit as required
  var col = 19 + 1;
  var sheet = SpreadsheetApp.getActiveSheet();
  for (i = row_start; i < row_end + 1; i++) {
    // code here
  }
}
