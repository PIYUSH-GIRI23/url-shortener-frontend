const text = document.body.querySelector('#search');
const b = document.body.querySelector('.submit');
const c = document.body.querySelector('.clear');
const d = document.body.querySelector('.warning');
const url = 'http://localhost:80/api/link/create';

c.addEventListener('click', () => {
    text.value = '';
});

b.addEventListener('click', async () => {
    d.innerHTML = '';
    text.value = text.value.trim();
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shortener: text.value
        }),
    };
    
    const response = await fetch(url, options);
    
    if (response.status === 200) {
        console.log("ok");
        const responseJson = await response.json();
        const answer=responseJson.shortenedLink;
        
        const linkElement = document.createElement('a');
        linkElement.href = 'http://localhost/api/link/visit/'+answer;
        linkElement.textContent=`here`
        

        const successParagraph = document.createElement('p');
        successParagraph.classList.add('success');
        successParagraph.textContent = 'Your Shortened Link is ';
        
        successParagraph.appendChild(linkElement);

        d.insertAdjacentElement('afterbegin', successParagraph);
    }
    else {
        console.log("error");
        d.insertAdjacentHTML('afterbegin', '<br><p class="warning">Invalid URL</p>')
    }
});

// Prevent the form from submitting on Enter key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission behavior
        b.click(); // Trigger a click on the submit button
    }
});
