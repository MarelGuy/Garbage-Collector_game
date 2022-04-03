import GamePlay from "../../src/scenes/GamePlay";
import { genericConfig } from "../../src/Types";
import IEnemy from "./IEnemy";

export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy{
    protected _config: genericConfig;
    protected _scene: GamePlay;
    protected _body: Phaser.Physics.Arcade.Body;

    async create() {}

    async update( ) {}
}