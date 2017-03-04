//
//  main.cpp
//  cpp-test
//
//  Created by jessica yung on 25/11/2016.
//  Copyright © 2016 Jessica Yung. All rights reserved.
//

// Import libraries
#include <iostream>
#include <vector>
#include <string>
#include <fstream>

// Prevents us from having to type std:: every time
using namespace std;

/*
 Run in terminal by typing `g++ std=c++11 filename.cpp`
 ` ./a.out`
 */


int main(int argc, const char * argv[]) {
    // insert code here...
    // `cout`: want to output on screen.
    // std::cout because cout is in standard library
    std::cout << "Hello, World!\n";

    cout << "Say a phrase" << endl;
    
    /* Data types */
    
    // Create a variable
    // const means value cannot be changed
    // usually constant variables are all caps.
    const double PI = 3.1415926;
    
    // char takes up 1 byte in memory
    char myGrade = 'A';
    
    bool isHappy = false;
    
    int myAge = 39;

    // usually accurate up to 6 d.p.
    float favNum = 1729;

    // usually accurate up to 15 digits
    double otherfavNum = 2.7182818;
    
    // endl; means carriage return
    cout << "Favourite Numbers" << favNum << otherfavNum << endl;
    
    cout << "Unused variables: " << myGrade << isHappy << myAge << PI << endl;
    
    /* Other data types:
     short int: At least 16 bits (in size)
     long int: At least 32 bits
     long long int: At least 64 bits
     unsigned int: Same size as signed version (?)
     long double: Not less in size than double
     */
    
    // Find out the number of bytes in a datatype
    cout << "Size of int: " << sizeof(myAge) << endl;
    
    // 2^31 - 1. If you add one to this it goes negative.
    // int largestInt = 2147483647;
    // cout << "largest int: " << largestInt << endl;
    
    /* Arithmetic */
    // +, -, *, /, % (modulus)
    
    // div of ints returns floor
    cout << "5 / 2 = " << 5 / 2 << endl;
    
    // Increments and decrements
    int five = 5;
    
    // decrement on right side: decrement happens AFTER the value in taken
    
    cout << "five++ = " << five++ << endl;
    cout << "++five = " << ++five << endl;
    cout << "five-- = " << five-- << endl;
    cout << "--five = " << --five << endl;

    /* Casting to different types */
    cout << "4 / 5 = " << (float) 4 / 5 << endl;
    
    // Always do this. 0 means the execution went fine.
    return 0;
}

