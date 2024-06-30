import { Options } from './interfaces/options';

/**
 * The function creates an HTML string to generate a deep link, redirecting users to an app based on their device.
 * 
 * @param {Options} options - The configuration options for generating the deep link HTML.
 * @param {Object} options.urls - An object containing URLs for iOS app, Android app, iOS store, Android store, and fallback URL.
 * @param {string} options.urls.iosApp - The URL scheme for the iOS app.
 * @param {string} options.urls.androidApp - The URL scheme for the Android app.
 * @param {string} options.urls.iosStore - The URL for the iOS App Store.
 * @param {string} options.urls.androidStore - The URL for the Google Play Store.
 * @param {string} options.urls.fallback - The fallback URL if the app and store URLs fail.
 * @param {string} [options.pageTitle] - The title of the generated HTML page.
 * @param {string} [options.headingText] - The heading text to be displayed on the generated HTML page.
 * @returns {string} The generated HTML string for the deep link redirection.
 */
export function deepLink(options: Options): string {
    const { urls, pageTitle = '', headingText = '' } = options;

    return `
    <!DOCTYPE html>
    <head>
        <title>${pageTitle}</title>
        <meta name="robots" content="noindex,nofollow">
    </head>
    <body>
        <h1>${headingText}</h1>
        <script>
            function isIOS(userAgent) {
                return /iPad|iPhone|iPod/.test(userAgent) && !userAgent.includes('Windows');
            }

            function redirectToApp(appUrl, storeUrl, fallbackUrl) {
                const timeout = 3000;
                let hasFocus = true;
                let didHide = false;

                window.addEventListener('blur', () => { hasFocus = false; });
                document.addEventListener('visibilitychange', (e) => {
                    if (e.target.visibilityState === 'hidden') {
                        didHide = true;
                    }
                });

                window.addEventListener('focus', () => {
                    if (didHide) {
                        window.location = fallbackUrl;
                    }
                });

                setTimeout(() => {
                    if (!hasFocus) {
                        window.location = storeUrl;
                    } else {
                        window.location = fallbackUrl;
                    }
                }, timeout);

                window.location = appUrl;
            }

            document.addEventListener('DOMContentLoaded', () => {
                const userAgent = navigator.userAgent;
                const isIosDevice = isIOS(userAgent);
                const appUrl = isIosDevice ? '${urls.iosApp}' : '${urls.androidApp}';
                const storeUrl = isIosDevice ? '${urls.iosStore}' : '${urls.androidStore}';
                const fallbackUrl = '${urls.fallback}';

                redirectToApp(appUrl, storeUrl, fallbackUrl);
            });
        </script>
    </body>
    </html>
  `;
}
