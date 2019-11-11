Ball.Level3 = function(game) {};
Ball.Level3.prototype = {
	create: function() {

		//world its bigger than the initial bounds
		this.game.world.setBounds(0, 0, 960*3, 1472*3);

		//The background
		this.background = this.add.sprite(1200, 2200, 'screen-bg');
		

		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.fontSmall = { font: "16px Times New Roman", fill: "#ffffff" };
		this.fontBig = { font: "24px Times New Roman", fill: "#ffffff" };
		this.fontMessage = { font: "24px Times New Roman", fill: "#ffffff",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
		this.audioStatus = true;
		this.timer = 0;
		this.totalTimer = 0;
		this.level = 1;
		this.maxLevels = 1;
		this.movementForce = 20;
		this.ballStartPos = { x: 1360, y: 2440 };
		this.lives = 3;




		this.hole = this.add.sprite(392, 1090, 'hole');
		this.physics.enable(this.hole, Phaser.Physics.ARCADE);
		this.hole.anchor.set(0.5);
		this.hole.body.setSize(2, 2);

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



		//The camera follows the ball
		this.game.camera.follow(this.ball);


	},
	initLevels: function() {
		this.levels = [];
		this.levelData = [
			[
				

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

		
		this.pauseButton = this.add.button(Ball._WIDTH-8, 8, 'button-pause', this.managePause, this);
		this.pauseButton.anchor.set(1,0);
		this.pauseButton.fixedToCamera = true;
		this.pauseButton.input.useHandCursor = true;
		
		/*this.audioButton = this.add.button(Ball._WIDTH-this.pauseButton.width-8*2, 8, 'button-audio', this.manageAudio, this);
		this.audioButton.anchor.set(1,0);
		this.audioButton.fixedToCamera = true;
		this.audioButton.input.useHandCursor = true;
		this.audioButton.animations.add('true', [0], 10, true);
		this.audioButton.animations.add('false', [1], 10, true);
		this.audioButton.animations.play(this.audioStatus);*/

		this.returnButton = this.add.button(Ball._WIDTH - this.pauseButton.width - 8 * 2, 8, 'button-audio', this.manageReturnMenu, this);
		this.returnButton.anchor.set(1,0);
		this.returnButton.fixedToCamera = true;
		this.returnButton.input.useHandCursor = true;
		
		//this.panel = this.add.sprite(0, 0, 'panel');
		//this.panel.fixedToCamera = true;
		this.timerText = this.game.add.text(-150, 15, "Time: "+this.timer, this.fontBig);
		this.timerText.fixedToCamera = true; 
		this.levelText = this.game.add.text(120, 10, "Level: "+this.level+" / "+this.maxLevels, this.fontSmall);
		this.levelText.fixedToCamera = true; 
		this.totalTimeText = this.game.add.text(120, 30, "Total time: "+this.totalTimer, this.fontSmall);
		this.totalTimeText.fixedToCamera = true;

		this.livesText = this.game.add.text(15, 15, "Lives: "+this.lives, this.fontBig);
		this.livesText.fixedToCamera = true;
		

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
	manageReturnMenu: function () {
		if(this.returnButton.input.useHandCursor == true) {
			this.game.state.start('MainMenu');
		};
	},
	managePause: function () {
		this.game.paused = true;
		this.input.onDown.add(function(){
			this.game.paused = false;
		}, this);
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


		//Appear in the other side of the game
		this.game.world.wrap(this.ball, 0, true);
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
		}
	},

	render: function() {
		 //this.game.debug.body(this.ball);
		 //this.game.debug.body(this.hole);
		 
	}
};


