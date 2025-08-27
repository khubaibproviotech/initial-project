<?php
// CORS and headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Sanitize input
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8') : '';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone']), ENT_QUOTES, 'UTF-8') : '';
$message_field = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8') : '';
$service = isset($_POST['service']) ? htmlspecialchars(trim($_POST['service']), ENT_QUOTES, 'UTF-8') : '';
$budget = isset($_POST['budget']) ? htmlspecialchars(trim($_POST['budget']), ENT_QUOTES, 'UTF-8') : '';

// File attachment logic
$file_attached = isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK;

$separator = md5(time());
$eol = "\r\n";

// Headers
$to = "atifproviotech@gmail.com,info@amazonpublishingconsultant.com";
$subject = "Contact Form Submission with Attachment";
$from = "noreply@amazonpublishingconsultant.com";

$headers = "From: $from" . $eol;
$headers .= "MIME-Version: 1.0" . $eol;
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol;

// Body
$body = "--" . $separator . $eol;
$body .= "Content-Type: text/html; charset=\"UTF-8\"" . $eol;
$body .= "Content-Transfer-Encoding: 7bit" . $eol . $eol;
$body .= '
<html><body>
<h3>New Inquiry Received</h3>
<p><strong>Name:</strong> ' . $name . '</p>
<p><strong>Email:</strong> ' . $email . '</p>
<p><strong>Phone:</strong> ' . $phone . '</p>
<p><strong>Service:</strong> ' . $service . '</p>
<p><strong>Budget:</strong> ' . $budget . '</p>
<p><strong>Message:</strong><br>' . nl2br($message_field) . '</p>
</body></html>' . $eol;

// Attachment (if any)
if ($file_attached) {
  $file_tmp_path = $_FILES['attachment']['tmp_name'];
  $file_name = $_FILES['attachment']['name'];
  $file_size = $_FILES['attachment']['size'];
  $file_type = $_FILES['attachment']['type'];

  $handle = fopen($file_tmp_path, "rb");
  $content = fread($handle, $file_size);
  fclose($handle);
  $encoded_content = chunk_split(base64_encode($content));

  $body .= "--" . $separator . $eol;
  $body .= "Content-Type: " . $file_type . "; name=\"" . $file_name . "\"" . $eol;
  $body .= "Content-Transfer-Encoding: base64" . $eol;
  $body .= "Content-Disposition: attachment; filename=\"" . $file_name . "\"" . $eol . $eol;
  $body .= $encoded_content . $eol;
  $body .= "--" . $separator . "--";
}

// Send mail
$response = array();
if (mail($to, $subject, $body, $headers)) {
  $response['response'] = true;
  $response['message'] = 'Email sent successfully with attachment.';
  $response['redirect'] = '/thank-you/';
} else {
  $response['response'] = false;
  $response['message'] = 'Failed to send email. Try again.';
}

echo json_encode($response);
exit;
