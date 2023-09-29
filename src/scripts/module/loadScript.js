export const loadScript = (source) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = source;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            resolve();
            script.remove();
        };

        script.onerror = () => {
            reject(new Error(`Failed to load script: ${source}`));
            script.remove();
        };

        document.head.appendChild(script);
    })
};