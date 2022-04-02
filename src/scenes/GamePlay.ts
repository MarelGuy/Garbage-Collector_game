import Player from "../../assets/gameComponents/Player";
import Cestino from "../../assets/Enemy/Cestino";
import Sacchetto from "../../assets/gameComponents/Sacchetto";
export default class GamePlay extends Phaser.Scene {
  private _level: number = 1;
  private _city: Phaser.GameObjects.Image;
  private _player: Player;
  private _enemyGroup: Phaser.GameObjects.Group;
  private _bagGroup: Phaser.GameObjects.Group;
  private base: any;
  private _platform: any;
  private _contatore: any;
  private _enemy: any;

  constructor() {
    super({ key: "GamePlay" });
  }

  async preload() {
    this._city = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "city"
    );
  }

  async create() {
    this._level = 1;
    this._bagGroup = this.add.group({ runChildUpdate: true });
    this._enemyGroup = this.add.group({ runChildUpdate: true });
    this._player = new Player({
      scene: this,
      x: 30,
      y: 310,
      key: "player",
    });
    this._player = this.physics.add.existing(this._player);
    this.physics.add.collider(
      this._bagGroup,
      this._enemyGroup,
      this.hitEnemy,
      undefined,
      this
    );
    this.base = this.physics.add.staticGroup();
    this._platform = this.physics.add.staticGroup();
    this._enemy = this.physics.add.staticGroup();

    this.base.create(800, 882, "base").setScale(0);

    this._platform.create(42, 402, "platform").setScale(0);
    this._platform.create(105, 368, "platform").setScale(0);
    this._platform.create(200, 540, "platform").setScale(0);
    this._platform.create(289, 400, "platform").setScale(0);
    this._platform.create(339, 445, "platform").setScale(0);
    this._platform.create(533, 408, "platform").setScale(0);
    this._platform.create(585, 374, "platform").setScale(0);
    this._platform.create(670, 374, "platform").setScale(0);
    this._platform.create(983, 436, "platform").setScale(0);
    this._platform.create(1045, 400, "platform").setScale(0);
    this._platform.create(1110, 400, "platform").setScale(0);
    this._platform.create(1200, 470, "platform").setScale(0);

    this.physics.add.collider(this.base, this._player);
    this.physics.add.collider(this._platform, this._player);
    this.physics.add.collider(this._platform, this._player);
    this.physics.add.collider(this._platform, this._player);
    this.physics.add.collider(this._platform, this._player);
    this.physics.add.collider(this._platform, this._player);
    this.physics.add.collider(this._platform, this._player);
    this.physics.add.collider(this._platform, this._player);
    this.physics.add.collider(this._platform, this._player);

    this._enemy.create(105, 340, "rubbish");
    this._enemy.create(200, 515, "rubbish");
    this._enemy.create(1110, 380, "rubbish");
    this._enemy.create(339, 420, "rubbish");
    this._enemy.create(533, 383, "rubbish");
    this._enemy.create(585, 349, "rubbish");
    this._enemy.create(670, 349, "rubbish");
    this._enemy.create(1045, 375, "rubbish");
    this._enemy.create(983, 411, "rubbish");
    this._enemy.create(1200, 450, "rubbish");

    this.physics.add.collider(
      this._bagGroup,
      this._enemy,
      this.hitEnemy,
      undefined,
      this
    );

    this.physics.add.collider(
      this._player,
      this._enemy,
      this.gameOver,
      undefined,
      this
    );
  }

  async addBag(bag: Sacchetto) {
    this._bagGroup.add(bag);
  }

  async removeBag(bag: Sacchetto) {
    this._bagGroup.remove(bag, true, true);
  }

  async addEnemy(enemy: Cestino) {
    this._enemyGroup.add(enemy);
  }

  async removeEnemy(enemy: Cestino) {
    this._contatore++;
    this._enemy.remove(enemy, true, true);
  }

  async hitEnemy(bag: any, enemy: any) {
    this.removeEnemy(enemy);
    this.removeBag(bag);
    this.events.emit("update-score", [1]);
  }

  async nextLevel() {
    this.scene.stop("GamePlay");
    this.scene.start("Hud");
    this.scene.start("Win");
  }

  async shoot() {
    this.events.emit("decrease-score", [1]);
  }

  async gameOver() {
    this.scene.start("GameOver");
    this.scene.stop("GamePlay");
    this.scene.stop("Hud");
  }

  async update() {
    this._player.update();
    // if (this._contatore == 10) {
    //   this.nextLevel();
    // }
  }
}
