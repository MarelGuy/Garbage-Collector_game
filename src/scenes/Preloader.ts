import { GameData } from "../GameData";

export default class Preloader extends Phaser.Scene {
  private loading: Phaser.GameObjects.BitmapText;
  private progress: Phaser.GameObjects.Graphics;
  private image: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Preloader",
    });
  }

  async preload() {
    this.cameras.main.setBackgroundColor("#000000");
    this.progress = this.add.graphics();
    this.loadAssets();
  }

  async init() {
    this.loading = this.add
      .bitmapText(this.game.canvas.width / 2, 300, "arcade", "", 30)
      .setAlpha(1)
      .setDepth(1001)
      .setOrigin(0.5, 1);
  }

  async loadAssets() {
    this.load.on("start", () => {});

    this.load.on("fileprogress", () => {});

    this.load.on("progress", async (value: any) => {
      this.progress.clear();
      this.progress.fillStyle(0x33cc33, 1);
      this.progress.fillRect(0, 530, 1280 * value, 70);
      this.loading.setText("Caricamento.");
      this.loading.setText("Caricamento..");
      this.loading.setText("Caricamento...");
    });

    this.load.on("complete", () => {
      this.tweens.add({
        targets: [this.loading],
        alpha: 0,
        duration: 0,
        onComplete: () => {
          this.scene.start("Intro");
          // this.scene.start("GamePlay2");
          // this.scene.start("Hud");
          // this.scene.bringToTop("Hud");
        },
      });
    });

    //Assets Load
    //--------------------------

    //SCRIPT
    if (GameData.script != null)
      GameData.script.forEach((element: ScriptAsset) => {
        this.load.script(element.key, element.path);
      });

    // IMAGES
    if (GameData.images != null)
      GameData.images.forEach((element: ImageAsset) => {
        this.load.image(element.name, element.path);
      });

    // TILEMAPS
    if (GameData.tilemaps != null)
      GameData.tilemaps.forEach((element: TileMapsAsset) => {
        this.load.tilemapTiledJSON(element.key, element.path);
      });

    // ATLAS
    if (GameData.atlas != null)
      GameData.atlas.forEach((element: AtlasAsset) => {
        this.load.atlas(element.key, element.imagepath, element.jsonpath);
      });

    // SPRITESHEETS
    if (GameData.spritesheets != null)
      GameData.spritesheets.forEach((element: SpritesheetsAsset) => {
        this.load.spritesheet(element.name, element.path, {
          frameWidth: element.width,
          frameHeight: element.height,
          endFrame: element.frames,
        });
      });

    //bitmap fonts
    if (GameData.bitmapfont != null)
      GameData.bitmapfont.forEach((element: BitmapfontAsset) => {
        this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
      });

    // SOUNDS
    if (GameData.sounds != null)
      GameData.sounds.forEach((element: SoundAsset) => {
        this.load.audio(element.name, element.paths);
      });

    // Audio
    if (GameData.audio != null)
      GameData.audio.forEach((element: AudioSpriteAsset) => {
        this.load.audioSprite(
          element.name,
          element.jsonpath,
          element.paths,
          element.instance
        );
      });
  }
}
