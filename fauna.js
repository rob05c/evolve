var critters = [];

function amble(critter) {
    //velocity = velocity;
}
function follow(critter, target) {
    critter.velocity = target.velocity;
}
function flee(critter, target) {
    critter.velocity = {x: target.velocity.x * -1, y: target.velocity.y * -1};
}
function north(critter, target) {
    critter.velocity.x = 0;
    critter.velocity.y = -2;
}
function east(critter, target) {
    critter.velocity.x = -2;
    critter.velocity.y = 0;
}
function south(critter, target) {
    critter.velocity.x = 0;
    critter.velocity.y = 2;
}
function west(critter, target) {
    critter.velocity.x = 2;
    critter.velocity.y = 0;
}
function northeast(critter, target) {
    critter.velocity.x = -2;
    critter.velocity.y = 2;
}
function northwest(critter, target) {
    critter.velocity.x = 2;
    critter.velocity.y = -2;
}
function southeast(critter, target) {
    critter.velocity.x = 2;
    critter.velocity.y = 2;
}
function southwest(critter, target) {
    critter.velocity.x = -2;
    critter.velocity.y = 2;
}

function nearby(critter) {
    /** @const */ var RADIUS = 5;
    var retval = {friends: [], foes: []};
    for(var i = 0, end = critters.length; i != end; ++i) {
	if(critters[i] == critter){
	    continue;
	}
	if(Math.abs(critters[i].point.x - critter.point.x) > RADIUS || Math.abs(critters[i].point.y - critter.point.y) > RADIUS) 
	    continue;
	if(critter.isFriend(critters[i])) {
	    retval.friends.push(critters[i]);
	} else {
	    retval.foes.push(critters[i]);
	}
    }
    return retval;
}
/**
 * @constructor
*/
function Critter(color, point, velocity, energy, reactions, metabolism, spawnEnergy, mutability) {
    this.color = color;
    this.point = point;
    this.velocity = velocity
    this.energy = energy;
    this.reactions = reactions;
    this.metabolism = metabolism;
    this.spawnEnergy = spawnEnergy;
    this.mutability = mutability;

    this.move = function(canvas, delta) {
	this.point = {x: this.point.x + delta.x, y: this.point.y + delta.y}
	if(this.point.x > canvas.height) {
	    this.point.x = this.point.x - canvas.width;
	} else if(this.point.x < 0) {
	    this.point.x = canvas.width;   
	}
	if(this.point.y > canvas.height)
	    this.point.y = this.point.y - canvas.height;
	else if(point.y < 0)
	    this.point.y = canvas.height;
    };

    this.isFriend = function(critter) {
	return this.color == critter.color;
    };
    
    this.draw = function(canvas) {
	/** @const */ var RADIUS = 4;
	var canvasContext = canvas.getContext('2d');
	canvasContext.fillStyle = this.color;
	canvasContext.beginPath();
	canvasContext.arc(this.point.x, this.point.y, RADIUS, 0, Math.PI * 2, true);
	canvasContext.fill();
    };

    this.tick = function(canvas) {
	var nearbies = nearby(this);
	if(nearbies.friends.length > 2) 
	    nearbies.friends.length = 2;
	if(nearbies.foes.length > 2) 
	    nearbies.foes.length = 2;

	var target = this;
	if(nearbies.foes.length > nearbies.friends.length)
	    target = nearbies.foes[nearbies.foes.length - 1];
	else if(nearbies.friends.length > nearbies.foes.length)
	    target = nearbies.friends[nearbies.friends.length - 1];
	else if(nearbies.foes.length > 0)
	    target = nearbies.foes[nearbies.foes.length - 1];
	   
	this.reactions[nearbies.friends.length][nearbies.foes.length](this, target);
	this.move(canvas, this.velocity);
    };
}

function  populateSpecies(critter, num, canvas) {
    /** @const */ var INITIAL_ENERGY = 1000;
    for(var i = 0, end = num; i != end; ++i) {
	var point = {x: Math.floor((Math.random()*canvas.width) + 1), y: Math.floor((Math.random()*canvas.height) + 1)};
	var velocity = {x: Math.floor(Math.random()*5), y: Math.floor(Math.random()*5)};
	if(velocity.x == 0) {
	    velocity.x = -1;
	} else if(velocity.x == 3) {
	    velocity.x = -2;
	}
	if(velocity.y == 0) {
	    velocity.y = -1;
	} else if(velocity.y == 3) {
	    velocity.y = -2;
	}

	critters.push(new Critter(critter.color, 
						point, 
						velocity, 
						INITIAL_ENERGY, 
						critter.reactions, 
						critter.metabolism, 
						critter.spawnEnergy, 
						critter.mutability));
    }
}
