

  const e = require('express');
  const fs = require('fs');
  const { modelName } = require('moongose/models/user_model');
  const path = require('path');

  function getResultFromCSV(csvPath) {
    const text = fs.readFileSync(csvPath, 'utf8')
      .trim()
      .split('\n');

    const lines = text.slice(1);
    const last = lines[lines.length - 1];
    const cols = last.split(',').map(s => s.trim());
    const scoreBot1 = parseInt(cols[7], 10);
    const scoreBot2 = parseInt(cols[8], 10);
    const winner   = scoreBot1 > scoreBot2 ? 'bot1' : 'bot2';
    return { scoreBot1, scoreBot2, winner };
  }

  const result = getResultFromCSV(path.join(__dirname, 'ProgBattle' ,'game_log.csv'));
  return result  




  //our player is bot 1
  //our player is bot 1 
