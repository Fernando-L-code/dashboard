// const BASE_URL = 'http://localhost:3000/'; // Reemplaza con tu URL base
const BASE_URL = process.env.REACT_APP_BASE_URL;

const makeRequest = async (endpoint, method = 'GET', params = {}, body = null, token = null) => {
  // Construir la URL con los parámetros de la URL si existen
  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params && method === 'GET') {
    Object.keys(params).forEach(key => {
      if (typeof params[key] === 'object') {
        url.searchParams.append(key, JSON.stringify(params[key]));
      } else {
        url.searchParams.append(key, params[key]);
      }
    });
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
  };

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
};

export default makeRequest;