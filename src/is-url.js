function isURL(maybeURL) {
  try {
    new URL(maybeURL);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { isURL }
