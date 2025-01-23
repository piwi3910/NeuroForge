// @ts-check

(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi();

  const userInput = /** @type {HTMLTextAreaElement} */ (document.getElementById('user-input'));
  const sendButton = /** @type {HTMLButtonElement} */ (document.getElementById('send-button'));
  const messagesContainer = /** @type {HTMLDivElement} */ (document.getElementById('messages'));

  // Early return if required elements are not found
  if (!userInput || !sendButton || !messagesContainer) {
    console.error('Required DOM elements not found');
    return;
  }

  // Initialize message history
  /** @type {Array<{sender: string, text: string}>} */
  const messageHistory = [];

  /**
   * Send message to extension
   */
  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Add user message to UI
    addMessageToUI('user', text);

    // Send message to extension
    vscode.postMessage({
      type: 'userInput',
      value: text,
    });

    // Clear input
    userInput.value = '';
  }

  /**
   * Add message to UI
   * @param {string} sender - The sender of the message (user/assistant/error)
   * @param {string} text - The message text
   */
  function addMessageToUI(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store in history
    messageHistory.push({ sender, text });
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Handle messages from extension
  window.addEventListener('message', event => {
    const message = event.data;
    switch (message.type) {
      case 'response':
        addMessageToUI('assistant', message.value);
        break;
      case 'error':
        addMessageToUI('error', message.value);
        break;
    }
  });

  // Restore focus
  userInput.focus();
})();
