function onPlayButtonClicked() {
    const mainElement = document.getElementById('main-content') as HTMLElement;
    mainElement.innerHTML = '<div class="loading-container">Loading...</div>';
    window.location.href = 'app/app.html';
}

export function init() {
    (document.getElementById('play-button') as HTMLButtonElement).addEventListener('click', onPlayButtonClicked);
}

document.addEventListener('DOMContentLoaded', init);