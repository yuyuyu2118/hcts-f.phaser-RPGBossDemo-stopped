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
      mp: 30,         //マジックポイント:魔力
      maxMp: 30,
      sp: 30,         //スキルポイント
      maxSp: 30,
      str: 30,         //ストレングス:力
      maxStr: 30,
      atk: 30,         //アタック:攻撃力
      maxAtk: 30,
      def: 30,         //ディフェンス:防御力
      maxDef: 30,
      spd: 30,         //スピード:素早さ
      maxSpd: 30,
      vit: 30,         //バイタリティ:生命力
      maxVit: 30,
      int: 30,         //インテリジェンス:知力
      maxInt: 30,
      dex: 30,         //デクステリティ:器用さ 命中率
      maxDex: 30,
      avd: 30,         //アヴォイダンス:回避
      maxAvd: 30,
      luk: 30,         //ラック:運
      maxLuk: 30,
      level: 1,       //レベル
      exp: 30,         //経験値
      nextExp: 30,
      buff: "test",        //正の状態異常
      debuff: "test",      //負の状態異常
      weapon: "test",      //装備武器
      armor: "test",       //装備防具
      accessory: "test",   //装備アクセサリー
      uniquSkill1: "test",
      uniquSkill2: "test",
      uniquSkill3: "test",
      passiveSkill1: "test",
      passiveSkill2: "test",
      passiveSkill3: "test",
    
      faith: 30,
      charm: 30,
      introversion: 30,
      extroversion: 30,
      
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
