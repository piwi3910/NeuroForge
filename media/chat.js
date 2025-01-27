// @ts-check

(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi();

  // Override console.log to send logs to the extension
  const originalLog = console.log;
  console.log = function (...args) {
    originalLog.apply(console, args);
    vscode.postMessage({
      type: 'log',
      value: args.join(' '),
    });
  };

  // Override console.error to send errors to the extension
  const originalError = console.error;
  console.error = function (...args) {
    originalError.apply(console, args);
    vscode.postMessage({
      type: 'error',
      value: args.join(' '),
    });
  };

  console.log('NeuroForge Chat: Script loaded.');

  const userInput = /** @type {HTMLTextAreaElement} */ (document.getElementById('user-input'));
  const sendButton = /** @type {HTMLButtonElement} */ (document.getElementById('send-button'));
  const messagesContainer = /** @type {HTMLDivElement} */ (document.getElementById('messages'));

  // Early return if required elements are not found
  if (!userInput || !sendButton || !messagesContainer) {
    console.error('NeuroForge Chat: Required DOM elements not found');
    return;
  }

  console.log('NeuroForge Chat: DOM elements found.');

  // Initialize message history
  /** @type {Array<{sender: string, text: string}>} */
  const messageHistory = [];

  /** @type {HTMLDivElement | null} */
  let currentStreamingMessage = null;

  /**
   * Send message to extension
   */
  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    console.log(`NeuroForge Chat: Sending message - ${text}`);

    // Add user message to UI
    addMessageToUI('user', text);

    // Send message to extension
    vscode.postMessage({
      type: 'userInput',
      value: text,
    });

    // Clear input and disable until response is complete
    userInput.value = '';
    userInput.disabled = true;
    sendButton.disabled = true;
  }

  /**
   * Add message to UI
   * @param {string} sender - The sender of the message (user/assistant/error)
   * @param {string} text - The message text
   * @param {boolean} [isStreaming=false] - Whether this is a streaming message
   */
  function addMessageToUI(sender, text, isStreaming = false) {
    console.log(`NeuroForge Chat: Adding message to UI - Sender: ${sender}, Text: ${text}`);

    if (isStreaming) {
      if (!currentStreamingMessage) {
        // Create new streaming message container
        currentStreamingMessage = document.createElement('div');
        currentStreamingMessage.className = `message ${sender}-message`;
        messagesContainer.appendChild(currentStreamingMessage);
      }
      // Append new text to streaming message
      currentStreamingMessage.innerHTML += text.replace(/\n/g, '<br>');
    } else {
      // Regular non-streaming message
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${sender}-message`;
      messageDiv.innerHTML = text.replace(/\n/g, '<br>');
      messagesContainer.appendChild(messageDiv);
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store in history
    if (!isStreaming) {
      messageHistory.push({ sender, text });
    }
  }

  /**
   * Handle streaming message completion
   */
  function completeStreamingMessage() {
    if (currentStreamingMessage) {
      // Store the complete message in history
      messageHistory.push({
        sender: 'assistant',
        text: currentStreamingMessage.innerHTML.replace(/<br>/g, '\n'),
      });
      currentStreamingMessage = null;
    }

    // Re-enable input
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
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
    console.log(
      `NeuroForge Chat: Received message - Type: ${message.type}, Value: ${message.value}`
    );
    switch (message.type) {
      case 'response':
      case 'assistant':
        addMessageToUI('assistant', message.value);
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
        break;
      case 'stream':
        addMessageToUI('assistant', message.value, true);
        break;
      case 'streamEnd':
        completeStreamingMessage();
        break;
      case 'error':
        addMessageToUI('error', message.value);
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
        break;
      default:
        console.warn(`NeuroForge Chat: Unknown message type - ${message.type}`);
    }
  });

  // Restore focus
  userInput.focus();
  console.log('NeuroForge Chat: Focus restored to user input.');
})();
