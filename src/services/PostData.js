import axios from 'axios';
import qs from 'qs';

export function PostData(type, userData){

    // let BaseUrl = 'http://localhost/php-react-rest-api-crud/api/';
    let BaseUrl = 'http://patrick-scheer.com/php-react-rest-api-crud/api/';

    return axios.post(BaseUrl + type + '.php', qs.stringify(userData))
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });

}