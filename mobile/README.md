# Upscayl Mobile — local browser PWA

This project provides a browser-first Android experience. You do not need to install an APK: open the hosted site in Chrome on Android and use Install app or Add to Home screen.

## Local AI, no API key

The mobile page uses ONNX Runtime Web and the browser-ready Real-ESRGAN x4plus ONNX model. Image inference runs on-device using WebGPU when supported, with a WebAssembly CPU fallback. The image itself is not uploaded. This is a browser implementation of Real-ESRGAN, not the desktop NCNN/Vulkan executable.

- First use requires internet to download the ONNX runtime and the approximately 64 MB model.
- The model is cached using the browser Cache API; the service worker caches the app shell and runtime resources on HTTPS.
- After the first successful load and model download, reopen the installed PWA to use it offline, provided the browser has retained its caches.
- The mobile-friendly processing path limits the input long edge to 1024 pixels and runs overlapping tiles to reduce peak memory. 2x/3x outputs are downscaled from the model's 4x result.
- Performance and available memory vary by phone. A device may still fail on large or unsupported inputs. Latest Chrome on Android is recommended; WebGPU availability varies, and CPU fallback can be slow.

## Open in Android browser

1. Deploy the mobile/www directory to an HTTPS static host. The included GitHub Actions workflow deploys it to GitHub Pages.
2. Open the published HTTPS URL in Chrome on Android.
3. Tap Download / prepare AI model while online and wait until the app says the model is ready.
4. Choose an image and tap Upscale locally.
5. Use Chrome's menu to Install app or Add to Home screen. Reopen once while online after installation to confirm offline cache is available.

Do not open index.html as a file:// URL. Service workers and PWA installation require HTTPS (or localhost).

## Model and runtime

- Model: https://huggingface.co/skillsafe-ai/realesrgan-x4plus, based on the upstream Real-ESRGAN x4plus weights.
- The model card reports the original weights as BSD-3-Clause licensed; see the upstream license at https://github.com/xinntao/Real-ESRGAN/blob/master/LICENSE and the model card for attribution.
- Runtime: https://onnxruntime.ai/docs/get-started/with-javascript/web.html, loaded from jsDelivr. The first launch needs network access for these public assets.

## GitHub Pages deployment

The workflow in .github/workflows/browser-pwa.yml deploys mobile/www to GitHub Pages after pushes to main. If Pages is not enabled for the repository, the workflow attempts to enable it. The first deployment may take a few minutes. The resulting app URL is typically https://OWNER.github.io/REPOSITORY/.

## Tests

From the mobile directory, run npm install, npx playwright install --with-deps chromium, and npm test. The browser tests verify the PWA shell and local-inference wiring. They do not replace an end-to-end inference run on a physical Android device.

## Optional APK

The existing Android packaging workflow is retained as an optional wrapper. It is not required for browser/PWA use.
