<?php
$servername = "localhost";  // Default for local server
$username = "root";         // Default username
$password = "";             // Default (leave empty in XAMPP)
$dbname = "komodo_hub";     // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
