export const manifest = {
	appDir: "_app",
	assets: new Set([".DS_Store",".nojekyll","365days/.DS_Store","365days/avatar.png","365days/cloud.png","365days/logo.png","365days/polaroid-cloud.png","365days/sig.gif","android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","robots.txt","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".gif":"image/gif",".ico":"image/vnd.microsoft.icon",".txt":"text/plain",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"_app/immutable/start-0ea5eeaf.js","imports":["_app/immutable/start-0ea5eeaf.js","_app/immutable/chunks/index-4009dbbb.js","_app/immutable/chunks/singletons-47584117.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				errors: [1],
				layouts: [0],
				leaf: 2
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
