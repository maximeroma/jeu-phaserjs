var game = new Phaser.Game(600, 600);

var vitesse = 500;

var dodger = {
    preload: function () {
        
        //chargement image
        
        game.load.image('fond', 'assets/fond.png');
        game.load.image('player', 'assets/player.png');
        game.load.image('mechant', 'assets/mechant.png');
    },
    create: function () {
        
        // setup + affichage
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'fond');
        
        this.player = game.add.sprite(300, 500, 'player');
        this.player.anchor.set(0.5);
        this.player.anchor.set(0.5);
        
        game.physics.arcade.enable(this.player);
        
        this.cursors= game.input.keyboard.createCursorKeys();
        
        this.mechants = game.add.group();
        
        this.timer = game.time.events.loop(200, this.ajouterUnMechant, this);
        
        this.score = 0;
        
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#BADA55"})
    },
    update: function () {
        
        // logique du jeu
        
        game.physics.arcade.overlap(this.player, this.mechants, this.restartGame, null, this);
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -1 * vitesse ;
        }
        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = vitesse;
        }
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -1 * vitesse;
        }
        if (this.cursors.down.isDown) {
            this.player.body.velocity.y = vitesse;
        }
        
        if (this.player.inWorld === false){
            this.restartGame();
        }
    },
    
    restartGame: function () {
        game.state.start('dodger');
    },
    
    ajouterUnMechant: function () {
        var position = Math.floor(Math.random() * 550) + 1;
        var mechant = game.add.sprite(position, -50, 'mechant');
        game.physics.arcade.enable(mechant);
        mechant.body.gravity.y = 200;
    
        this.mechants.add(mechant);
        
        this.score += 2;
        this.labelScore.text = this.score;
        
        mechant.checkWorldBounds = true;
        mechant.outOfBoundsKill = true;
    }
};

game.state.add('dodger', dodger);
game.state.start('dodger');