class SoundManager{
  constructor(){
    this.initMusic();
    this.initSelectSound();
    this.initWrongSelectSound();
    this.initAttackSound();
    this.initDamageSound();
  }

  initMusic = () => {
    let bgAudio = document.createElement("audio");
    bgAudio.setAttribute("preload", "auto");
    bgAudio.setAttribute("controls", "none");
    bgAudio.style.display = "none";
    bgAudio.volume = 0.05;
    bgAudio.loop = true;
    document.body.appendChild(bgAudio);
    bgAudio.src = 'audio/main-battle-theme.mp3';
    this.bgAudio = bgAudio;
    this.bgAudio.load();
  }

  initSelectSound(){
    let selectAudio = document.createElement("audio");
    selectAudio.setAttribute("preload", "auto");
    selectAudio.setAttribute("controls", "none");
    selectAudio.style.display = "none";
    selectAudio.volume = 0.2;
    document.body.appendChild(selectAudio);
    selectAudio.src = 'audio/select.wav';
    this.selectAudio = selectAudio;
    this.selectAudio.load();
  }

  initWrongSelectSound(){
    let wrongAudio = document.createElement("audio");
    wrongAudio.setAttribute("preload", "auto");
    wrongAudio.setAttribute("controls", "none");
    wrongAudio.style.display = "none";
    wrongAudio.volume = 0.05;
    document.body.appendChild(wrongAudio);
    wrongAudio.src = 'audio/wrong.wav';
    this.wrongAudio = wrongAudio;
    this.wrongAudio.load();
  }

  initAttackSound(){
    let attackAudio = document.createElement("audio");
    attackAudio.setAttribute("preload", "auto");
    attackAudio.setAttribute("controls", "none");
    attackAudio.style.display = "none";
    attackAudio.volume = 0.1;
    document.body.appendChild(attackAudio);
    attackAudio.src = 'audio/attack.wav';
    this.attackAudio = attackAudio;
    this.attackAudio.load();
  }

  initDamageSound(){
    let damageAudio = document.createElement("audio");
    damageAudio.setAttribute("preload", "auto");
    damageAudio.setAttribute("controls", "none");
    damageAudio.style.display = "none";
    damageAudio.volume = 0.1;
    document.body.appendChild(damageAudio);
    damageAudio.src = 'audio/damage.wav';
    this.damageAudio = damageAudio;
    this.damageAudio.load();
  }

  startMusic = () => {
    this.bgAudio.play();
  }

  playSelect = () => {
    this.selectAudio.play();
  }

  playWrongSelect = () => {
    this.wrongAudio.play();
  }

  playAttack = () => {
    this.attackAudio.play();
  }

  playDamage = () => {
    this.damageAudio.play();
  }

  setVolume(volume){
    this.bgAudio.volume = volume/2 < 0 ? 0: volume/2;
    this.attackAudio.volume = volume;
    this.damageAudio.volume = volume;
    this.selectAudio.volume = volume * 2 > 1? 1: volume * 2;
    this.wrongAudio.volume = volume/2 < 0 ? 0 : volume /2 ;
  }

}

