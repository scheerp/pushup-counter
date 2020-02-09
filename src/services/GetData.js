import axios from 'axios';

export function GetData(id = null) {
  const BaseUrl = 'https://patrick-scheer.com/php-react-rest-api-crud/api/pushup.php';
  let token;
  let userID = id;
  if (sessionStorage.getItem('userData')) {
    token = JSON.parse(sessionStorage.getItem('userData')).token;
    if (!userID) userID = JSON.parse(sessionStorage.getItem('userData')).id;
  }

  return axios.get(`${BaseUrl}?token=${token}&id=${userID}`)
    .then((response) => {
      return response.data;
    }, (error) => {

    });
}

export function GetRanking() {
  const BaseUrl = 'https://patrick-scheer.com/php-react-rest-api-crud/api/ranking.php';
  let token;

  if (sessionStorage.getItem('userData')) {
    token = JSON.parse(sessionStorage.getItem('userData')).token;
  }

  return axios.get(`${BaseUrl}?token=${token}`)
    .then((response) => {
      return response.data;
    }, (error) => {

    });
}
