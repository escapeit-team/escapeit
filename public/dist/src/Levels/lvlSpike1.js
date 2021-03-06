Ball.lvlSpike1 = function(game) {};
Ball.lvlSpike1.prototype = {
	create: function() {

		//world its bigger than the initial bounds
		this.game.world.setBounds(0, 0, 960, 1440); 

		//The background
		this.background = this.add.sprite(0, 0, 'screen-bg');
		this.background.scale.setTo(8,8);

		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.fontSmall = { font: "16px Times New Roman", fill: "#ffffff" };
		this.fontBig = { font: "24px Times New Roman", fill: "#ffffff" };
		this.fontMessage = { font: "24px Times New Roman", fill: "#ffffff",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
		this.audioStatus = true;
		this.timer = 0;
		this.totalTimer = 0;
		this.level = 1;
		this.maxLevels = 1;
		this.movementForce = 10;
		this.ballStartPos = { x: 14*32, y: 96 };

        this.hole = this.add.sprite(28*32, 40*32, 'hole');
    	this.physics.enable(this.hole, Phaser.Physics.ARCADE);
		this.hole.anchor.set(0.5);
        this.hole.body.setSize(5, 5);

                

        this.spikeGroup = this.add.group();
		this.spikeGroup.enableBody = true;
        this.spikeGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.spikeGroup.setAll('body.immovable', true);

		this.spikeU1 = this.spikeGroup.create(0, 32*37-16, 'spikesU');
        this.spikeU2 = this.spikeGroup.create(32*4, 32*15-16, 'spikesU');
        this.spikeU3 = this.spikeGroup.create(32*12, 32*17-16, 'spikesU');
        this.spikeU4 = this.spikeGroup.create(32*21, 32*27-16, 'spikesU');
        this.spikeU5 = this.spikeGroup.create(32*26, 32*31-16, 'spikesU');
    
        this.spikeD1 = this.spikeGroup.create(32*21, 32, 'spikesD');
        this.spikeD2 = this.spikeGroup.create(32*8, 32*29, 'spikesD');
        this.spikeD3 = this.spikeGroup.create(32*22, 32*28, 'spikesD');

        this.spikeR1 = this.spikeGroup.create(0, 32*38, 'spikesR');
        this.spikeR2 = this.spikeGroup.create(32*5, 32*30, 'spikesR');
        this.spikeR3 = this.spikeGroup.create(32*11, 32*31, 'spikesR');
        this.spikeR4 = this.spikeGroup.create(32*18, 32*5, 'spikesR');
        this.spikeR5 = this.spikeGroup.create(32*22, 32*28, 'spikesR');
        this.spikeR6 = this.spikeGroup.create(32*22, 32*32, 'spikesR');
        this.spikeR7 = this.spikeGroup.create(32*26, 0, 'spikesR');
        this.spikeR8 = this.spikeGroup.create(32*26, 32*4, 'spikesR');
        this.spikeR9 = this.spikeGroup.create(32*26, 32*12, 'spikesR');
        this.spikeR10 = this.spikeGroup.create(32*26, 32*16, 'spikesR');
        this.spikeR11 = this.spikeGroup.create(32*26, 32*24, 'spikesR');

        this.spikeL1 = this.spikeGroup.create(32*15-16, 32*24, 'spikesL');
        this.spikeL2 = this.spikeGroup.create(32*16-16, 32*18, 'spikesL');
        this.spikeL3 = this.spikeGroup.create(32*21-16, 32*9, 'spikesL');
        this.spikeL4 = this.spikeGroup.create(32*30-16, 32*8, 'spikesL');
        this.spikeL5 = this.spikeGroup.create(32*30-16, 32*16, 'spikesL');
        this.spikeL6 = this.spikeGroup.create(32*30-16, 32*20, 'spikesL');
        this.spikeL7 = this.spikeGroup.create(32*30-16, 32*24, 'spikesL');
        
        this.buttonPressed1 = this.add.sprite(48 - 16, 32*32 - 16, 'buttonPressed');
		this.button1 = this.add.sprite(48, 32*32, 'button');
		this.physics.enable(this.button1, Phaser.Physics.ARCADE);
		this.button1.anchor.set(0.5);
        this.button1.body.setSize(20, 20);

        this.buttonPressed2 = this.add.sprite(24*32 - 16, 40*32 - 16, 'buttonPressed');
		this.button2 = this.add.sprite(24*32, 40*32, 'button');
		this.physics.enable(this.button2, Phaser.Physics.ARCADE);
		this.button2.anchor.set(0.5);
		this.button2.body.setSize(20, 20);

		this.ball = this.add.sprite(this.ballStartPos.x, this.ballStartPos.y, 'ball');
		this.ball.anchor.set(0.5);
		this.physics.enable(this.ball, Phaser.Physics.ARCADE);
		this.ball.body.setSize(25, 25);
        this.ball.body.bounce.set(0.3, 0.3);


		this.wallGroup = this.add.group();
		this.wallGroup.enableBody = true;
		this.wallGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.wall1 = this.wallGroup.create(26*32, 42*32, 'element-w');
        this.wall2 = this.wallGroup.create(18*32, 40*32, 'element-w');
        this.wall3 = this.wallGroup.create(0, 22*32, 'element-w');
		this.wallGroup.setAll('body.immovable', true);

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
		
		this.borderH = this.borderGroup.create(32, 0, 'border-horizontal');
		this.borderH.scale.setTo(3,1);

		this.borderV = this.borderGroup.create(0, 32*7, 'border-vertical');
		this.borderV.scale.setTo(1,4);

		this.borderV2 =this.borderGroup.create(32*30-1, 0, 'border-vertical');
        this.borderV2.scale.setTo(1,4);
        
		this.borderGroup.setAll('body.immovable', true);
        this.bounceSound = this.game.add.audio('audio-bounce');


		//The camera follows the ball
        this.game.camera.follow(this.ball);
       


	},
	initLevels: function() {
		this.levels = [];
		this.levelData = [

			[
				{ x: 32*21 , y: 32*0 , t: 'w' },
				{ x: 32*0 , y: 32*1 , t: 'w' },
				{ x: 32*4 , y: 32*1 , t: 'w' },
				{ x: 32*11 , y: 32*8 , t: 'w' },
				{ x: 32*7 , y: 32*10 , t: 'w' },
				{ x: 32*14 , y: 32*14 , t: 'w' },
				{ x: 32*4 , y: 32*15 , t: 'w' },
				{ x: 32*9 , y: 32*17 , t: 'w' },
				{ x: 32*13 , y: 32*17 , t: 'w' },
				{ x: 32*6 , y: 32*20 , t: 'w' },
				{ x: 32*10 , y: 32*20 , t: 'w' },
				{ x: 32*16 , y: 32*22 , t: 'w' },
				{ x: 32*12 , y: 32*23 , t: 'w' },
				{ x: 32*18 , y: 32*24 , t: 'w' },
				{ x: 32*9 , y: 32*25 , t: 'w' },
				{ x: 32*21 , y: 32*27 , t: 'w' },
				{ x: 32*8 , y: 32*28 , t: 'w' },
				{ x: 32*12 , y: 32*28 , t: 'w' },
                { x: 32*26 , y: 32*31 , t: 'w' },
                { x: 32*14 , y: 32*32 , t: 'w' },
				{ x: 32*5 , y: 32*34 , t: 'w' },
                { x: 32*9 , y: 32*35 , t: 'w' },
                { x: 32*13 , y: 32*35 , t: 'w' },
                { x: 32*8 , y: 32*36 , t: 'w' },
				{ x: 32*17 , y: 32*36 , t: 'w' },
				{ x: 32*0 , y: 32*37 , t: 'w' },
				{ x: 32*4 , y: 32*37 , t: 'w' },
				{ x: 32*26 , y: 32*37 , t: 'w' },
				{ x: 32*1 , y: 32*41 , t: 'w' },
				{ x: 32*5 , y: 32*41 , t: 'w' },
				{ x: 32*9 , y: 32*41 , t: 'w' },
				{ x: 32*13 , y: 32*41 , t: 'w' },
				
				
				{ x: 32*3 , y: 32*3 , t: 'h' },
				{ x: 32*3 , y: 32*7 , t: 'h' },
				{ x: 32*3 , y: 32*11 , t: 'h' },
				{ x: 32*3 , y: 32*15 , t: 'h' },
				{ x: 32*4 , y: 32*22 , t: 'h' },
				{ x: 32*4 , y: 32*26 , t: 'h' },
				{ x: 32*4 , y: 32*30 , t: 'h' },
				{ x: 32*6 , y: 32*7 , t: 'h' },
				{ x: 32*7 , y: 32*16 , t: 'h' },
				{ x: 32*7 , y: 32*25 , t: 'h' },
				{ x: 32*7 , y: 32*29 , t: 'h' },
				{ x: 32*8 , y: 32*11 , t: 'h' },
				{ x: 32*9 , y: 32*21 , t: 'h' },
				{ x: 32*10 , y: 32*5 , t: 'h' },				
				{ x: 32*10 , y: 32*31 , t: 'h' },
				{ x: 32*11 , y: 32*13 , t: 'h' },
				{ x: 32*12 , y: 32*9 , t: 'h' },
				{ x: 32*15 , y: 32*24 , t: 'h' },
				{ x: 32*16 , y: 32*18 , t: 'h' },
				{ x: 32*17 , y: 32*5 , t: 'h' },
				{ x: 32*17 , y: 32*9 , t: 'h' },
				{ x: 32*17 , y: 32*40 , t: 'h' },
				{ x: 32*18 , y: 32*13 , t: 'h' },
				{ x: 32*18 , y: 32*17 , t: 'h' },
				{ x: 32*18 , y: 32*25 , t: 'h' },
                { x: 32*18 , y: 32*29 , t: 'h' },
                { x: 32*21 , y: 32*4 , t: 'h' },
				{ x: 32*21 , y: 32*8 , t: 'h' },
				{ x: 32*21 , y: 32*12 , t: 'h' },
				{ x: 32*21 , y: 32*16 , t: 'h' },
				{ x: 32*21 , y: 32*20 , t: 'h' },
                { x: 32*21 , y: 32*28 , t: 'h' },
                { x: 32*21 , y: 32*32 , t: 'h' },
				{ x: 32*21 , y: 32*36 , t: 'h' },
                { x: 32*25 , y: 32*0 , t: 'h' },
                { x: 32*25 , y: 32*4 , t: 'h' },
                { x: 32*25 , y: 32*8 , t: 'h' },
				{ x: 32*25 , y: 32*12 , t: 'h' },
				{ x: 32*25 , y: 32*16 , t: 'h' },
				{ x: 32*25 , y: 32*20 , t: 'h' },
                { x: 32*25 , y: 32*24 , t: 'h' },
                { x: 32*26 , y: 32*38 , t: 'h' }
				

				

			]
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
		this.physics.arcade.collide(this.ball, this.wallGroup, this.wallCollision, null, this);
		this.physics.arcade.collide(this.ball, this.levels[this.level-1], this.wallCollision, null, this);
		this.physics.arcade.overlap(this.ball, this.hole, this.finishLevel, null, this);
		this.physics.arcade.overlap(this.ball, this.button1, this.collectButton1, null, this);
        this.physics.arcade.overlap(this.ball, this.button2, this.collectButton2, null, this);
        this.physics.arcade.collide(this.ball, this.spikeGroup, this.ballLives, null, this);


		//Appear in the other side of the game
		this.game.world.wrap(this.ball, 0, true);
    },
    
    collectButton1: function () {
		this.button1.kill();
		this.wall1.destroy();
    },
    collectButton2: function () {
		this.button2.kill();
        this.wall2.destroy();
        this.wall3.kill();
	},
    ballLives: function () {
		this.lives--;
		if (this.lives) {
			this.livesText.setText('Lives: ' + this.lives);
		}
		else {
			alert('You lost, game over!');
			this.game.state.start('lvlSpike1');
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
			lvlSpike1completed = true;
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