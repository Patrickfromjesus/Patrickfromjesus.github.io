const getSavedCartItems = () => {
  const valuesStorage = localStorage.getItem('cartItems');
  return valuesStorage;
};

if (typeof module !== 'undefined') {
  module.exports = { getSavedCartItems };
}
