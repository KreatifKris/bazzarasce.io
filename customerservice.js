// Masukkan API Key OpenAI kamu di sini
const API_KEY = 'sk-...LxAA';

document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    // Tampilkan pesan pengguna di chatbox
    addMessage(userInput, 'user');

    // Kirim pertanyaan ke ChatGPT API dan dapatkan respons
    getBotResponse(userInput);

    // Mengosongkan input setelah dikirim
    document.getElementById('userInput').value = '';
});

function addMessage(message, type) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', type);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll ke bawah saat pesan ditambahkan
}

async function getBotResponse(input) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    };

    const body = {
        model: "gpt-3.5-turbo", // Gunakan model yang sesuai
        messages: [{ role: "user", content: input }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        // Tampilkan respons dari ChatGPT di chatbox
        addMessage(botMessage, 'bot');
    } catch (error) {
        console.error('Error:', error);
        addMessage('Maaf, ada masalah dengan server kami. Coba lagi nanti.', 'bot');
    }
}

