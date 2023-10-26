<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Validate form data (you can add more validation as needed)
    if (empty($name) || empty($email) || empty($message)) {
        // Handle validation errors (e.g., display an error message)
        echo "Please fill out all required fields.";
    } else {
        // Send email (you'll need to configure your email settings)
        $to = "shwetamatebtech@gmail.com"; // Replace with your email address
        $subject = "Feedback Form Submission from $name";
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";

        // Compose the email message
        $email_message = "Name: $name\n";
        $email_message .= "Email: $email\n";
        $email_message .= "Message:\n$message";

        // Send the email
        if (mail($to, $subject, $email_message, $headers)) {
            // Email sent successfully
            echo "Thank you for your message. We will get back to you soon.";
        } else {
            // Email sending failed
            echo "Sorry, there was an error sending your message. Please try again later.";
        }
    }
} else {
    // If the form wasn't submitted via POST, handle accordingly
    echo "Form submission is not allowed via GET method.";
}
?>
