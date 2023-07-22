<script>
  // Import the WISHLIST array from the store
  import { WISHLIST } from "$lib/wishlist-store.js";
 // Initialize wishlistData as an empty array
 let wishlistData = [];
  
  // Subscribe to changes in the wishlist store
  WISHLIST.subscribe(value => {
    wishlistData = value || [];
    console.log(wishlistData);
  });
</script>

<div>
  <h1>Watchlist</h1>
  {#if wishlistData.length > 0}
    <div class="movies">
      {#each wishlistData as movie}
        <div class="movie">
          <h2>{movie.title}</h2>
          <!-- <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="{movie.title}" /> -->
          <br>
          <br>
          <p>{movie.overview}</p>
        </div>
      {/each}
    </div>
  {:else}
    <p>Your watchlist is empty.</p>
  {/if}
</div>

<style>
  .movies {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
</style>
