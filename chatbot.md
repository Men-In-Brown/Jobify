---
layout: default
title: Chatbot
nav_order: 4
description: "Student blog"
permalink: /chatbot
---

<!--Mati's feature-->

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #chat-container {
        max-width: 1400px;
        margin: 20px auto;
        border: 1px solid #ccc;
        padding: 20px;
        height: 90vh;
        margin-right: 50px;
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    #messages {
        list-style-type: none;
        padding: 0;
        margin: 0;
        overflow-y: scroll;
        height: 80%;
    }

    .message {
        padding: 1px;
        margin-bottom: 1px;
        border-radius: 8px;
        overflow-wrap: break-word;
    }


    .user1 {
        background-color: #a0c4ff;
        text-align: left;
        padding: 10px;
        max-width: 55%;
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        margin-top: 50px;
    }

    .user2 {
        background-color: #ffc0cb;
        text-align: right;
        max-width: auto;
        margin-top: 50px;
        padding: 10px;
        margin-left: 600px;
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    #message-input {
        width: 100%;
        padding: 8px;
        margin-right: 9px;
        margin-top: 100px;
        max-hight: 20px;
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    h6 {
        margin-left: 400px;
        color: #d3d3d3;
    }
</style>
<div id="chat-container">
    <ul id="messages"></ul>
    <div>
        <input type="text" id="message-input" onkeypress="sendMessage()" placeholder="Type your message...">
       <!-- <button onclick="sendMessage()" id="send-button">Send</button> -->
    </div>
</div>
<h6> you need install ollama model `llama2:13b` to make this work. only works in localhost, for now. `ollama install`, `ollama run llama2:13b`. </h6>

<script>
    var currentUser = 'user1';

    function toggleUser() {
        currentUser = currentUser === 'user1' ? 'user2' : 'user1';
    }

    var generating = false;

    async function sendMessage() {
        var event = window.event;
        if(generating) return;
        if(event.type == 'keypress' && event.keyCode != 13) {
            return;
        }

        var messageInput = document.getElementById('message-input');
        var message = messageInput.value.trim();
        await createBubble(message);
        toggleUser();
        messageInput.value = '';


        var newMessage = document.createElement('li');
        await createBubble(response, newMessage);
        var response = await generateResponse(message, newMessage);
        toggleUser();
    }

    var messagesContainer = document.getElementById('messages');
    async function createBubble(message, newMessage) {
        if (message !== '') {
            if(!newMessage) {
                newMessage = document.createElement('li');
            }

            newMessage.textContent = message;
            newMessage.className = 'message ' + currentUser;
            messagesContainer.appendChild(newMessage);

            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    var memory = [];

    async function generateResponse(prompt, messageBox) {
        generating = true;
        const url = 'http://127.0.0.1:11434/api/generate';

        const system = "act like a cowboy ";
        const data = {
            // change the model to regular `llama2` if you don't have 16gb of ram for `llama2:13b` 
            model: 'llama2:13b',
            context: memory,
            system,
            prompt,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        var response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reader = response.body.getReader();

        while(true) {
            let { done, value } = await reader.read();
            let values = new TextDecoder("utf-8").decode(value).trim().split("\n");

            for(let value of values) {
                if(!value) continue;
                let json = JSON.parse(value);
                if (json['done']) {
                    console.log('Streaming complete');
                    memory = json['context'];
                    break;
                }

                messageBox.innerText += json['response'];
            }

            if (done) {
                break;
            }
        }

        generating = false;
    }
</script>
