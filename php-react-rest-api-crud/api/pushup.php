<?php
require_once("../includes/config.php");
require_once("../includes/classes/Pushup.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$pushup = new Pushup($con);

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $pushupCount = $_POST['pushupCount'];
    $token = $_POST['token'];
    $userId = $_POST['id'];
    
    $pushup->insertPushups($pushupCount, $token, $userId);
}

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $pushupCount = $_GET['pushupCount'];
    $token = $_GET['token'];
    $userId = $_GET['id'];

    $pushup->getPushupsByUserId($token, $userId);
    // if($userId){
    // } else {
    //     $pushup->getAllPushups($token);
    // }
}
?>