Ball.LevelMenu = function(game) {};
Ball.LevelMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-bg');
		this.level1Button = this.add.button(50, 50, 'lvlonebutton', this.level1, this);
		this.level1Button.input.useHandCursor = true;
		if(levelonecompleted === true) {
			this.level2Button = this.add.button(120, 50, 'lvltwobutton', this.level2, this);
			this.level2Button.input.useHandCursor = true;
		}
		if(leveltwocompleted === true) {
			this.level3Button = this.add.button(190, 50, 'lvlthreebutton', this.level3, this);
			this.level3Button.input.useHandCursor = true;
		}
	},

	level1: function() {
			this.game.state.start('Howto');
	},
	level2: function() {
			if(levelonecompleted === true) {
				this.game.state.start('Level2');
			}
	},
	level3: function() {
		if(leveltwocompleted === true) {
			this.game.state.start('Level3');
		}
}
	

};