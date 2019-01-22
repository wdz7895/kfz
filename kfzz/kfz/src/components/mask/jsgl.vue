<template>
    <div class="mark" @click="isShow">
        <div class="markContent" @click.stop>
        </div>
    </div>
</template>
<script>
export default {
    name:"jsGl",
    methods:{
        isShow(){
            this.$parent.isShow(false)
        }
    }
}
</script>

<style>
    .mark{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }
    .mark .markContent{
        width: 700px;
        height: 500px;
        padding: 30px 80px;
        max-height: 80%;
        background: white;
        max-width: 70%;
    }
</style>
