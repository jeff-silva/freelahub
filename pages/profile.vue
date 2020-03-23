<template><div>
    <div v-if="profile">
    	<div class="row">
    		<div class="col-12 col-md-6">
    			<form @submit.prevent="profileSave();">
					<div class="fom-group">
						<label>Título</label>
						<input type="text" class="form-control" v-model="profile.title">
					</div>

					<div class="fom-group">
						<label>Descrição</label>
						<textarea class="form-control" v-model="profile.description"></textarea>
					</div>

					<div class="fom-group">
						<label>Areas</label>
						<InputProfessionalArea v-model="profile.segments"></InputProfessionalArea>
					</div>

					<div class="row">
						<div class="col">
							<button type="button" class="btn btn-link btn-block" @click="profileEdit();">Limpar</button>
						</div>

						<div class="col">
							<button type="submit" class="btn btn-primary btn-block">Salvar</button>
						</div>
					</div>
				</form>
    		</div>
    		
    		<div class="col-12 col-md-6">
    			<div v-for="p in profiles">
    				<div class="card">
    					<div class="card-header">{{ p.title }}</div>
    					<div class="card-body" v-html="p.description"></div>
    					<div class="card-footer">
    						<a href="javascript:;" class="btn btn-primary btn-sm" @click="profileEdit(p);">Editar</a>
    					</div>
    				</div><br>
    			</div>
    		</div>
    	</div>
    </div>
</div></template>

<script>
import UserProfile from '~/db/UserProfile.js';
import InputProfessionalArea from '~/components/InputProfessionalArea';

export default {
	components: {
		InputProfessionalArea,
	},

	data() {
		return {
			profile: this.profileDefault(),
			profiles: [],
		};
	},

	methods: {
		profileDefault() {
			var data = (new UserProfile()).fields();
			data.userId = this.$store.state.auth.user.uid;
			return data;
		},

		profileEdit(data) {
			this.profile = Object.assign({}, this.profileDefault(), data||{});
		},

		profileSave() {
			(new UserProfile()).save(this.profile).then((resp) => {
				this.profile = this.profileDefault();
				this.profileSearch();
			});
		},

		profileSearch() {
			(new UserProfile()).search([['userId', '==', this.$store.state.auth.user.uid]]).then((resp) => {
				this.profiles = resp;
			});
		}
	},

	mounted() {
		this.profileSearch();
	},
}
</script>