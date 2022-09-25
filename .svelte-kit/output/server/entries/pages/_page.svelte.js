import { c as create_ssr_component } from "../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "@-webkit-keyframes svelte-xnssr6-float{0%{transform:translatey(0px)}50%{transform:translatey(-20px)}100%{transform:translatey(0px)}}@keyframes svelte-xnssr6-float{0%{transform:translatey(0px)}50%{transform:translatey(-20px)}100%{transform:translatey(0px)}}.animation-float.svelte-xnssr6{-webkit-animation:svelte-xnssr6-float 6s ease-in-out infinite;animation:svelte-xnssr6-float 6s ease-in-out infinite}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>&quot;365 days&quot; Photo Album</title>`, ""}<meta name="${"description"}" content="${"Art Project by Binh Pham"}" data-svelte="svelte-1lo7qcv">`, ""}

<div class="${"w-screen h-screen md:hidden flex flex-col justify-center items-center z-0 overflow-hidden"}"><div class="${"absolute w-1/2 h-full left-0 top-0 z-10"}"></div>
	<div class="${"absolute w-1/2 h-full right-0 top-0 z-10"}"></div>
	${`<div class="${"w-full h-full flex flex-col justify-center items-center absolute"}"><img class="${"w-3/4 sm:w-96 object-cover mb-10"}" src="${"/365days/polaroid-cloud.png"}" alt="${"Cloud of Polaroids"}">
			<img class="${"w-1/5 sm:w-28 object-cover mb-10"}" src="${"/365days/logo.png"}" alt="${"logo"}">
			<span class="${"animate-pulse text-base"}">Tap to start</span></div>`}
	${``}
	${``}
	${``}
	${``}
</div>`;
});
export {
  Page as default
};
