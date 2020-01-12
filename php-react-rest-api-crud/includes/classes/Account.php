<?php
class Account {

    private $con;
    private $errorArray = array();

    public function __construct($con) {
        $this->con = $con;    
    }

    public function register($username, $email, $password){
        $this->validateUsername($username);
        $this->validateEmail($email);
        $this->validatePassword($password);
        
        if(empty($this->errorArray)){
            return $this->insertUserDetails($username, $email, $password);
        } else {
            // echo($this->errorArray[0]);
            var_dump(http_response_code(502));
        } 

        return false;
    }

    public function login($usernameOrEmail, $password) {        
        $password = hash("sha512", $password);

        $sql = "SELECT * FROM users WHERE username = '$usernameOrEmail' AND password = '$password'
                                        OR email = '$usernameOrEmail' AND password = '$password'";
        
        $query = $this->con->query($sql);

        if($query->num_rows == 1){
            while($row = $query->fetch_assoc()) {
                $user = array(
                    "id" => $row["user_id"],
                    "username" => $row["username"],
                    "pushups" => $row["pushUps"],
                    "goal" => $row["target"],
                    "token" => base64_encode(random_bytes(32))
                );
                echo(json_encode($user));

                $userToken = $user["token"];
                $userTokenExpires = date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s') . ' + 7 days'));
                $userId = $user["id"];

                $addTokenSql = "UPDATE users SET token = '$userToken', expires = '$userTokenExpires' WHERE user_id = $userId";
                $this->con->query($addTokenSql);
            }
        } else {
            // array_push($this->errorArray, Constants::$loginFailed);
            var_dump(http_response_code(502));
            echo($this->errorArray[0]);
            return false;
        }

    }

    private function insertUserDetails($username, $email, $password) {

        $password = hash("sha512", $password);
        
        $sql = "INSERT INTO users (username, email, password)
                VALUES ('$username', '$email', '$password')";

        return $this->con->query($sql);
    }

    private function validateUsername($username) {
        if(strlen($username) < 2 || strlen($username) > 25){
            // array_push($this->errorArray, Constants::$userNameCharacters);
            var_dump(http_response_code(502));
            return;
        }

        $sql = "SELECT * FROM users WHERE username = '$username'";
        
        $query = $this->con->query($sql);

        if($query->num_rows != 0){
            // array_push($this->errorArray, Constants::$userNameTaken);
            var_dump(http_response_code(502));
        }
    }

    private function validateEmail($email) {
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            // array_push($this->errorArray, Constants::$emailInvalid);
            var_dump(http_response_code(502));
            return;
        }

        $sql = "SELECT * FROM users WHERE email = '$email'";
        
        $query = $this->con->query($sql);

        if($query->num_rows != 0){
            // array_push($this->errorArray, Constants::$emailTaken);
            var_dump(http_response_code(502));
        }
    }

    private function validatePassword($password) {
        if(strlen($password) < 5){
            // array_push($this->errorArray, Constants::$passwordCharacters);
            var_dump(http_response_code(502));
        }
    }
}
?>