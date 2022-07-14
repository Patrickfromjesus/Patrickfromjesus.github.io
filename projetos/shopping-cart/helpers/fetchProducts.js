const fetchProducts = async (endPoint) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${endPoint}`;
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
