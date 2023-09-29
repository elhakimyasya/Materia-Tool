import { snackbar } from './module/snackbar';

const textareaText = document.getElementById('textarea_tools_language_text');
const textareaTranslation = document.getElementById('textarea_tools_language_translation');
const selectEngine = document.getElementById('select_tools_engine');
const selectTranslateTo = document.getElementById('select_tools_language_translation');

if (textareaText && textareaTranslation && selectEngine && selectTranslateTo) {
    const updateUrlParams = async () => {
        // Check if textareaText is empty or blank
        if (textareaText.value.trim() === '') {
            // You can optionally set textareaTranslation to an empty string or some default value
            textareaTranslation.value = '';
            return; // Exit the function early
        }

        const baseUrl = 'https://api-translate.azharimm.dev/translate';
        const url = new URL(baseUrl);

        url.searchParams.set('engine', selectEngine.value);
        url.searchParams.set('to', selectTranslateTo.value);

        url.searchParams.set('text', textareaText.value);

        try {
            // Fetch data asynchronously
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

    selectEngine.addEventListener('change', updateUrlParams);
    selectTranslateTo.addEventListener('change', updateUrlParams);
    textareaText.addEventListener('input', updateUrlParams);

    updateUrlParams();
}
