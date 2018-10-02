<template>
    <div class="app" v-html="message">
    
    </div>
</template>
<script>
export default {
    data(){
        return{
            message:''
        }
    },
    created(){
        this.getInfo()
    },
    methods:{
        getInfo:function(){
        this.message = JSON.parse(localStorage.getItem('name'))
        console.log( this.message);
        document.write(this.message);
        document.close();
        }
    }
}
</script>
<style>
.app{
    width: 100%;
    height: 100%;
   
}
</style>
