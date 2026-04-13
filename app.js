// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = themeToggle.querySelector('.sun');
const moonIcon = themeToggle.querySelector('.moon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

themeToggle.onclick = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
};

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);


// Performance Optimized Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Stop observing once revealed so it doesn't re-animate every time unless desired
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => revealObserver.observe(el));
});

// Chatbot Logic
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-chat');
const chatInput = document.getElementById('chat-user-input');
const chatMessages = document.getElementById('chat-messages');

const botResponses = [
    { keys: ["hello", "hi", "hey", "greetings"], response: "Hi there! How can I help you today?" },
    { keys: ["skills", "tech", "stack", "know", "programming"], response: "Glenmark is highly skilled in React Native, Laravel, MySQL, Python, Java, and modern UI/UX design (like this portfolio!)." },
    { keys: ["projects", "build", "work", "experience", "portfolio"], response: "Glenmark is currently a dedicated CS student focusing on building a strong project portfolio. While he hasn't started his professional career yet, his work like RiceGuard AI and the Lost & Found system demonstrates his proficiency." },
    { keys: ["education", "school", "university", "bisu", "degree", "graduate", "high school"], response: "Glenmark graduated from Guinsularan National HS and is currently pursuing his BS in Computer Science at Bohol Island State University (BISU)." },
    { keys: ["contact", "email", "phone", "reach", "hire"], response: "You can reach him at glenmark.r.sandigan@bisu.edu.com or via the 'Schedule a Call' link in the Contact section." },
    { keys: ["age", "how old", "birthday"], response: "Glenmark is 22 years old (born Jan 21, 2004) and is focusing heavily on software engineering and full-stack development." },
    { keys: ["location", "live", "where", "address"], response: "He is based in P-7 Guinsularan, Duero, Bohol." },
    { keys: ["internship", "job", "freelance"], response: "Yes! Glenmark is open for internships and freelance projects to apply his skills in real-world scenarios."}
];

chatToggle.onclick = () => {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    if(chatWindow.style.display === 'flex') {
        chatInput.focus();
    }
};

closeChat.onclick = () => chatWindow.style.display = 'none';

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `msg ${sender}-msg`;
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(input) {
    const lowInput = input.toLowerCase();
    for (let item of botResponses) {
        if (item.keys.some(key => lowInput.includes(key))) {
            return item.response;
        }
    }
    return "That's an interesting question! Feel free to 'Schedule a Call' to ask Glenmark directly, or ask me about his tech stack, projects, or education.";
}

function handleSend() {
    const text = chatInput.value.trim();
    if (text) {
        addMessage(text, 'user');
        chatInput.value = '';
        
        // Disable input while bot "thinks"
        chatInput.disabled = true;
        sendBtn.disabled = true;
        
        setTimeout(() => {
            addMessage(getBotResponse(text), 'bot');
            chatInput.disabled = false;
            sendBtn.disabled = false;
            chatInput.focus();
        }, 600);
    }
}

sendBtn.onclick = handleSend;

// Allow sending with 'Enter' key
chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSend();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 100; // Adjusted for the new floating nav
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            chatWindow.style.display = 'none'; // Close chat on nav so it doesn't block the view
        }
    });
});

// Cursor Glow Effect (Subtle, optimized for performance)
let mouseX = 0, mouseY = 0;
let isTicking = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            const cards = document.querySelectorAll('.bento-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = mouseX - rect.left;
                const y = mouseY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
            isTicking = false;
        });
        isTicking = true;
    }
});
