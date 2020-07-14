const playerColors = {
  'red': '#f84848',
  'blue': '#4070f8',
  'green': '#38c028',
  'yellow': '#c0b800'
};

const mainSpriteSheet = document.createElement('img');
mainSpriteSheet.src='./img/UnitMap.png';

const mainHUDSheet = document.createElement('img');
mainHUDSheet.src='./img/HUD.png';

const captBG = document.createElement('img');
captBG.src = './img/NewBG.png';

const captAnimSheet = document.createElement('img');
captAnimSheet.src = './img/CaptureAnim.png';

const reverseSpriteSheet = document.createElement('img');
reverseSpriteSheet.src = './img/ReverseSprites.png';

const battleBG = document.createElement('img');
battleBG.src = './img/BattleBackgrounds.png';

const logo = document.createElement('img');
logo.src = './img/logo.png';

let playerList = [];
let buildingsList = [];
let capturingUnit;
let attackingUnit;
let defendingUnit;
const hudPos = {
  1: {x: 166, y: 23},
  2: {x: 175, y: 23},
  3: {x: 184, y: 23},
  4: {x: 193, y: 23},
  5: {x: 202, y: 23},
  6: {x: 211, y: 23},
  7: {x: 220, y: 23},
  8: {x: 229, y: 23},
  9: {x: 238, y: 23},
}

let selectedUnit;
let currentPlayer;
let selectedFactory;
let showInfoUnit;
