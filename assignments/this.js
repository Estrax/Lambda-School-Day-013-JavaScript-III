/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* Based on the order of interpreter evaluation:
*
* 1. New binding - binds to the newly created object returned by constructor, i.e. variable = new Object();
* 2. Explicit binding  - binds to the explicitly defined object passed to the call or apply function.
* 3. Implicit binding - binds to the object that it's being called on, i.e. object.method();
* 4. Window binding - called in the global scope. If strict mode is enabled, return undefined - otherwise, return the global object (i.e. window)
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding

function windowBinding(txtToPass){
    console.log(txtToPass);
    console.log(this);
}

windowBinding('something to be passed');

// Principle 2

// code example for Implicit Binding

const Person = {
    greeting: 'Hi ',

    speak: function(name) {
        console.log(this.greeting + name);
        console.log(this);
    }
}

Person.speak('A');

// Principle 3

// code example for New Binding

function SecondPerson(name) {
    this.name = name;
    this.greeting = 'Hi ';

    this.speak = function() {
        console.log(this.greeting + this.name);
        console.log(this);
    }
};

const personA = new SecondPerson('A');
const personB = new SecondPerson('B');

personA.speak();
personB.speak();

// Principle 4

// code example for Explicit Binding

// let's use the same SecondPerson function from the Principle 3
// function SecondPerson(name) {
//     this.name = name;
//     this.greeting = 'Hi ';
//     this.speak = function() {
//         console.log(this.greeting + this.name);
//         console.log(this);
//     }
// };

// plus insert a prototype function
SecondPerson.prototype.shoutout = function() {
    console.log('Shoutout to ' + this.name);
    console.log(this);
};

personA.shoutout.call(personB);
personB.shoutout.apply(personA);