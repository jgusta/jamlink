import React, { useEffect, useState } from 'react';
import TempoDisplay from './TempoDisplay';
import Button from './Button';
import { Channels } from '../../main/preload';
import TInput from './TempoInput';

const sendMessage = (channel: Channels, msg?: string | number) =>
  window.electron.ipcRenderer.sendMessage(channel, [msg || '']);

function LinkSync({ tempo: initTempo }: { tempo: number }) {
  const [tempo, setTempo] = useState(initTempo);
  const [tempoInput, setTempoInput] = useState(0);
  const inputToParent = (value: number) => setTempoInput(value);
  const handleCommitTempo = () => sendMessage('commit-tempo', tempoInput);

  useEffect(() => {
    // this is when the backend sends the tempo
    const handler = (t: unknown) => {
      console.log(`report-tempo`);
      setTempo(t as number);
    };
    window.electron.ipcRenderer.on('report-tempo', handler);

    window.electron.ipcRenderer.once('initial-tempo', (bpm) => {
      const bpmInt = parseInt(`${bpm}`, 10);
      setTempo(bpmInt);
      setTempoInput(bpmInt);
    });
    sendMessage('initial-tempo');
    return () => {
      window.electron.ipcRenderer.off('report-tempo', handler);
    };
  }, []);

  return (
    <div>
      <h1>Ableton Link Sync</h1>
      <div className="tempo-box">
        <TempoDisplay tempo={tempo} />
        <TInput changeNotify={inputToParent} tempo={tempoInput} />
        <Button onClick={handleCommitTempo}>Set Tempo</Button>
      </div>
    </div>
  );
}

export default LinkSync;
