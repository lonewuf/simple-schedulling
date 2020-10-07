import { useState } from 'react';

const useClickedDate = (value) => {
  const [clickedDate, setClickedDate] = useState(new Date().toString());
};
