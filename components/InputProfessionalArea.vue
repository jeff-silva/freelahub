<template><div>

  <!-- picker -->
  <div style="position:relative;">
    <div class="input-group">
      <input type="text" class="form-control" :placeholder="placeholder">
      <div class="input-group-append">
        <div class="input-group-text">
          <i class="fa fa-fw fa-search"></i>
        </div>
      </div>
    </div>

    <div class="bg-light shadow" style="position:static; top:100%; width:100%; max-height:300px; overflow:auto; z-index:8;">
      <div v-for="s in segments" v-if="s.parent.length==0">
        <div class="p-2"><small class="text-muted">&nbsp; {{ s.title }}:</small></div>
        <label
          class="p-2 d-block"
          v-for="ss in segments"
          :key="ss.id"
          v-if="ss.parent.indexOf(s.id)>-1"
          style="cursor:pointer;"
        >
          <input type="checkbox" v-model="props.value" :value="ss.id" style="display:none;">
          <span class="fa fa-fw fa-check" v-if="props.value.indexOf(ss.id)>-1"></span>
          <span class="fa fa-fw" v-else></span> {{ ss.title }}
        </label>
      </div>
    </div>
  </div>
  <!-- picker -->
  
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

  <pre>$data: {{ $data }}</pre>
</div></template>

<script>
import ProfessionalSegments from '~/db/ProfessionalSegments';

export default {
  name: 'InputProfessionalArea',

  props: {
    value: {default:function() { return []; }},
    edit: {default:false},
    placeholder: {default:''},
  },

  data() {
    return {
      segment: (new ProfessionalSegments()).fields(),
      segments: {},
      props: Object.assign({}, this.$props),
    };
  },


  methods: {
    segmentSave() {
      var segment = new ProfessionalSegments();
      segment.save(this.segment).then((resp) => {
        this.segmentEdit();
      });
    },

    segmentDelete() {
      (new ProfessionalSegments()).delete(this.segment.id).then((resp) => {
        this.segmentEdit();
      });
    },

    segmentEdit(merge) {
      this.segment = Object.assign((new ProfessionalSegments()).fields(), merge||{});
    },
  },

  mounted() {
    (new ProfessionalSegments()).value((segments) => {
      this.segments = segments;
    })
  }
};
</script>