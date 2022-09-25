<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	let currentState = 0;
	let currentPicture = 0;
	let specialCounter = 0;
	let mediaCount = 0;
	let pictures = [];
	let picturesPaging = false;
	let randomPicture = 0;
	let randomQuote = { content: 'Loading...' };
	let randomQuoteLoading = false;

	// $: slidingPicturesFrame = pictures.slice(
	// 	inFeedRange(currentPicture - 2),
	// 	inFeedRange(currentPicture + 3)
	// );

	// function inFeedRange(value) {
	// 	if (value < 0) {
	// 		return 0;
	// 	}
	// 	if (value > pictures.length - 1) {
	// 		return pictures.length;
	// 	}
	// 	return value;
	// }

	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			delay: 1500,
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

	async function fetchInstagramFeed() {
		let url = `https://the365days.herokuapp.com/feed`;
		if (picturesPaging) {
			url = url + '?after=' + picturesPaging.cursors.after;
		}
		const res = await fetch(url);
		let picturesData = await res.json();
		pictures = picturesPaging ? pictures.concat(picturesData.data) : picturesData.data;
		picturesPaging = picturesData.paging;
		pictures = pictures.map((ele, index) => {
			ele.index = index;
			return ele;
		});
		console.log(pictures);
	}

	async function fetchRandomQuotes() {
		randomQuoteLoading = true;
		const res = await fetch('https://api.quotable.io/random');
		randomQuote = await res.json();
		randomQuoteLoading = false;
	}

	function handlePictureClick(url) {
		return () => {
			window.open(url, '_blank');
		};
	}
	function hasLoadedAllPictures() {
		return pictures.length == mediaCount;
	}

	async function leftClickHandle() {
		if (currentState === 2) {
			if (currentPicture === 0) {
				currentState--;
			} else {
				currentPicture--;
			}
			return;
		}
		if (currentState === 0) {
			specialCounter++;
			if (specialCounter === 5) {
				currentState = -1;
				randomPicture = Math.floor(Math.random() * (pictures.length - 1));
				await fetchRandomQuotes();
				return;
			}

			return;
		}
		if (currentState === -1) {
			return;
		}
		currentState--;
	}

	async function rightClickHandle() {
		if (currentState === 2) {
			if (!hasLoadedAllPictures()) {
				if (currentPicture >= pictures.length - 2) {
					await fetchInstagramFeed();
				}
			} else {
				if (currentPicture === pictures.length - 1) {
					currentState++;
					return;
				}
			}
			currentPicture++;
		} else if (currentState === 3) {
			currentState = 0;
			currentPicture = 0;
		} else if (currentState === -1) {
			specialCounter = 0;
			currentState = 0;
		} else {
			currentState++;
		}
	}

	onMount(async () => {
		await fetchInstagramFeed();
		const medRes = await fetch(`https://the365days.herokuapp.com/user`);
		mediaCount = await medRes.json();
		mediaCount = mediaCount.media_count;
		console.log(mediaCount);
		console.log(pictures);
	});
</script>

<svelte:head>
	<title>"365 days" Photo Album</title>
	<meta name="description" content="Art Project by Binh Pham" />
</svelte:head>

<div
	class="w-screen h-screen md:hidden flex flex-col justify-center items-center z-0 overflow-hidden"
>
	<div class="absolute w-1/2 h-full left-0 top-0 z-10" on:click={leftClickHandle} />
	<div class="absolute w-1/2 h-full right-0 top-0 z-10" on:click={rightClickHandle} />
	{#if currentState === 0}
		<div
			class="w-full h-full flex flex-col justify-center items-center absolute"
			transition:fly={{ y: -200, duration: 2000 }}
		>
			<img
				class="w-3/4 sm:w-96 object-cover mb-10"
				src="/365days/polaroid-cloud.png"
				alt="Cloud of Polaroids"
			/>
			<img class="w-1/5 sm:w-28 object-cover mb-10" src="/365days/logo.png" alt="logo" />
			<span class="animate-pulse text-base" transition:fade>Tap to start</span>
		</div>
	{/if}
	{#if currentState === 1}
		<div class="w-full h-full flex flex-col justify-start items-center absolute" transition:fade>
			<img
				class="w-3/4 sm:w-96 object-cover my-10 "
				src="/365days/polaroid-cloud.png"
				alt="A cloud of Polaroid"
			/>
			<span class="text-xl w-full text-start px-12 mb-6 text-gray-900">Behind</span>
			<p class="text-xs w-full text-start px-12 text-gray-900">
				Behind every picture, there is a story.
				<br />
				<br />
				Although the time I represented myself as a photographer was short, it was remarkable.
				<br />
				<br />
				I am proud, not of the work I produced, but of the stories behind them. 365 pictures you will
				see in this Instagram, all have a story behind them.
				<br />
				<br />
				That means, 365 different locations, more than hundreds of different people, and more.
				<br />
				<br />
				Every picture is a memory I will and I have treasured.
				<br />
				<br />
				It’s a shame I can’t talk about them on each post, but it would be a great conversation starter
				though, like pick a photo and I will tell you more about it ^^
				<br />
				<br />
				This Instagram will also be a place where I share my videos and works that are more artistic
				oriented, rather than serious oriented like my main one.
				<br />
				<br />
				Hope you like this Instagram!
			</p>
			<img
				class="w-24 object-cover justify-self-start self-start ml-20"
				src="/365days/sig.gif"
				alt="A cloud of Polaroid"
			/>
		</div>
	{/if}
	{#if currentState === 2}
		<div class="w-full h-full flex flex-col justify-start items-center absolute" transition:fade>
			<img class="w-1/5 sm:w-28 object-cover my-10" src="/365days/logo.png" alt="logo" />
			{#each pictures as { media_url, permalink, caption, id }, i (id)}
				{#if i === currentPicture}
					<div
						class="w-full flex flex-col justify-start items-center absolute top-1/3"
						in:fly={{ y: -400, duration: 2000 }}
						out:fly={{ y: 300, duration: 1000 }}
					>
						<img
							class="w-3/4 bg-gray-100 p-1 drop-shadow-2xl shadow-gray-900 z-20 animation-float"
							src={media_url}
							on:click={handlePictureClick(permalink)}
							alt="Instagram"
						/>
						<div class="w-3/4 flex flex-col space-y-1 " transition:fade={{ duration: 2000 }}>
							<span class="mt-5 text-base ml-1 font-bold">Day {mediaCount - currentPicture}</span>
							<span class="mt-5 text-xs ml-1" transition:typewriter
								>{caption.split('.')[1].split('_')[0]}</span
							>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
	{#if currentState === 3}
		<div
			class="w-full h-full flex flex-col justify-start items-center"
			transition:fade={{ duration: 1000 }}
		>
			<img class="w-1/5 sm:w-28 object-cover my-10" src="/365days/logo.png" />
			<img class="w-3/4 object-cover animation-float" src="/365days/avatar.png" />
			<div class="w-3/4 flex flex-col">
				<p class="text-xl">Thank You</p>
				<p class="text-xs mt-4">
					The <span class="font-bold">"365 days" Photo Album</span> is a small project made by Binh
					Pham Tuan, the fat guy in the picture. He is a Fullstack developer who just happens to be
					good in Art and several other things.
					<br />
					<br />
					As you can see, if you have travelled to this end of the exhibition, the project is probrably
					not finished yet. And you have probrably experienced some errors as well.
					<br />
					<br />
					Sorry for the inconvenience. The author is still scratching his head in the garage, finding
					a way to fix everything, including your relationship problems.
				</p>
			</div>
		</div>
	{/if}
	{#if currentState === -1}
		<div class="w-full h-full flex flex-col justify-start items-center absolute" transition:fade>
			<div class="w-3/4 flex flex-col space-y-1 my-10 ">
				<span class="mt-5 text-center text-2xl">A random photo</span>
				<span class="mt-5 text-center text-xs"
					>Do you feel special today? Do you need a booster or some sort of "tín hiệu vũ trụ"? Well
					we have that here too.</span
				>
			</div>
			<img
				class="w-3/4 bg-gray-100 p-1 drop-shadow-2xl shadow-gray-900 z-20"
				src={pictures[randomPicture].media_url}
				on:click={handlePictureClick(pictures[randomPicture].permalink)}
				alt="Instagram"
			/>
			<div class="w-3/4 flex flex-col">
				<p class="mt-5 text-base ml-1 font-bold">Day {mediaCount - randomPicture}</p>
				<p class="mt-1 text-xs ml-1">
					{pictures[randomPicture].caption.split('.')[1].split('_')[0]}
				</p>
				{#if !randomQuoteLoading}
					<p class="mt-4 text-xs ml-1" transition:fade>
						"{randomQuote.content}" - <span class="font-bold">{randomQuote.author}</span>
					</p>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	@keyframes float {
		0% {
			transform: translatey(0px);
		}
		50% {
			transform: translatey(-20px);
		}
		100% {
			transform: translatey(0px);
		}
	}

	.animation-float {
		animation: float 6s ease-in-out infinite;
	}
</style>
