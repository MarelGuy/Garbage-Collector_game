export const GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1280,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: true,
  },

  preloader: {
    bgColor: "",
    image: "logo",
    imageX: 640,
    imageY: 300,
    loadingText: "",
  },

  spritesheets: [
    {
      name: "idle",
      path: "assets/images/player.png",
      width: 32,
      height: 36,
      frames: 1,
    },

    {
      name: "left-jump",
      path: "assets/images/left-jump.png",
      width: 20,
      height: 33,
      frames: 1,
    },

    {
      name: "left-run",
      path: "assets/images/left-run.png",
      width: 28,
      height: 36,
      frames: 4,
    },

    {
      name: "right-jump",
      path: "assets/images/right-jump.png",
      width: 20,
      height: 33,
      frames: 1,
    },

    {
      name: "right-run",
      path: "assets/images/right-run.png",
      width: 28,
      height: 36,
      frames: 4,
    },

    {
      name: "boss-idle",
      path: "assets/images/boss.png",
      width: 180.59,
      height: 177,
      frame: 2,
    },
  ],

  images: [
    { name: "logo", path: "assets/images/logo.png" },
    { name: "bgmenu", path: "assets/images/bgmenu.jpg" },
    { name: "logomenu", path: "assets/images/logomenu.png" },
    { name: "city", path: "assets/images/city.png" },
    { name: "rubbish", path: "assets/images/rubbish.png" },
    { name: "bag", path: "assets/images/bag.png" },
    { name: "player", path: "assets/images/player.png" },
    { name: "base", path: "assets/images/platform0.png" },
    { name: "platform", path: "assets/images/platform1.png" },
    { name: "stage2", path: "assets/images/stage2.png" },
    { name: "bgover", path: "assets/images/bgover.png" },
    { name: "winbg", path: "assets/images/win.png" },
  ],

  atlas: [],

  script: [
    {
      key: "webfont",
      path: "assets/js/webfonts.js",
    },
  ],

  bitmapfont: [
    {
      name: "arcade",
      imgpath: "assets/fonts/arcade.png",
      xmlpath: "assets/fonts/arcade.xml",
    },
  ],
};
