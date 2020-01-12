<?php
require_once("../includes/config.php");
require_once("../includes/classes/User.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$user = new User($con);


if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $goal = $_POST['goal'];
    $token = $_POST['token'];
    $userId = $_POST['id'];

    $user->setGoal($goal, $token, $userId);
}
?>