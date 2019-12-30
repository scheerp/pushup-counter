import axios from 'axios';

export function GetData(){
    const BaseUrl = 'https://patrick-scheer.com/php-react-rest-api-crud/api/pushup.php';
    let token;
    let id;
    if(sessionStorage.getItem('userData')){
        token = JSON.parse(sessionStorage.getItem('userData')).token; 
        id = JSON.parse(sessionStorage.getItem('userData')).id; 
    }

    return axios.get(`${BaseUrl}?token=${token}&id=${id}`)
      .then((response) => {
        return response.data;
      }, (error) => {

      });

}