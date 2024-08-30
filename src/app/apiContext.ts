const URL = 'https://b24-r0lgvz.bitrix24.vn';
const CLIENT_ID = 'local.66d0af10396f02.96967679';
const REDIRECT_URI = 'https%3A%2F%2Fbx-oauth2.aasc.com.vn%2Fbx%2Foauth2_man';

export const AUTHORIZE_URL = `${URL}/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
export const TOKEN_URL = `https://bx-oauth2.aasc.com.vn/bx/oauth2_token/${CLIENT_ID}`;

const GetToken = async () => {
  return await fetch(TOKEN_URL, {
    method: 'GET',
    redirect: 'follow'
  })
    .then((response) => response.json());
};

const GetEmployee = async (token: string) => {
  return await fetch(`${URL}/rest/user.get.json?auth=${token}`, {
    method: 'GET',
    redirect: 'follow'
  })
    .then((response) => response.json());
};


const ApiContext = {
  GetToken,
  GetEmployee
};

export default ApiContext;