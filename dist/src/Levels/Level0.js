Ball.Level0 = function(game) {};
Ball.Level0.prototype = {
	create: function() {

		//world its bigger than the initial bounds
		this.game.world.setBounds(0, 0, 960, 1472); 

		//The background
		this.background = this.add.sprite(0, 0, 'screen-bg');
		this.background.scale.setTo(8,8);

		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.fontSmall = { font: "16px Arial", fill: "#e4beef" };
		this.fontBig = { font: "24px Arial", fill: "#e4beef" };
		this.fontMessage = { font: "24px Arial", fill: "#e4beef",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
		this.audioStatus = true;
		this.timer = 0;
		this.totalTimer = 0;
		this.level = 1;
		this.maxLevels = 3;
		this.movementForce = 10;
		this.ballStartPos = { x: Ball._WIDTH*0.5 - 16, y: 450 };
		this.lives = 1;


		this.speedUp = this.add.sprite(300, 400, 'speedUp');
		this.physics.enable(this.speedUp, Phaser.Physics.ARCADE);
		this.speedUp.anchor.set(0.5);
		this.speedUp.body.setSize(20, 20);

		
		this.buttonPressed = this.add.sprite(200-16, 400-16, 'buttonPressed'); 
		this.button = this.add.sprite(200, 400, 'button');
		this.physics.enable(this.button, Phaser.Physics.ARCADE);
		this.button.anchor.set(0.5);
		this.button.body.setSize(20, 20);
		

			
		this.wallGroup = this.add.group();
		this.wallGroup.enableBody = true;
		this.wallGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.wall1 = this.wallGroup.create(200, 500, 'element-b');
		this.wallGroup.setAll('body.immovable', true);

		this.spikeGroup = this.add.group();
		this.spikeGroup.enableBody = true;
		this.spikeGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.spike1 = this.spikeGroup.create(200, 500-18, 'spikes');
		this.spikeGroup.setAll('body.immovable', true);
		


		this.hole = this.add.sprite(Ball._WIDTH*0.5, 90, 'hole');
		this.physics.enable(this.hole, Phaser.Physics.ARCADE);
		this.hole.anchor.set(0.5);
		this.hole.body.setSize(10, 10);

		this.ball = this.add.sprite(this.ballStartPos.x, this.ballStartPos.y, 'ball');
		this.ball.anchor.set(0.5);
		this.physics.enable(this.ball, Phaser.Physics.ARCADE);
		this.ball.body.setSize(25, 25);
		this.ball.body.bounce.set(0.3, 0.3);


		this.enemie1 = this.add.sprite(200, 400, 'enemies');
		this.physics.enable(this.enemie1, Phaser.Physics.ARCADE);
		this.enemie1.body.velocity.x = 50;
		this.enemie1.direction = 50;
		this.enemie1.animations.add('walk', [0, 1, 2, 3], 10, true);
		this.enemie1.animations.play('walk');

		



		this.initLevels();
		this.showLevel(1);
		this.keys = this.game.input.keyboard.createCursorKeys();

		Ball._player = this.ball;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

		//Borders of the game
		this.borderGroup = this.add.group();
		this.borderGroup.enableBody = true;
		this.borderGroup.physicsBodyType = Phaser.Physics.ARCADE;
		
		this.borderH = this.borderGroup.create(0, this.game.world.height - 1, 'border-horizontal');
		this.borderH.scale.setTo(3,1);
		this.borderGroup.create(0, 0, 'border-horizontal');

		this.borderV = this.borderGroup.create(0, 0, 'border-vertical');
		this.borderV.scale.setTo(1,2.01);

		this.borderV2 =this.borderGroup.create(0, 992, 'border-vertical');
		this.borderV2.scale.setTo(1,2);
		//this.borderGroup.create(Ball._WIDTH-2, 0, 'border-vertical');
		this.borderGroup.setAll('body.immovable', true);
		this.bounceSound = this.game.add.audio('audio-bounce');

		//The camera follows the ball
		this.game.camera.follow(this.ball);


	},
	initLevels: function() {
		this.levels = [];
		this.levelData = [
			[
				{ x: 96, y: 224, t: 'w' },
				{ x: 250, y: 320, t: 'h' },

	

			],
			[
				{ x: 72, y: 320, t: 'w' },
				{ x: 200, y: 320, t: 'h' },
				{ x: 72, y: 150, t: 'w' }
			],
			[
				{ x: 64, y: 352, t: 'h' },
				{ x: 224, y: 352, t: 'h' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 128, y: 240, t: 'w' },
				{ x: 200, y: 52, t: 'h' }
			],
			[
				{ x: 78, y: 352, t: 'h' },
				{ x: 78, y: 320, t: 'w' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 192, y: 240, t: 'w' },
				{ x: 30, y: 150, t: 'w' },
				{ x: 158, y: 150, t: 'w' }
			],
		];
		for(var i=0; i<this.maxLevels; i++) {
			var newLevel = this.add.group();
			newLevel.enableBody = true;
			newLevel.physicsBodyType = Phaser.Physics.ARCADE;
			for(var e=0; e<this.levelData[i].length; e++) {
				var item = this.levelData[i][e];
				newLevel.create(item.x, item.y, 'element-'+item.t);
			}
			newLevel.setAll('body.immovable', true);
			newLevel.visible = false;
			this.levels.push(newLevel);
		}

		
		this.pauseButton = this.add.button(Ball._WIDTH - 8, 8, 'button-pause', this.managePause, this);
		this.pauseButton.anchor.set(1, 0);
		this.pauseButton.fixedToCamera = true;
		this.pauseButton.input.useHandCursor = true;
		

		
		this.returnButton = this.add.button(Ball._WIDTH - this.pauseButton.width - 8 * 2, 8, 'button-audio', this.manageReturnMenu, this);
		this.returnButton.anchor.set(1,0);
		this.returnButton.fixedToCamera = true;
		this.returnButton.input.useHandCursor = true;

		
		this.timerText = this.game.add.text(-150, 15, "Time: "+this.timer, this.fontBig);
		this.timerText.fixedToCamera = true; 
		this.levelText = this.game.add.text(120, 10, "Level: "+this.level+" / "+this.maxLevels, this.fontSmall);
		this.levelText.fixedToCamera = true; 
		this.totalTimeText = this.game.add.text(120, 30, "Total time: "+this.totalTimer, this.fontSmall);
		this.totalTimeText.fixedToCamera = true;

		//this.livesText = this.game.add.text(15, 15, "Lives: "+this.lives, this.fontBig);
		//this.livesText.fixedToCamera = true; 

		

	},
	showLevel: function(level) {
		var lvl = level | this.level;
		if(this.levels[lvl-2]) {
			this.levels[lvl-2].visible = false;
		}
		this.levels[lvl-1].visible = true;
	},
	updateCounter: function() {
		this.timer++;
		this.timerText.setText("Time: "+this.timer);
		this.totalTimeText.setText("Total time: "+(this.totalTimer+this.timer));
	},
	managePause: function() {
		this.game.paused = true;
		var pausedText = this.add.text(Ball._WIDTH*0.5, 250, "Game paused,\ntap anywhere to continue.", this.fontMessage);
		pausedText.anchor.set(0.5);
		this.input.onDown.add(function(){
			pausedText.destroy();
			this.game.paused = false;
		}, this);
	},
	manageReturnMenu: function () {
		if(this.returnButton.input.useHandCursor == true) {
			this.game.state.start('MainMenu');
		};
	},
	manageAudio: function() {
		this.audioStatus =! this.audioStatus;
		this.audioButton.animations.play(this.audioStatus);
	},
	update: function() {
	
		if(this.keys.left.isDown) {
			this.ball.body.velocity.x -= this.movementForce;
		}
		else if(this.keys.right.isDown) {
			this.ball.body.velocity.x += this.movementForce;
		}
		if(this.keys.up.isDown) {
			this.ball.body.velocity.y -= this.movementForce;
		}
		else if(this.keys.down.isDown) {
			this.ball.body.velocity.y += this.movementForce;
		}		


		this.physics.arcade.collide(this.ball, this.borderGroup, this.wallCollision, null, this);
		this.physics.arcade.collide(this.ball, this.levels[this.level-1], this.wallCollision, null, this);
		this.physics.arcade.overlap(this.ball, this.hole, this.finishLevel, null, this);

		this.physics.arcade.collide(this.ball, this.wallGroup, this.wallCollision, null, this);
		this.physics.arcade.collide(this.ball, this.spikeGroup, this.ballLives, null, this);
		this.physics.arcade.collide(this.ball, this.enemie1, this.ballLives, null, this);
		this.physics.arcade.collide(this.enemie1, this.borderGroup, this.wallEnemie,  null, this);
		this.physics.arcade.collide(this.enemie1, this.levels[this.level-1], this.wallEnemie, null, this);
			
		this.physics.arcade.overlap(this.ball, this.button, this.collectButton, null, this);
		this.physics.arcade.overlap(this.ball, this.speedUp, this.collectSpeedUp, null, this);


		//Appear in the other side of the game
		this.game.world.wrap(this.ball, 0, true);
	},

	ballLives: function() {
		this.lives--;
		if(this.lives) {
			this.livesText.setText('Lives: '+this.lives);
		}
		else {
			alert('You lost, game over!');
			this.game.state.start('MainMenu');
		}
	},


	
	collectButton: function() {
		this.button.kill();
		this.wall1.destroy();
		 		
	},


	collectSpeedUp: function() {
		this.speedUp.kill();
		this.ball.body.velocity.x *= 10;
		this.ball.body.velocity.y *= 10;
		 		
	},

	wallEnemie: function() {
		this.enemie1.body.velocity.x = -this.enemie1.direction;
		this.enemie1.direction = this.enemie1.body.velocity.x;
		 		
	},

	wallCollision: function() {
		if(this.audioStatus) {
			this.bounceSound.play();
		}
		// Vibration API
		if("vibrate" in window.navigator) {
			window.navigator.vibrate(100);
		}
	},
	handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		Ball._player.body.velocity.x += x;
		Ball._player.body.velocity.y += y*0.5;
	},
	finishLevel: function() {
		if(this.level >= this.maxLevels) {
			this.totalTimer += this.timer;
			alert('Congratulations, game completed!\nTotal time of play: '+this.totalTimer+' seconds!');
			this.game.state.start('MainMenu');
		}
		else {
			alert('Congratulations, level '+this.level+' completed!');
			this.totalTimer += this.timer;
			this.timer = 0;
			this.level++;
			this.timerText.setText("Time: "+this.timer);
			this.totalTimeText.setText("Total time: "+this.totalTimer);
			this.levelText.setText("Level: "+this.level+" / "+this.maxLevels);
			this.ball.body.x = this.ballStartPos.x;
			this.ball.body.y = this.ballStartPos.y;
			this.ball.body.velocity.x = 0;
			this.ball.body.velocity.y = 0;
			this.showLevel();
			this.buttonPressed.kill();
			this.spike1.kill();
		}
	},

	render: function() {
		 //this.game.debug.body(this.ball);
		 //this.game.debug.body(this.hole);
		 
	}
};