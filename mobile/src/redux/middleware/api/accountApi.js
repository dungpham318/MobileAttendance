import { URL, userProfile } from '../../../settings/index'

export async function loginApi(input) {
  let url = '/lecture/login'
  console.log(URL + url)
  console.log(input)
  return fetch(URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${userProfile.token}`,
    },
    body: JSON.stringify(input)
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error)
    });
}
