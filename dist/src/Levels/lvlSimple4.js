Ball.lvlSimple4 = function (game) {};
Ball.lvlSimple4.prototype = {
	create: function () {

		//world its bigger than the initial bounds
		this.game.world.setBounds(0, 0, 32 * 35, 32 * 46);

		//The background
		this.background = this.add.sprite(0, 0, 'screen-bg');
		this.background.scale.setTo(8, 8);

		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.fontSmall = {
			font: "16px Times New Roman",
			fill: "#ffffff"
		};
		this.fontBig = {
			font: "24px Times New Roman",
			fill: "#ffffff"
		};
		this.fontMessage = {
			font: "24px Times New Roman",
			fill: "#ffffff",
			align: "center",
			stroke: "#320C3E",
			strokeThickness: 4
		};
		this.audioStatus = true;
		this.timer = 0;
		this.totalTimer = 0;
		this.level = 1;
		this.maxLevels = 3;
		this.movementForce = 10;
		this.ballStartPos = {
			x: 32 * 15.5,
			y: 32 * 16.5
		};
		this.lives = 3;

		this.hole = this.add.sprite(32 * 14.5, 32 * 44.5, 'hole');
		this.physics.enable(this.hole, Phaser.Physics.ARCADE);
		this.hole.anchor.set(0.5);
		this.hole.body.setSize(5, 5);

		this.ball = this.add.sprite(this.ballStartPos.x, this.ballStartPos.y, 'ball');
		this.ball.anchor.set(0.5);
		this.physics.enable(this.ball, Phaser.Physics.ARCADE);
		this.ball.body.setSize(25, 25);
		this.ball.body.bounce.set(0.3, 0.3);

		this.initLevels();
		this.showLevel(1);
		this.keys = this.game.input.keyboard.createCursorKeys();

		Ball._player = this.ball;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

		this.wallGroup = this.add.group();
		this.wallGroup.enableBody = true;
		this.wallGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.wall1 = this.wallGroup.create(32 * 13, 32 * 3, 'element-w');
		this.wallGroup.setAll('body.immovable', true);

		//Borders of the game

		this.borderGroup = this.add.group();
		this.borderGroup.enableBody = true;
		this.borderGroup.physicsBodyType = Phaser.Physics.ARCADE;

		this.borderH31 = this.borderGroup.create(1*32, 46*32, 'border-horizontal');
		this.borderH31.scale.setTo(2.99999, 1);

		this.borderH1 = this.borderGroup.create(17*32, 0, 'border-horizontal');
		this.borderH1.scale.setTo(1.5, 1);

		this.borderH = this.borderGroup.create(0, 0, 'border-horizontal');
		this.borderH.scale.setTo(1.3, 1);

		this.borderV = this.borderGroup.create(0, 0, 'border-vertical');
		this.borderV.scale.setTo(1, 2.933);

		this.borderGroup.setAll('body.immovable', true);
		this.bounceSound = this.game.add.audio('audio-bounce');

		//The camera follows the ball
		this.game.camera.follow(this.ball);

		this.buttonPressed = this.add.sprite(32 * 18 - 16, 24 * 2 - 16, 'buttonPressed');
		this.button = this.add.sprite(32 * 18, 24 * 2, 'button');
		this.physics.enable(this.button, Phaser.Physics.ARCADE);
		this.button.anchor.set(0.5);
		this.button.body.setSize(25, 25);


	},
	initLevels: function () {
		this.levels = [];
		this.levelData = [
			[{
					x: 32 * 1,
					y: 32 * 0,
					t: 'w'
				},
				{
					x: 32 * 1,
					y: 32 * 1,
					t: 'h'
				},
				{
					x: 32 * 1,
					y: 32 * 5,
					t: 'h'
				},
				{
					x: 0,
					y: 32 * 11,
					t: 'h'
				},
				{
					x: 32 * 0,
					y: 32 * 15,
					t: 'h'
				},
				{
					x: 32 * 0,
					y: 32 * 20,
					t: 'h'
				},
				{
					x: 32 * 0,
					y: 32 * 24,
					t: 'h'
				},
				{
					x: 32 * 0,
					y: 32 * 18,
					t: 'h'
				},
				{
					x: 32 * 12,
					y: 32 * 0,
					t: 'h'
				},
				{
					x: 32 * 16,
					y: 32 * 0,
					t: 'h'
				},
				{
					x: 32 * 12,
					y: 32 * 42,
					t: 'h'
				},
				{
					x: 32 * 16,
					y: 32 * 42,
					t: 'h'
				},
				{
					x: 32 * 2,
					y: 32 * 9,
					t: 'w'
				},
				{
					x: 32 * 5,
					y: 32 * 9,
					t: 'w'
				},
				{
					x: 32 * 5,
					y: 32 * 8,
					t: 'w'
				},
				{
					x: 32 * 6,
					y: 32 * 7,
					t: 'w'
				},
				{
					x: 32 * 7,
					y: 32 * 6,
					t: 'w'
				},
				{
					x: 32 * 8,
					y: 32 * 5,
					t: 'w'
				},
				{
					x: 32 * 9,
					y: 32 * 4,
					t: 'w'
				},
				{
					x: 32 * 12,
					y: 32 * 0,
					t: 'h'
				},
				{
					x: 32 * 16,
					y: 32 * 3,
					t: 'w'
				},
				{
					x: 32 * 17,
					y: 32 * 3,
					t: 'w'
				},
				{
					x: 32 * 10,
					y: 32 * 9,
					t: 'w'
				},
				{
					x: 32 * 14,
					y: 32 * 9,
					t: 'w'
				},
				{
					x: 32 * 18,
					y: 32 * 9,
					t: 'w'
				},
				{
					x: 32 * 19,
					y: 32 * 9,
					t: 'w'
				},
				{
					x: 32 * 11,
					y: 32 * 8,
					t: 'w'
				},
				{
					x: 32 * 12,
					y: 32 * 7,
					t: 'w'
				},
				{
					x: 32 * 13,
					y: 32 * 6,
					t: 'w'
				},
				{
					x: 32 * 14,
					y: 32 * 5,
					t: 'w'
				},
				{
					x: 32 * 19,
					y: 32 * 4,
					t: 'w'
				},
				{
					x: 32 * 19,
					y: 32 * 5,
					t: 'w'
				},
				{
					x: 32 * 19,
					y: 32 * 6,
					t: 'w'
				},
				{
					x: 32 * 18,
					y: 32 * 7,
					t: 'w'
				},
				{
					x: 32 * 22,
					y: 32 * 7,
					t: 'w'
				},
				{
					x: 32 * 24,
					y: 32 * 8,
					t: 'w'
				},
				{
					x: 32 * 26,
					y: 32 * 9,
					t: 'h'
				},
				{
					x: 32 * 26,
					y: 32 * 13,
					t: 'h'
				},
				{
					x: 32 * 26,
					y: 32 * 17,
					t: 'h'
				},
				{
					x: 32 * 24,
					y: 32 * 10,
					t: 'h'
				},
				{
					x: 32 * 24,
					y: 32 * 14,
					t: 'h'
				},
				{
					x: 32 * 24,
					y: 32 * 18,
					t: 'h'
				},
				{
					x: 32 * 24,
					y: 32 * 22,
					t: 'w'
				},
				{
					x: 32 * 26,
					y: 32 * 20,
					t: 'w'
				},
				{
					x: 32 * 29,
					y: 32 * 20,
					t: 'h'
				},
				{
					x: 32 * 26,
					y: 32 * 24,
					t: 'w'
				},
				{
					x: 32 * 22,
					y: 32 * 24,
					t: 'w'
				},
				{
					x: 32 * 22,
					y: 32 * 9,
					t: 'h'
				},
				{
					x: 32 * 22,
					y: 32 * 13,
					t: 'h'
				},
				{
					x: 32 * 22,
					y: 32 * 17,
					t: 'h'
				},
				{
					x: 32 * 22,
					y: 32 * 21,
					t: 'h'
				},
				{
					x: 32 * 8,
					y: 32 * 10,
					t: 'h'
				},
				{
					x: 32 * 8,
					y: 32 * 14,
					t: 'h'
				},
				{
					x: 32 * 8,
					y: 32 * 18,
					t: 'h'
				},
				{
					x: 32 * 4,
					y: 32 * 21,
					t: 'w'
				},
				{
					x: 32 * 4,
					y: 32 * 17,
					t: 'h'
				},
				{
					x: 32 * 4,
					y: 32 * 13,
					t: 'h'
				},
				{
					x: 32 * 6,
					y: 32 * 16,
					t: 'h'
				},
				{
					x: 32 * 6,
					y: 32 * 12,
					t: 'h'
				},
				{
					x: 32 * 3,
					y: 32 * 11,
					t: 'w'
				},
				{
					x: 32 * 2,
					y: 32 * 11,
					t: 'h'
				},
				{
					x: 32 * 2,
					y: 32 * 11,
					t: 'h'
				},
				{
					x: 32 * 2,
					y: 32 * 15,
					t: 'h'
				},
				{
					x: 32 * 2,
					y: 32 * 19,
					t: 'h'
				},
				{
					x: 32 * 2,
					y: 32 * 23,
					t: 'w'
				},
				{
					x: 32 * 6,
					y: 32 * 23,
					t: 'w'
				},
				{
					x: 32 * 10,
					y: 32 * 23,
					t: 'w'
				},
				{
					x: 32 * 14,
					y: 32 * 23,
					t: 'w'
				},
				{
					x: 32 * 17,
					y: 32 * 24,
					t: 'w'
				},
				{
					x: 32 * 18,
					y: 32 * 24,
					t: 'w'
				},
				{
					x: 32 * 11,
					y: 32 * 21,
					t: 'w'
				},
				{
					x: 32 * 10,
					y: 32 * 18,
					t: 'h'
				},
				{
					x: 32 * 10,
					y: 32 * 17,
					t: 'w'
				},
				{
					x: 32 * 14,
					y: 32 * 18,
					t: 'h'
				},
				{
					x: 32 * 16,
					y: 32 * 18,
					t: 'h'
				},
				{
					x: 32 * 17,
					y: 32 * 21,
					t: 'w'
				},
				{
					x: 32 * 17,
					y: 32 * 17,
					t: 'w'
				},
				{
					x: 32 * 20,
					y: 32 * 17,
					t: 'h'
				},
				{
					x: 32 * 17,
					y: 32 * 15,
					t: 'w'
				},
				{
					x: 32 * 17,
					y: 32 * 11,
					t: 'w'
				},
				{
					x: 32 * 16,
					y: 32 * 11,
					t: 'h'
				},
				{
					x: 32 * 20,
					y: 32 * 12,
					t: 'h'
				},
				{
					x: 32 * 11,
					y: 32 * 11,
					t: 'w'
				},
				{
					x: 32 * 10,
					y: 32 * 15,
					t: 'w'
				},
				{
					x: 32 * 10,
					y: 32 * 11,
					t: 'h'
				},
				{
					x: 32 * 14,
					y: 32 * 11,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 0,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 4,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 8,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 12,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 16,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 20,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 21,
					t: 'h'
				},
				{
					x: 32 * 30,
					y: 32 * 24,
					t: 'w'
				},
				{
					x: 32 * 33,
					y: 32 * 26,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 30,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 34,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 38,
					t: 'h'
				},
				{
					x: 32 * 33,
					y: 32 * 42,
					t: 'h'
				},
				{
					x: 32 * 31,
					y: 32 * 0,
					t: 'h'
				},
				{
					x: 32 * 31,
					y: 32 * 4,
					t: 'h'
				},
				{
					x: 32 * 31,
					y: 32 * 8,
					t: 'h'
				},
				{
					x: 32 * 31,
					y: 32 * 12,
					t: 'h'
				},
				{
					x: 32 * 31,
					y: 32 * 16,
					t: 'h'
				},
				{
					x: 32 * 31,
					y: 32 * 19,
					t: 'h'
				},
				{
					x: 32 * 28,
					y: 32 * 18,
					t: 'w'
				},
				{
					x: 32 * 26,
					y: 32 * 16,
					t: 'w'
				},
				{
					x: 32 * 28,
					y: 32 * 12,
					t: 'h'
				},
				{
					x: 32 * 29,
					y: 32 * 12,
					t: 'h'
				},
				{
					x: 32 * 29,
					y: 32 * 1,
					t: 'h'
				},
				{
					x: 32 * 29,
					y: 32 * 5,
					t: 'h'
				},
				{
					x: 32 * 29,
					y: 32 * 10,
					t: 'h'
				},
				{
					x: 32 * 29,
					y: 32 * 12,
					t: 'h'
				},
				{
					x: 32 * 29,
					y: 32 * 7,
					t: 'h'
				},
				{
					x: 32 * 28,
					y: 32 * 10,
					t: 'h'
				},
				{
					x: 32 * 27,
					y: 32 * 0,
					t: 'h'
				},
				{
					x: 32 * 27,
					y: 32 * 3,
					t: 'h'
				},
				{
					x: 32 * 24,
					y: 32 * 5,
					t: 'w'
				},
				{
					x: 32 * 22,
					y: 32 * 3,
					t: 'w'
				},
				{
					x: 32 * 20,
					y: 32 * 3,
					t: 'w'
				},
				{
					x: 32 * 2,
					y: 32 * 24,
					t: 'w'
				},
				{
					x: 32 * 6,
					y: 32 * 24,
					t: 'w'
				},
				{
					x: 32 * 10,
					y: 32 * 24,
					t: 'w'
				},
				{
					x: 32 * 5,
					y: 32 * 25,
					t: 'w'
				},
				{
					x: 32 * 9,
					y: 32 * 25,
					t: 'w'
				},
				{
					x: 32 * 10,
					y: 32 * 25,
					t: 'w'
				},
				{
					x: 32 * 9,
					y: 32 * 26,
					t: 'w'
				},
				{
					x: 32 * 12,
					y: 32 * 26,
					t: 'h'
				},
				{
					x: 32 * 13,
					y: 32 * 27,
					t: 'h'
				},
				{
					x: 32 * 13,
					y: 32 * 24,
					t: 'h'
				},
				{
					x: 32 * 10,
					y: 32 * 24,
					t: 'h'
				},
				{
					x: 32 * 11,
					y: 32 * 25,
					t: 'h'
				},
				{
					x: 32 * 12,
					y: 32 * 26,
					t: 'h'
				},
				{
					x: 32 * 0,
					y: 32 * 26,
					t: 'w'
				},
				{
					x: 32 * 0,
					y: 32 * 27,
					t: 'w'
				},
				{
					x: 32 * 4,
					y: 32 * 27,
					t: 'w'
				},
				{
					x: 32 * 5,
					y: 32 * 28,
					t: 'w'
				},
				{
					x: 32 * 6,
					y: 32 * 29,
					t: 'w'
				},
				{
					x: 32 * 7,
					y: 32 * 30,
					t: 'w'
				},
				{
					x: 32 * 8,
					y: 32 * 31,
					t: 'w'
				},
				{
					x: 32 * 8,
					y: 32 * 32,
					t: 'w'
				},
				{
					x: 32 * 8,
					y: 32 * 33,
					t: 'w'
				},
				{
					x: 32 * 8,
					y: 32 * 34,
					t: 'w'
				},
				{
					x: 32 * 9,
					y: 32 * 32,
					t: 'w'
				},
				{
					x: 32 * 9,
					y: 32 * 33,
					t: 'w'
				},
				{
					x: 32 * 9,
					y: 32 * 34,
					t: 'w'
				},
				{
					x: 32 * 14,
					y: 32 * 31,
					t: 'h'
				},
				{
					x: 32 * 14,
					y: 32 * 35,
					t: 'h'
				},
				{
					x: 32 * 14,
					y: 32 * 38,
					t: 'h'
				},
				{
					x: 32 * 12,
					y: 32 * 33,
					t: 'h'
				},
				{
					x: 32 * 12,
					y: 32 * 37,
					t: 'h'
				},
				{
					x: 32 * 6,
					y: 32 * 43,
					t: 'w'
				},
				{
					x: 32 * 7,
					y: 32 * 41,
					t: 'w'
				},
				{
					x: 32 * 1,
					y: 32 * 45,
					t: 'w'
				},
				{
					x: 32 * 2,
					y: 32 * 45,
					t: 'w'
				},
				{
					x: 32 * 5,
					y: 32 * 45,
					t: 'w'
				},
				{
					x: 32 * 9,
					y: 32 * 45,
					t: 'w'
				},
				{
					x: 32 * 13,
					y: 32 * 42,
					t: 'w'
				},
				{
					x: 32 * 4,
					y: 32 * 38,
					t: 'h'
				},
				{
					x: 32 * 4,
					y: 32 * 42,
					t: 'h'
				},
				{
					x: 32 * 0,
					y: 32 * 36,
					t: 'h'
				},
				{
					x: 32 * 1,
					y: 32 * 37,
					t: 'h'
				},
				{
					x: 32 * 1,
					y: 32 * 40,
					t: 'h'
				},
				{
					x: 32 * 0,
					y: 32 * 40,
					t: 'h'
				},
				{
					x: 32 * 2,
					y: 32 * 40,
					t: 'h'
				},
				{
					x: 32 * 1,
					y: 32 * 34,
					t: 'w'
				},
				{
					x: 32 * 3,
					y: 32 * 34,
					t: 'h'
				},
				{
					x: 32 * 3,
					y: 32 * 38,
					t: 'w'
				},
				{
					x: 32 * 4,
					y: 32 * 39,
					t: 'w'
				},
				{
					x: 32 * 9,
					y: 32 * 36,
					t: 'h'
				},
				{
					x: 32 * 10,
					y: 32 * 36,
					t: 'h'
				},
				{
					x: 32 * 5,
					y: 32 * 36,
					t: 'w'
				},
				{
					x: 32 * 6,
					y: 32 * 32,
					t: 'h'
				},
				{
					x: 32 * 0,
					y: 32 * 29,
					t: 'w'
				},
				{
					x: 32 * 1,
					y: 32 * 30,
					t: 'w'
				},
				{
					x: 32 * 2,
					y: 32 * 31,
					t: 'w'
				},
				{
					x: 32 * 15,
					y: 32 * 25,
					t: 'h'
				},
				{
					x: 32 * 15,
					y: 32 * 29,
					t: 'w'
				},
				{
					x: 32 * 19,
					y: 32 * 29,
					t: 'w'
				},
				{
					x: 32 * 23,
					y: 32 * 29,
					t: 'w'
				},
				{
					x: 32 * 23,
					y: 32 * 29,
					t: 'w'
				},
				{
					x: 32 * 23,
					y: 32 * 25,
					t: 'w'
				},
				{
					x: 32 * 24,
					y: 32 * 24,
					t: 'h'
				},
				{
					x: 32 * 17,
					y: 32 * 27,
					t: 'w'
				},
				{
					x: 32 * 21,
					y: 32 * 27,
					t: 'w'
				},
				{
					x: 32 * 21,
					y: 32 * 26,
					t: 'w'
				},
				{
					x: 32 * 28,
					y: 32 * 30,
					t: 'w'
				},
				{
					x: 32 * 28,
					y: 32 * 29,
					t: 'w'
				},
				{
					x: 32 * 31,
					y: 32 * 29,
					t: 'h'
				},
				{
					x: 32 * 23,
					y: 32 * 29,
					t: 'w'
				},
				{
					x: 32 * 31,
					y: 32 * 33,
					t: 'h'
				},
				{
					x: 32 * 31,
					y: 32 * 37,
					t: 'h'
				},
				{
					x: 32 * 31,
					y: 32 * 41,
					t: 'h'
				},
				{
					x: 32 * 31,
					y: 32 * 42,
					t: 'h'
				},
				{
					x: 32 * 26,
					y: 32 * 27,
					t: 'h'
				},
				{
					x: 32 * 27,
					y: 32 * 27,
					t: 'w'
				},
				{
					x: 32 * 29,
					y: 32 * 27,
					t: 'w'
				},
				{
					x: 32 * 28,
					y: 32 * 26,
					t: 'w'
				},
				{
					x: 32 * 29,
					y: 32 * 26,
					t: 'w'
				},
				{
					x: 32 * 29,
					y: 32 * 32,
					t: 'h'
				},
				{
					x: 32 * 29,
					y: 32 * 36,
					t: 'h'
				},
				{
					x: 32 * 29,
					y: 32 * 40,
					t: 'h'
				},
				{
					x: 32 * 29,
					y: 32 * 42,
					t: 'h'
				},
				{
					x: 32 * 17,
					y: 32 * 33,
					t: 'w'
				},
				{
					x: 32 * 22,
					y: 32 * 33,
					t: 'w'
				},
				{
					x: 32 * 26,
					y: 32 * 33,
					t: 'w'
				},
				{
					x: 32 * 16,
					y: 32 * 34,
					t: 'h'
				},
				{
					x: 32 * 16,
					y: 32 * 37,
					t: 'h'
				},
				{
					x: 32 * 16,
					y: 32 * 40,
					t: 'w'
				},
				{
					x: 32 * 20,
					y: 32 * 40,
					t: 'w'
				},
				{
					x: 32 * 24,
					y: 32 * 40,
					t: 'w'
				},
				{
					x: 32 * 17,
					y: 32 * 31,
					t: 'w'
				},
				{
					x: 32 * 21,
					y: 32 * 31,
					t: 'w'
				},
				{
					x: 32 * 23,
					y: 32 * 31,
					t: 'w'
				},
				{
					x: 32 * 18,
					y: 32 * 35,
					t: 'h'
				},
				{
					x: 32 * 18,
					y: 32 * 38,
					t: 'w'
				},
				{
					x: 32 * 19,
					y: 32 * 35,
					t: 'w'
				},
				{
					x: 32 * 23,
					y: 32 * 35,
					t: 'w'
				},
				{
					x: 32 * 24,
					y: 32 * 35,
					t: 'w'
				},
				{
					x: 32 * 23,
					y: 32 * 36,
					t: 'h'
				},
				{
					x: 32 * 27,
					y: 32 * 35,
					t: 'h'
				},
				{
					x: 32 * 25,
					y: 32 * 37,
					t: 'h'
				},
				{
					x: 32 * 18,
					y: 32 * 41,
					t: 'h'
				},
				{
					x: 32 * 20,
					y: 32 * 42,
					t: 'h'
				},
				{
					x: 32 * 22,
					y: 32 * 41,
					t: 'h'
				},
				{
					x: 32 * 24,
					y: 32 * 42,
					t: 'h'
				},
				{
					x: 32 * 26,
					y: 32 * 41,
					t: 'h'
				},
				{
					x: 32 * 27,
					y: 32 * 42,
					t: 'h'
				},
			],

			[{
					x: 0,
					y: 32 * 11,
					t: 'w'
				},
				{
					x: 32 * 4,
					y: 32 * 11,
					t: 'w'
				},
				{
					x: 32 * 3,
					y: 32 * 15,
					t: 'w'
				},
				{
					x: 32 * 7,
					y: 32 * 15,
					t: 'w'
				},

				{
					x: 32 * 3,
					y: 0,
					t: 'h'
				},
				{
					x: 32 * 3,
					y: 32 * 4,
					t: 'h'
				},
				{
					x: 32 * 3,
					y: 32 * 16,
					t: 'h'
				},
				{
					x: 32 * 6,
					y: 32 * 18,
					t: 'h'
				},
				{
					x: 32 * 7,
					y: 32 * 3,
					t: 'h'
				},
				{
					x: 32 * 7,
					y: 32 * 7,
					t: 'h'
				},
				{
					x: 32 * 9,
					y: 32 * 16,
					t: 'h'
				},
				{
					x: 32 * 11,
					y: 32 * 0,
					t: 'h'
				},
				{
					x: 32 * 11,
					y: 32 * 4,
					t: 'h'
				},
				{
					x: 32 * 11,
					y: 32 * 8,
					t: 'h'
				},
				{
					x: 32 * 11,
					y: 32 * 12,
					t: 'h'
				},
				{
					x: 32 * 12,
					y: 32 * 18,
					t: 'h'
				},
			],
			[{
					x: 32 * 4,
					y: 32 * 3,
					t: 'w'
				},
				{
					x: 32 * 8,
					y: 32 * 3,
					t: 'w'
				},
				{
					x: 32 * 5,
					y: 32 * 7,
					t: 'w'
				},
				{
					x: 32 * 4,
					y: 32 * 10,
					t: 'w'
				},
				{
					x: 32 * 6,
					y: 32 * 13,
					t: 'w'
				},
				{
					x: 32 * 3,
					y: 32 * 16,
					t: 'w'
				},
				{
					x: 32 * 1,
					y: 32 * 19,
					t: 'w'
				},
				{
					x: 32 * 5,
					y: 32 * 19,
					t: 'w'
				},
				{
					x: 32 * 9,
					y: 32 * 19,
					t: 'w'
				},

				{
					x: 32 * 1,
					y: 32 * 3,
					t: 'h'
				},
				{
					x: 32 * 1,
					y: 32 * 7,
					t: 'h'
				},
				{
					x: 32 * 1,
					y: 32 * 11,
					t: 'h'
				},
				{
					x: 32 * 1,
					y: 32 * 15,
					t: 'h'
				},
				{
					x: 32 * 3,
					y: 32 * 0,
					t: 'h'
				},
				{
					x: 32 * 3,
					y: 32 * 4,
					t: 'h'
				},
				{
					x: 32 * 3,
					y: 32 * 8,
					t: 'h'
				},
				{
					x: 32 * 3,
					y: 32 * 12,
					t: 'h'
				},
				{
					x: 32 * 9,
					y: 32 * 4,
					t: 'h'
				},
				{
					x: 32 * 10,
					y: 32 * 7,
					t: 'h'
				},
				{
					x: 32 * 10,
					y: 32 * 11,
					t: 'h'
				},
				{
					x: 32 * 10,
					y: 32 * 15,
					t: 'h'
				},

			]
		];
		for (var i = 0; i < this.maxLevels; i++) {
			var newLevel = this.add.group();
			newLevel.enableBody = true;
			newLevel.physicsBodyType = Phaser.Physics.ARCADE;
			for (var e = 0; e < this.levelData[i].length; e++) {
				var item = this.levelData[i][e];
				newLevel.create(item.x, item.y, 'element-' + item.t);
			}
			newLevel.setAll('body.immovable', true);
			newLevel.visible = false;
			this.levels.push(newLevel);
		}


		this.pauseButton = this.add.button(Ball._WIDTH - 8, 8, 'button-pause', this.managePause, this);
		this.pauseButton.anchor.set(1, 0);
		this.pauseButton.fixedToCamera = true;
		this.pauseButton.input.useHandCursor = true;


		/*this.audioButton = this.add.button(Ball._WIDTH - this.pauseButton.width - 8 * 2, 8, 'button-audio', this.manageAudio, this);
		this.audioButton.anchor.set(1, 0);
		this.audioButton.fixedToCamera = true;
		this.audioButton.input.useHandCursor = true;
		this.audioButton.animations.add('true', [0], 10, true);
		this.audioButton.animations.add('false', [1], 10, true);
		this.audioButton.animations.play(this.audioStatus);*/

		this.returnButton = this.add.button(Ball._WIDTH - this.pauseButton.width - 8 * 2, 8, 'button-audio', this.manageReturnMenu, this);
		this.returnButton.anchor.set(1, 0);
		this.returnButton.fixedToCamera = true;
		this.returnButton.input.useHandCursor = true;

		//this.panel = this.add.sprite(0, 0, 'panel');
		//this.panel.fixedToCamera = true;
		this.timerText = this.game.add.text(-150, 15, "Time: " + this.timer, this.fontBig);
		this.timerText.fixedToCamera = true;
		this.levelText = this.game.add.text(120, 10, "Level: " + this.level + " / " + this.maxLevels, this.fontSmall);
		this.levelText.fixedToCamera = true;
		this.totalTimeText = this.game.add.text(120, 30, "Total time: " + this.totalTimer, this.fontSmall);
		this.totalTimeText.fixedToCamera = true;

		this.livesText = this.game.add.text(15, 15, "Lives: " + this.lives, this.fontBig);
		this.livesText.fixedToCamera = true;



	},
	showLevel: function (level) {
		var lvl = level | this.level;
		if (this.levels[lvl - 2]) {
			this.levels[lvl - 2].visible = false;
		}
		this.levels[lvl - 1].visible = true;
	},
	updateCounter: function () {
		this.timer++;
		this.timerText.setText("Time: " + this.timer);
		this.totalTimeText.setText("Total time: " + (this.totalTimer + this.timer));
	},
	manageReturnMenu: function () {
		if (this.returnButton.input.useHandCursor == true) {
			this.game.state.start('MainMenu');
		};
	},
	managePause: function () {
		this.game.paused = true;
		this.input.onDown.add(function () {
			this.game.paused = false;
		}, this);
	},
	manageAudio: function () {
		this.audioStatus = !this.audioStatus;
		this.audioButton.animations.play(this.audioStatus);
	},
	update: function () {

		if (this.keys.left.isDown) {
			this.ball.body.velocity.x -= this.movementForce;
		} else if (this.keys.right.isDown) {
			this.ball.body.velocity.x += this.movementForce;
		}
		if (this.keys.up.isDown) {
			this.ball.body.velocity.y -= this.movementForce;
		} else if (this.keys.down.isDown) {
			this.ball.body.velocity.y += this.movementForce;
		}
		this.physics.arcade.collide(this.ball, this.borderGroup, this.wallCollision, null, this);
		this.physics.arcade.collide(this.ball, this.wall1, this.wallCollision, null, this);
		this.physics.arcade.collide(this.ball, this.levels[this.level - 1], this.wallCollision, null, this);
		this.physics.arcade.overlap(this.ball, this.hole, this.finishLevel, null, this);
		this.physics.arcade.overlap(this.ball, this.button, this.collectButton, null, this);

		//Appear in the other side of the game
		this.game.world.wrap(this.ball, 0, true);
	},


	/*wallCollision: function() {
		if(this.audioStatus) {
			this.bounceSound.play();
		}
		// Vibration API
		if("vibrate" in window.navigator) {
			window.navigator.vibrate(100);
		}
	},*/
	handleOrientation: function (e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta; // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		Ball._player.body.velocity.x += x;
		Ball._player.body.velocity.y += y * 0.5;
	},

	collectButton: function () {
		this.button.kill();
		this.wall1.destroy();

	},

	finishLevel: function () {
		if (this.level >= this.maxLevels) {
			this.totalTimer += this.timer;
			lvlSimple4completed = true;
			alert('Congratulations, game completed!\nTotal time of play: ' + this.totalTimer + ' seconds!');
			this.game.state.start('LevelMenu');
		} else {
			alert('Congratulations, level ' + this.level + ' completed!');
			this.totalTimer += this.timer;
			this.timer = 0;
			this.level++;
			this.timerText.setText("Time: " + this.timer);
			this.totalTimeText.setText("Total time: " + this.totalTimer);
			this.levelText.setText("Level: " + this.level + " / " + this.maxLevels);
			this.ball.body.x = this.ballStartPos.x;
			this.ball.body.y = this.ballStartPos.y;
			this.ball.body.velocity.x = 0;
			this.ball.body.velocity.y = 0;
			this.showLevel();
			this.buttonPressed.kill();
			this.buttonText.kill();

		}
	},

	render: function () {
		//this.game.debug.body(this.ball);
		//this.game.debug.body(this.hole);

	}
};