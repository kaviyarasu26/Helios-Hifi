https://codepen.io/var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var start = new Hover(
	canvas.width / 2 - 75,
	canvas.width / 2 + 75,
	canvas.height / 2 + 4,
	canvas.height / 2 + 32
);

// Load Images
// const logo = new Image();
// logo.src = "http://fonts.droppages.com/images/spacexlogo.png";
const grass = new Image(701, 343);
grass.src =
	"https://ridgeviewgardencentre.com/wp-content/uploads/2016/04/grass-small.png";
const fuelPack = new Image(50, 50);
fuelPack.src = "https://www.pngmart.com/files/7/Gasoline-PNG-Clipart.png";
const healthPack = new Image(42, 40);
healthPack.src = "https://www.pngmart.com/files/4/First-Aid-Kit-PNG-Clipart.png";
// const tree = new Image();
// tree.src = "http://fonts.droppages.com/images/tree.png";
var clouds = [new Image(), new Image()];
var cloudTEST = new Image();
cloudTEST.src = "https://www.pngmart.com/files/1/Clouds-Transparent-Background.png";
//clouds[0] = new Image();
clouds[0].src =
	"https://www.pngmart.com/files/1/Clouds-Transparent-Background.png";
//clouds[1] = new Image();
clouds[1].src = "https://pluspng.com/img-png/cloud-png-cloud-png-image-1988.png";

var actions = {
	updateState: false,
	fly: false,
	play: true,
	lost: false,
	message: function (hov) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		start = new Hover(
			canvas.width / 2 - 75,
			canvas.width / 2 + 75,
			canvas.height / 2 + 4,
			canvas.height / 2 + 32
		);
		ctx.beginPath();
		ctx.font = "normal normal 500 40px Roboto";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.textBaseline = "bottom";
		ctx.fillText("Journey to Mars", canvas.width / 2, canvas.height / 2);
		ctx.closePath();

		ctx.fillStyle = "red";
		ctx.beginPath();
		if (hov == true) {
			ctx.fillStyle = "rgba(255,255,255,0.25)";
			ctx.strokeStyle = "rgba(255,255,255,0.5)";
			ctx.lineWidth = 2;
			ctx.rect(start.x1, start.y1, start.x2 - start.x1, start.y2 - start.y1);
			ctx.fill();
			ctx.stroke();
			ctx.fillStyle = "lightgreen";
		}

		ctx.textBaseline = "top";
		ctx.font = "normal normal 400 32px Roboto";
		ctx.fillText("START", canvas.width / 2, canvas.height / 2);
		ctx.closePath();
		if (this.lost) {
			this.drawMessage(this.messages[2]);
		}
	},
	delay: 0,
	wait: 0,
	messages: [
		{ print: "Press spacebar to fly", stroke: "#399fce" },
		{ print: "Use arrow keys to move", color: "lightgreen" },
		{ print: "Game Over!", size: "32px" }
	],
	tutorial: function () {
		let messages = this.messages;
		let pause = 30;
		if (this.fly == false) {
			this.wait += 0.1;
			if (this.wait > pause && this.wait < pause + 35) {
				this.delay += 0.1;
			}
			if (this.delay > 5) {
				this.drawMessage(messages[0]);
			}
			if (this.delay > 10) {
				this.delay = 0;
			}
			if (this.wait > pause + 35) {
				this.drawMessage(messages[0]);
			}
		}

		if (stats.altitude > 25 && this.angle == "none") {
			this.wait += 0.1;
			if (this.wait > pause && this.wait < pause + 35) {
				this.delay += 0.1;
			}
			if (this.delay > 5) {
				this.drawMessage(messages[1]);
			}
			if (this.delay > 10) {
				this.delay = 0;
			}
			if (this.wait > pause + 35) {
				this.drawMessage(messages[1]);
			}
		}
	},
	drawMessage: function (message) {
		ctx.beginPath();
		ctx.textBaseline = "top";
		ctx.textAlign = "center";
		ctx.font =
			"normal normal 400 " +
			(message.size ? message.size : "28px ") +
			" Black Ops One";
		ctx.fillStyle = message.color ? message.color : "red";
		message.stroke
			? (ctx.strokeStyle = message.stroke)
			: (ctx.strokeStyle = "black");
		ctx.fillText(
			message.print.toUpperCase(),
			message.x ? message.x : canvas.width / 2,
			message.y ? message.y : 25
		);
		ctx.lineWidth = 1;
		ctx.strokeText(
			message.print.toUpperCase(),
			message.x ? message.x : canvas.width / 2,
			message.y ? message.y : 25
		);
		ctx.closePath();
	},
	gameOver: function () {
		actions.updateState = false;
		actions.fly = false;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.lost = true;
		this.message();
		this.drawMessage(this.messages[2]);
		this.drawMessage({
			print: "score: " + stats.altitude.toFixed(1),
			color: "lightgreen",
			y: 55
		});
		ui.show();
	},
	setDefaults: function () {
		this.lost = false;
		rocket.pos = [
			canvas.width / 2 - rocket.getWidth() / 2,
			canvas.height - rocket.getHeight() - 10
		];
		background.translate = [0, 0];
		background.darkness = 0;
		background.setStars();
		background.setClouds();
		obstacles.meteors = [];
		stats.health = 300;
		obstacles.setMeteors();
		background.alpha = 0;
		stats.altitude = 0;
		background.arc = 15;
		this.wait = 0;
		this.delay = 0;
		this.angle = "none";
		stats.opacity = 0;
		stats.fuel = 300;
	},
	start: function () {
		this.setDefaults();
		this.update();
		$(".options").addClass("hide");
		$(".fullscreen").addClass("hide");
	},
	update: function () {
		if (this.updateState && this.play) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			background.fill();
			background.drawClouds();
			background.drawStars();
			background.ground();
			background.launchpad();
			rocket.drawRocket();
			//background.drawClouds(true);
			this.tutorial();
			this.increaseY();
			this.clouds();
			this.direction();
			requestAnimationFrame(this.update.bind(this));
		}
	},
	increaseY: function () {
		if (this.fly == true) {
			rocket.drawFlames();
			if (rocket.pos[1] > canvas.height / 2 - rocket.getHeight() / 2) {
				rocket.pos[1] -= stats.altitude / 4;
			}
			if (background.groundHeight - background.translate[1] > 0) {
				background.translate[1] += stats.altitude / 4;
			}
			if (background.darkness < 0.75 && stats.altitude > 15) {
				background.darkness += 0.001;
			}
			if (background.darkness > 0.74 && background.darkness < 1) {
				background.darkness += 0.0002;
			}
			if (stats.altitude > 75) {
				obstacles.drawMeteors();
				obstacles.collision();
			}
			for (var i = 0; i < background.stars.length; i++) {
				background.stars[i].y += background.stars[i].r * 0.1;
				if (background.stars[i].y > canvas.height + 5) {
					background.stars[i].y = -5;
					background.stars[i].x = Math.random() * canvas.width;
				} else if (
					background.stars[i].x > canvas.width + 5 ||
					background.stars[i].x < -5
				) {
					if (this.angle == 0) {
						background.stars[i].y = Math.random() * canvas.height;
						background.stars[i].x = -5;
					}
					if (this.angle == 1) {
						background.stars[i].y = Math.random() * canvas.height;
						background.stars[i].x = canvas.width + 5;
					}
				}
			}
			stats.altitude += 0.02;
			stats.draw();
			for (var i = 0; i < background.clouds.length; i++) {
				background.clouds[i].y += stats.altitude / 6;
			}
		}
		if (stats.fuel > 0) {
			if (this.fly) {
				stats.fuel -= 0.05;
			}
		} else {
			this.gameOver();
		}

		if (stats.health < 0) {
			this.gameOver();
		}
		if (stats.opacity < 0.85 && stats.altitude > 4) {
			stats.opacity += 0.01;
		}
	},
	clouds: function () {
		for (var i = 0; i < background.clouds.length; i++) {
			if (background.clouds[i].x > canvas.width + 274) {
				background.clouds[i].d = 0;
			}
			if (background.darkness > 0.25) {
				if (background.clouds[i].o > 0.1) {
					background.clouds[i].o -= 0.001;
				}
			}
			if (background.clouds[i].x < -274) {
				background.clouds[i].d = 1;
			}
			if (background.clouds[i].d) {
				background.clouds[i].x += background.clouds[i].sp;
			} else {
				background.clouds[i].x -= background.clouds[i].sp;
			}
		}
	},
	angle: "none",
	direction: function () {
		if (this.fly && stats.altitude > 10) {
			if (this.angle == 0) {
				// Lean left
				rocket.pos[0] > 0 ? (rocket.pos[0] -= 3) : (this.angle = undefined);
				rocket.angle > -12 ? (rocket.angle -= 1) : null;
				for (var i = 0; i < background.stars.length; i++) {
					background.stars[i].x += background.stars[i].r * 0.1;
				}
			}
			if (this.angle == 1) {
				// Lean right
				rocket.pos[0] < canvas.width - rocket.getWidth()
					? (rocket.pos[0] += 3)
					: (this.angle = undefined);
				rocket.angle < 12 ? (rocket.angle += 1) : null;
				for (var i = 0; i < background.stars.length; i++) {
					background.stars[i].x -= 0.5;
				}
			}
			if (this.angle == undefined) {
				// Go straight
				rocket.angle > 0.5 ? (rocket.angle -= 0.5) : null;
				rocket.angle < -0.5 ? (rocket.angle += 0.5) : null;
			}
		} else {
			rocket.angle = 0;
		}
	}
};

actions.message();

var rocket = {
	pos: [0, 0],
	scale: 1,
	angle: 0,

	fuselage: {
		width: 30,
		height: 130,
		spacing: 3,
		level: 126
	},

	getWidth: function () {
		return this.fuselage.width * 3 + this.fuselage.spacing * 2;
	},

	getHeight: function () {
		return this.fuselage.height + this.fuselage.level + 100;
	},

	draw: function () {
		this.drawRocket();
		this.drawFlames();
	},

	drawRocket: function () {
		// Properties
		const shaftLevel = this.fuselage.level;
		const shaftSpacing = this.fuselage.spacing;
		const shaftHeight = this.fuselage.height;
		var shaftWidth = this.fuselage.width;

		const second = shaftWidth + shaftSpacing;
		const third = shaftWidth * 2 + shaftSpacing * 2;

		const gradient = ctx.createLinearGradient(0, 0, shaftWidth, 0);
		let darkness = [
			100 - background.darkness * 50 > 60
				? 100 - (background.darkness / 1) * 50
				: 60,
			50 - background.darkness * 50 > 30 ? 50 - background.darkness * 50 : 30
		];
		gradient.addColorStop(0, "hsl(0,0%," + darkness[0] + "%)");
		gradient.addColorStop(0.4, "hsl(0,0%," + darkness[1] + "%)");
		gradient.addColorStop(0.5, "hsl(0,0%," + darkness[1] + "%)");
		gradient.addColorStop(0.6, "hsl(0,0%," + darkness[1] + "%)");
		gradient.addColorStop(1, "hsl(0,0%," + darkness[0] + "%)");

		// save() and restore() are important when applying transformation and denote that the transformation should apply only between those two functions
		ctx.save();
		// Apply rocket turn
		ctx.translate(
			this.pos[0] + this.getWidth() / 2,
			this.pos[1] + this.getHeight() / 2
		);
		ctx.rotate((this.angle * Math.PI) / 180);
		ctx.translate(
			-this.pos[0] - this.getWidth() / 2,
			-this.pos[1] - this.getHeight() / 2
		);
		ctx.restore();

		// Left Fuselage
		ctx.beginPath();
		ctx.rect(
			this.pos[0],
			this.pos[1] + 100 + shaftLevel,
			shaftWidth,
			shaftHeight
		);

		ctx.save();
		ctx.translate(this.pos[0], 0);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.restore();
		ctx.closePath();

		// Middle Fuselage
		ctx.beginPath();
		ctx.rect(
			this.pos[0] + second,
			this.pos[1] + 100,
			shaftWidth,
			shaftHeight + shaftLevel
		);

		ctx.save();
		ctx.translate(this.pos[0] + second, 0);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.restore();
		ctx.closePath();

		// Right Fuselage
		ctx.beginPath();
		ctx.rect(
			this.pos[0] + third,
			this.pos[1] + 100 + shaftLevel,
			shaftWidth,
			shaftHeight
		);

		ctx.save();
		ctx.translate(this.pos[0] + third, 0);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.restore();
		ctx.closePath();

		//Left Nose Cone
		ctx.beginPath();
		ctx.moveTo(this.pos[0], this.pos[1] + 100 + shaftLevel);
		ctx.bezierCurveTo(
			this.pos[0],
			this.pos[1] + 40 + shaftLevel,
			this.pos[0] + shaftWidth,
			this.pos[1] + 40 + shaftLevel,
			this.pos[0] + shaftWidth,
			this.pos[1] + 100 + shaftLevel
		);
		ctx.save();
		ctx.translate(this.pos[0], 0);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.restore();

		ctx.closePath();

		// Middle Nose Cone
		ctx.beginPath();

		ctx.rect(this.pos[0] + second - 7, this.pos[1] + 50, shaftWidth + 14, 50);

		/* Nose cone */
		ctx.moveTo(this.pos[0] + shaftWidth + shaftSpacing - 7, this.pos[1] + 50);
		ctx.bezierCurveTo(
			this.pos[0] + second,
			this.pos[1],
			this.pos[0] + shaftWidth * 2 + shaftSpacing,
			this.pos[1],
			this.pos[0] + shaftWidth * 2 + shaftSpacing + 7,
			this.pos[1] + 50
		);
		ctx.save();
		ctx.translate(this.pos[0] + second, 0);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.restore();
		ctx.closePath();

		// Right Nose Cone
		ctx.beginPath();

		ctx.moveTo(
			this.pos[0] + shaftWidth * 2 + shaftSpacing * 2,
			this.pos[1] + 100 + shaftLevel
		);
		ctx.bezierCurveTo(
			this.pos[0] + third,
			this.pos[1] + 40 + shaftLevel,
			this.pos[0] + shaftWidth * 3 + shaftSpacing * 2,
			this.pos[1] + 40 + shaftLevel,
			this.pos[0] + shaftWidth * 3 + shaftSpacing * 2,
			this.pos[1] + 100 + shaftLevel
		);
		ctx.save();
		ctx.translate(this.pos[0] + third, 0);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.restore();

		ctx.closePath();

		ctx.beginPath(); /* Left Triangle */
		ctx.moveTo(this.pos[0] + second - 7, this.pos[1] + 100);
		ctx.lineTo(this.pos[0] + second, this.pos[1] + 110);
		ctx.lineTo(this.pos[0] + second, this.pos[1] + 100);
		ctx.save();
		ctx.translate(this.pos[0] + second, 0);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.restore();
		ctx.closePath();

		ctx.beginPath(); /* Right Triangle */
		ctx.moveTo(
			this.pos[0] + shaftWidth * 2 + shaftSpacing + 7,
			this.pos[1] + 100
		);
		ctx.lineTo(this.pos[0] + shaftWidth * 2 + shaftSpacing, this.pos[1] + 110);
		ctx.lineTo(this.pos[0] + shaftWidth * 2 + shaftSpacing, this.pos[1] + 100);
		ctx.save();
		ctx.translate(this.pos[0] + second, 0);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.restore();
		ctx.closePath();

		// Logo TODO: temp
		// ctx.beginPath();
		// ctx.drawImage(
		// 	logo,
		// 	this.pos[0] + shaftWidth + shaftSpacing + 2,
		// 	this.pos[1] + 130,
		// 	25 / 1.25,
		// 	198 / 1.25
		// );
		// ctx.closePath();
		// ctx.restore();
	},

	drawFlames: function () {
		var shaftWidth = this.fuselage.width;
		const shaftHeight = this.getHeight();
		const shaftSpacing = this.fuselage.spacing;
		var shaftWidth = this.fuselage.width;

		const second = shaftWidth + shaftSpacing;
		const third = shaftWidth * 2 + shaftSpacing * 2;

		// Engines
		ctx.save();
		ctx.translate(
			this.pos[0] + this.getWidth() / 2,
			this.pos[1] + this.getHeight() / 2
		);
		ctx.rotate((this.angle * Math.PI) / 180);
		ctx.translate(
			-this.pos[0] - this.getWidth() / 2,
			-this.pos[1] - this.getHeight() / 2
		);

		ctx.beginPath();
		ctx.moveTo(this.pos[0], this.pos[1] + this.getHeight());
		ctx.quadraticCurveTo(
			this.pos[0] + shaftWidth / 2,
			this.pos[1] + this.getHeight() - 10,
			this.pos[0] + shaftWidth,
			this.pos[1] + this.getHeight()
		);

		ctx.moveTo(this.pos[0], this.pos[1] + this.getHeight());
		ctx.quadraticCurveTo(
			this.pos[0] + shaftWidth / 2,
			this.pos[1] + this.getHeight() + 5,
			this.pos[0] + shaftWidth,
			this.pos[1] + this.getHeight()
		);

		ctx.moveTo(this.pos[0] + second, this.pos[1] + this.getHeight());
		ctx.quadraticCurveTo(
			this.pos[0] + second + shaftWidth / 2,
			this.pos[1] + this.getHeight() - 10,
			this.pos[0] + second + shaftWidth,
			this.pos[1] + this.getHeight()
		);

		ctx.moveTo(this.pos[0] + second, this.pos[1] + this.getHeight());
		ctx.quadraticCurveTo(
			this.pos[0] + second + shaftWidth / 2,
			this.pos[1] + this.getHeight() + 5,
			this.pos[0] + second + shaftWidth,
			this.pos[1] + this.getHeight()
		);

		ctx.moveTo(this.pos[0] + third, this.pos[1] + this.getHeight());
		ctx.quadraticCurveTo(
			this.pos[0] + third + shaftWidth / 2,
			this.pos[1] + this.getHeight() - 10,
			this.pos[0] + third + shaftWidth,
			this.pos[1] + this.getHeight()
		);

		ctx.moveTo(this.pos[0] + third, this.pos[1] + this.getHeight());
		ctx.quadraticCurveTo(
			this.pos[0] + third + shaftWidth / 2,
			this.pos[1] + this.getHeight() + 5,
			this.pos[0] + third + shaftWidth,
			this.pos[1] + this.getHeight()
		);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(this.pos[0], this.pos[1] + shaftHeight);
		ctx.lineTo(this.pos[0] + shaftWidth, this.pos[1] + shaftHeight);
		ctx.lineTo(this.pos[0] + shaftWidth / 2, this.pos[1] + shaftHeight + 20);
		ctx.fillStyle = "orange";
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(
			this.pos[0] + shaftWidth + shaftSpacing,
			this.pos[1] + shaftHeight
		);
		ctx.lineTo(
			this.pos[0] + shaftWidth * 2 + shaftSpacing,
			this.pos[1] + shaftHeight
		);
		ctx.lineTo(
			this.pos[0] + shaftWidth + shaftSpacing + shaftWidth / 2,
			this.pos[1] + shaftHeight + 20
		);
		ctx.fillStyle = "orange";
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(
			this.pos[0] + shaftWidth * 2 + shaftSpacing * 2,
			this.pos[1] + shaftHeight
		);
		ctx.lineTo(
			this.pos[0] + shaftWidth * 3 + shaftSpacing * 2,
			this.pos[1] + shaftHeight
		);
		ctx.lineTo(
			this.pos[0] + shaftWidth * 2 + shaftSpacing * 2 + shaftWidth / 2,
			this.pos[1] + shaftHeight + 20
		);
		ctx.fillStyle = "orange";
		ctx.fill();
		ctx.closePath();

		ctx.restore();
	}
};

var stats = {
	altitude: 0,
	health: 300,
	fuel: 300,
	opacity: 0,
	draw: function () {
		let rounded = Math.round(this.altitude * 10) / 10;
		if (rounded.toString().length == 1 && rounded < 10) {
			rounded = rounded + ".0";
		} else if (rounded.toString().length == 2) {
			rounded = rounded + ".0";
		} else if (rounded >= 100) {
			rounded = Math.round(rounded);
		}
		ctx.beginPath();
		ctx.font = "normal normal 400 28px Roboto";
		ctx.fillStyle = "white";
		ctx.textAlign = "right";
		ctx.textBaseline = "alphabetic";
		ctx.fillText(rounded + " km", canvas.width - 10, canvas.height - 10);
		ctx.closePath();

		// DRAW HEALTH STATS
		ctx.save();
		ctx.globalAlpha = this.opacity;
		ctx.beginPath();
		ctx.fillStyle = "lightgrey";
		ctx.fillRect(canvas.width / 2 - 150, canvas.height - 50, 300, 20);
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = "limegreen";
		ctx.fillRect(canvas.width / 2 - 150, canvas.height - 50, this.health, 20);
		ctx.closePath();

		ctx.beginPath();
		ctx.font = "normal normal 500 24px Roboto";
		ctx.fillStyle = "black";
		ctx.textBaseline = "alphabetic";
		ctx.textAlign = "center";
		ctx.fillText("HEALTH", canvas.width / 2, canvas.height - 31);
		ctx.closePath();

		// DRAW FUEL STATS
		ctx.globalAlpha = this.opacity;
		ctx.beginPath();
		ctx.fillStyle = "lightgrey";
		ctx.fillRect(canvas.width / 2 - 150, canvas.height - 25, 300, 20);
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = "crimson";
		ctx.fillRect(canvas.width / 2 - 150, canvas.height - 25, this.fuel, 20);
		ctx.closePath();

		ctx.beginPath();
		ctx.font = "normal normal 500 24px Roboto";
		ctx.fillStyle = "black";
		ctx.textBaseline = "alphabetic";
		ctx.textAlign = "center";
		ctx.fillText("FUEL", canvas.width / 2, canvas.height - 6);
		ctx.closePath();
		ctx.restore();
	}
};

var background = {
	translate: [0, 0],
	groundHeight: 125,
	darkness: 0,
	alpha: 0,
	arc: 15,
	clouds: [],
	setStars: function () {
		this.stars = [];
		for (var i = 0; i < canvas.width / 25; i++) {
			this.stars.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				r: Math.random() * 2 + 2, // Radius
				t: Math.floor(Math.random() * 2), // Twinkle is T or F
				v: 0 // Twinkle state
			});
		}
	},
	drawStars: function () {
		for (var i = 0; i < this.stars.length; i++) {
			ctx.save();
			ctx.beginPath();
			ctx.globalAlpha = this.alpha;
			ctx.arc(this.stars[i].x, this.stars[i].y, this.stars[i].r, 0, 2 * Math.PI);
			ctx.fillStyle = "white";
			if (this.stars[i].t == true) {
				this.stars[i].v += (Math.random() * 1) / 25;
				if (this.stars[i].v < 0.5) {
					ctx.fillStyle = "white";
				}
				if (this.stars[i].v > 0.5) {
					ctx.fillStyle = "rgba(255,255,255,0.5)";
				}
				if (this.stars[i].v > 1) {
					this.stars[i].v = 0;
				}
			}
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
		if (this.darkness > 0.9 && this.alpha < 1.1) {
			this.alpha += 0.001;
		}
	},
	launchpad: function () {
		ctx.beginPath();
		ctx.save();
		ctx.translate(this.translate[0], this.translate[1]);
		ctx.moveTo(canvas.width / 2 - 100, canvas.height);
		ctx.bezierCurveTo(
			canvas.width / 2 - 75,
			canvas.height - 50,
			canvas.width / 2 + 75,
			canvas.height - 50,
			canvas.width / 2 + 100,
			canvas.height
		);
		ctx.fillStyle = "rgba(0,0,0,0.75)";
		ctx.fill();
		ctx.restore();
		ctx.closePath;
	},
	fill: function () {
		ctx.save();
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#399fce";
		ctx.fill();
		ctx.globalAlpha = this.darkness;
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	},
	ground: function () {
		ctx.save();

		ctx.beginPath();
		ctx.translate(
			0,
			this.translate[1] + canvas.height - this.groundHeight + this.arc
		);
		//ctx.moveTo(0, 0)

		const repeat = ctx.createPattern(grass, "repeat-x");
		ctx.fillStyle = repeat;
		ctx.quadraticCurveTo(
			canvas.width / 2,
			canvas.height - this.groundHeight,
			canvas.width,
			canvas.height - this.groundHeight + this.arc
		);
		ctx.rect(
			0,
			canvas.height - this.groundHeight + this.arc,
			canvas.width,
			this.groundHeight
		);
		ctx.fill();

		ctx.closePath();
		ctx.restore();
	},

	setClouds: function () {
		this.clouds = [];
		for (var i = 0; i < Math.random() * (canvas.width / 80) + 1; i++) {
			this.clouds.push({
				x: Math.random() * (canvas.width - 150),
				y: Math.random() * 100,
				sp: Math.floor(Math.random() * 4 + 1) / 10, // Speed
				t: Math.floor(Math.random() * 2), // Cloud Type
				d: Math.floor(Math.random() * 2), // Direction
				o: Math.floor(Math.random() * 5 + 5) / 10, // Opacity
				si: Math.floor(Math.random() * 5 + 5) / 10 // Scale or size
			});
		}
		for (var i = 0; i < Math.random() * (canvas.width / 100) + 4; i++) {
			this.clouds.push({
				x: Math.random() * (canvas.width - 150),
				y: Math.random() * 100 /*- 500*/,
				sp: Math.floor(Math.random() * 4 + 1) / 10, // Speed
				t: Math.floor(Math.random() * 2), // Cloud Type, 0 or 1
				d: Math.floor(Math.random() * 2), // Direction
				o: Math.floor(Math.random() * 5 + 5) / 10, // Opacity
				si: Math.floor(Math.random() * 3 + 7) / 10 // Scale or size
			});
		}
	},
	drawClouds: function (/*index*/) { // used to have parameter index
		var index = undefined;
		if (index == undefined) {
			var i = 0;
			for (i = 0; i < this.clouds.length; i++) {
				ctx.save();
				ctx.beginPath();
				ctx.globalAlpha = this.clouds[i].o;
				ctx.scale(this.clouds[i].si, this.clouds[i].si);
				
				ctx.drawImage(
					clouds[this.clouds[i].t],
					this.clouds[i].x,
					this.clouds[i].y,
					274,
					150
				);
				ctx.closePath();
				ctx.restore();
			}
		} else {
			for (var i = 0; i < this.clouds.length; i++) {
				if (this.clouds[i].si > 0.8) {
					ctx.save();
					ctx.beginPath();
					ctx.globalAlpha = this.clouds[i].o;
					ctx.scale(this.clouds[i].si, this.clouds[i].si);
					ctx.drawImage(
						clouds[this.clouds[i].t],
						this.clouds[i].x,
						this.clouds[i].y,
						274,
						150
					);
					ctx.closePath();
					ctx.restore();
				}
			}
		}
	}
};

var obstacles = {
	meteors: [],
	meteorNum: 1,
	minSize: 5,
	maxSize: 10,
	setMeteors: function () {
		for (var i = 0; i < this.meteorNum; i++) {
			this.meteors.push({
				x: Math.random() * canvas.width,
				y: -10,
				r: Math.floor(Math.random() * (this.maxSize - this.minSize) + this.minSize),
				sp: Math.random() * 4 + 2, // speed
				ang: Math.random() * 4 + Math.random() * -4 // angle
			});
		}
	},
	drawMeteors: function () {
		if (this.meteors.length == 1) {
			this.setMeteors();
		}
		for (var i = 0; i < this.meteorNum; i++) {
			this.meteors[i].y += this.meteors[i].sp;
			this.meteors[i].x += this.meteors[i].ang;
			ctx.beginPath();
			ctx.arc(
				this.meteors[i].x,
				this.meteors[i].y,
				this.meteors[i].r,
				0,
				2 * Math.PI
			);
			ctx.fillStyle = "crimson";
			ctx.fill();
			ctx.closePath();
			if (
				this.meteors[i].y > canvas.height + 10 ||
				this.meteors[i].x > canvas.width + 10
			) {
				this.meteors.splice(i, 1);
			}
		}
	},
	collision: function () {
		for (var i = 0; i < this.meteorNum; i++) {
			if (
				this.meteors[i].y > rocket.pos[1] + 15 &&
				this.meteors[i].y < rocket.pos[1] + rocket.getHeight() - 15
			) {
				if (this.meteors[i].y < rocket.pos[1] + rocket.getHeight() / 2) {
					if (
						this.meteors[i].x > rocket.pos[0] + rocket.getWidth() / 3 + 5 &&
						this.meteors[i].x < rocket.pos[0] + (rocket.getWidth() / 3) * 2 - 5
					) {
						stats.health -= 15;
						this.meteors.splice(i, 1);
					}
				} else if (
					this.meteors[i].x > rocket.pos[0] + 5 &&
					this.meteors[i].x < rocket.pos[0] + rocket.getWidth() - 5
				) {
					stats.health -= 15;
					this.meteors.splice(i, 1);
				}
			}
		}
	}
};

var resources = {
	setFuel: function () {},
	drawFuel: function () {},
	setHealth: function () {},
	drawHealth: function () {}
};

var tutorial = {
	begin: function () {}
};

var ui = {
	show: () => {
		$(".options").removeClass("hide");
		$(".fullscreen").removeClass("hide");
	},
	hide: () => {
		$(".options").addClass("hide");
		$(".fullscreen").addClass("hide");
	}
};

$(document).keydown(function (e) {
	switch (e.which) {
		case 32: // Spacebar pressed
			if (actions.fly == false) {
				actions.fly = true;
				$(".menu").removeClass("show");
				$(".close").removeClass("show");
			}
			if (actions.updateState == false) {
				actions.updateState = true;
				actions.start();
			}
			if (actions.angle != "none") {
				actions.angle = undefined;
			}
			break;
		case 37: // Left arrow pressed
			actions.angle = 0;
			break;
		case 38: // Up arrow pressed
			if (actions.angle != "none") {
				actions.angle = undefined;
			}
			break;
		case 39: // Right arrow pressed
			actions.angle = 1;
			break;
		case 40:
			actions.sp = -1;
			break;
		case 65: // 'A' key is pressed
			actions.angle = 0;
			break;
		case 68: // 'D' key is pressed
			actions.angle = 1;
			break;
		case 87: // 'W' key is pressed
			if (actions.angle != "none") {
				actions.angle = undefined;
			}
			break;
		case 9: // Tab key is pressed
			if (actions.updateState && actions.fly) {
				$(".warn").addClass("show");
				$(".options").removeClass("hide");
				actions.play = false;
			}
			$(".menu").removeClass("show");
			$(".close").removeClass("show");
	}
});

$(document).keyup(function (e) {
	switch (e.which) {
		case 27: // Escape key is pressed
			if (actions.updateState && actions.fly) {
				$(".warn").addClass("show");
				$(".options").removeClass("hide");
				actions.play = false;
			}
			$(".menu").removeClass("show");
			$(".close").removeClass("show");
	}
});

function Hover(x1, x2, y1, y2) {
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.get = function (x, y) {
		if (x > this.x1 && x < this.x2 && y > this.y1 && y < this.y2) {
			return true;
		}
	};
}

$(document).mousemove(function (e) {
	var canvOffset = ($(document).width() - canvas.width) / 2;
	if (actions.updateState == false) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		start.get(e.clientX, e.clientY) ? actions.message(true) : actions.message();
		if (actions.lost) {
			actions.drawMessage({
				print: "score: " + stats.altitude.toFixed(1),
				color: "lightgreen",
				y: 55
			});
		}
	} else if (localStorage.mouse == "true") {
		if (rocket.pos[0] + rocket.getWidth() / 2 + canvOffset > e.clientX + 25) {
			actions.angle = 0;
			if (rocket.pos[0] < 1) {
				actions.angle = undefined;
			}
		} else if (
			rocket.pos[0] + rocket.getWidth() / 2 + canvOffset <
			e.clientX - 25
		) {
			actions.angle = 1;
			if (rocket.pos[0] > canvas.width - rocket.getWidth()) {
				actions.angle = undefined;
			}
		} else {
			actions.angle = undefined;
		}
	}
});

$(document).click(function (e) {
	if (actions.updateState == false) {
		if (start.get(e.clientX, e.clientY) && !$(".menu").hasClass("show")) {
			actions.updateState = true;
			actions.start();
			actions.lost = false;
		}
	}
});

$(document).contextmenu(function (e) {
	e.preventDefault();
});

$(window).resize(function () {
	if (actions.updateState == true && actions.fly == true) {
		if (actions.play && localStorage.resize == "true") {
			actions.play = false;
			$(".warn span").html(
				"In order to resize the game, you must restart it. Are you sure you want to restart? You will lose all game progress if you restart."
			);
			$(".warn").addClass("show");
			$(".options").removeClass("hide");
		}
	} else {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		actions.updateState = false;
		actions.fly = false;
		actions.message();
		start = new Hover(
			canvas.width / 2 - 75,
			canvas.width / 2 + 75,
			canvas.height / 2 + 4,
			canvas.height / 2 + 32
		);
		ui.show();
	}
});

$(".resume").click(function () {
	$(this).addClass("selected");
	setTimeout(function () {
		$(".warn").removeClass("show");
		$(".options").addClass("hide");
		check = 0;
		setTimeout(function () {
			actions.play = true;
			actions.update();
			$(".warn span").html("<h2>Game Paused</h2>");
		}, 500);
	}, 400);
	setTimeout(function () {
		$(".resume").removeClass("selected");
	}, 150);
});

var check = 0;

$(".restart").click(function () {
	check++;
	if (check > 1) {
		$(this).addClass("selected");
		setTimeout(function () {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			actions.updateState = false;
			actions.fly = false;
			actions.message();
			start = new Hover(
				canvas.width / 2 - 75,
				canvas.width / 2 + 75,
				canvas.height / 2 + 4,
				canvas.height / 2 + 32
			);
			$(".warn").removeClass("show");
			actions.play = true;
			ui.show();
			setTimeout(function () {
				$(".warn span").html("<h2>Game Paused</h2>");
			}, 500);
		}, 400);
		setTimeout(function () {
			$(".restart").removeClass("selected");
		}, 150);
		check = 0;
	} else {
		$(".warn span").html(
			$(".warn span").html() +
				' <span class="notify">Click restart again to confirm.</span>'
		);
	}
});

$(".menu span").click(function () {
	$(this).toggleClass("on");
	let myClass = $(this).attr("class").split(" ")[0];
	if ($(this).hasClass("on")) {
		localStorage.setItem(myClass, "true");
	} else {
		localStorage.setItem(myClass, "false");
	}
});

var changed = false;
$(".options").click(function () {
	$(".menu").toggleClass("show");
	if (actions.play == false) {
		$(".warn").toggleClass("show");
	}
	$(".close").toggleClass("show");
});

/*$(document).click(function() {
	if (actions.fly == true) {
		actions.play == true ? actions.play = false : actions.play = true; actions.update()
		actions.message()
	}
})*/

if (localStorage.mouse == "true") {
	$(".mouse").addClass("on");
}

if (localStorage.resize == "true") {
	$(".resize").addClass("on");
}

if (localStorage.skip == "true") {
	$(".skip").addClass("on");
}

$(".widescreen").click(function () {
	setTimeout(function () {
		if ($(".widescreen").hasClass("on")) {
			fullscreen.launch();
		} else {
			fullscreen.exit();
		}
	}, 250);
});

var widescreen = false;

$(".fullscreen").click(function () {
	setTimeout(function () {
		if ($(".widescreen").hasClass("on")) {
			fullscreen.exit();
			$(".widescreen").removeClass("on");
		} else {
			fullscreen.launch();
			$(".widescreen").addClass("on");
		}
	}, 250);
});

var fullscreen = {
	launch: function (element = document.documentElement) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	},
	exit: function () {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}

actions.setDefaults();