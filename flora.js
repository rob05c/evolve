var flora = [];

/** @const */ var FLORA_COLOR = 'rgb(27, 224, 34)';
/** @const */ var FLORA_ENERGY = 500; // @todo make flora energy somewhat random 
/** @const */ var FLORA_SPAWN_CHANCE_PERCENT = 10;
/** @const */ var FLORA_SPAWN_RADIUS = 20;
/** @const */ var FLORA_RADIUS = 50;
/** @const */ var FLORA_MAX_NUM = 500;

/**
 * @constructor
*/
function Florum(florumPoint) {
    this.color = FLORA_COLOR;
    this.point = florumPoint;
    this.energy = FLORA_ENERGY;
    this.spawnchance = FLORA_SPAWN_CHANCE_PERCENT;

    this.spawn = function(canvas) {
	var deltaVector = {
	    x: Math.random() * FLORA_SPAWN_RADIUS * 2 - FLORA_SPAWN_RADIUS, 
	    y: Math.random() * FLORA_SPAWN_RADIUS * 2 - FLORA_SPAWN_RADIUS
	};
	var newPoint = {x: this.point.x + deltaVector.x, y: this.point.y + deltaVector.y};
	flora.push(new Florum(newPoint));
    }

    this.draw = function(canvas, floracount) {
	/** @const */ var RADIUS = 3;
	setText(floracount, flora.length.toString());
	var canvasContext = canvas.getContext('2d');
	canvasContext.fillStyle = this.color;
	canvasContext.beginPath();
	canvasContext.arc(this.point.x, this.point.y, RADIUS, 0, Math.PI * 2, true);
	canvasContext.fill();
    };

    this.tick = function(canvas) {
	var spawnSuccess = flora.length < FLORA_MAX_NUM && (Math.random()*100 + 1) <= this.spawnchance;
	if(spawnSuccess) {
	    this.spawn(canvas);
	}
    };
}

function populateFlora(florum, num, canvas) {
    for(var i = 0, end = num; i != end; ++i) {
	/** @const */ var X_OFFSET = Math.random() * FLORA_RADIUS - FLORA_RADIUS;
	/** @const */ var Y_OFFSET = Math.random() * FLORA_RADIUS - FLORA_RADIUS;
	/** @const */ var iPoint = {x: florum.point.x + X_OFFSET, y: florum.point.y + Y_OFFSET};
	flora.push(new Florum(iPoint));
    }
}
