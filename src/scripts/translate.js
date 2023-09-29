import { snackbar } from './module/snackbar';

const textareaText = document.getElementById('textarea_tools_language_text');
const textareaTranslation = document.getElementById('textarea_tools_language_translation');
const selectEngine = document.getElementById('select_tools_engine');
const selectTranslateTo = document.getElementById('select_tools_language_translation');

const updateUrlParams = async () => {
    const textValue = textareaText.value.trim();
    const engineValue = selectEngine.value;
    const toValue = selectTranslateTo.value;

    // Update the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('materiaTools', 'translate');
    urlParams.set('text', textValue);
    urlParams.set('engine', engineValue);
    urlParams.set('to', toValue);

    // Update the URL without refreshing the page
    window.history.replaceState({}, '', `?${urlParams.toString()}`);

    try {
        const baseUrl = 'https://api-translate.azharimm.dev/translate';
        const url = new URL(baseUrl);

        url.searchParams.set('engine', engineValue);
        url.searchParams.set('to', toValue);
        url.searchParams.set('text', textValue);

        const response = await fetch(url.href);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        textareaTranslation.value = data.data.result;
    } catch (error) {
        snackbar('Fetch Error: ' + error, 3000);
    }
};

if (textareaText && textareaTranslation && selectEngine && selectTranslateTo) {
    selectEngine.addEventListener('change', updateUrlParams);
    selectTranslateTo.addEventListener('change', updateUrlParams);
    textareaText.addEventListener('input', updateUrlParams);

    // Update URL parameters on initial page load
    updateUrlParams();
}