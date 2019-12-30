import axios from 'axios';
import qs from 'qs';

export function PostUserData(type, userData){
    let BaseUrl = 'https://patrick-scheer.com/php-react-rest-api-crud/api/';

    return axios.post(BaseUrl + type + '.php', qs.stringify(userData))
      .then((response) => {
        return response;
      }, (error) => {
        console.error(error);
      });
}

export function PostPushupData(pushupCount){
  const BaseUrl = 'https://patrick-scheer.com/php-react-rest-api-crud/api/pushup.php';
  const token = JSON.parse(sessionStorage.getItem('userData')).token; 
  const id = JSON.parse(sessionStorage.getItem('userData')).id;

  return axios.post(BaseUrl, qs.stringify({pushupCount, token, id}))
    .then((response) => {
      //   console.log(response);
      return response;
    }, (error) => {
      // console.error(error);
    });
}


export function PostGoal(goal){
  const BaseUrl = 'https://patrick-scheer.com/php-react-rest-api-crud/api/user.php';
  const token = JSON.parse(sessionStorage.getItem('userData')).token; 
  const id = JSON.parse(sessionStorage.getItem('userData')).id;

  return axios.post(BaseUrl, qs.stringify({goal, token, id}))
    .then((response) => {
      //   console.log(response);
      return response;
    }, (error) => {
      // console.error(error);
    });
}