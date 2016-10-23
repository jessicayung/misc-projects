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

