<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "queue_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Fetch queue
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $query = "SELECT id, name, phone, timestamp FROM queue ORDER BY id ASC";
    $result = $conn->query($query);
    $queue = [];

    while ($row = $result->fetch_assoc()) {
        $queue[] = $row;
    }

    echo json_encode($queue);
    exit;
}

// Add customer
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data["name"] ?? "";
    $phone = $data["phone"] ?? "";

    if (empty($name) || empty($phone)) {
        echo json_encode(["error" => "Name and Phone are required"]);
        exit;
    }

    $query = "INSERT INTO queue (name, phone) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $name, $phone);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Added to queue successfully"]);
    } else {
        echo json_encode(["error" => "Failed to add"]);
    }
    exit;
}

// Serve customer (remove first in queue)
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $deleteQuery = "DELETE FROM queue ORDER BY id ASC LIMIT 1";
    if ($conn->query($deleteQuery) === TRUE) {
        echo json_encode(["message" => "Served the first customer"]);
    } else {
        echo json_encode(["error" => "Failed to serve customer"]);
    }
    exit;
}

$conn->close();
?>