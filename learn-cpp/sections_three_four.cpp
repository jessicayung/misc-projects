//
//  sections_three_four.cpp
//  learn_cpp
//
//  Created by jessica yung on 25/05/2017.
//  Copyright © 2017 Jessica Yung. All rights reserved.
//

// preprocessor goes and finds files mentioned here
// and pastes them into this file for the compiler to see
// they aren't cpp statements, so have no trailing semicolon
#include "sections_three_four.hpp"
#include "utils.h"
// <> generally refers to files in a std location (special location in disk) that the compiler knows about
// vs "" refer to files in my project
// but they may be interchangeable in some compilers
#include <iostream>
using namespace std;

// c: split program up using functions
// cpp: split program up using classes, which comprise both data and functions
// methods are functions that are part of a class

void ShowMenu() {
  cout << "1. Search" << endl;
  cout << "2. View" << endl;
}

int GetInput() {
  cout << "Enter selection: " << endl;
  int input;
  cin >> input;
  
  return input;
}

// passing a variable
// scope of variable passed is the function
void ProcessSelection(int option) {
  switch (option) {
    case 1:
      cout << "Searching" << endl;
      break;
      
    case 2:
      cout << "Viewing" << endl;
      break;
      
    default:
      cout << "Please select an item from the menu." << endl;
      break;
  }
}

// prototype
// can include file with all prototypes and #include that file
void DoSomething();

int main() {
  // calling a function
  ShowMenu();
  int selection = GetInput();
  ProcessSelection(selection);
  DoSomething();
  
}

void DoSomething() {
  cout << "Hello World" << endl;
}

void PrototypedFunction() {
  cout << "PRototyped" << endl;
}
