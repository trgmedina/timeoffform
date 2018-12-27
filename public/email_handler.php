<?php

  //grab JSON and extract for php
  $url = "https://hogsaltapi.com/hog_stores"
  $data = file_get_contents($url); 
  $characters = json_decode($data); 

  if(isset($_POST['submit'])) {

    function died($error) {
      echo "Please fully complete the form.";
      die();
    }
   
    // validation expected data exists
    if(!isset($_POST['store']) ||
      !isset($_POST['firstname']) ||
      !isset($_POST['lastname']) ||
      !isset($_POST['email']) ||
      !isset($_POST['dates']) ||
      !isset($_POST['comments'])) {
        died('Form is incomplete.');       
    }
   
    //Grab posted data from form
    $store = $_POST['store']
    $first_name = $_POST['firstname']; 
    $last_name = $_POST['lastname']; 
    $email_from = $_POST['email']; 
    $dates_requested = $_POST['dates']; 
    $comments = $_POST['comments']; 
   
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
   
    //Validation checks
    if(!preg_match($email_exp,$email_from)) {
      $error_message .= 'Invalid email.<br />';
    }
   
      $string_exp = "/^[A-Za-z .'-]+$/";
   
    if(!preg_match($string_exp,$first_name)) {
      $error_message .= 'First name is missing.<br />';
    }
   
    if(!preg_match($string_exp,$last_name)) {
      $error_message .= 'Last name is missing.<br />';
    }
   
    if(strlen($comments) < 2) {
      $error_message .= 'Comments are required.<br />';
    }
   
    if(strlen($error_message) > 0) {
      died($error_message);
    }
   
    //Loop through JSON and match manager email to submitted store
    foreach ($characters as $character) {
      if($character->id == $store) {
        $email_to = $character->manager_email;
      }
    }

    //Email format
    $email_subject = "Time Off Request";

    $email_message = "The following employee has requested date(s) off. Please see below for details.\n\n";
       
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
   
    $email_message .= "First Name: ".clean_string($first_name)."\n";
    $email_message .= "Last Name: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Dates: ".clean_string($dates)."\n";
    $email_message .= "Comments: ".clean_string($comments)."\n";
   
    //Create email headers
    $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email_from."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers); 
  }

?>
