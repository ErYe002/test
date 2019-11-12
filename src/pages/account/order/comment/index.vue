<template>
  <div class="container">
    <div class="commentHead">
        <img class="headImg" :src='goodsImageUrl' />  
        <div class="goodsGrade">
            评分：
            <img class='gradeStar' :src="src1" @click="gradeImgClick(1)" />
            <img class='gradeStar' :src="src2" @click="gradeImgClick(2)" />
            <img class='gradeStar' :src="src3" @click="gradeImgClick(3)" />
            <img class='gradeStar' :src="src4" @click="gradeImgClick(4)" />
            <img class='gradeStar' :src="src5" @click="gradeImgClick(5)" />
        </div>
    </div>
    <div class="commentBody">
        <div class="commentContent">
            <textarea class="commentContentTextArea" v-model="commentContent">
            </textarea>
        </div>
        <div class="commentImg">
            <div class="commentImgBtn" @click="chooseImg">
                <img class="cameraIcon" src="/static/images/camera.png" />
                <p class="cameraWord">晒图</p>
            </div>
            <ul class="checkedImg">
                <li class="uploadImgLi" v-for="(item,index) in images" :key="index" >
                    <img class="uploadImg" @click="imagePreview(index)" :src="item"/> 
                    <img class="uploadImgDel" @click="removeImg(index)" src="/static/images/delete.png" />
                </li>
            </ul>
        </div>
    </div>
    <div clsss="submit">
        <button class="submitBtn kd-btn btn-lg" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import api from "@/api/order";
import { mapState } from "vuex";
import config from '@/utils/config.js';

export default {
  data() {
    return {
      src1:'/static/images/starBlank.png',
      src2:'/static/images/starBlank.png',
      src3:'/static/images/starBlank.png',
      src4:'/static/images/starBlank.png',
      src5:'/static/images/starBlank.png',
      goodsgrade:0,
      orderId:'',
      goodsId:'',
      goodsImageUrl:'',
      commentContent:'',
      images:[],
    };
  },
  computed: {
    ...mapState("user", ["token"])
  },
  onLoad(options) {
    this.orderId = options.orderId;
    this.goodsId = options.goodsId;
    this.goodsImageUrl=options.goodsImageUrl;
  },
  methods: {
    gradeImgClick(key) {
      switch (key){
        case 1:
            this.src1='/static/images/starRed.png';
            this.src2='/static/images/starBlank.png';
            this.src3='/static/images/starBlank.png';
            this.src4='/static/images/starBlank.png';
            this.src5='/static/images/starBlank.png';
            this.goodsgrade=1;
            break;
        case 2:
            this.src1='/static/images/starRed.png';
            this.src2='/static/images/starRed.png';
            this.src3='/static/images/starBlank.png';
            this.src4='/static/images/starBlank.png';
            this.src5='/static/images/starBlank.png';
            this.goodsgrade=2;
            break;
        case 3:
            this.src1='/static/images/starRed.png';
            this.src2='/static/images/starRed.png';
            this.src3='/static/images/starRed.png';
            this.src4='/static/images/starBlank.png';
            this.src5='/static/images/starBlank.png';
            this.goodsgrade=3;
            break;
        case 4:
            this.src1='/static/images/starRed.png';
            this.src2='/static/images/starRed.png';
            this.src3='/static/images/starRed.png';
            this.src4='/static/images/starRed.png';
            this.src5='/static/images/starBlank.png';
            this.goodsgrade=4;
            break;
        case 5:
            this.src1='/static/images/starRed.png';
            this.src2='/static/images/starRed.png';
            this.src3='/static/images/starRed.png';
            this.src4='/static/images/starRed.png';
            this.src5='/static/images/starRed.png';
            this.goodsgrade=5;
            break;
      }
    },
    removeImg(key){
        this.images.splice(key,1);
    },
    chooseImg(){
        wx.chooseImage({
            sizeType:['original','compressed'],
            sourceType:['album','camera'],
            success:res => {
                const images=this.images.concat(res.tempFilePaths);
                this.images = images.length <= 9 ? images : images.slice(0,9)
                if(images.length <= 9){
                    this.images = images;
                }else{
                    wx.showToast({
                        title:"最多上传9张图片!",
                        icon:"none"
                    });
                    this.images = images.slice(0,9)
                }
            }
        })
    },
    imagePreview(index){
        wx.previewImage({
            current: this.images[index],
            urls: this.images
        })
    },
    uploadFile(index,total){
        var currentTemp = this;
        wx.uploadFile({
            url:config.apiurl + '/api/comment/addgoodscomment',
            filePath:images[index],
            name:'file',
            header:{
                SalePlatformId:config.salePlatformId,
                token:this.token
            },
            success(res){
                index++;
                if(index < images.length){
                    currentTemp.uploadFile(index,total);
                }
                else{
                    currentTemp.api.addGoodsComment(current.orderId,current.goodsId,current.goodsgrade,current.commentContent)
                }
            }
        })
    },
    submit(){
        if(this.images.length == 0){
            api.addGoodsComment(this.orderId,this.goodsId,this.goodsgrade,this.commentContent).then(({Data}) => {
                wx.showToast({
                        title:"评价成功!",
                        icon:"none"
                    });
                wx.navigateBack({
                  delta:1
                })
            })
        }
        else{
            this.uploadFile(0,this.images.length)
        }
    }
  }
};
</script>

<style lang="less" scoped>
.container{
    .commentHead{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        justify-content: flex-start;
        align-items:center;
        text-align: center;
        margin:10px 10px; 
        border-bottom: 1px solid #ececec;
        height: 70px;
        line-height: 70px;
        .headImg{
            height: 60px;
            width: 60px;
            margin-right:15px;
        }
        .goodsGrade{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items:center;
            text-align: center;
            .gradeStar{
                height: 20px;
                width: 20px;
                margin-right: 10px;
            }
        }
    }
    .commentBody{
        margin:10px 10px;
        padding-bottom: 30px;
        .commentContent{
            margin:10px 5px;
            .commentContentTextArea{
                width: 100%;
            }
        }
        .commentImg{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-item:center;
            .commentImgBtn{
                border:1px dashed #ececec;
                display: flex;
                flex-direction: column;
                justify-content:center;
                align-items:center;
                height: 60px;
                width: 60px;
                .cameraIcon{
                    height: 30px;
                    width: 30px;
                }
                .cameraWord{
                    color:rgb(177, 175, 175);
                }
            }
            .checkedImg{
                display: flex;
                flex-direction:row;
                justify-content: flex-start;
                align-item:center;
                flex-wrap:wrap;
                width: 80%;
                .uploadImgLi{
                    position:relative;
                    display: block;
                    clear:both;
                    .uploadImg{
                    height: 60px;
                    width: 60px;
                    margin-left: 10px;
                    margin-bottom: 5px;
                    }
                    .uploadImgDel{
                        position: absolute;
                        height: 20px;
                        width:20px;
                        z-index: 2;
                        top:0;
                        right: 0;
                    }
                }
            }
        }
    }
    .submit{
        .submitBtn{
            width: 300px;
            margin: auto;
        }
    }

}
</style>