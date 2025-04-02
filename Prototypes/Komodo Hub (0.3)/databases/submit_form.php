
<?php
include 'db_connect.php';  // Include database connection

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Prevent SQL Injection
    $name = $conn->real_escape_string($name);
    $email = $conn->real_escape_string($email);
    $message = $conn->real_escape_string($message);

    // Insert data into the database
    $sql = "INSERT INTO contact_messages (full_name, email, message) VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close(); // Close the database connection
}
?>
