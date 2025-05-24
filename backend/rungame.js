
//written with the help of AI 
export default function rungame(){

const path       = require('path');
const fs         = require('fs');
const { spawn }  = require('child_process');
const progRoot     = path.join(__dirname, 'ProgBattle');
const engineScript = path.join(progRoot, 'engine.py');
const userBot      = path.join(progRoot, 'uploads', 'ourcompetition.py');
const systemBot    = path.join(progRoot, 'bot1.py');


console.log('progRoot:',     progRoot);
console.log('engineScript:', engineScript, fs.existsSync(engineScript));
console.log('userBot:',      userBot,    fs.existsSync(userBot));
console.log('systemBot:',    systemBot,  fs.existsSync(systemBot));

if (!fs.existsSync(engineScript) || !fs.existsSync(userBot) || !fs.existsSync(systemBot)) {
  console.error('One or more paths don’t exist.');
  process.exit(1);
}

// 3) Spawn the Python process
const engine = spawn('python', [
  engineScript,
  '--p1', userBot,
  '--p2', systemBot
], {
  cwd: progRoot,
  stdio: ['ignore', 'pipe', 'pipe']
});

engine.stdout.on('data', d => console.log(`[engine stdout] ${d}`));
engine.stderr.on('data', d => console.error(`[engine stderr] ${d}`));
engine.on('exit', code => console.log(`Engine exited with code ${code}`));
}