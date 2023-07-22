<!-- login.svelte -->
<script>
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let isLoggingIn = false;

  async function handleLogin() {
    if (isLoggingIn) return;

    try {
      isLoggingIn = true;

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        goto('/movielist');
      } else {
        const data = await response.json();
        alert(data.error || 'INVALID CREDENTIALS. Please try again');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    } finally {
      isLoggingIn = false;
    }
  }
</script>

<main>
  <form on:submit|preventDefault={handleLogin}>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />

    <button type="submit" disabled={isLoggingIn}>Login</button>
  </form>
</main>
