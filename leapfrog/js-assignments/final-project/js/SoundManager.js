class SoundManager{
  constructor(){
    this.initMusic();
  }

  initMusic = () => {
    let bgAudio = document.createElement("audio");
    bgAudio.setAttribute("preload", "auto");
    bgAudio.setAttribute("controls", "none");
    bgAudio.style.display = "none";
    bgAudio.volume = 0.1;
    document.body.appendChild(bgAudio);
    bgAudio.src = 'audio/main-battle-theme.mp3';
    this.bgAudio = bgAudio;
    this.bgAudio.load();
  }

  startMusic = () => {
    this.bgAudio.play();
  }
}

