const getFromLocalStorage = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch (e) {
    return key;
  }
};

export default getFromLocalStorage;
