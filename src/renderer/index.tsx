import { createRoot } from 'react-dom/client';
import App from './App';

// window.electron.ipcRenderer.on('link-data', (beat, phase, bpm, playState) =>
//   console.log(beat, phase, bpm, playState ? 'true' : 'false'),
// );

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
