import { createElement } from "./createElement";

export const snackbar = (content, duration) => {
    let existingSnackbars = document.querySelectorAll('.elcreative_snackbar');
    existingSnackbars.forEach(snackbar => {
        snackbar.remove();
    });

    let element = createElement('div', {
        class: ['elcreative_snackbar'],
        content: `<span class='snackbar_text'>${content}</span>`,
    });
    document.body.appendChild(element);

    let snackbar = document.querySelectorAll('.elcreative_snackbar');

    snackbar.forEach((elements, index) => {
        setTimeout(() => {
            elements.classList.add('active');

            setTimeout(() => {
                elements.classList.remove('active');
            }, index + duration + 100);

            setTimeout(() => {
                elements.remove();
            }, index + duration + 200);
        }, index * 50);
    });
};