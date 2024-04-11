export default function TempoDisplay({ tempo }: { tempo: number | string }) {
  return (
    <div>
      Tempo (BPM): <div>{tempo}</div>
    </div>
  );
}
