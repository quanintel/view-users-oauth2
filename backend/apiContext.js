const axios = require('axios');

const URL = 'https://b24-r0lgvz.bitrix24.vn';
const OAUTH2_URL = 'https://bx-oauth2.aasc.com.vn';
const CLIENT_ID = 'local.66d0af10396f02.96967679';

const GetToken = async () => {
  console.log('-----------------------------------------------------');
  console.log('Start GetToken');
  try {
    const response = await axios.get(
      `${OAUTH2_URL}/bx/oauth2_token/${CLIENT_ID}`
    );
    if (!response.data) {
      console.log('GetToken', 'Error');
      return null;
    }
    console.log('GetToken', response.data);
    return response.data;
  } catch (error) {
    console.log('GetToken', 'Error', error.response.body);
    return null;
  }
};

const GetEmployee = async (token) => {
  console.log('-----------------------------------------------------');
  console.log('Start GetEmployee');
  try {
    const response = await axios.get(`${URL}/rest/user.get.json?auth=${token}`);
    if (!response.data) {
      console.log('GetEmployee', 'Error');
      return null;
    }
    console.log('GetEmployee', response.data);
    return response.data;
  } catch (error) {
    console.log('GetEmployee', 'Error', error.response.body);
    return null;
  }
};

module.exports = (app) => {
  app.get('/users', async (req, res) => {
    const token = await GetToken();
    if (!token) {
      res.json({ message: 'Có lỗi khi lấy token !' });
      return;
    }

    const employee = await GetEmployee(token.token);
    if (!token) {
      res.json({ message: 'Có lỗi khi lấy employee !' });
      return;
    }

    res.json(employee.result);
  });
};
