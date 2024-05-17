import { Scene } from 'phaser';


class Player extends Phaser.GameObjects.Rectangle {
    isJumping: boolean;
}

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player: Player;
    invert: boolean = false;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xcccccc);

        // add square to the scene
        this.player = new Player(this, 0, this.scale.height - 50, 50, 50, 0x6666ff);
        this.player.setOrigin(0, 0);
        this.add.existing(this.player);
        this.physics.add.existing(this.player);
        this.player.body = this.player.body as Phaser.Physics.Arcade.Body;
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setGravityY(200);

        this.addObstacle();

        
    }

    addObstacle() {
        const height = Phaser.Math.Between(20, this.scale.height / 2);
        const width = 20;

        const obstacle = this.add.rectangle(this.scale.width, this.invert ? 0 : this.scale.height - height, width, height, 0x333333);
        obstacle.setOrigin(0, 0);

        this.physics.add.existing(obstacle);
        obstacle.body = obstacle.body as Phaser.Physics.Arcade.Body;
        obstacle.body.setCollideWorldBounds(false);
        obstacle.body.setGravityY(0);

        this.tweens.add({
            targets: obstacle,
            x: -width,
            duration: 2000,
            onComplete: () => {
                obstacle.destroy();
                this.addObstacle();
            },
        });

        this.physics.add.collider(this.player, obstacle, () => {
            // this.scene.pause();
        });
    }

    update ()
    {
        if(!this.input.keyboard) {
            return;
        }

        this.input.keyboard.on('keydown-SPACE', () => {
            const body = this.player.body as Phaser.Physics.Arcade.Body;
            if(body.onFloor()) {
                body.setGravityY(-500);
                this.invert = true;
            } else if (body.onCeiling()) {
                body.setGravityY(500);
                this.invert = false;
            }
        });
    }
}
