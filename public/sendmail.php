<?php
/**
 * Contact / booking form mailer for Hostinger.
 * Recipient is hardcoded — POST "to" is ignored on purpose.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://drmohamedhessien.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Vary: Origin');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

function clean_header($value) {
    return str_replace(["\r", "\n"], '', trim((string)$value));
}

/** Inbox that receives form submissions */
$TO_EMAIL = 'youssef7200143@gmail.com';

$name    = clean_header($_POST['name'] ?? '');
$email   = trim((string)($_POST['email'] ?? ''));
$phone   = trim((string)($_POST['phone'] ?? ''));
$service = trim((string)($_POST['service'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$lang    = trim((string)($_POST['lang'] ?? 'ar'));
$subject = clean_header($_POST['_subject'] ?? '');

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => $lang === 'en'
            ? 'Please fill all required fields.'
            : 'يرجى تعبئة جميع الحقول المطلوبة.',
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => $lang === 'en' ? 'Invalid email address.' : 'البريد الإلكتروني غير صالح.',
    ]);
    exit;
}

if ($subject === '') {
    $subject = $lang === 'en'
        ? 'New appointment request - ' . $name
        : 'طلب حجز جديد - ' . $name;
}

$body  = "طلب حجز / Appointment Request\n";
$body .= "================================\n";
$body .= "الاسم / Name: {$name}\n";
$body .= "البريد / Email: {$email}\n";
$body .= "الهاتف / Phone: {$phone}\n";
$body .= "الخدمة / Service: {$service}\n";
$body .= "الرسالة / Message:\n{$message}\n";
$body .= "================================\n";
$body .= "Sent from the website contact form\n";

$host = clean_header($_SERVER['HTTP_HOST'] ?? 'drmohamedhessien.com');

$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Website <noreply@' . $host . '>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$ok = @mail($TO_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$ok) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $lang === 'en'
            ? 'Mail server could not send the message.'
            : 'تعذر إرسال الرسالة من السيرفر.',
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => $lang === 'en'
        ? 'Message sent successfully.'
        : 'تم إرسال الرسالة بنجاح.',
]);
