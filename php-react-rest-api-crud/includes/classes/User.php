<?php
class User {

    private $con;
    
    public function __construct($con) {
        $this->con = $con;    
    }

    public function checkUserToken($token, $userId) {
        $sql = "SELECT * FROM users WHERE user_id = '$userId' AND token = '$token'";
        $date = date('Y-m-d H:i:s');
        $query = $this->con->query($sql);
        
        if($query->num_rows == 0){
            return false;
        } else {
            while($row = $query->fetch_assoc()) {
                if($row["expires"] < $date){
                    return false;
                }
            }
        }
        return true;
    }
    
    public function setGoal($goal, $token, $userId) {
        if($this->checkUserToken($token, $userId)){
            
            $addTokenSql = "UPDATE users SET target = '$goal' WHERE user_id = '$userId'";
            $this->con->query($addTokenSql);
        } else {
            var_dump(http_response_code(511));
        }
    }
}
?>