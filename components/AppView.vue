<template><div class="app-view">

  <div v-if="auth">
    <!-- drawer -->
    <transition enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster" :duration="300">
      <div v-if="drawerShow && isMobile" class="animated fadeIn" style="position:fixed; top:0px; left:0px; width:100%; height:100vh; overflow:auto; cursor:pointer; background:#00000044; z-index:10;" @click.self="drawerShow=false;">
        <div class="animated fadeInLeft" style="width:80%; height:100vh; background:#fff; cursor:default; animation-duration:300ms;">
          <slot name="drawer">&lt;template v-slot:drawer&gt;&hellip;&lt;/template&gt;</slot>
        </div>
      </div>
    </transition>
    <!-- drawer -->

    <!-- header -->
    <div class="p-2" :class="headerClasses" style="position:fixed; top:0px; left:0px; width:100%; z-index:9; box-shadow:0px 0px 25px 5px #00000033;" ref="header">
      <div class="row no-gutters align-items-center">
        <div :class="props.leftClasses">
          <slot name="logo">&lt;template v-slot:logo&gt;&hellip;&lt;/template&gt;</slot>
        </div>

        <div :class="props.rightClasses">
          <div class="row no-gutters align-items-center">
            <div class="col-1 d-md-none">
            	<a href="javascript:;" class="fa fa-fw fa-bars" @click="drawerShow=!drawerShow;"></a>
            </div>
            <div class="col">
              <slot name="header">&lt;template v-slot:header&gt;&hellip;&lt;/template&gt;</slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- header -->

    <!-- body -->
    <div class="row no-gutters" style="height:100vh;">
      <div :class="props.leftClasses" style="height:100vh; overflow:auto; background:#eee;" :style="'padding-top:'+headerHeight+'px !important;'" ref="drawer">
        <slot name="drawer">&lt;template v-slot:drawer&gt;&hellip;&lt;/template&gt;</slot>
      </div>

      <div :class="props.rightClasses" style="height:100vh; overflow:auto;" :style="'padding-top:'+headerHeight+'px !important;'">
        <div style="padding:10px;">
          <slot name="content">&lt;template v-slot:content&gt;&hellip;&lt;/template&gt;</slot>
        </div>
      </div>
    </div>
    <!-- body -->
  </div>

  <div v-else class="app-view-auth">
    <slot name="auth">&lt;template v-slot:auth&gt;&hellip;&lt;/template&gt;</slot>
  </div>
</div></template>

<script>
export default {
  name: 'AppView',
  props: {
    auth: {default:false},
    leftClasses: {default:'d-none d-md-block col-4 col-md-2'},
    rightClasses: {default:'col'},
    headerClasses: {default:'bg-light'},
  },

  data() {
    return {
      props: Object.assign({}, this.$props),
      isMobile: false,
      appHeight: 0,
      headerHeight: 0,
      bodyHeight: 0,
      drawerShow: false,
    };
  },

  methods: {
    refreshSizes() {
      this.isMobile = document.body.offsetWidth<=768;
      this.appHeight = this.$el.offsetHeight;
      this.headerHeight = (this.$refs.header? this.$refs.header.offsetHeight: 0);
      this.bodyHeight = this.appHeight-this.headerHeight;
    },
  },

  watch: {
  	$props: {
  		deep: true,
  		handler() {
  			setTimeout(this.refreshSizes, 100);
  		},
  	},
  },

  mounted() {
    this.refreshSizes();
    window.addEventListener('resize', this.refreshSizes);

    this.$el.addEventListener('click', (ev) => {
      var target=ev.target, parent=ev.target.parentNode;
      if ((target && typeof target.dataset.close!='undefined') || (parent && typeof parent.dataset.close!='undefined')) {
        this.drawerShow = false;
      }
    });
  },
};
</script>

<style>
.app-view {position:relative; height:100vh;}
.app-view-auth {height:100vh; display:flex; align-items:center; justify-content:center;}
</style>