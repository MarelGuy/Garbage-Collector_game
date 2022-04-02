export default class Intro extends Phaser.Scene {
  private play: Phaser.GameObjects.BitmapText;
  private bgmenu: Phaser.GameObjects.Image;
  private logomenu: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Intro",
    });
  }

  async preload() {
    this.bgmenu = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "bgmenu"
    );
    this.logomenu = this.add
      .image(this.game.canvas.width / 2 + 100, 225, "logomenu")
      .setScale(1.25);
  }

  async create() {
    this.play = this.add
      .bitmapText(640, 500, "arcade", "GIOCA")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0x33cc33)

      .on("pointerup", () => {
        this.play.removeInteractive();
        this.startGame();
      })
      .on("pointerover", () => {
        this.play.setTint(0x009933);
      })
      .on("pointerout", () => {
        this.play.setTint(0x33cc33);
      });
  }

  async startGame() {
    this.scene.stop("Intro");
    this.scene.start("GamePlay");
    this.scene.start("Hud");
    this.scene.bringToTop("Hud");
    if (this.sys.game.device.input.touch) {
    }
  }

  async update() {}
}
