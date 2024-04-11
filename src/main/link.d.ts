/* eslint-disable max-classes-per-file */
type EventTypes = 'tempo' | 'numPeers' | 'playState';
type updateCallback = (
  beat: number,
  phase: number,
  bpm: number,
  playState: boolean,
  numPeers: number,
) => any;
declare namespace AbletonLink {
  class AbletonLinkBase {
    constructor(bpm?: number, quantum?: number, enable?: boolean);

    getLinkEnable(): boolean;

    setLinkEnable(enable: boolean): void;

    linkEnable: boolean;

    enable(): void;

    disable(): void;

    getIsPlayStateSync(): boolean;

    setIsPlayStateSync(playstateSync: boolean): void;

    isPlayStateSync: boolean;

    enablePlayStateSync(): void;

    disablePlayStateSync(): void;

    getBeat(): number;

    setBeat(beat: number): void;

    beat: number;

    setBeatForce(beat: number): void;

    getPhase(): number;

    readonly phase: number;

    getBpm(): number;

    setBpm(bpm: number): void;

    bpm: number;

    getIsPlaying(): boolean;

    setIsPlaying(playing: boolean): void;

    isPlaying: boolean;

    readonly isPlayingOnUpdate: boolean;

    play(): void;

    stop(): void;

    getNumPeers(): number;

    readonly numPeers: number;

    setQuantum(quantum: number): void;

    getQuantum(): number;

    quantum: number;

    onTempoChanged(cb: Function): void;

    onNumPeersChanged(cb: Function): void;

    onPlayStateChanged(cb: Function): void;

    off(key: EventTypes): void;

    update(): void;

    startUpdate(interval_ms: number, cb?: updateCallback): void;

    stopUpdate(): void;
  }
}
