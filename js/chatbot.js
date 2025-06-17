document.addEventListener('DOMContentLoaded', function() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotContainer = document.getElementById('chatbot-container');
    const minimizeBtn = document.getElementById('minimize-chat');
    const chatInput = document.querySelector('.chatbot-input input');
    const sendButton = document.querySelector('.chatbot-input button');

    // Toggle chatbot visibility when clicking the icon
    chatbotIcon.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });

    // Minimize chatbot when clicking the minimize button
    minimizeBtn.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });

    // Prevent form submission
    function handleSubmit(e) {
        e.preventDefault();
        chatInput.value = '';
    }

    // Handle enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    });

    // Handle send button click
    sendButton.addEventListener('click', handleSubmit);
}); 