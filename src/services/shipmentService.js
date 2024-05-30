import makeRequest from "./apiServices";
const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9yaEB3ZXNoaXAuY29tIiwiaWQiOiI2M2ZmYTg0ZS0yMGQ4LTQzNWEtYjM5My01MDg0OGZhMWJhYWEiLCJvcmdJZCI6IjgxODIxZDQ0LTg5ZTctNDQxZS05YWI2LTEyODYzZGM5MjZjNyIsImlhdCI6MTcxNzA4ODQzNywiZXhwIjoxNzE3MTMxNjM3fQ.UADGRNpPcmzh9Iyp7jGeF4n8c7mM3sJjrfwLSN6MSyE';

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