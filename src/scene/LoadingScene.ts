export let street: Phaser.GameObjects.Image;

export class LoadingScene extends Phaser.Scene{

    bgm: Phaser.Sound.BaseSound | null = null;
    //bgm!: Phaser.Sound.BaseSound | null = null;

    constructor() {
        super("loading");
    }

    preload(){
        this.load.image('street','../assets/street.png')
        this.load.image('boss','../assets/boss.png')
        this.load.audio('bossBattleBGM','../assets/Dragon1.mp3')
    }

    create(){
        this.bgm = this.sound.add("bossBattleBGM",{loop: true,volume: 0.3});
        this.bgm.play();

        const {width,height} = this.game.canvas;

        street = this.add.image(width/2,height/2,"street")
        street.setScale(2.0)
        this.add.image(width/2,height/2-200,"boss").setScale(5.0)
        //this.add.image(width/2,height/2,"street").setScale(2.0)
    }

}