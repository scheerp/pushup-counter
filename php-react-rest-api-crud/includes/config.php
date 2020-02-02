<?php
    require_once("classes/FormSanitizer.php");

    ob_start();
    session_start();

    date_default_timezone_set("Europe/Berlin");

    $db_servername = 'rdbms.strato.de';
    $db_username = ''
    $db_password = '';
    $db_name = '';

    // Create connection
    $con = new mysqli($db_servername, $db_username, $db_password, $db_name);

    // Check connection
    if ($con->connect_error) {
        die("Connection failed: " . $con->connect_error);
    }
?>
