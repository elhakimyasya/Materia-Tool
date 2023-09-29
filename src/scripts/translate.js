import { snackbar } from './module/snackbar';

const textareaText = document.getElementById('textarea_tools_language_text');
const textareaTranslation = document.getElementById('textarea_tools_language_translation');
const selectEngine = document.getElementById('select_tools_engine');
const selectTranslateTo = document.getElementById('select_tools_language_translation');

const updateUrlParams = async () => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('materiaTools') && urlParams.get('materiaTools') === 'translate') {
        const textParam = urlParams.get('text');
        const engineParam = urlParams.get('engine');
        const toParam = urlParams.get('to');

        if (textParam && engineParam && toParam) {
            textareaText.value = textParam;
            selectEngine.value = engineParam;
            selectTranslateTo.value = toParam;

            try {
                const baseUrl = 'https://api-translate.azharimm.dev/translate';
                const url = new URL(baseUrl);

                url.searchParams.set('engine', engineParam);
                url.searchParams.set('to', toParam);
                url.searchParams.set('text', textParam);

                const response = await fetch(url.href);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                textareaTranslation.value = data.data.result;
            } catch (error) {
                snackbar('Fetch Error: ' + error, 3000);
            }
        }
    }
};

if (textareaText && textareaTranslation && selectEngine && selectTranslateTo) {
    selectEngine.addEventListener('change', updateUrlParams);
    selectTranslateTo.addEventListener('change', updateUrlParams);
    textareaText.addEventListener('input', updateUrlParams);

    updateUrlParams();
}