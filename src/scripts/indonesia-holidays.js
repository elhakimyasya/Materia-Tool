import { snackbar } from "./module/snackbar";

const loaders = document.querySelector('.tool_loader');
const wrapper = document.querySelector('.tool_wrapper');
const container = wrapper.querySelector('.tool_result');

const selectDate = document.getElementById('input_tool_date');

if (loaders && selectDate && container) {
    const updateUrlParams = async () => {
        // Check if selectDate is empty or blank
        if (selectDate.value.trim() === '') {
            // You can optionally set textareaTranslation to an empty string or some default value
            selectDate.value = '';
            return; // Exit the function early
        }

        const baseUrl = 'https://dayoffapi.vercel.app/api?month=2';
        const url = new URL(baseUrl);

        url.searchParams.set('month', new Date(selectDate.value).getMonth() + 1);
        url.searchParams.set('year', new Date(selectDate.value).getFullYear());

        try {
            const response = await fetch(url.href);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            let datas = '';
            data.forEach(item => {
                const selectDate = new Date(item.tanggal);
                const options = {
                    day: "2-digit", // Display the day as two digits (e.g., "25")
                    month: "long",  // Display the full month name (e.g., "December")
                    year: "numeric" // Display the year as digits (e.g., "2023")
                };
                // Access the "tanggal" property of each object in the array
                datas += `
                <div class="mb-3 dark:bg-colorDarkBackgroundAlt flex w-full flex-col items-start justify-center rounded-lg bg-colorBackground p-3 shadow-2dp">
                    <div class="line-clamp-1 text-lg font-bold">${item.keterangan}</div>
                    <div class="dark:text-colorDarkMeta line-clamp-1 text-colorMeta">${selectDate.toLocaleDateString("id-ID", options)}</div>
                    <div class="dark:text-colorDarkMeta line-clamp-1 text-colorMeta">${item.is_cuti === 'true' ? 'Hari Cuti' : 'Bukan Hari Cuti'}</div>
                </div>
                ` ;
            });

            container.innerHTML = datas
        } catch (error) {
            snackbar('Fetch Error: ' + error, 3000);
        }
    };

    loaders.remove();
    wrapper.classList.remove('hidden');

    selectDate.addEventListener('change', updateUrlParams);
}