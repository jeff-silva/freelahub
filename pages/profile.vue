<template><div>
    <div v-if="profile">
    	<form @submit.prevent="profileSave();">
    		<div class="fom-group">
    			<label>Título</label>
    			<input type="text" class="form-control" v-model="profile.title">
    		</div>

    		<button type="submit" class="btn btn-primary btn-block">Salvar</button>
    	</form>
    </div>
    <pre>$data: {{ $data }}</pre>
</div></template>

<script>
export default {
  data() {
    return {
    	profile: false,
        profiles: {},
        segments: [
        	{id:'', title:'TI', subs: []},
        	{id:'', title:'Design', subs: [
        		{id:'', title:'Animação', subs: []},
        		{id:'', title:'Autocad/Modelagem 3D', subs: []},
        		{id:'', title:'Logos', subs: []},
        		{id:'', title:'Mockup sites/sistemas/aplicativos', subs: []},
        		{id:'', title:'Diagramador', subs: []},
        		{id:'', title:'Edição de fotos', subs: []},
        		{id:'', title:'Ilustração/Artes gráficas', subs: []},
        		{id:'', title:'Outros', subs: []},
        	]},
        	{id:'', title:'Assistência Técnica', subs: [
        		{id:'', title:'Celulares, smartphones, tablets e computadores', subs: []},
        		{id:'', title:'Eletrônicos', subs: []},
        		{id:'', title:'Eletrodomésticos', subs: []},
        		{id:'', title:'Redes', subs: []},
        		{id:'', title:'Câmeras', subs: []},
        		{id:'', title:'Geladeiras e freezers', subs: []},
        		{id:'', title:'Outros', subs: []},
        	]},
        	{id:'', title:'Aulas', subs: [
        		{id:'', title:'Artes e artesanatos', subs: []},
        		{id:'', title:'Dança', subs: []},
        		{id:'', title:'Reforço escolar', subs: []},
        		{id:'', title:'Esportes', subs: []},
        		{id:'', title:'Idiomas', subs: []},
        		{id:'', title:'Informática', subs: []},
        		{id:'', title:'Música', subs: []},
        		{id:'', title:'Outros', subs: []},
        	]},
        	{id:'', title:'Automóveis', subs: [
        		{id:'', title:'Mecânica', subs: []},
        		{id:'', title:'Vidraçaria', subs: []},
        		{id:'', title:'Guincho', subs: []},
        		{id:'', title:'Outros', subs: []},
        	]},
        	{id:'', title:'Consultoria', subs: [
        		{id:'', title:'Assessor', subs: []},
        		{id:'', title:'Contador', subs: []},
        		{id:'', title:'Detetive', subs: []},
        		{id:'', title:'Digitação e digitalização de documentos', subs: []},
        		{id:'', title:'Pesquisas', subs: []},
        		{id:'', title:'Produção/padronização/revisão de conteúdo', subs: []},
        		{id:'', title:'Segurança', subs: []},
        		{id:'', title:'Outros', subs: []},
        	]},
        	{id:'', title:'Festas e Eventos', subs: [
        		{id:'', title:'Animação de Festas', subs: []},
        		{id:'', title:'Buffet, Churrascaria, Confeitaria', subs: []},
        		{id:'', title:'Bartender, Garçon', subs: []},
        		{id:'', title:'Decoração, Equipamentos', subs: []},
        		{id:'', title:'Video, Fotografia', subs: []},
        		{id:'', title:'Recepção, Cerimônia', subs: []},
        		{id:'', title:'Segurança', subs: []},
        		{id:'', title:'Outros', subs: []},
        	]},
        	{id:'', title:'Moda e Beleza', subs: []},
        	{id:'', title:'Reformas e Reparos', subs: []},
        	{id:'', title:'Saúde', subs: []},
        	{id:'', title:'Família', subs: []},

        	{id:'', title:'Administração e Contabilidade', subs: []},
        	{id:'', title:'Advogado e Leis', subs: []},
        	{id:'', title:'Atendimento ao Consumidor', subs: []},
        	{id:'', title:'Design e Criação', subs: []},
        	{id:'', title:'Engenharia e Arquitetura', subs: []},
        	{id:'', title:'Escrita', subs: []},
        	{id:'', title:'Fotografia e Audiovisual', subs: []},
        	{id:'', title:'Suporte Administrativo', subs: []},
        	{id:'', title:'Tradução', subs: []},
        	{id:'', title:'Vendas e Marketing', subs: []},
        	{id:'', title:'TI', subs: []},
        ],
    };
  },

  methods: {
  	profileDefault(merge) {
  		return Object.assign({
  			userId: this.$store.state.auth.user.uid,
  			title: this.$store.state.auth.user.displayName,
  			description: '',
  			contacts: [],
  			portfolio: [],
  		}, merge||{});
  	},

  	profileSave() {
  		this.$firebaseDbSave('user-profile', this.profile);
  	},
  },

  mounted() {
  	this.$firebaseDb('user-profile').orderByChild('userId').equalTo(this.$store.state.auth.user.uid).on('value', (snap) => {
  		this.profiles = snap.val() || {};
  		if (Object.values(this.profiles).length==0) {
  			this.profile = this.profileDefault();
  		}
  		else {
  			this.profile = this.profileDefault(Object.values(this.profiles)[0]);
  		}
  	});
  },
}
</script>