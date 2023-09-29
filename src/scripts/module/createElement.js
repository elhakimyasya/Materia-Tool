// Create an HTML element and configure its attributes, classes, and content.
export const createElement = (tag, options) => {
    // Create the HTML element with the specified tag
    let element = document.createElement(tag);

    // Loop through the options and configure the element
    for (let attribute in options) {
        if (attribute === 'class') {
            // Add classes to the element
            element.classList.add(...options[attribute]);
        } else if (attribute === 'content') {
            // Set the inner HTML content of the element
            element.innerHTML = options[attribute];
        } else {
            // Set other attributes of the element
            element[attribute] = options[attribute];
        }
    }

    return element;
};
