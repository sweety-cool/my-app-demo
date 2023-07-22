
<script>
	// Import the getLatestMovies function from the imdb-api.js file
	import { getLatestMovies } from '$lib/imdb-api.js';
  
	let searchQuery = '';
	let getData = [];
  
	// Use the onMount function to fetch movie data when the component is mounted
	import { onMount } from 'svelte';
	onMount(async () => {
	  try {
		// Call the getLatestMovies function to fetch the movie data
		getData = await getLatestMovies(searchQuery);
		console.log('getData', getData);
	  } catch (error) {
		console.error('Error fetching movie data:', error);
	  }
	});
  </script>
  
  <svelte:head>
	<title>Home</title>
	<meta name="description" content="Movie demo app" />
  </svelte:head>
  
  <section>
	<h1>
	  Welcome to Movie App
	</h1>
  </section>
  
  {#if getData.length > 0}
	<div class="movies">
	  {#each getData as movie}
	  <div class="movie">
		<h4>{movie.title}</h4>
        <img src="https://image.tmdb.org/t/p/w500/{movie.poster_path}" alt="{ movie.title }" />
		<br>
		<p>{movie.overview}</p>

	</div>
	  {/each}
	</div>
  {:else}
	<p>Loading...</p>
  {/if}
  
  <style>
    .movies {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
	section {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  flex: 0.6;
	}
  
	h1 {
	  width: 100%;
	}
  </style>
  