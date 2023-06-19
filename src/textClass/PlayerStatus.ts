export type PlayerStatus = {
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
}