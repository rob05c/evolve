function setText(element, text) {
    while(element.firstChild) {
	element.removeChild(element.firstChild);
    }
    element.appendChild(document.createTextNode(text));
}

function tick(elements) {
    elements.canvas.getContext('2d').clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    for(var i = 0, end = flora.length; i != end; ++i) {
	flora[i].tick(elements.canvas);
	flora[i].draw(elements.canvas, elements.floracount);
    }
    for(var i = 0, end = critters.length; i != end; ++i) {
	critters[i].tick(elements.canvas);
	critters[i].draw(elements.canvas);
    }
}

function init() {
    /** @const */ var TICK_MS = 100;
    var c = document.getElementById('maincanvas');
    if (!c.getContext)
        return;
    var f = document.getElementById('floracount');
    var elements = {canvas: c, floracount: f};

    var critterReactions = [
	[
	    amble, // 0 friends, 0 foes
	    flee, // 0 friends, 1 foe
	    flee // 0 friends, 2 foes
	],
	[
	    follow, // 1 friends, 0 foes
	    follow, // 1 friends, 1 foe
	    flee // 1 friends, 2 foes
	],
	[
	    follow, // 2 friends, 0 foes
	    follow, // 2 friends, 1 foe
	    flee // 2 friends, 2 foes
	]
    ];
    var critter = new Critter('rgb(27, 150, 150)', {x: 0, y: 0}, {x: 1, y: 1}, 1000, critterReactions, 1000, 2000, 0);
    var varmint = new Critter('rgb(150, 70, 9)', {x: 0, y: 0}, {x: 1, y: 1}, 1000, critterReactions, 1000, 2000, 0);
    var seaweed = new Florum({x: elements.canvas.width / 3, y: elements.canvas.height * 2 / 3});
    populateSpecies(critter, 25, elements.canvas);
    populateSpecies(varmint, 25, elements.canvas);
    populateFlora(seaweed, 25, elements.canvas);
    setInterval(function() {tick(elements)}, TICK_MS);
}
window['init'] = init; // export init. Among other things, this prevents
