<template><div>
  <AppView :auth="$store.getters['auth/user']">
    <!-- auth -->
    <template v-slot:auth>
      <div style="width:90%; max-width:400px; background:#eee; padding:15px;">
        <Auth></Auth>
      </div>
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
        <a href="javascript:;" class="list-group-item" data-close @click="$store.dispatch('auth/logout');">Logout</a>
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
import Auth from '~/components/Auth.vue';

export default {
  components: {
    AppView,
    Auth,
  },

  mounted() {
    this.$store.dispatch('auth/check');
  }
}
</script>

<style scoped>
* {border-radius: 0px !important;}
.list-group-item {border:none;}
.list-group-item:hover, .list-group-item:focus {background:#f5f5f5;}
</style>
