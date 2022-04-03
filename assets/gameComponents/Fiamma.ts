import GamePlay2 from "../../src/scenes/GamePlay2";
import IFiamma from "./IFiamma";
import Phaser from "phaser";
import { genericConfig } from "../../src/Types";

export default class Fiamma
    extends Phaser.GameObjects.Sprite
    implements IFiamma {
    protected _config: genericConfig;
    protected _scene: GamePlay2;
    protected _body: Phaser.Physics.Arcade.Body;

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <GamePlay2>params.scene;
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setDragX(-1000).setVelocityX(100)
        this.create();
    }

    async create() {
        this.setScale(0.05);
        this.setAlpha(0).setScale(0.5).setDepth(10);
        this._scene.tweens.add({
            targets: this,
            alpha: 1,
            scale: 0.5,
            duration: 1,
        });
        this._scene.addFireball(this);
        this._scene.add.existing(this);
        this._body.allowGravity = false;
        this._body.setVelocityX(-1700);

        this._scene.physics.add.collider(this, this._scene._player, () => {
            this._scene.scene.stop("Hud")
            this._scene.scene.start("GameOver")
        }, undefined, this);
    }

    async update() {
        if (this.x < 0) {
            this._scene.removeFireball(this);
        }
    }
}
