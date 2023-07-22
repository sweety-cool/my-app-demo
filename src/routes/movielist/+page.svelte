
<script>
  import { WISHLIST } from "$lib/wishlist-store.js";
  import { SearchMovie } from '$lib/imdb-api.js'

  let searchQuery = '';
  let searchData = [];
  $: if(searchQuery.length > 3) {
    SearchMovie(searchQuery).then((movies)=>searchData = movies);
  }

  async function addToWatchlist(movie) {
    if($WISHLIST.includes(movie.id)) return;
    $WISHLIST = [...$WISHLIST, movie.id];
    console.log('wishlist1----',$WISHLIST);
    localStorage.setItem('wishlist', JSON.stringify($WISHLIST));
  }

  async function removeFromWatchlist(movie) {
    $WISHLIST = $WISHLIST.filter((id) => id !== movie.id);
    localStorage.setItem('wishlist', JSON.stringify($WISHLIST));
  }
 
</script>

<h1>Search Movie</h1>



<input type="text" bind:value={searchQuery} placeholder="Search movies..." />

{#if searchData.length > 0}
  <div class="movies">
    {#each searchData as movie}
    <div class="movie">
        <h2>{movie.title}</h2>
        
        <img src="https://image.tmdb.org/t/p/w500/{movie.poster_path}" alt="{ movie.title }" />
        <br>
        {#if $WISHLIST.includes(movie.id)}
          <button on:click={()=> removeFromWatchlist(movie)} >Remove from Watchlist</button>
        {:else}
          <button on:click={() => addToWatchlist(movie)}>Add to Watchlist</button>
        {/if}
        <br>
        <p>{movie.overview}</p>
    </div>
    {/each}
  </div>
{:else}
  <p>No movies found.</p>
{/if}


<style>
    .movies {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
</style>