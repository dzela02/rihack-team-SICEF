export const STORAGE_KEYS = {
  AUTH: 'auth',
  PARTICIPANT: 'participant',
  SETTINGS_POPPED: 'customer-profile-settings-popped',
};

const storageService = {
  ram: {},
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(e);
      this.ram[key] = JSON.stringify(value);
    }
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(e);
      this.ram[key] = undefined;
    }
  },
  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.warn(e);
      return JSON.parse(this.ram[key]);
    }
  },
};

export default storageService;
