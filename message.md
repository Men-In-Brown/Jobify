---
layout: page
icon: fa-book
title: Messages
---

<html>
<head>
    <style>
      #content {
        margin-left: 10%;
        padding: 10px;
    }
        #messages {
          position: center;
          height: 81vh;
          overflow-y: auto;
          border-radius: 10px;
          border: 3px solid #ccc;
          padding: 10px;
          margin-bottom: 10px;
          width: 95%;
          font-family: Arial, sans-serif;
        }
        #settings {
          position: absolute;
          top: 25px;
          right: 25px;
          cursor: pointer;
          font-family: Arial, sans-serif;
        }      
        #messageInput {
          position: center;
          height: 30px;
          width: 88%;
          border-radius: 10px;
          border: 3px solid #ccc;
          padding: 5px;
          font-family: Arial, sans-serif;
        }      
        #sendButton {
          left: 1px;
          height: 41px;
          width: 6.5%;
          border-radius: 10px;
          border: 3px solid #ccc;
          background-color: #f0f0f0;
          font-family: Arial, sans-serif;
          cursor: pointer;
        }      
        #channelSelect {
          border-radius: 10px;
          border: 3px solid #ccc;
          padding: 5px;
          font-family: Arial, sans-serif;
          width: 15%;
        }      
        /* Dark mode styles */
        body.dark-mode {
          background-color: #333;
          color: #fff;
        }      
        body.dark-mode #messageInput,
        body.dark-mode #sendButton,
        body.dark-mode #channelSelect {
          background-color: #444;
          border-color: #888;
          color: #fff;
        }
        body.dark-mode #sendButton {
          background-color: #888;
        }
      </style>
      </head>
      <body>
      <div id="content">
        <div id="settings">Settings ⚙️</div>
        <select id="channelSelect">
            <!-- Populate with your channels -->
        </select>
        <div id="messages">
            <!-- Messages will be displayed here -->
        </div>
        <input type="text" id="messageInput" placeholder="Type your message here...">
        <button id="sendButton">Send</button>
    </div>
    <script>
        function getCurrentTime() {
            const date = new Date();
            return date.getHours() + ":" + date.getMinutes();
        }
        fetch('http://localhost:8069/channel')
            .then(response => response.json())
            .then(data => {
                const channelSelect = document.getElementById('channelSelect');
                data.forEach(channel => {
                    const option = document.createElement('option');
                    option.value = channel.id;
                    option.textContent = channel.name;
                    channelSelect.appendChild(option);
                });
            })
.catch(error => {
    console.error('Error fetching channels:', error);
});
        function fetchMessages() {
            const channelId = document.getElementById('channelSelect').value;
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';
            fetch(`http://localhost:8069/message?channel=${name}`)
            .then(response => response.json())
            .then(messages => {
                const messagesDiv = document.getElementById('messages');
                messagesDiv.innerHTML = '';
                messages.reverse().forEach(message => {
                    const messageElement = document.createElement('p');
                    messageElement.textContent = `${message.time} - ${message.writer}: ${message.text}`;
                    messagesDiv.appendChild(messageElement);
                });
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
        }
        // Fetch messages every 3.5 seconds
        setInterval(fetchMessages, 3500);
        document.getElementById('sendButton').addEventListener('click', function() {
            const messageInput = document.getElementById('messageInput');
            const text = messageInput.value;
            const channelName = document.getElementById('channelSelect').value;
            const time = getCurrentTime();
            const writer = localStorage.getItem('writer');
            if (text) {
                fetch('http://localhost:8069/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        channelName: channelName,
                        text: text,
                        writer: writer,
                        time: time
                    })
                })
                .then(response => {
                    if (response.ok) {
                        // Clear the message input field
                        messageInput.value = '';
                        // Fetch messages after sending a message
                        fetchMessages();
                    } else {
                        console.error('Error sending message:', response.status);
                    }
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });
            }
        });
        // Add keybind for the enter key to press the send button
        document.getElementById('messageInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('sendButton').click();
            }
        });
document.getElementById('settings').addEventListener('click', function() {
    var bgColor = prompt("Enter a background color:");
    var msgColor = prompt("Enter a message color:");
    var darkMode = confirm("Enable dark mode?");
    if (bgColor) {
        document.body.style.backgroundColor = bgColor;
        localStorage.setItem('bgColor', bgColor);
    } 
    if (msgColor) {
        document.getElementById('messages').style.color = msgColor;
        localStorage.setItem('msgColor', msgColor);
    }
    if (darkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', true);
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.removeItem('darkMode');
    }
});    
    window.onload = function() {
        var savedBgColor = localStorage.getItem('bgColor');
        var savedMsgColor = localStorage.getItem('msgColor');
        var isDarkMode = localStorage.getItem('darkMode');
        if (savedBgColor) {
            document.body.style.backgroundColor = savedBgColor;
        }
        if (savedMsgColor) {
            document.getElementById('messages').style.color = savedMsgColor;
        }
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
};
    </script>
</body>
</html>
