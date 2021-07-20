import * as Keychain from 'react-native-keychain';

const setKeyChain = async (username, password) => {
  try {
    await Keychain.setGenericPassword(username, password)
  } catch (error) {
    console.warn('Keychain couldn\'t be accessed!', error);
  }
}

const getKeyChain = async () => {
  try {
    const credentials = await Keychain.getGenericPassword()
    return {
      username: credentials.username,
      password: credentials.password
    }
  } catch (error) {
    return {
      username: '',
      password: ''
    }
    console.warn('Keychain couldn\'t be accessed!', error);
  }
}

const resetKeyChain = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.warn('Keychain couldn\'t be accessed!', error);
  }
}

export { setKeyChain, getKeyChain, resetKeyChain }