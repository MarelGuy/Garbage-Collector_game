import Player from "../../assets/gameComponents/Player";
import Boss from "../../assets/Enemy/Boss";
import Sacchetto from "../../assets/gameComponents/Sacchetto";

export default class GamePlay2 extends Phaser.Scene {
  private _level: number = 2;
  private _bossMap: Phaser.GameObjects.Image;
  private _player: Player;
  // private _boss: any;
  private _boss: Boss;
  private _bossGroup: Phaser.GameObjects.Group;
  private _bagGroup: Phaser.GameObjects.Group;
  private base: any;
  private vitaBoss: number = 10;
  private _platform: any;

  constructor() {
    super({ key: "GamePlay2" });
  }

  async preload() {
    this._bossMap = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "stage2"
    );
  }
  async create() {
    this._level = 2;
    this._bagGroup = this.add.group({ runChildUpdate: true });
    this._bossGroup = this.add.group({ runChildUpdate: true });

    this._player = new Player({
      scene: this,
      x: this.game.canvas.width / 2,
      y: 500,
      key: "player",
    });

    this._player = this.physics.add.existing(this._player);

    this.physics.add.collider(
      this._bagGroup,
      this._bossGroup,
      this.hitEnemy,
      undefined,
      this
    );

    this.base = this.physics.add.staticGroup();
    this._platform = this.physics.add.staticGroup();

    this.base.create(800, 852, "base").setScale(0);
    this._platform
      .create(this.game.canvas.width + 34, 470, "platform")
      .setScale(0);
    this._platform
      .create(this.game.canvas.width + 35, 470, "platform")
      .setScale(0);
    this._platform
      .create(this.game.canvas.width + 36, 470, "platform")
      .setScale(0);
    this._platform
      .create(this.game.canvas.width + 37, 470, "platform")
      .setScale(0);
    this._platform
      .create(this.game.canvas.width + 38, 470, "platform")
      .setScale(0);
    this._platform
      .create(this.game.canvas.width + 39, 470, "platform")
      .setScale(0);
    this._platform
      .create(this.game.canvas.width + 40, 470, "platform")
      .setScale(0);
    this._platform
      .create(this.game.canvas.width + 41, 470, "platform")
      .setScale(0);
    this._platform
      .create(this.game.canvas.width + 42, 470, "platform")
      .setScale(0);
    this._platform
      .create(this.game.canvas.width + 43, 470, "platform")
      .setScale(0);

    this.physics.add.collider(this.base, this._player);

    // this._boss.create(1180, 470, "boss-idle");

    this._boss = new Boss({
      scene: this,
      x: 1180,
      y: 300,
      key: "boss-idle",
    });

    this._boss = this.physics.add.existing(this._boss);
    //this._boss = this.physics.add.staticGroup();
    this.physics.add.collider(
      this._player,
      this._boss,
      this.gameOver,
      undefined,
      this
    );
    this.physics.add.collider(this.base, this._boss);

    this.physics.add.collider(
      this._bagGroup,
      this._boss,
      this.hitEnemy,
      undefined,
      this
    );

    this.physics.add.collider(this._platform, this._boss);
    this.physics.add.collider(this._platform, this._boss);
    this.physics.add.collider(this._platform, this._boss);
    this.physics.add.collider(this._platform, this._boss);
    this.physics.add.collider(this._platform, this._boss);
    this.physics.add.collider(this._platform, this._boss);
    this.physics.add.collider(this._platform, this._boss);
    this.physics.add.collider(this._platform, this._boss);
    this.physics.add.collider(this._platform, this._boss);
    this.physics.add.collider(this._platform, this._boss);
  }

  async addBag(bag: Sacchetto) {
    this._bagGroup.add(bag);
  }

  async removeBag(bag: Sacchetto) {
    this._bagGroup.remove(bag, true, true);
  }

  async addBoss(enemy: Boss) {
    this._bossGroup.add(enemy);
  }

  async removeEnemy(enemy: Boss) {
    this._boss.setAlpha(0).setScale(0).setDepth(-1);
    this.scene.stop("GamePlay2");
    this.scene.stop("Hud");
    this.scene.start("GameWin");
  }

  async hitEnemy(bag: any, enemy: any) {
    if (this.vitaBoss == 0) {
      this.removeEnemy(enemy);
    }
    this.vitaBoss--;
    this.removeBag(bag);
    this.events.emit("update-score", [1]);
  }

  async shoot() {
    this.events.emit("decrease-score", [1]);
  }

  async gameOver() {
    this.scene.start("GameOver");
    this.scene.stop("GamePlay2");
    this.scene.stop("Hud");
  }

  async update() {
    function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    this._player.update();
    this._boss.update();
  }
}
