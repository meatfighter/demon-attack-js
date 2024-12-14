export function init() {
    (document.getElementById('play-button') as HTMLButtonElement).addEventListener('click',
        _ => window.location.href = 'app/app.html');
}

document.addEventListener('DOMContentLoaded', init);