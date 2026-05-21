const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

if (terminalInput) {
  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const command = this.value.trim();
      if (command === '') return;

      // Add command to output
      const outputLine = document.createElement('p');
      outputLine.innerHTML = `<span class="prompt">guest@win12-architect:~$</span> ${command}`;
      terminalOutput.appendChild(outputLine);

      // Process command
      const response = processCommand(command);
      
      const responseLine = document.createElement('p');
      responseLine.textContent = response;
      terminalOutput.appendChild(responseLine);

      // Scroll to bottom
      terminalOutput.scrollTop = terminalOutput.scrollHeight;

      // Clear input
      this.value = '';
    }
  });
}

// Simple command processor
function processCommand(cmd) {
  const command = cmd.toLowerCase();

  switch(command) {
    case 'help':
      return 'Available commands: help, clear, about, time, echo [text], neofetch';
    case 'clear':
      terminalOutput.innerHTML = '';
      return '';
    case 'about':
      return 'Win12 Online - Architect Edition v0.0.3\nAI Partner: Grok (xAI)';
    case 'time':
      return new Date().toLocaleString();
    case 'neofetch':
      return 'OS: Win12 Architect\nKernel: HTML5 + JS\nUptime: Forever\nShell: grok-terminal\nTheme: Glassmorphism';
    default:
      if (command.startsWith('echo ')) {
        return command.slice(5);
      }
      return `Command not found: ${cmd}. Type 'help' for commands.`;
  }
}
