Ball.Preloader = function(game) {};
Ball.Preloader.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite(0,0, 'preloaderBg');
		this.preloadBg.scale.setTo(0.27, 0.35);
		this.preloadBar = this.add.sprite(50, 340, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('ball', 'img/ball.png');
		this.load.image('hole', 'img/hole.png');
		this.load.image('element-w', 'img/element-w.png');
		this.load.image('element-h', 'img/element-h.png');
		this.load.image('panel', 'img/panel.png');
		this.load.image('title', 'img/title.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('screen-bg', 'img/screen-bg.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');
		this.load.image('border-horizontal', 'img/border-horizontal.png');
		this.load.image('border-vertical', 'img/border-vertical.png');
		this.load.image('element-b', 'img/element-b.png');
		this.load.image('button', 'img/button.png');
		this.load.image('buttonPressed', 'img/button-pressed.png');
		this.load.image('buttonText', 'img/button-text.png');
		this.load.image('spikesU', 'img/spikesU.png');
		this.load.image('spikesD', 'img/spikesD.png');
		this.load.image('spikesL', 'img/spikesL.png');
		this.load.image('spikesR', 'img/spikesR.png');
		this.load.image('speedUp', 'img/speedUp.png');
		this.load.image('rebound', 'img/rebound.png');
		this.load.image('hidden', 'img/hidden.png');
		this.load.image('lvlonebutton', 'img/1button.png');
		this.load.image('lvltwobutton', 'img/2button.png');
		this.load.image('lvlthreebutton', 'img/3button.png');
		this.load.image('lvlfourbutton', 'img/4button.png');
		this.load.image('lvlfivebutton', 'img/5button.png');
		this.load.image('lvlTree', 'img/lvlTree.png');
		this.load.image('laser', 'img/laser.png');
		this.load.image('laser1', 'img/laser1.png');
		this.load.image('help', 'img/help.png');
		
		

		this.load.spritesheet('enemies', 'img/enemies.png', 33, 32);
		this.load.spritesheet('enemieP', 'img/enemieP.png', 33, 32);
		this.load.spritesheet('button-audio', 'img/button-audio.png', 35, 35);
		this.load.spritesheet('button-start', 'img/button-start.png', 146, 51);
		this.load.spritesheet('button-help', 'img/button-help.png', 146, 51);


		this.load.audio('audio-bounce', ['audio/bounce.ogg', 'audio/bounce.mp3', 'audio/bounce.m4a']);
	},
	create: function() {
		this.game.state.start('MainMenu');

	}
};