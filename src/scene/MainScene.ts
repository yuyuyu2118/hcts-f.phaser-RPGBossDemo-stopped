import { DialogBox, DialogBoxConfig } from "../textClass/DialogBox";

export let street: Phaser.GameObjects.Image;

export class MainScene extends Phaser.Scene {
  bgm: Phaser.Sound.BaseSound | null = null;
  //bgm!: Phaser.Sound.BaseSound | null = null;

  constructor() {
    super("main");
  }

  preload() {
    this.load.image("street", "../assets/img/background/street.png");
    this.load.image("dragon", "../assets/img/enemy/dragon.png");
    this.load.image("smallDragonA", "../assets/img/enemy/smallDragonA.png");
    this.load.image("smallDragonB", "../assets/img/enemy/smallDragonB.png");
    this.load.audio("bossBattleBGM", "../assets/bgm/bossBGM_vsDragon.mp3");
  }

  create() {
    this.bgm = this.sound.add("bossBattleBGM", { loop: true, volume: 0.1 });
    this.bgm.play();

    const { width, height } = this.game.canvas;

    street = this.add.image(width / 2, height / 2, "street");
    street.setScale(2.0);

    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily:
        '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: "48px",
    };
    const dialogBoxHeight = 200;
    const dialogBoxMargin = 10;
    const dialogBoxConfig: DialogBoxConfig = {
      x: width / 2,
      y: height - dialogBoxMargin - dialogBoxHeight / 2,
      width: width - dialogBoxMargin * 2,
      height: dialogBoxHeight,
      padding: 10,
      margin: dialogBoxMargin,
      textStyle: textStyle,
    };
    const dialogBox = new DialogBox(this, dialogBoxConfig);
    dialogBox.setText("ドラゴンが現れた ▼");
    this.add.existing(dialogBox);

    this.add.image(width / 2, height / 2 - 200, "dragon").setScale(5.0);
    this.add
      .image(width / 2 - 400, height / 2 - 100, "smallDragonA")
      .setScale(4.0);
    this.add
      .image(width / 2 + 500, height / 2 - 100, "smallDragonB")
      .setScale(4.0);
    //this.add.image(width/2,height/2,"street").setScale(2.0)
  }
}
