import GamePlay from "../../scenes/GamePlay";
import ISacchetto from "./ISacchetto";

export default class Sacchetto
  extends Phaser.GameObjects.Sprite
  implements ISacchetto
{
  protected _config: genericConfig;
  protected _scene: GamePlay;
  protected _body: Phaser.Physics.Arcade.Body;
  private direction: Boolean;

  constructor(params: genericConfig, direction: Boolean) {
    super(params.scene, params.x, params.y, params.key);
    this.direction = direction;
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._body.setDragX(1000).setVelocityX(100);

    this.create();
  }

  async create() {
    let _animation = {
      keys: "bag-shoot",
      frames: "bag",
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.setScale(0.05);
    //this._body.setCircle(7, 10, 10);
    this.anims.create(_animation);
    //this.anims.play("bag-shoot");
    this.setAlpha(0).setScale(0.5).setDepth(10);
    this._scene.tweens.add({
      targets: this,
      alpha: 1,
      scale: 0.5,
      duration: 1,
    });
    this._scene.addBag(this);
    this._scene.add.existing(this);
    this._body.allowGravity = false;
    if (this.direction == true) {
      this._body.setVelocityX(-1700);
    } else if (this.direction == false) {
      this._body.setVelocityX(1700);
    }
  }

  async update() {
    if (this.x < 0) {
      this._scene.removeBag(this);
    }
  }

  async removeItem() {}
}
