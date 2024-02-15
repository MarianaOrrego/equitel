const USER_STORAGE_KEY = "user";

export const getUserFromLocalStorage = () => {
  const userString = localStorage.getItem(USER_STORAGE_KEY);
  return userString ? JSON.parse(userString) : null;
};

export const setUserInLocalStorage = (user: any) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};
