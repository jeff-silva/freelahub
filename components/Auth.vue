<template><div>
  <div class="row no-gutters">
    <div class="col-12">
      <div class="alert alert-danger" v-if="$store.state.auth.error">
        {{ $store.state.auth.error }}
      </div>
    </div>

    <div class="col-12" v-if="props.form=='login'">
      <form @submit.prevent="loginSubmit();">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="login.post.email">
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input type="password" class="form-control" v-model="login.post.pass">
        </div>

        <button type="submit" class="btn btn-primary btn-block">Login</button>
      </form>
    </div>

    <div class="col-12" v-if="props.form=='register'">
      <form @submit.prevent="registerSubmit();">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model="register.post.email">
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input type="password" class="form-control" v-model="register.post.pass">
        </div>

        <button type="submit" class="btn btn-primary btn-block">Register</button>
      </form>
    </div>

    <div class="col-12" v-if="props.form=='password'">
      <form @submit.prevent="passwordSubmit();">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control">
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input type="password" class="form-control">
        </div>

        <button type="submit" class="btn btn-primary btn-block">Password</button>
      </form>
    </div>

    <div class="col-12"><br></div>

    <div class="col-4">
      <button type="button" class="btn btn-link btn-sm btn-block" @click="setForm('login');">
        Login
      </button>
    </div>

    <div class="col-4">
      <button type="button" class="btn btn-link btn-sm btn-block" @click="setForm('register');">
        Register
      </button>
    </div>

    <div class="col-4">
      <button type="button" class="btn btn-link btn-sm btn-block" @click="setForm('password');">
        Password
      </button>
    </div>
  </div>
</div></template>

<script>
export default {
  name: 'Auth',

  props: {
    form: {default:'login'},
  },

  data() {
    return {
      props: Object.assign({}, this.$props),

      login: {
        post: {
          email: '',
          pass: '',
        },
      },

      register: {
        post: {
          email: '',
          pass: '',
        },
      },

      password: {
        post: {
          email: '',
          pass: '',
        },
      },
    };
  },


  methods: {
    setForm(form) {
      this.props.form = form;
      this.$store.commit('auth/error', false);
    },

    loginSubmit() {
      this.$store.dispatch('auth/login', this.login.post);
    },


    registerSubmit() {
      this.$store.dispatch('auth/register', this.register.post);
    },


    passwordSubmit() {
      alert('registerSubmit');
    },
  },
};
</script>