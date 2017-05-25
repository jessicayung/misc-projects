//
//  main.cpp
//  learn_cpp
//
//  Created by jessica yung on 27/04/2017.
//  Copyright © 2017 Jessica Yung. All rights reserved.
//

#include <iostream>
// input output manipulation
#include <iomanip>
#include <limits>

using namespace std;

int user_input() {
    
    // << is an insertion operator
    // cout is an object
    // flush is no new line
    cout << "Enter your name: " << flush;
    string input;
    
    // << is an extraction operator
    cin >> input;
    
    cout << "You entered: " << input << endl;
    
    // if you enter text when you're supposed to enter an int, it'll turn to 0
    
    
    return 0;

}

int integers() {
    
    // put too big int into int: blah overflow constant conversion
    cout << "Max int value: " << INT_MAX << endl; // 2**31 - 1
    cout << "Min int value: " << INT_MIN << endl; // -2**31
    
    cout << "Max long int value: " << LONG_MAX << endl;
    cout << "Min long int value: " << LONG_MIN << endl;
    
    cout << "Max short int value: " << SHRT_MAX << endl;
    cout << "Min short int value: " << SHRT_MIN << endl;
    
    // sizeof() is an operator
    cout << "Size of int: " << sizeof(int) << " bytes" << endl;
    cout << "Size of long int: " << sizeof(long int) << " bytes" << endl;
    cout << "Size of short int: " << sizeof(short int) << " bytes" << endl;
    
    // must be non-negative. If you put a neg int in, it'll output something big and crazy
    unsigned int uValue = -10;
    cout << "Unsigned int (set to -10): " << uValue << endl;
    
    return 0;
}

int floats() {
  
  float fValue = 123.456789;
  
  // fixed (vs may automatically switch to scientific notation
  // outputs 76.400002 bc you can only store up to 5 d.p. in float
  cout << fixed << fValue << endl;
  // cout outputs 8 sig figs by default
  cout << setprecision(20) << fixed << fValue << endl;
  cout << scientific << fValue << endl;
  cout << "Size of float: " << sizeof(float) << endl;
  
  double dValue = 123.456789;
  cout << setprecision(20) << fixed << dValue << endl;
  cout << "Size of double: " << sizeof(double) << endl;
  
  long double lValue = 123.45678909876543210;
  cout << setprecision(20) << fixed << lValue << endl;
  cout << "Size of long double: " << sizeof(long double) << endl;
  
  return 0;
}

int char_bool() {
  
  bool bValue = true;
  // outputs 1
  cout << bValue << endl;
  
  char cValue = 55; // or '7'
  // takes up 1 byte (chars 0 up to 255, 2**8 - 1)
  // outputs 7 because 55 is the ASCII code for 7
  cout << cValue << endl;
  // cast char to int, outputs 55
  cout << (int)cValue << endl;
  cout << "Size of char: " << sizeof(char) << endl;
  
  wchar_t wValue = 'i';
  cout << (char)wValue << endl;
  // useful for dealing with unicode, can store 4 bytes vs 1 for charr
  cout << "Size of wchar_t: " << sizeof(wchar_t) << endl;

  return 0;
}

// 8 bits to a byte

int compare_floats() {
  
  // use ranges instead of == to compare floats
  float value1 = 1.1;
  cout << setprecision(10) << value1 << endl;

  // not equal because after certain no. of digits float goes wonky
  // float is not equal to anything
  if (value1 == 1.1) {
    cout << "equals" << endl;
  }
  else {
    cout << "not equal" << endl;
  }
  
  return 0;
}

int conditions() {
  // && and, & is bitwise and
  // || or
  int value1 = 7;
  int value2 = 8;

  // c++ evaluates from left to right
  
  // doesn't eval second condition because first cond true and
  // it's an or
  if ((value2 != 8 && value1 == 7) || value2 == 10) {
    cout << "True" << endl;
  }
  
  bool condition1 = (value2 != 8) && (value1 = 10);
  cout << condition1 << endl;
  
  bool condition2 = value2 == 10;
  
  // neater expressions
  if (condition1 || condition2) {
    cout << "trueee" << endl;
  }
  
  return 0;
}

int dowhile() {
  // Dowhile loops do the loop once before checking the cond
  const string password = "hello";
  
  string input;
  
  do {
    cout << "Enter your password > " << flush;
    cin >> input;
    
    if (input != password) {
      cout << "Access denied." << endl;
    }
  } while(input != password);
  
  cout << "Password accepted" << endl;
  
  return 0;
}

int break_continue() {
  
  for (int i=0; i<5; i++) {
    if (i == 2) {
      // continue: braek out of this iteration of the loop
      // but continue with next iteration of loop etc
      continue;
    }
    
    cout << "i is: " << i << endl;
    if (i == 4) {
      // break: break out of loop
      // no more iterations (vs continue)
      break;
    }
  }
  return 0;
}

int arrays() {
  
  // create array with 3 ints
  int values[3];
  
  // accessing elements in an array
  values[0] = 1;
  
  // if you don't set it, it's rubbish
  cout << "A value I didn't set: " << values[1] << endl;
  
  double numbers[4] = {1, 2, 3, 4};
  cout << numbers << endl;
  
  // if you initialise the array when you declare it,
  // you don't need to put the size in the square brackets
  string texts[] = {"apple", "orange", "banana"};
  cout << texts << endl;
  
  // C++ will not stop you from accessing elements that don't exist
  cout << "Accessing a nonexistent element" << endl;
  // cout << "Nonexistent el: " << values[3] << endl;
  cout << "It's a random bit of memory" << endl;
  cout << "It might not always crash, but it might crash your computer" << endl;
  
  return 0;
}

int size_of() {
  
  // recall sizeof() is an operator that returns size in bytes
  // returns an unsigned int
  
  int values[] = {1, 2, 3, 4};
  
  // returns 16 = 4(size per int) x4 (number of ints)
  cout << sizeof(values) << endl;
  
  for (unsigned int i=0; i < sizeof(values)/sizeof(int); i++) {
    cout << values[i] << " " << flush;
  }
  
  // sizeof multidimensional arrays
  // can't miss out second dim (els in each row)
  int twodimvalues[][2] = {{1,2},{3,4}};
  cout << sizeof(twodimvalues) << endl; // 16 bytes
  for (int i=0; i<sizeof(twodimvalues)/sizeof(twodimvalues[0]); i++) {
    for (int j=0; j<sizeof(twodimvalues[0])/sizeof(int); j++) {
      cout << "i: " << i << ", j: " << j << endl;
      cout << twodimvalues[i][j] << endl;
    }
  }
  
  return 0;
}

int switch_statement() {
  int value = 5;
  switch (value) {
    // can't have variable as a case label in a switch
    // can do consts though
    // also pretty much has to be ints
    case 4:
      cout << "Value is 4." << endl;
      // if you don't break, it will continue to the next case
      // and cout "Value is 5." as well.
      break;
    
    case 5:
      cout << "Value is 5." << endl;
      break;
    
    default:
      break;
  }
  return 0;
}

int main(int argc, const char * argv[]) {
    
  return 0;
}
