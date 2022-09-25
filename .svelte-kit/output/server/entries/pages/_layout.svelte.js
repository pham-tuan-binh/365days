import { c as create_ssr_component } from "../../chunks/index.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main><div class="${"md:hidden"}">${slots.default ? slots.default({}) : ``}</div>
	<div class="${"w-screen h-screen hidden md:flex flex-col justify-center items-center"}"><img class="${"w-96 object-cover mb-10"}" src="${"/365days/polaroid-cloud.png"}">
		<span class="${"text-lg text-gray-900"}">Please open this website on a mobile device.</span></div>
	<div class="${"absolute -z-50 w-screen h-screen left-0 top-0"}"><img class="${"w-full h-full object-cover"}" src="${"/365days/cloud.png"}"></div>
</main>`;
});
export {
  Layout as default
};
