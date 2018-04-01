var enemies = {
  
  stats: {},
  
  init : function () {
    for (let i = 0;i < 10;i++) {
      let atk = Math.round(Math.pow(game.zoneNum, Math.pow(1.25, (Math.random() / 10) * 2)));
      let hp = Math.round(Math.pow(game.zoneNum, Math.pow(1.5, (Math.random() / 10) * 2)));
      this.stats["n"+SPELLED_NUM[i+1]] = [atk, hp, i];
    }
  },
}
