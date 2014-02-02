enchant(); 
var moveSpeed = 4;
var stgWidth = 1000;
var stgHeight = 600;
var score = 0;
var tables = 9;
var tablePositions = new Array();
var wichOne = 0;
var boludos = 10;
//======================================== NICO CLASS ===================================================================
Nico = Class.create(Sprite, {
    initialize: function() {
		Sprite.call(this, 65, 80);
		this.image = game.assets['nico.png'];
		this.x = 200;
		this.y = 200;
    },

    onenterframe: function() {
		if(game.input.left && !game.input.right){
			if(this.x > 110){
				this.x -= moveSpeed;
			}
		}
		else if(game.input.right && !game.input.left){
			if(this.x < 836){
				this.x += moveSpeed;
			}
		}
		if(game.input.up && !game.input.down){
			if(this.y > 72){
				this.y -= moveSpeed;
			}
		}
		else if(game.input.down && !game.input.up){
	        if(this.y < 516){
				this.y += moveSpeed;
			}
		}
    }
});
//==================================== END OF NICO CLASS =================================================================

//======================================= CLASS TABLE  ===================================================================

Table = Class.create(Sprite, {
	initialize: function() {
		Sprite.call(this,60,40);
		this.image = game.assets['table.png'];
		this.x = Math.floor(Math.random()*701)+100;
		this.y = Math.floor(Math.random()*101)+300;
		tPosition = new Array();
		tPosition.push(this.x);
		tPosition.push(this.y);
		tablePositions.push(tPosition);
		this.destructible = true;
	},
	
	onenterframe: function(){
		if(this.intersect(nico)){
			this.image = game.assets['broken.png'];
			if(this.destructible){
				tables--;
				game.score -= 40;
				this.destructible = false;
			}
		}
	}
 });
	
// ==================================== END OF TABLE CLASS ===============================================================

//===================================== CLASS BOLUDO =====================================================================

Boludo = Class.create(Sprite, {
	 initialize: function(){
		 Sprite.call(this,65,80);
		 this.image = game.assets['boludonormal.png'];
		 this.x = tablePositions[wichOne][0]+10;
		 this.y = tablePositions[wichOne][1]+10;
		 wichOne++;
		 listenable = false;
	 },
	 onenterframe: function(){
		 if(this.intersect(nico)){
			 game.score += 20;
			 game.rootScene.removeChild(this);
			 boludos--;
			 if (boludos == 0){
				 if (game.score < 0){
					  alert('rajaron a nico por deber: ' + game.score * -1);
					  game.stop();
					 }
			     else if(game.score == 0){
						alert("nico no gano nada :(")
						game.stop();
					 }
			     else if(game.score > 0){
					  alert('nico gano: ' + game.score);
					  game.stop();
					 }
				 }
			
			 }
		 }
 });

// =================================== END OF CLASS BOLUDO ===============================================================


// =========================== GAME CODE =================================================================================
window.onload = function() {
    game = new Game(stgWidth, stgHeight);
    game.preload('nico.png','table.png','broken.png','boludo.png','bg.png','boludonormal.png');

    game.onload = function() { 
		bg = new Sprite(stgWidth, stgHeight);	
		bg.image = game.assets['bg.png'];	
		game.rootScene.addChild(bg);
		nico = new Nico();
		for (i=0; i<10; i++){
	       table = new Table();
	       game.rootScene.addChild(table);
		}
		for(i=0; i<10; i++){
			boludo = new Boludo();
			game.rootScene.addChild(boludo);
			}
		game.score = 0;
		scoreLabel = new Label("Propina: $");
		scoreLabel.addEventListener('enterframe', function(){
			this.text = "Propina: $"+ game.score;
		});
		scoreLabel.x = stgWidth/2;
		scoreLabel.color = "white";
		game.rootScene.addChild(scoreLabel);
		game.rootScene.addChild(nico);
        game.rootScene.addEventListener('enterframe', function() {
        });

    }
    game.start(); 
}
// ====================================== END OF GAME CODE ===============================================================
