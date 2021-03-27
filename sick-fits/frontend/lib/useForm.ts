import React, { useState } from 'react';

interface HTMLInputTarget {
  value?: unknown;
  name: string;
  type: string;
  files?: FileList | null;
}
type HandleChange = (
  event: React.SyntheticEvent & {
    target: HTMLInputTarget;
  }
) => void;

interface UseForm<State> {
  inputs: State;
  handleChange: HandleChange;
  clearForm: () => void;
  resetForm: () => void;
}

export default function useForm<State = Record<string, unknown>>(
  initalState: State
): UseForm<State> {
  const [inputs, setInputs] = useState(initalState);

  function handleChange<InputElement>(
    event: React.SyntheticEvent<InputElement> & {
      target: HTMLInputTarget;
    }
  ) {
    const { name, type, files } = event.target;
    let { value } = event.target;

    if (type === 'file' && files) {
      value = files[0]; // eslint-disable-line prefer-destructuring
    }

    setInputs((existingInputs) => ({
      ...existingInputs,
      [name]: value,
    }));
  }

  const resetForm = () => {
    setInputs(initalState);
  };

  const clearForm = () => {
    const resetTuples = Object.entries(inputs).map(([key, _]) => [key, '']);
    const blankState: State = Object.fromEntries(resetTuples);

    setInputs(blankState);
  };

  return {
    inputs,
    handleChange,
    clearForm,
    resetForm,
  };
}
