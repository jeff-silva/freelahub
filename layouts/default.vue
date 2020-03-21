<template><div>
  <AppView :auth="{}">
    <!-- auth -->
    <template v-slot:auth>
      <form action="" style="width:95%; max-width:300px;">
        <div style="background:#eee; height:200px;"></div>
        <br><br>

        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control">
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input type="password" class="form-control">
        </div>

        <button type="submit" class="btn btn-primary btn-block">Login</button>
      </form>
    </template>
    <!-- auth -->

    <!-- logo -->
    <template v-slot:logo>freelahub</template>
    <!-- logo -->

    <!-- header -->
    <template v-slot:header>
      <div class="row">
        <div class="col">-</div>
        <div class="col">-</div>
      </div>
    </template>
    <!-- header -->

    <!-- drawer -->
    <template v-slot:drawer>
      <div style="background:#f5f5f5; padding:25px 15px;">
        <div>User Name</div>
        <div>username@grr.la</div>
      </div>
      <div class="list-group">
        <nuxt-link class="list-group-item" data-close to="/">Dashboard</nuxt-link>
        <nuxt-link class="list-group-item" data-close to="/bbb">Bbb</nuxt-link>
        <nuxt-link class="list-group-item" data-close to="/">Logout</nuxt-link>
      </div>
    </template>
    <!-- drawer -->

    <!-- content -->
    <template v-slot:content>
      <nuxt />
    </template>
    <!-- content -->
  </AppView>
</div></template>


<script>
import AppView from '~/components/AppView.vue';

export default {
  components: {
    AppView,
  }
}
</script>

<style scoped>
* {border-radius: 0px !important;}
.list-group-item {border:none;}
.list-group-item:hover, .list-group-item:focus {background:#f5f5f5;}
</style>
