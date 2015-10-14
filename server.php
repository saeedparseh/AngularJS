<?php
if ($_SERVER["REQUEST_METHOD"] === "POST")
{
  if (isset($_POST["name"]) && isset($POST["msg"]))
  {
    // Standard form submission
    $result = "RECEIVED PERSON DATA:" .
      "<br />firstName = " . $POST["name"] .
      "<br />lastName = " . $POST["msg"];
  }
  else if (isset($_GET["person"]))
  {
    // AJAX form submission
    $person = json_decode($_GET["person"]);

    $result = json_encode(array(
      "receivedFirstName" => $person->name,
      "receivedLastName" => $person->msg));
  }
  else
  {
    $result = "INVALID REQUEST DATA";
  }

  echo $result;
}
?>