<?php
require_once("../includes/config.php");
require_once("../includes/classes/FormSanitizer.php");
require_once("../includes/classes/Constants.php");
require_once("../includes/classes/Account.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$account = new Account($con);

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if (empty($_POST['username'])) {
        $errors[] = 'username is empty';
    } 
    else {
        $username = FormSanitizer::sanitizeFormUsername($_POST['username']);
        $email = FormSanitizer::sanitizeFormEmail($_POST['email']);
        $password = FormSanitizer::sanitizeFormPassword($_POST['password']);

        $success = $account->register($username, $email, $password);

        if(!$success) {
            var_dump(http_response_code(502));
        }
    }
}
?>