Ball.Help = function(game) {
};
Ball.Help.prototype = {
	create: function() {
		this.buttonContinue = this.add.button(0, 0, 'help', this.menuGame, this);

		this.enemie1 = this.add.sprite(60, 325, 'enemies');
		this.physics.enable(this.enemie1, Phaser.Physics.ARCADE);
		this.enemie1.body.velocity.x = 40;
		this.enemie1.direction = 40;
		this.enemie1.animations.add('walk', [0, 1, 2, 3], 8, true);
		this.enemie1.animations.play('walk');

		
		this.wallGroup = this.add.group();
		this.wallGroup.enableBody = true;
		this.wallGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.wall1 = this.wallGroup.create(0, 325, 'hidden');
		this.wall2 = this.wallGroup.create(150, 325, 'hidden');
		this.wallGroup.setAll('body.immovable', true);


		laserGroup = this.add.group();
		this.physics.enable(laserGroup, Phaser.Physics.ARCADE);
		laserGroup.enableBody = true;
		laserGroup.physicsBodyType = Phaser.Physics.ARCADE;
		let laser = laserGroup.create(210, 325, 'laser1');
		let a = true;

 	 	setInterval(function() {
			  if(a === true) {
				laserGroup.callAll('kill');
				a = false;	  
			  } else {
				let laser1 = laserGroup.create(210, 325, 'laser1');
				a = true;	  
			  }
		  }, 2000);

	},

	update: function() {
		this.physics.arcade.collide(this.enemie1, this.wallGroup, this.wallEnemie, null, this);
	},
	wallEnemie: function () {
		this.enemie1.body.velocity.x = -this.enemie1.direction;
		this.enemie1.direction = this.enemie1.body.velocity.x;

	},
	menuGame: function() {
		this.game.state.start('MainMenu');
	}
};