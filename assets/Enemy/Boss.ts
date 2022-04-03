import GamePlay2 from "../../src/scenes/GamePlay2";
import { genericConfig } from "../../src/Types";
import Fiamma from "../gameComponents/Fiamma";
import IBoss from "./IBoss";

export default class Boss extends Phaser.GameObjects.Sprite implements IBoss {
  protected _config: genericConfig;
  protected _scene: GamePlay2;
  protected _body: Phaser.Physics.Arcade.Body;
  private fireballCounter: number = 0;

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

  fireballController = async () => {
    const duration = Phaser.Math.Between(7000, 9000); // 19 x 11 = 210
    const rand_y = Phaser.Math.Between(this.y - 69, this.y + 69);

    const fireball = new Fiamma({ scene: this._scene, x: this.x, y: rand_y, key: "fireball" });

    this.scene.tweens.add({
      targets: fireball,
      x: -1376,
      ease: "Linear",
      duration,
    });

    this.fireballCounter += 1;

    setTimeout(() => {
      this.fireballCounter -= 1;
    }, Phaser.Math.Between(350, 1350));
  };

  async create() {
    this._scene.tweens.add({ targets: this, alpha: 1, duration: 200 });
    this._scene.addBoss(this);
    this._body.allowGravity = false;
  }

  async update() {
    this.anims.play("idle-boss", true);

    if (this.fireballCounter < 1) {
      this.fireballController();
    }
  }
}
