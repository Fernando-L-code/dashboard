import makeRequest from "./apiServices";

const loginUser = async (email, password) => {
  const endpoint = '/user/login';
  const method = 'POST';
  const body = { email, password };

  try {
    const response = await makeRequest(endpoint, method, {}, body);
    return response;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export default loginUser;