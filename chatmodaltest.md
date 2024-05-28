<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}
/* Button used to open the chat form - fixed at the bottom of the page */
.open-button {
  background-color: #555;
  color: white;
  padding: 20px; /* Increase padding to make the button a square */
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 60px; /* Set width and height to make the button a circle */
  height: 60px; /* Set width and height to make the button a circle */
  border-radius: 50%; /* Make the button round */
  text-align: center; /* Center the text horizontally */
  line-height: 0px; /* Center the text vertically */
}
/* The popup chat - hidden by default */
.chat-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}
/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}
/* Full-width textarea */
.form-container textarea {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  resize: none;
  min-height: 200px;
}
/* When the textarea gets focus, do something */
.form-container textarea:focus {
  background-color: #ddd;
  outline: none;
}
/* Set a style for the submit/send button */
.form-container .btn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}
/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}
/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
.modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgba(0,0,0,0.4); /* Black with opacity */
        padding-top: 60px;
      }
      .modal-content {
        background-color: #fefefe;
        margin: 5% auto; /* 5% from the top, centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
      }
      /* Close button */
      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      .close:hover,
      .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }
      /* Other styles for your message input */
      #messageInputModal {
        margin-top: 20px;
        height: 50px;
        width: 90%;
        border-radius: 10px;
        border: 3px solid #ccc;
        padding: 5px;
        font-family: Arial, sans-serif;
        font-size: 16px;
      }
      #sendButtonModal {
        margin-top: 10px;
        height: 50px;
        width: 90%;
        border-radius: 10px;
        border: none;
        background-color: #04AA6D;
        color: white;
        font-family: Arial, sans-serif;
        font-size: 16px;
        cursor: pointer;
      }
</style>
</head>
<body>
<h2>Popup Chat Window</h2>
<p>Click on the button at the bottom of this page to open the chat form.</p>
<p>Note that the button and the form is fixed - they will always be positioned to the bottom of the browser window.</p>
<button class="open-button" onclick="openForm()">Chat</button>
<div class="chat-popup" id="myForm">
  <form action="/action_page.php" class="form-container">
    <h1>Chat</h1>
    <label for="msg"><b>Message</b></label>
    <textarea placeholder="Type message.." name="msg" required></textarea>
    <button type="submit" class="btn">Send</button>
    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
  </form>
</div>
<script>
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
</script>

</body>
</html>