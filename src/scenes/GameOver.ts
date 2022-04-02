export default class GameOver extends Phaser.Scene {
  private GameOver: Phaser.GameObjects.BitmapText;
  private otherintro: Phaser.GameObjects.BitmapText;
  private restart: Phaser.GameObjects.BitmapText;
  private bgEnd: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "GameOver",
    });
  }

  async preload() {
    this.bgEnd = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "bgover"
    );
  }

  async create() {
    this.restart = this.add
      .bitmapText(1280 / 2, 500, "arcade", "Rigioca")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0x33cc33)
      .on("pointerup", async () => {
        this.restart.removeInteractive();
        this.restartGame();
      })
      .on("pointerover", () => {
        this.restart.setTint(0x009933);
      })
      .on("pointerout", () => {
        this.restart.setTint(0x33cc33);
      });
  }

  async restartGame() {
    this.scene.stop("GameOver");
    this.scene.start("GamePlay");
    this.scene.bringToTop("GamePlay");
    this.scene.start("Hud");
    this.scene.bringToTop("Hud");
  }
}
