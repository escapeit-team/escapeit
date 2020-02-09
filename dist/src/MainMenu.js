Ball.MainMenu = function(game) {};
Ball.MainMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-mainmenu');
		this.gameTitle = this.add.sprite(160, 40, 'title');
		this.gameTitle.scale.setTo(0.3854, 0.5);
		this.gameTitle.anchor.set(0.5,0);
		this.startButton = this.add.button(Ball._WIDTH*0.5, 200, 'button-start', this.startGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
		this.hiddenButton = this.add.button(0, 0, 'hidden', this.testLevel0, this);
		this.hiddenButton.input.useHandCursor = true;
		this.helpButton = this.add.button(90, 280, 'button-help', this.helpGame, this, 2, 0, 1);
		this.helpButton.input.useHandCursor = true;

		// button to "read the article"
	},

	startGame: function() {
		this.game.state.start('LevelMenu');
	},

	helpGame: function() {
		this.game.state.start('Help');
	},
	
	testLevel0: function() {
		this.game.state.start('Level0');
	}
};