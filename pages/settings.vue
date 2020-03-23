<template><div>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a href="javascript:;" class="nav-link" @click="tab='info';" :class="{active:tab=='info'}">Info</a>
        </li>
        <li class="nav-item">
            <a href="javascript:;" class="nav-link" @click="tab='password';" :class="{active:tab=='password'}">Password</a>
        </li>
    </ul>
    <br>

    Settings

    <pre>$data: {{ $data }}</pre>
</div></template>

<script>
export default {
  data() {
    return {
        tab: 'info',
    };
  },
}
</script>