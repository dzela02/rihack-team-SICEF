import storageService, { STORAGE_KEYS } from './storageService';

const credentialsService = {
  get authBody() {
    return storageService.getItem(STORAGE_KEYS.AUTH);
  },

  get user() {
    return storageService.getItem(STORAGE_KEYS.AUTH)?.user;
  },

  get token() {
    return storageService.getItem(STORAGE_KEYS.AUTH)?.token;
  },

  saveAuthBody(authBody) {
    storageService.setItem(STORAGE_KEYS.AUTH, authBody);
  },

  removeAuthBody() {
    storageService.removeItem(STORAGE_KEYS.AUTH);
  },
};

export default credentialsService;
