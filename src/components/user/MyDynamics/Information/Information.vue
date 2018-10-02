<template>
    <div class="app">
<div id="ddd">
    <div id="img-group">
        <div class="img-item" v-for="item in imgArr">
            <img :src="item.src" alt="">
        </div>
    </div>
    <div class="add-pic" @click="addPic()" v-show="picFlag">
        <img src="../../../../assets/person/person-15.png" alt="">
        <input name="files" id="uploaderInput" type="file" accept="image/*" multiple/>
    </div>
</div>

    </div>
</template>
<script>
export default {
 data(){
    return {
        imgArr: [],
        picFlag: true
    }
},
methods: {
    // goBack(){
    //     history.go(-1)
    // },
    addPic(){
        var vm = this;
        var input = $("#uploaderInput");
        input.unbind('change').on('change', function (e) {
            var files = input[0].files;
            if (files.length == 2) vm.picFlag = false;
            for (var i = 0; i < files.length; i++) {
                var reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = function () {
                    if (vm.imgArr.length < 2) {
                        vm.imgArr.push({src: this.result});
                        
                    }
                    if (vm.imgArr.length == 2) vm.picFlag = false
                    if (vm.imgArr.length > 2) {
                        Toast({
                            message: '您最多上传六张站点图片',
                            position: 'bottom',
                            duration: 2000
                        });
                        vm.picFlag = false
                    }

                };
            }
        });
    },
},
  
}
</script>
<style>
.app {
    width: 100%;
    height: 100%;
    color: #fff;
}
.hide {
    display: none;
}

.img-item {
    width:148px;
    height: 116px;
    float: left;   
}

.img-item img {
    width: 100%;
    height: 100%;
}


.add-pic {
    width: 148px;
    height: 116px;
    float: left;
    color: #979797;
    position: relative;
}
.add-pic img{
    width: 100%;
    height: 100%;
}
.add-pic input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 0;
}
</style>
