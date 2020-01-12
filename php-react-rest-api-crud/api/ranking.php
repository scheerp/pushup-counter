<?php
require_once("../includes/config.php");
require_once("../includes/classes/Pushup.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$pushup = new Pushup($con);

if ($_SERVER['REQUEST_METHOD'] === "GET") {

    $pushup->getAllPushups();
    // if($userId){
    // } else {
    //     $pushup->getAllPushups($token);
    // }
}
?>