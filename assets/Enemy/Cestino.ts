import GamePlay from "../../scenes/GamePlay";
import Enemy from "./Enemy";
import IEnemy from "./IEnemy";

export default class Cestino extends Enemy implements IEnemy {
    
  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this._body;
    this._scene.add.existing(this);

    this._body.setImmovable(true);
  }

    async create() {
    this._scene.tweens.add({ targets: this, alpha: 1, duration: 200});
    this._scene.addEnemy(this);
    this._scene.add.existing(this);
  }

  async update(time: number, delta: number) {}
}
