const form = document.querySelector('form');
const resultElement = document.querySelector('#result');
const closeButton = document.querySelector('#close');
closeButton.addEventListener('click', () => {
    resultElement.classList.add('hidden');
});
const resultTextElement = document.querySelector('#result-text');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Form submitted', event);
    const title = document.querySelector('#title').value;
    const teaser = document.querySelector('#teaser').value;
    const content = document.querySelector('#content').value;

    const data = {
        title,
        teaser,
        content
    }
    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.text();
        const resultText = JSON.parse(result);
        if (response.ok) {
            resultTextElement.innerText = 'Article succesfully added!';
            resultElement.classList.remove('bg-red-500');
            resultElement.classList.add('bg-green-500');
            resultElement.classList.remove('hidden');
            setTimeout(() => {
                resultElement.classList.add('hidden');
            }, 10000);
        } else {
            resultTextElement.innerHTML = 'Error adding article:<br/>' + resultText.message;
            resultElement.classList.add('bg-red-500');
            resultElement.classList.remove('hidden');
        }

    } catch (error) {
        resultTextElement.innerHTML = 'API not accesable!<br>' + error;
        resultElement.classList.add('bg-red-500');
        resultElement.classList.remove('hidden');
    }

});