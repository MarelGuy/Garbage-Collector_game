export default class Win extends Phaser.Scene {
  private Win: Phaser.GameObjects.BitmapText;
  private otherintro: Phaser.GameObjects.BitmapText;
  private restart: Phaser.GameObjects.BitmapText;
  private bgEnd: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Win",
    });
  }

  async preload() {
    this.bgEnd = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "bgmenu"
    );
  }

  async create() {
    this.Win = this.add
      .bitmapText(1280 / 2, 100, "arcade", "Hai Vinto!", 60)
      .setAlpha(1)
      .setOrigin(0)
      .setDepth(1001)
      .setOrigin(0.5)
      .setTint(0x33cc33);

    this.restart = this.add
      .bitmapText(1280 / 2, 600 / 2, "arcade", "Livello successivo!")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0x33cc33)
      .on("pointerup", async () => {
        this.restart.removeInteractive();
        this.nextLevel();
      })
      .on("pointerover", () => {
        this.restart.setTint(0x009933);
      })
      .on("pointerout", () => {
        this.restart.setTint(0x33cc33);
      });
  }

  async nextLevel() {
    this.scene.stop("Win");
    this.scene.start("GamePlay2");
    this.scene.start("Hud");
    this.scene.bringToTop("Hud");
  }
}
