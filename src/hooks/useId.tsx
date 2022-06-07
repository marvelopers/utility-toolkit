import { useState } from 'react';

let idCounter = 0;

export function generateID(prefix = 'toss-id-') {
  idCounter = idCounter + 1;
  return `${prefix}${idCounter}`;
}

export default function useId(givenId?: string) {
  const [id] = useState(() => {
    return givenId ?? generateID();
  });

  return id;
}
