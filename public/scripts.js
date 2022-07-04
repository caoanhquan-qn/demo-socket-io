const socket = io('http://localhost:8000', { transports: ['websocket'] });
const socket2 = io('http://localhost:8000/admin', { transports: ['websocket'] });
socket.on('connect', () => {
  socket.on('welcome', (msg) => {
    console.log(msg);
  });
});

socket.on('join', (msg) => {
  console.log(msg);
});

socket2.on('connect', () => {
  socket2.on('welcome', (msg) => {
    console.log(msg);
  });
});
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
socket.on('chat message', (msg) => {
  let item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
