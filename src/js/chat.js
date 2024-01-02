"use strict"

const socket = io()

const nickname = document.querySelector('#nickname')
const chatList = document.querySelector('.chat_list')
const chatInput = document.querySelector('.chat_input')
const sendBtn = document.querySelector('.send_btn')
const displayCont = document.querySelector('.display_cont')

chatInput.addEventListener('keypress',(event)=>{
    if(event.keyCode === 13 || event.key === 'Enter'){
        send()
        chatInput.value = ''
    }
  
})

function send(){
    if (!nickname.value.trim()) {
        // 닉네임이 공백이면 실행 중단
        alert("닉네임을 입력하세요.");
        chatInput.value = ''
        return;
    }
    if (!chatInput.value.trim()) {
        // 채팅이 공백이면 실행 중단
        alert("내용을 입력하세요.");
        chatInput.value = ''
        return;
    }
    const param = {
            name: nickname.value,
            msg: chatInput.value
        }
    
    socket.emit("chatting", param)
    chatInput.value = ''
}

sendBtn.addEventListener('click', send)


socket.on('chatting', (data) => {
    const {name, msg, time} = data
    const item = new liModel(name, msg, time)
    item.makeLi()
    displayCont.scrollTo(0, displayCont.scrollHeight)
})

function liModel(name, msg, time) {
    this.name = name
    this.msg = msg
    this.time = time

    this.makeLi = () => {
        const li = document.createElement('li')
        li.classList.add(nickname.value === this.name ? 'sent' : 'received')
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img src="https://picsum.photos/50" alt="img">
        </span>

        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`

        li.innerHTML = dom
        chatList.appendChild(li)
    }
}

console.log(socket)