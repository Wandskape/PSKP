fetch('/files/data.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('jsonData').textContent = JSON.stringify(data, null, 2);
    });

fetch('/files/data.xml')
    .then(response => response.text())
    .then(data => {
        document.getElementById('xmlData').textContent = data;
    });
