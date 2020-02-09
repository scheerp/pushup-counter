<?php
class Pushup
{

    private $con;

    public function __construct($con)
    {
        $this->con = $con;
    }

    public function checkUserToken($token, $userId)
    {
        $sql = "SELECT * FROM users WHERE user_id = '$userId' AND token = '$token'";
        $date = date('Y-m-d H:i:s');
        $query = $this->con->query($sql);

        if ($query->num_rows == 0) {
            return false;
        } else {
            while ($row = $query->fetch_assoc()) {
                // var_dump($row["token"]);
                if ($row["expires"] < $date) {
                    // return false;
                }

                // if($row["expires"] > $date){
                //     return false;
                // }
            }
        }
        return true;
    }

    public function insertPushups($pushupCount, $token, $userId)
    {
        if ($this->checkUserToken($token, $userId)) {
            $date = date('Y-m-d H:i:s');

            $sql = "INSERT INTO pushups (pushup_count, date_time, user_id)
                    VALUES ('$pushupCount', '$date', '$userId')";

            return $this->con->query($sql);
        } else {
            var_dump(http_response_code(511));
        }
    }

    public function getPushupsByUserId($token, $userId)
    {
        // if($this->checkUserToken($token, $userId)){
        $date = date('Y-m-d H:i:s');
        $sql = "SELECT SUM(pushup_count) as pushups_total FROM pushups WHERE user_id = '$userId'";

        $query = $this->con->query($sql);

        if ($query->num_rows == 1) {
            while ($row = $query->fetch_assoc()) {
                $pushups = array(
                    "pushupsDone" => $row["pushups_total"]
                );
            }
        }

        $pushupsPerDaySql = "SELECT SUM(pushups.pushup_count)
                AS pushups, CAST(date_time AS DATE) as date
                FROM pushups
                WHERE user_id = '$userId'
                GROUP BY CAST(date_time AS DATE)";

        $pushupsPerDayQuery = $this->con->query($pushupsPerDaySql);
        $daily = array();
        while ($row = $pushupsPerDayQuery->fetch_assoc()) {
            array_push($daily, $row);
        }
        $pushups['daily'] = $daily;

        $userGoalSql = "SELECT * FROM users WHERE user_id = '$userId'";
        $userGoalQuery = $this->con->query($userGoalSql);
        while ($row = $userGoalQuery->fetch_assoc()) {
            $pushups['goal'] = $row["target"];

            echo (json_encode($pushups));
        }
    }

    public function getAllPushups()
    {
        $date = date('Y-m-d H:i:s');
        $sql = "SELECT users.user_id, users.username, SUM(pushups.pushup_count) as pushups_total, users.target FROM
               users JOIN pushups ON
               users.user_id = pushups.user_id
               GROUP BY user_id
               ORDER BY pushups_total DESC";

        $query = $this->con->query($sql);

        if ($query->num_rows != 0) {
            $ranking = array();
            while ($row = $query->fetch_assoc()) {
                $userId = $row["user_id"];

                $allPushupsPerDaySql = "SELECT SUM(pushups.pushup_count)
                        AS pushups, CAST(date_time AS DATE) as date
                        FROM pushups
                        WHERE user_id = '$userId'
                        GROUP BY CAST(date_time AS DATE)";

                $allPushupsPerDayQuery = $this->con->query($allPushupsPerDaySql);
                $allDaily = array();
                while ($allRow = $allPushupsPerDayQuery->fetch_assoc()) {
                    array_push($allDaily, $allRow);
                }

                $pushups = array(
                    "id" => $row["user_id"],
                    "username" => $row["username"],
                    "pushups" => $row["pushups_total"],
                    "goal" => $row["target"],
                    "daily" => $allDaily
                );
                array_push($ranking, $pushups);
            }
            echo (json_encode($ranking));
        }
    }
}
