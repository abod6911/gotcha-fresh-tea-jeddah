import { r as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\" class=\"max-w-full overflow-x-hidden\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover\" />\n    <title>Gotcha Fresh Tea Jeddah | قوتشا فريش تي جدة</title>\n    <meta name=\"description\" content=\"Handcrafted fresh tea, boba and collagen drinks in Jeddah — brewed fresh, never from powder. شاي طازج وبوبا ومشروبات كولاجين في جدة.\" />\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Poppins:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800&family=Inter:wght@400;600;700&display=swap\" />\n    <link rel=\"icon\" href=\"./favicon.ico\" type=\"image/x-icon\" />\n  </head>\n  <body class=\"max-w-full overflow-x-hidden min-h-screen bg-background text-foreground antialiased\">\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"./src/client.tsx\"><\/script>\n  </body>\n</html>\n", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
