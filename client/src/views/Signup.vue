<template>
  <div class="fullscreen-container">
    <div class="signup-container">
      <h1 class="signup-title">Sign up</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" v-model="username" name="username" id="username">
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" name="password" id="password">
        </div>
        <button type="submit" class="signup-button">Sign up</button>
        <div class="login-group">
          <p class="loginparagraph">Already have an account?</p>
          <span></span>
          <router-link to="/login" tag="a">Login here!</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { store } from '../store/store'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    user() {
      return store.user
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:3000/api/auth', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        })
        const data = await response.json()

        if (response.ok) {
          this.$router.push('/dashboard')
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.error('Error logging in:', error)
      }
    }
  }
}
</script>

<style>
.fullscreen-container {
  height: 100vh;
  width: 100vw;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

.signup-container {
  background-color: hsl(var(--primary-dark-hsl), .7);
  box-shadow: 0 0 15px 0 black;
  padding: 30px 40px;
  width: 80%;
  max-width: 600px;
  border-radius: 20px;
}

.signup-title {
  margin: 0;
  color: white;
  text-align: center;
  font-size: 3rem;
  font-weight: normal;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group label {
  color: white;
  font-weight: normal;
  font-size: 1.3em;
}

.input-group input {
  font-size: 1.25rem;
  padding: .5em;
  background-color: hsl(var(--primary-light-hsl), .3);
  border: none;
  outline: none;
  border-radius: .25em;
  color: white;
  font-weight: lighter;
}

.input-group input:focus {
  box-shadow: 0 0 0 1px hsl(var(--primary-hsl));
}

.signup-button {
  padding: .5em 1em;
  font-size: 1.5rem;
  font-weight: lighter;
  color: white;
  background-color: hsl(var(--primary-hsl), .25);
  border: 1px solid hsl(var(--primary-hsl));
  border-radius: .25em;
  outline: none;
  cursor: pointer;
}

.signup-button:hover,
.signup-button:focus {
  background-color: hsl(var(--primary-hsl), .4);
}

.login-group {
  display: flex;
  flex-direction: row;
  color: white;
}

.login-group span {
  margin: 2px;
}
</style>
