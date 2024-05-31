import makeRequest from "./apiServices";
 let token2 =localStorage.getItem("token")


const GetStatus = async (courier, tracking, token) => {
  const endpoint = 'shipment/status';
  const method = 'POST';
  const body = { courier, tracking };

  try {
    const response = await makeRequest(endpoint, method, {}, body,token2);
    return response;
  } catch (error) {
    console.error('Error al crear envío:', error);
    throw error;
  }
};

const getShipments = async (queryParams, token) => {
  const endpoint = 'shipment/list';
  const method = 'GET';

  // Combinar los parámetros proporcionados con los valores predeterminados
  const params = {
    where: queryParams.where || {},
    limit: queryParams.limit || 10,
    offset: queryParams.offset || 0,
    sortBy: queryParams.sortBy || 'fulfillmentDate',
    sortDir: queryParams.sortDir || 'ASC'
  };

  try {
    const response = await makeRequest(endpoint, method, params, {},token2);
    return response;
  } catch (error) {
    console.error('Error al obtener envíos:', error);
    throw error;
  }
};


  export { GetStatus, getShipments };