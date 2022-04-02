export default class GameWin extends Phaser.Scene {
  private GameWin: Phaser.GameObjects.BitmapText;
  private otherintro: Phaser.GameObjects.BitmapText;
  private restart: Phaser.GameObjects.BitmapText;
  private bgEnd: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "GameWin",
    });
  }

  async preload() {
    this.bgEnd = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "winbg"
    );

    this.scene.stop("GamePlay2");
    this.scene.stop("Hud");
  }

  async create() {}
}
