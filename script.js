// Cargar datos desde data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        updateProgress(data.percentScrutinized);
        displayResults(data.results);
    });

// Actualizar barra de progreso
function updateProgress(percent) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${percent}% escrutado`;
}

// Mostrar resultados según elección seleccionada
document.getElementById('election-type').addEventListener('change', (e) => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const electionType = e.target.value;
            const electionResults = data.results[electionType];
            displayResults(electionResults);
        });
});

// Mostrar resultados en la tabla
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!results) {
        resultsContainer.innerHTML = '<p>No hay datos disponibles.</p>';
        return;
    }

    let html = '<table><tr><th>Partido</th><th>Votos</th><th>%</th></tr>';
    
    results.forEach(party => {
        html += `
            <tr>
                <td>${party.name}</td>
                <td>${party.votes.toLocaleString()}</td>
                <td>${party.percentage}%</td>
            </tr>
        `;
    });

    html += '</table>';
    resultsContainer.innerHTML = html;
}
