function init() {
    const mainElement = document.getElementById('main-content') as HTMLElement;
    mainElement.innerHTML = '<div id="loading-div" class="loading-container">.</div>';
    const loadingDiv = document.getElementById('loading-div') as HTMLDivElement;
    const intervalId = setInterval(() => {
        loadingDiv.textContent = (loadingDiv.textContent === '...')
            ? '' 
            : loadingDiv.textContent + '.';
    }, 400);       
    setTimeout(() => import(/* webpackChunkName: "app" */ './app').then(module => {
        clearInterval(intervalId);
        module.init();
    }), 10);
}

document.addEventListener('DOMContentLoaded', init);