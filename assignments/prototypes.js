/*
	Object oriented design is commonly used in video games.	For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

	In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.	

	At the bottom of this file are 3 objects that all end up inheriting from Humanoid.	Use the objects at the bottom of the page to test your constructor functions.
	
	Each constructor function has unique properties and methods that are defined in their block comments below:
*/
	
/*
	=== GameObject ===
	* createdAt
	* dimensions (These represent the character's size in the video game)
	* destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function GameObject(attributes){
	this.createdAt = attributes.createdAt.toString();
	this.dimensions = attributes.dimensions;
};

GameObject.prototype.destroy = function(){
	return "Object was removed from the game";
};

/*
	=== CharacterStats ===
	* healthPoints
	* name
	* takeDamage() // prototype method -> returns the string '<object name> took damage.'
	* should inherit destroy() from GameObject's prototype
*/

function CharacterStats(attributes){
	GameObject.call(this, attributes);
	this.healthPoints = attributes.healthPoints;
	this.name = attributes.name;
};

CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function(){
	return `${this.name} took damage.`;
};

/*
	=== Humanoid (Having an appearance or character resembling that of a human.) ===
	* team
	* weapons
	* language
	* greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
	* should inherit destroy() from GameObject through CharacterStats
	* should inherit takeDamage() from CharacterStats
*/

function Humanoid(attributes){
	CharacterStats.call(this, attributes);
	this.team = attributes.team;
	this.weapons = attributes.weapons.toString(); // because console.log(object.weapons); returns a string as the example output in the line 133.
	this.language = attributes.language;
};

Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function(){
	return `${this.name} offers a greeting in ${this.language}.`;
};

/*
	* Inheritance chain: GameObject -> CharacterStats -> Humanoid
	* Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
	* Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


const mage = new Humanoid({
	createdAt: new Date(),
	dimensions: {
		length: 2,
		width: 1,
		height: 1,
	},
	healthPoints: 5,
	name: 'Bruce',
	team: 'Mage Guild',
	weapons: [
		'Staff of Shamalama',
	],
	language: 'Common Tongue',
});

const swordsman = new Humanoid({
	createdAt: new Date(),
	dimensions: {
		length: 2,
		width: 2,
		height: 2,
	},
	healthPoints: 15,
	name: 'Sir Mustachio',
	team: 'The Round Table',
	weapons: [
		'Giant Sword',
		'Shield',
	],
	language: 'Common Tongue',
});

const archer = new Humanoid({
	createdAt: new Date(),
	dimensions: {
		length: 1,
		width: 2,
		height: 4,
	},
	healthPoints: 10,
	name: 'Lilith',
	team: 'Forest Kingdom',
	weapons: [
		'Bow',
		'Dagger',
	],
	language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Stretch task: 
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.	
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!


function Villain(attributes){
	Humanoid.call(this, attributes);
};

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.kickOpponent = function(opponent){
    opponent.healthPoints -= 3;
    console.log(`${this.name} kicked ${opponent.name} that caused 3 damage.`);

	if(opponent.healthPoints>0) return opponent.takeDamage();
	return this.killOpponent(opponent);
};

Villain.prototype.killOpponent = function(opponent){
	console.log(`${this.name} killed ${opponent.name}.`);
	return opponent.destroy();
};



function Hero(attributes){
	Humanoid.call(this, attributes);
};

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.greet = function(){
	return `${this.name} offers a greeting in ${this.language}.`;
};

Hero.prototype.hitOpponent = function(opponent){
    opponent.healthPoints -= 7;
    console.log(`${this.name} hit ${opponent.name} that caused 7 damage.`);

	if(opponent.healthPoints>0) return opponent.takeDamage();
	return this.killOpponent(opponent);
};

Hero.prototype.killOpponent = function(opponent){
    console.log(`${this.name} killed ${opponent.name}.`);
	return opponent.destroy();
};

function Game(players = [], currentPlayer = -1){
    this.players = players;
    this.currentPlayer = currentPlayer;
};

Game.prototype.checkIfFinished = function(){
    return this.players.map(player => player.healthPoints).reduce((acc, elem) => acc+=(elem>0 ? 1 : 0),0)==1;
};



(() => {
    console.log("Let's play!");

    const hero = new Hero({
        createdAt: new Date(),
        dimensions: {
            length: 2,
            width: 2,
            height: 2,
        },
        healthPoints: 15,
        name: 'Christine',
        team: 'The Round Table',
        weapons: [
            'Giant Sword',
            'Shield',
        ],
        language: 'Common Tongue',
    });
    
    const villain = new Villain({
        createdAt: new Date(),
        dimensions: {
            length: 1,
            width: 2,
            height: 4,
        },
        healthPoints: 10,
        name: 'Judith',
        team: 'Forest Kingdom',
        weapons: [
            'Bow',
            'Dagger',
        ],
        language: 'Elvish',
    });

    let currentGame = new Game([hero, villain], 0);
    while(!currentGame.checkIfFinished()){
        console.log(`Now it's player ${currentGame.currentPlayer+1} turn!`);
        if(currentGame.players[currentGame.currentPlayer].hitOpponent != undefined){
            console.log(currentGame.players[currentGame.currentPlayer].hitOpponent(currentGame.players[(currentGame.currentPlayer+1)%currentGame.players.length]));
        }else if(currentGame.players[currentGame.currentPlayer].kickOpponent != undefined){
            console.log(currentGame.players[currentGame.currentPlayer].kickOpponent(currentGame.players[(currentGame.currentPlayer+1)%currentGame.players.length]));
        }
        currentGame.currentPlayer = (++currentGame.currentPlayer)%currentGame.players.length;
    }

    const winner = currentGame.players.filter(player => player.healthPoints>0)[0];

    console.log(`Game finished! ${winner.name} from team called ${winner.team} won the game!`);
})();