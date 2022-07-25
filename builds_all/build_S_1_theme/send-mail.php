<?php
// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$mobile = $_POST['phone'];
$email = $_POST['email'];

// Формирование самого письма
$to = 'Получатель';
$title = "TITLE";
$body = "
    <h2>T-security popup message</h2>
    <b>Ім'я:</b> $name<br>
    <b>Телефон:</b> $mobile<br>
    <b>Email:</b> $email
";
$headers = 'From: header' . "\r\n" .
    'Reply-To: reply' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    try {
        // Проверяем отравленность сообщения
        if (mail($to, $title, $body, $headers)) {
            $result = "success";
        } else {
            $result = "error";
        }
    } catch (Exception $e) {
        $result = "error";
        $status = "Error: {$e}";
    }
} else {
    $result = "email";
}

// Отображение результата
echo json_encode(["result" => $result, "status" => $status]);