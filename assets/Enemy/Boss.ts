import GamePlay2 from "../../scenes/GamePlay2";
import IBoss from "./IBoss";

export default class Boss extends Phaser.GameObjects.Sprite implements IBoss {
  protected _config: genericConfig;
  protected _scene: GamePlay2;
  protected _body: Phaser.Physics.Arcade.Body;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay2>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this._body;
    this._scene.add.existing(this);

    let _animation = {
      key: "idle-boss",
      frames: this.anims.generateFrameNumbers("boss-idle", { frames: [0, 1] }),
      frameRate: 2,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation);
    this.setDepth(11);
  }

  async create() {
    this._scene.tweens.add({ targets: this, alpha: 1, duration: 200 });
    this._scene.addBoss(this);
    this._body.allowGravity = false;
  }
  async update() {
    this.anims.play("idle-boss", true);
  }
}
