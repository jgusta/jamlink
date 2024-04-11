import React from 'react';

type Props = {
  tempo: number;
  changeNotify: (tempo: number) => void;
};

export default function TInput(props: Props) {
  const { tempo, changeNotify } = props;
  const handleTempoInput = (event: { target: { value: any } }) => {
    console.log('tempo input' + event.target.value);
    changeNotify(event.target.value);
  };

  return (
    <input
      className="tempo-input"
      type="number"
      step="1"
      min="80"
      max="999"
      value={tempo}
      onChange={handleTempoInput}
    />
  );
}
