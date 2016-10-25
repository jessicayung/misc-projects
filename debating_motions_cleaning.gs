// Google AppScript functions to clean debating motions spreadsheet
// Written by J Yung on 23 October 2016

function addYearToEachBoldedCell() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var end_row = 3330;
  var start_row = 2722;
  var year = " 2012";
  for (i = start_row; i < end_row; i++) {
    // sheet.getRange(2, 2).setValue(i);
    current_cell = sheet.getRange(i, 9);
    current_value = current_cell.getValue()
    if (current_cell.getFontWeight() == 'bold') {
      new_value = current_value + year
      current_cell.setValue(new_value)
    }
  }
}

function replaceYearForEachBoldedCell() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var end_row = 1610;
  var start_row = 1242;
  var year = " 2012";
  for (i = start_row; i < end_row; i++) {
    // sheet.getRange(2, 2).setValue(i);
    current_cell = sheet.getRange(i, 9);
    current_value = current_cell.getValue();
    if (current_cell.getFontWeight() == 'bold') {
      new_value = current_value.slice(0,-4) + year;
      current_cell.setValue(new_value);
    }
  }
}

function removeEndDateForEachBoldedCell() {
  // Works only with MONTH DAY ... dates
  var sheet = SpreadsheetApp.getActiveSheet();
  var end_row = 3330;
  var start_row = 2000;
  for (i = start_row; i < end_row; i++) {
    current_cell = sheet.getRange(i, 9);
    current_value = current_cell.getValue();
    if (current_cell.getFontWeight() == 'bold') {
      index = current_value.indexOf('-');
      // Exceptions to this not working: have (translated from ...) at end
      // Also if '-' appears twice 
      if (index > current_value.length - 15) {
        new_value = current_value.substr(0, index);
        current_cell.setValue(new_value);
      }
    }      
  }
}


function fillBlankTournamentInfo() {
  // Note: You need to copy and paste as VALUES (vs formulae) for this to have its intended effects.
  var sheet = SpreadsheetApp.getActiveSheet();
  var end_row = 3300;
  var start_row = 20;
  var columns_to_copy = 4;
  var recent_tournament_info = sheet.getRange(start_row, 1, 1, columns_to_copy);
  for (i = start_row; i < end_row + 1; i++) {
    // sheet.getRange(2, 2).setValue(i);
    current_row = sheet.getRange(i, 1, 1, columns_to_copy);
    current_cell = sheet.getRange(i, 2);
    if (current_cell.isBlank()) {
      // sheet.getRange(2, 6).setValue("Copying");
      recent_tournament_info.copyTo(current_row);  
    } else {
      recent_tournament_info = current_row;
    }
  }
  // sheet.getRange(2, 1).setValue("Done");
}

function fillValueToCellsinColumn() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var end_row = 2717;
  var start_row = 2;
  var new_value = 0;
  var column = 5;
  for (i = start_row; i < end_row; i++) {
    current_cell = sheet.getRange(i, column);
    current_cell.setValue(new_value);
  }
}

function fillValueToCellsinColumnIfBlank() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var end_row = 3747;
  var start_row = 1500;
  var new_value = "Europe";
  var column = 2;
  for (i = start_row; i < end_row; i++) {
    current_cell = sheet.getRange(i, column);
    if (current_cell.isBlank()) {
      country = sheet.getRange(i, 4).getValue();
      if (country == 'United Kingdom' || country == 'England' || country == 'Ireland' || country == 'Scotland' || country == 'Wales') { 
      current_cell.setValue("IoNA");
      } else {
      current_cell.setValue(new_value);
      }
    }
  }
}


function fillRoundCodes() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var end_row = 3789;
  var column_to_fill = 16;
  var start_row = 2720;
  var column_to_lookup = 17;
  var dict = {
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
  for (i = start_row; i < end_row + 1; i++) {
    current_cell = sheet.getRange(i, column_to_fill);
    lookup_cell = sheet.getRange(i, column_to_lookup).getValue();
    if (lookup_cell in dict) {
      current_cell.setValue(dict[lookup_cell]);
    }
  }
}
