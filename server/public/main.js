const socket = io();

socket.on('temp', function(data) {
    console.log(data);
    const temp = document.getElementById('temperature');
    temp.innerHTML = `${data} °C`;
});

// para iniciar: node server/index.js