<template>
  <div id="register">
      <div class="container">
          <div class="row">
              <div class="col s12 m8 offset-m2">
                  <div class="login card-panel grey black-text center">
                      <h3>Register</h3>
                      <form>
                          <div class="input-field">
                              <i class="fa fa-envelope prefix"> </i> 
                              <input v-model="email" type="text" id="email">
                              <label class="black-text" for="email">Email</label>
                          </div>
                          <div class="input-field">
                              <i class="fa fa-lock prefix"> </i>
                              <input v-model="password" type="password" id="password">
                              <label class="black-text" for="password">Password</label>
                          </div>
                          <button v-on:click="register" class="btn btn-large grey lighten-4 black-text">Register</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'register',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register: function(e) {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert(`Account created for ${this.email}`)
                this.$router.go({path: this.$router.path})
            },
            err => {
                alert(err.message)
            }            
            )
            e.preventDefault()            
        }
    }
}
</script>

<style>

</style>