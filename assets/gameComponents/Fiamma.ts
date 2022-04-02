// import GamePlay2 from "../../scenes/GamePlay";
// import IFiamma from "./IFiamma";
// import Boss from "../Enemy/Boss";

// export default class Fiamma
//   extends Phaser.GameObjects.Sprite
//   implements IFiamma
// {
//   protected _config: genericConfig;
//   protected _scene: GamePlay2;
//   protected _body: Phaser.Physics.Arcade.Body;
//   private direction: Boolean;

//   constructor(params: genericConfig, direction: Boolean) {
//     super(params.scene, params.x, params.y, params.key);
//     this.direction = direction;
//     this._config = params;
//     this._scene = <GamePlay2>params.scene;
//     this._config.scene.physics.world.enable(this);
//     this._body = <Phaser.Physics.Arcade.Body>this.body;
//     this._body.setDragX(1000).setVelocityX(-100)
//     this.create();;

//       let _animation = {
//       keys: "bag-shoot",
//       frames: "bag",
//       frameRate: 10,
//       yoyo: false,
//       repeat: -1,
//     };
// }
