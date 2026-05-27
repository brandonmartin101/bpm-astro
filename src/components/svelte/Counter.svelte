<!-- @component
A counter written with Svelte (Svelte 5)
-->
<script lang="ts">
	let { children } = $props();
	let count = $state(0);

	function add() {
		count += 1;
	}

	function subtract() {
		count -= 1;
	}
</script>

<div class="counter">
	<button onclick={subtract}>-</button>
	<pre>{count}</pre>
	<button onclick={add}>+</button>
</div>
<div class="counter-message">
	{@render children?.()}
</div>
