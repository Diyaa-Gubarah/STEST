/**
 *
 * @param {string} key of the the value to be set in localStorage
 * @param {string} value of the the value to be set in localStorage
 * @returns {void}
 */
export const setToLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {string} key of the the value to be get from localStorage
 * @returns {any} value of the the value to be get from localStorage
 */

export const getFromLocalStorage = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 *
 * @param {string} key of the the value to be remove from localStorage
 * @returns {void}
 */
export const removeFromLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {object} object to be checked
 * @returns {boolean} true if object is empty else false
 *
 */
export const containNullOrEmpty = (obj) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === "") {
      return true;
    }
  }
  return false;
};

/**
 *
 * @param {*} token
 * @returns header with token
 */
export const configHeader = () => {
  const user = getFromLocalStorage("user")
  if (user) {
    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  return {};
};
