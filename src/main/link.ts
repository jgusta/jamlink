/// <reference path="./link.d.ts" />

import AbletonLink from "abletonlink";
type Propers = "beat" | "phase" | "bpm" | "playState";
class LinkServer {
  beat: number = 0;

  phase: number = 0;

  bpm: number = 0;

  playState: boolean = false;

  quantum: number = 0;

  updateCallback!: (
    beat: number,
    phase: number,
    bpm: number,
    playState: boolean,
  ) => void;

  ableton: AbletonLink = new AbletonLink();

  Constructor() {
    this.updateCallback = (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _beat: number,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _phase: number,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _bpm: number,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _playState: boolean,
    ) => {};
    this.ableton.onTempoChanged((x) => console.log(x));
    this.ableton.enable();
    this.ableton.play();
  }

  onUpdate(cb) {
    // this.ableton.stopUpdate();
    this.updateCallback = cb;
    this.startUpdates();
  }

  startUpdates() {
    this.ableton.startUpdate(1000, (beat, phase, bpm, playState) => {
      let changed = false;
      const vals = [beat, phase, bpm, playState];
      const props: Propers[] = ['beat', 'phase', 'bpm', 'playState'];
      props.map((x: Propers) => {
        if (vals[x as keyof typeof vals] !== this[x]) {
          changed = true;
        }
        return x;
      });
      if (!changed) {
        return;
      }
      this.beat = beat;
      this.phase = phase;
      this.bpm = bpm;
      this.playState = playState;
      this.updateCallback(beat, phase, bpm, playState);
    });
  }

  onTempo(cb: (tempo: number) => void): void {
    this.ableton.onTempoChanged(cb);
  }

  onPeers(cb: (peers: number) => void): void {
    this.ableton.onNumPeersChanged(cb);
  }

  onPlayState(cb: (tempo: number) => void): void {
    this.ableton.onPlayStateChanged(cb);
  }

  setTempo(tempo: number) {
    this.ableton.bpm = tempo;
  }

  getTempo() {
    return this.bpm;
  }
}

const linkServer = new LinkServer();
export default linkServer;
