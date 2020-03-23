<template><div>
  
  <!-- edit -->
  <div v-if="edit">
    <div class="row">
      <div class="col-6">
        <form @submit.prevent="segmentSave();">
          <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="segment.title">
          </div>

          <div class="form-group">
            <label>Parent</label>
            <div style="max-height:200px; overflow:auto;">
              <label v-for="s in segments"
                :key="s.id"
                v-if="s.parent.length==0"
              >
                <input type="checkbox" v-model="segment.parent" :value="s.id">
                {{ s.title }}
              </label>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <button type="submit" class="btn btn-primary btn-block btn-sm">Save</button>
            </div>

            <div class="col" v-if="segment.id">
              <button type="button" class="btn btn-link btn-block btn-sm" @click="segmentEdit();">Reset</button>
            </div>

            <div class="col" v-if="segment.id">
              <button type="button" class="btn btn-danger btn-block btn-sm" @click="segmentDelete();">Delete</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-6">
        <div href="javascript:;"
          :class="{actove:s.id==segment.id}"
          v-for="s in segments"
          :key="s.id"
          v-if="s.parent.length==0"
        >
          <a href="javascript:;" @click="segmentEdit(s);" class="bg-primary text-light d-block p-1">
            <strong>{{ s.title }}</strong>
          </a>
          <a href="javascript:;" class="d-inline-block p-1"
            v-for="ss in segments"
            :key="ss.id"
            v-if="ss.parent.indexOf(s.id)>-1"
            @click="segmentEdit(ss);"
            style="margin:0px 2px 2px 0px;"
          >&bullet; {{ ss.title }}</a>
        </div>
      </div>
    </div>
  </div>
  <!-- edit -->

  <!-- picker -->
  <div style="position:relative;" ref="picker">
    <label class="input-group">
      <div class="form-control" style="height:auto; overflow:hidden;">
        <div class="badge" style="margin:0px 4px 0px 0px; background:#ccc;" v-for="(v, vindex) in props.value" v-if="segments[v]">
          {{ segments[v].title }} <a href="javascript:;" class="fa fa-fw fa-remove" @click="props.value.splice(vindex, 1);"></a>
        </div>
        <input type="text" :placeholder="placeholder" @focus="props.show=true;" v-model="props.filter" style="border:none; background:none; outline:none !important;">
      </div>
      <div class="input-group-append">
        <div class="input-group-text">
          <i class="fa fa-fw fa-search"></i>
        </div>
      </div>
    </label>

    <div class="bg-light shadow" style="position:absolute; top:102%; width:100%; max-height:50vh; overflow:auto; z-index:8;" v-if="props.show">
      <div v-for="s in compSegments">
        <div class="p-2">
          <small class="text-muted">&nbsp; {{ s.title }}:</small>
        </div>
        <label v-for="ss in s.children" class="d-block p-1" @click="valueEmit();">
          <input type="checkbox" v-model="props.value" :value="ss.id" style="display:none;">
          <span class="fa fa-fw fa-check" v-if="props.value.indexOf(ss.id)>-1"></span>
          <span class="fa fa-fw" v-else></span> {{ ss.title }}
        </label>
      </div>
    </div>
  </div>
  <!-- picker -->

</div></template>

<script>
import ProfessionalSegments from '~/db/ProfessionalSegments';

export default {
  name: 'InputProfessionalArea',

  props: {
    value: {default:function() { return []; }},
    edit: {default:false},
    placeholder: {default:''},
    show: {default:false},
    filter: {default:''},
  },


  data() {
    return {
      props: Object.assign({}, this.$props),
      segment: (new ProfessionalSegments()).fields(),
      segments: {},
    };
  },


  watch: {
    $props: {
      deep: true,
      handler(val, oval) {
        this.props = Object.assign({}, val);
      },
    },
  },


  computed: {
    compSegments() {
      var filter=this.props.filter.toLowerCase(), segments={};
      for(var i in this.segments) {
        var s = Object.assign({}, this.segments[i]);
        if (s.parent.length==0) {
          s.children = {};

          for(var ii in this.segments) {
            var ss = Object.assign({}, this.segments[ii]);
            if (ss.parent.indexOf(s.id)>-1) {
              if (ss.title.toLowerCase().includes(filter)) {
                s.children[ii] = ss;
              }
            }
          }

          if (Object.values(s.children).length>0) {
            segments[i] = s;
          }
        }
      }
      return segments;
    },
  },


  methods: {
    segmentSave() {
      var segment = new ProfessionalSegments();
      segment.save(this.segment).then((resp) => {
        this.segmentEdit();
        this.segmentSearch();
      });
    },

    segmentDelete() {
      (new ProfessionalSegments()).delete(this.segment.id).then((resp) => {
        this.segmentEdit();
        this.segmentSearch();
      });
    },

    segmentEdit(merge) {
      this.segment = Object.assign((new ProfessionalSegments()).fields(), merge||{});
    },

    segmentSearch() {
      (new ProfessionalSegments()).search().then((segments) => {
        this.segments = segments;
      });
    },

    valueEmit() {
      setTimeout(() => {
        this.$emit('value', this.props.value);
        this.$emit('input', this.props.value);
      }, 100);
    },
  },

  mounted() {
    (new ProfessionalSegments()).search().then((segments) => {
      this.segments = segments;
    });

    window.addEventListener('click', (ev) => {
      if (!this.$refs.picker) return;
      this.props.show = this.$refs.picker.contains(ev.target);
    });

    window.addEventListener('keyup', (ev) => {
      setTimeout(() => {
        if (ev.key!='Tab' || !document.activeElement || !this.$refs.picker) return;
        this.props.show = this.$refs.picker.contains(document.activeElement);
      }, 100);
    });
  }
};
</script>