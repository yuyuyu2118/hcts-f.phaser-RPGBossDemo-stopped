export type PlayerStatusConfig = {
  playerName: string; //名前
  hp: number;         //ヘルスポイント:体力
  maxHp: number;
  mp: number;         //マジックポイント:魔力
  maxMp: number;
  sp: number;         //スキルポイント
  maxSp: number;
  str: number;         //ストレングス:力
  maxStr: number;
  atk: number;         //アタック:攻撃力
  maxAtk: number;
  def: number;         //ディフェンス:防御力
  maxDef: number;
  spd: number;         //スピード:素早さ
  maxSpd: number;
  vit: number;         //バイタリティ:生命力
  maxVit: number;
  int: number;         //インテリジェンス:知力
  maxInt: number;
  dex: number;         //デクステリティ:器用さ 命中率
  maxDex: number;
  avd: number;         //アヴォイダンス:回避
  maxAvd: number;
  luk: number;         //ラック:運
  maxLuk: number;
  level: number;       //レベル
  exp: number;         //経験値
  nextExp: number;
  buff: string;        //正の状態異常
  debuff: string;      //負の状態異常
  weapon: string;      //装備武器
  armor: string;       //装備防具
  accessory: string;   //装備アクセサリー
  uniquSkill1: string;
  uniquSkill2: string;
  uniquSkill3: string;
  passiveSkill1: string;
  passiveSkill2: string;
  passiveSkill3: string;

  faith: number;
  charm: number;
  introversion: number;
  extroversion: number;

  textStyle: Phaser.Types.GameObjects.Text.TextStyle;
};

export class PlayerStatus extends Phaser.GameObjects.Container {
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, config: PlayerStatusConfig) {
    super(scene, x, y);

        // 背景ボックスの作成
        const backgroundBox = scene.add.graphics();
        backgroundBox.fillStyle(0x4b0082, 0.8);
        backgroundBox.fillRect(5, 5, 120, 390);
        this.add(backgroundBox);

    // 名前、レベル、経験値の表示
    this.text = new Phaser.GameObjects.Text(scene, 10, 10, `${config.playerName} (Lv.${config.level})`,config.textStyle);
    this.add(this.text);

    // ステータスの表示
    let yOffset = 40;
    const keysToShow = ['hp', 'mp', 'sp', 'str', 'atk', 'def', 'spd', 'vit', 'int', 'dex', 'avd'];
    for (const [key, value] of Object.entries(config)) {
      if (keysToShow.includes(key)) {
        const label = key.charAt(0).toUpperCase() + key.slice(1); // 最初の文字を大文字に変換
        const statusText = new Phaser.GameObjects.Text(scene, 10, yOffset, `${label}: ${value}`,config.textStyle);
        this.add(statusText);
        yOffset += 30;
      }
    }
  }
}