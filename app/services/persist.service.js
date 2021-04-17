export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return true;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return false;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    return true;
  } catch (e) {
    return false;
  }
};
