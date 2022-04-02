import GamePlay from "./GamePlay";
import GamePlay2 from "./GamePlay2";

export default class Hud extends Phaser.Scene {
  private scoreText: Phaser.GameObjects.BitmapText;
  private score: number;
  private gamePlay: GamePlay;
  private rubbish: Phaser.GameObjects.Image;
  private proiettiliText: Phaser.GameObjects.BitmapText;
  private sacchetto: Phaser.GameObjects.Image;
  private proiettili: number;
  private gamePlay2: GamePlay2;
  private level: number = 1;

  constructor() {
    super({
      key: "Hud",
    });
  }

  async preload() {
    this.rubbish = this.add
      .image(this.game.canvas.width - 125, 17, "rubbish")
      .setScale(0.8)
      .setOrigin(0);

    this.sacchetto = this.add
      .image(this.game.canvas.width - 235, 21, "bag")
      .setScale(1.2)
      .setOrigin(0);
  }

  async create() {
    this.gamePlay = <GamePlay>this.scene.get("GamePlay");
    this.gamePlay2 = <GamePlay2>this.scene.get("GamePlay2");
    this.gamePlay.events.off("update-score", this.updateScore, this);
    this.gamePlay.events.on("update-score", this.updateScore, this);
    this.gamePlay.events.off("decrease-score", this.decreaseScore, this);
    this.gamePlay.events.on("decrease-score", this.decreaseScore, this);
    this.gamePlay2.events.off("update-score", this.updateScore, this);
    this.gamePlay2.events.on("update-score", this.updateScore, this);
    this.gamePlay2.events.off("decrease-score", this.decreaseScore, this);
    this.gamePlay2.events.on("decrease-score", this.decreaseScore, this);
    this.score = 0;
    this.proiettili = 15;
    this.registry.set("score", this.score);
    this.registry.set("proiettili", this.proiettili);

    this.scoreText = this.add
      .bitmapText(this.game.canvas.width - 75, 20, "arcade", "0")
      .setFontSize(30)
      .setTint(0x000000)
      .setOrigin(0);

    this.proiettiliText = this.add
      .bitmapText(this.game.canvas.width - 195, 20, "arcade", "15")
      .setFontSize(30)
      .setTint(0x000000)
      .setOrigin(0);
  }

  async update() {
    function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    if (this.score == 10) {
      if (this.level == 1) {
        delay(1000).then(() => {
          this.win();
        });
      } else {
        delay(1000).then(() => {
          this.gameWin();
        });
      }
    }

    if (this.proiettili == 0) {
      delay(1000).then(() => {
        if (this.level == 1) {
          this.gameOver();
        } else {
          this.gameOver();
        }
      });
    }
  }

  private async updateScore(parameters: Array<any>) {
    this.score += parameters[0];
    this.scoreText.setText(this.score + "");
    this.registry.set("score", this.score);
  }

  private async gameOver() {
    this.scene.stop("Hud");
    this.scene.stop("GamePlay");
    this.scene.start("GameOver");
  }

  private async gameWin() {
    this.scene.stop("Hud");
    this.scene.stop("GamePlay2");
    this.scene.start("GameWin");
  }

  private async win() {
    this.scene.stop("Hud");
    this.scene.stop("GamePlay");
    this.scene.start("Win");
  }

  private async decreaseScore(parameters: Array<any>) {
    this.proiettili -= parameters[0];
    this.proiettiliText.setText(this.proiettili + "");
    this.registry.set("proiettili", this.proiettili);
  }
}
