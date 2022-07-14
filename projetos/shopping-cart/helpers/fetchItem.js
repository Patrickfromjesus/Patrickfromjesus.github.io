const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  try {
    const response = await fetch(url);
    const responsejson = await response.json();
    return responsejson;
  } catch (error) {
    return error;
  }
};
fetchItem('MLB1615760527');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
