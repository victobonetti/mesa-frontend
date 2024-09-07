<script>
	import waiter from '$lib/assets/waiter.jpg';
	import logo from '$lib/assets/logo.png';
</script>

<div
	class=" h-96 border rounded shadow-lg bg-neutral-100  flex items-center"
>
	<div class="w-1/2 p-8 flex flex-col items-center">
		<img class="w-64" src={logo} alt="logo">
		<a
			href="/login"
			class="text-neutral-50 mt-8 bg-neutral-800 w-32 py-2 px-6 rounded-full text-center"
			>Iniciar</a
		>
	</div>
	<div class="w-1/2 h-full">
		<img class="object-cover  object-center h-full rounded-r" src={waiter} alt="waiter">
	</div>
</div>

