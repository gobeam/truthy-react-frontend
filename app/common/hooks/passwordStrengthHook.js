import { useEffect, useState } from 'react';

const usePasswordStrengthCheckHook = (password) => {
  const [lowerCheck, setLowerCheck] = useState(0);
  const [upperCheck, setUpperCheck] = useState(0);
  const [numChecker, setNumChecker] = useState(0);
  const [charCheck, setCharChecker] = useState(0);

  useEffect(() => {
    if (/^(?=.*[a-z]).+$/.test(password)) {
      setLowerCheck(1);
    } else {
      setLowerCheck(0);
    }

    if (/^(?=.*[A-Z]).+$/.test(password)) {
      setUpperCheck(1);
    } else {
      setUpperCheck(0);
    }

    if (/\d/.test(password)) {
      setNumChecker(1);
    } else {
      setNumChecker(0);
    }

    if (/^(?=.*[-+_!@#$%^&*.,?]).+$/.test(password)) {
      setCharChecker(1);
    } else {
      setCharChecker(0);
    }
  }, [password]);

  return [lowerCheck, upperCheck, numChecker, charCheck];
};

export default usePasswordStrengthCheckHook;
