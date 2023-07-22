<script>
    let name = '';
    let email = '';
    let password='';
  
    async function registerUser() {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email , password }),
      });
  
      if (response.ok) {
        alert('Registration successful!');
        window.location.href = '/login';
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  </script>
  
  <h2>Register</h2>
  <form on:submit|preventDefault="{registerUser}">
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value="{name}" required />
  
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value="{email}" required />

    <label for="password">Password</label>
    <input type="password" id="password" bind:value="{password}" required />

    <button type="submit">Register</button>
  </form>
  