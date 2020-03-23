<template><div>
  <AppView :auth="$store.getters['auth/user']" :loading="false">
    <!-- loading -->
    <template v-slot:loading>
      <div style="position:fixed; top:0px; left:0px; width:100%; height:100%; background:#ffffff99; z-index:9; display:flex; align-items:center; justify-content:center;">
        <i class="fa fa-fw fa-spin fa-spinner"></i> Loading...
      </div>
    </template>
    <!-- loading -->

    <!-- auth -->
    <template v-slot:auth>
      <div style="width:90%; max-width:400px; background:#eee; padding:15px;">
        <Auth></Auth>
      </div>
    </template>
    <!-- auth -->

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
        <div class="row no-gutters align-items-center">
          <div class="col-3">
            <img :src="$store.state.auth.user.photoURL" alt="" style="width:100%; border-radius:50% !important;">
          </div>
          <div class="col p-3">
            <div>{{ $store.state.auth.user.displayName }}</div>
            <div>{{ $store.state.auth.user.email }}</div>
          </div>
        </div>
      </div>
      <div class="list-group">
        <nuxt-link class="list-group-item" data-close to="/">Dashboard</nuxt-link>
        <nuxt-link class="list-group-item" data-close to="/settings">Settings</nuxt-link>
        <nuxt-link class="list-group-item" data-close to="/profile">Profile</nuxt-link>
        <nuxt-link class="list-group-item" data-close to="/test">Test</nuxt-link>
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
import { mapGetters } from 'vuex';
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
