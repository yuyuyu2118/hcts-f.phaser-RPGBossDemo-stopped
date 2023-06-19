import { DialogBox, DialogBoxConfig } from "../textClass/DialogBox";
import { TimelinePlayer } from "../timeline/TimelinePlayer";
import { Timeline } from "../battle/Timeline";
import { timelineData } from "../battleData/timeline";
import { PlayerStatus, PlayerStatusConfig } from "../textClass/PlayerStatus";

export let street: Phaser.GameObjects.Image;

export class MainScene extends Phaser.Scene {
  private timeline?: Timeline;
  
  bgm: Phaser.Sound.BaseSound | null = null;
  //bgm!: Phaser.Sound.BaseSound | null = null;

  constructor() {
    super("main");
  }

  init(data: any) {
    // this.scene.restart()の第1引数もしくは
    // this.scene.start()の第2引数に指定されたオブジェクトがdataに渡される
    const timelineID = data.timelineID || 'start';

    if (!(timelineID in timelineData)) {
      console.error(`[ERROR] タイムラインID[${timelineID}]は登録されていません`);
      // 登録されていないタイムラインIDが指定されていたらタイトルシーンに遷移する
      this.scene.start('title');
      return;
    }

    this.timeline = timelineData[timelineID];
  }

  preload() {
    this.load.image("street", "../assets/img/background/street.png");
    this.load.image("dragon", "../assets/img/enemy/dragon.png");
    this.load.image("smallDragonA", "../assets/img/enemy/smallDragonA.png");
    this.load.image("smallDragonB", "../assets/img/enemy/smallDragonB.png");
    this.load.audio("bossBattleBGM", "../assets/bgm/bossBGM_vsDragon.mp3");
  }

  create() {

    const playerStatusTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#ffffff',
      //fontWeight: 'bold',
      stroke: '#000000',
      strokeThickness: 2,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: '#000000',
        blur: 5,
        stroke: true,
        fill: true
      }
    };
    

    const playerStatusConfig: PlayerStatusConfig = {
      playerName: "yuyuyu", //名前
      hp: 30,         //ヘルスポイント:体力
      maxHp: 30,
      sp: 30,         //スキルポイント
      maxSp: 30,
      atk: 30,         //アタック:攻撃力
      maxAtk: 30,
      weapon: "test",      //装備武器
      armor: "test",       //装備防具
      accessory: "test",   //装備アクセサリー
      textStyle: playerStatusTextStyle,
    };

    const playerStatus = new PlayerStatus(this,10,10,playerStatusConfig);
    console.log(playerStatus);
    this.add.existing(playerStatus).setScale(2.0).setDepth(1);

    if (!this.timeline) {
      return;
    }

    this.bgm = this.sound.add("bossBattleBGM", { loop: true, volume: 0.1 });
    this.bgm.play();

    const { width, height } = this.game.canvas;

    street = this.add.image(width / 2, height / 2, "street");
    street.setScale(2.0);

    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily:
        '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: "36px",
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
    // タイムラインプレイヤーの作成
    const timelinePlayer = new TimelinePlayer(this, dialogBox, textStyle);

    // タイムラインの再生開始
    timelinePlayer.start(this.timeline);

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
