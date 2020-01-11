Ball.LevelMenu = function(game) {};
Ball.LevelMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-bg');
		this.add.sprite(0, 0, 'lvlTree');
		this.tutorialButton = this.add.button(140, 400, 'lvltwobutton', this.tutorial, this);
		this.tutorialButton.input.useHandCursor = true;
		
		this.level1Button = this.add.button(140, 320, 'lvltwobutton', this.level1, this);
		if (tutorialcompleted == true) {
			this.tutorialButton.kill();
			this.tutorialButton = this.add.button(140, 400, 'lvlonebutton', this.tutorial, this);
			this.tutorialButton.input.useHandCursor = true;
			this.level1Button.input.useHandCursor = true;
		}
		
		this.lvlSimple1Button = this.add.button(99, 277, 'lvltwobutton', this.lvlSimple1, this);
		if (level1completed == true) {
			this.level1Button.kill();
			this.level1Button = this.add.button(140, 320, 'lvlonebutton', this.level1, this);
			this.level1Button.input.useHandCursor = true;
			this.lvlSimple1Button.input.useHandCursor = true;
		}
		
		this.lvlSimple2Button = this.add.button(55, 235, 'lvltwobutton', this.lvlSimple2, this);
		if (lvlSimple1completed == true) {
			this.lvlSimple1Button.kill();
			this.lvlSimple1Button = this.add.button(99, 277, 'lvlonebutton', this.lvlSimple1, this);
			this.lvlSimple1Button.input.useHandCursor = true;
			this.lvlSimple2Button.input.useHandCursor = true;
		}

		this.lvlSimple3Button = this.add.button(12, 194, 'lvltwobutton', this.lvlSimple3, this);
		if (lvlSimple2completed == true) {
			this.lvlSimple2Button.kill();
			this.lvlSimple2Button = this.add.button(55, 235, 'lvlonebutton', this.lvlSimple2, this);
			this.lvlSimple2Button.input.useHandCursor = true;
			this.lvlSimple3Button.input.useHandCursor = true;
		}
		
		if (lvlSimple3completed == true) {
			this.lvlSimple3Button.kill();
			this.lvlSimple3Button = this.add.button(12, 194, 'lvlonebutton', this.lvlSimple3, this);
			this.lvlSimple3Button.input.useHandCursor = true;
		}

	},

	tutorial: function() {
			this.game.state.start('Howto');
	},
	level1: function() {
		if (tutorialcompleted == true) {
			this.game.state.start('Level1');
		}
	},
	lvlSimple1: function() {
		if(level1completed == true){
			this.game.state.start('lvlSimple1');
		}
	},
	lvlSimple2: function() {
		if (lvlSimple1completed == true){
			this.game.state.start('lvlSimple2');
		}
	},
	lvlSimple3: function() {
		if (lvlSimple2completed == true){
			this.game.state.start('lvlSimple3');	
		}
	}
	

};