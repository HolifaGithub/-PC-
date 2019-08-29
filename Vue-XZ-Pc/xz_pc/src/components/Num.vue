<template>
	<div>
	<button class="btn btn-outline-secondary p-2 border mr-1" type="button" @click="change(-1)">-</button>
    <input type="text" class="form-control p-2 d-inline-block w-50 text-center" :value="n">
    <button class="btn btn-outline-secondary p-2 border ml-1	" type="button" @click="change(1)">+</button>
    </div>
</template>

<script>
	export default{
				data:function(){
					return {
						n:1
					}
				},
				methods:{
					change(i){
						if(i==-1){
							if(this.n>=2)
							 this.n--;
						}
						else 
						   this.n++;
					}
				},
				updated(){
				    this.$emit('task',this.n);
				}
		}
</script>

<style>
</style>