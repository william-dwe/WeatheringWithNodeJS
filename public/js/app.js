console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'fetching result...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + encodeURIComponent(location)).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = 'Location: '+ data.location;
                messageTwo.textContent = 'Weather: '+ data.forecast;
            }
        })
    });
})