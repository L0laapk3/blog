<script>
	import '../app.css';
    import nightwind from 'nightwind/helper';
</script>

<svelte:head>
    {@html `<script>const recolor = () => {${nightwind.init()}}; if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addListener(recolor); recolor();</script>`}
</svelte:head>

<div class="relative min-h-screen h-full display-contents">
	<slot/>
</div>