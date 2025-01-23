// Get DOM elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typing');

// VSCode webview API
const vscode = acquireVsCodeApi();

// Initialize state
let isTyping = false;

// Auto-resize textarea
messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = messageInput.scrollHeight + 'px';
    updateSendButton();
});

// Update send button state
function updateSendButton() {
    sendButton.disabled = !messageInput.value.trim();
}

// Format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Create message element
function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.role}`;

    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = message.content;
    messageDiv.appendChild(content);

    const timestamp = document.createElement('div');
    timestamp.className = 'message-timestamp';
    timestamp.textContent = formatTimestamp(message.timestamp);
    messageDiv.appendChild(timestamp);

    return messageDiv;
}

// Add message to chat
function addMessage(message) {
    const messageElement = createMessageElement(message);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send message
function sendMessage() {
    const content = messageInput.value.trim();
    if (!content) return;

    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    updateSendButton();

    // Send to extension
    vscode.postMessage({
        type: 'sendMessage',
        message: content
    });
}

// Open settings
function openSettings() {
    vscode.postMessage({
        type: 'openSettings'
    });
}

// Handle keyboard events
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Handle click events
sendButton.addEventListener('click', sendMessage);

// Handle messages from extension
window.addEventListener('message', event => {
    const message = event.data;

    switch (message.type) {
        case 'addMessage':
            addMessage(message.message);
            break;
        case 'showTyping':
            typingIndicator.classList.remove('hidden');
            break;
        case 'hideTyping':
            typingIndicator.classList.add('hidden');
            break;
    }
});

// Initial button state
updateSendButton();