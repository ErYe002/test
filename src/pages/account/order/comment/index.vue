<template>
  <div class="container">
    <div class="commentHead">
        <img class="headImg" :src='goodsImageUrl' @error="avatarError" />  
        <div class="goodsGrade">
            评分：
            <img class='gradeStar' :src="src1" @click="gradeImgClick(1,1)" />
            <img class='gradeStar' :src="src2" @click="gradeImgClick(1,2)" />
            <img class='gradeStar' :src="src3" @click="gradeImgClick(1,3)" />
            <img class='gradeStar' :src="src4" @click="gradeImgClick(1,4)" />
            <img class='gradeStar' :src="src5" @click="gradeImgClick(1,5)" />
        </div>
    </div>
    <div class="commentBody">
        <div class="commentContent">
            <textarea class="commentContentTextArea" v-model="commentContent" autoheight='true' maxlength="500"
                placeholder="写出真实使用体验，上传9张照片，将有机会选入心得内容，获得更多关注哦" 
            >
            </textarea>
            <p class="canInputNum">
                {{500-commentContent.length}}/500
            </p>
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
    <div class="otherGrade">
        <div class="serviceGrade">
            服务态度：
            <img class='gradeStar' :src="serviceSrc1" @click="gradeImgClick(2,1)" />
            <img class='gradeStar' :src="serviceSrc2" @click="gradeImgClick(2,2)" />
            <img class='gradeStar' :src="serviceSrc3" @click="gradeImgClick(2,3)" />
            <img class='gradeStar' :src="serviceSrc4" @click="gradeImgClick(2,4)" />
            <img class='gradeStar' :src="serviceSrc5" @click="gradeImgClick(2,5)" />
        </div>
        <div class="expressGrade">
            物流服务：
            <img class='gradeStar' :src="expressSrc1" @click="gradeImgClick(3,1)" />
            <img class='gradeStar' :src="expressSrc2" @click="gradeImgClick(3,2)" />
            <img class='gradeStar' :src="expressSrc3" @click="gradeImgClick(3,3)" />
            <img class='gradeStar' :src="expressSrc4" @click="gradeImgClick(3,4)" />
            <img class='gradeStar' :src="expressSrc5" @click="gradeImgClick(3,5)" />
        </div>
    </div>
    <div clsss="submit">
        <button class="submitBtn kd-btn btn-lg" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import api from "@/api/order";
import { mapState,mapActions } from "vuex";
import config from '@/utils/config.js';

export default {
  data() {
    return {
      src1:'/static/images/starBlank.png',
      src2:'/static/images/starBlank.png',
      src3:'/static/images/starBlank.png',
      src4:'/static/images/starBlank.png',
      src5:'/static/images/starBlank.png',
      serviceSrc1:'/static/images/starBlank.png',
      serviceSrc2:'/static/images/starBlank.png',
      serviceSrc3:'/static/images/starBlank.png',
      serviceSrc4:'/static/images/starBlank.png',
      serviceSrc5:'/static/images/starBlank.png',
      expressSrc1:'/static/images/starBlank.png',
      expressSrc2:'/static/images/starBlank.png',
      expressSrc3:'/static/images/starBlank.png',
      expressSrc4:'/static/images/starBlank.png',
      expressSrc5:'/static/images/starBlank.png',
      goodsgrade:0,
      serviceGrade:0,
      expressGrade:0,
      orderId:'',
      goodsId:'',
      goodsImageUrl:'',
      commentContent:'',
      images:[],
      uploadedImgPath:[]
    };
  },
  computed: {
    ...mapState("user", ["token"])
  },
  onLoad(options) {
    this.orderId = options.orderId;
    this.goodsId = options.goodsId;
    this.goodsImageUrl=options.goodsImageUrl == '' || options.goodsImageUrl == null?'https://pic.keede.com//app/images/goods_errimg.png':options.goodsImageUrl;
  },
  methods: {
    ...mapActions('comment',['setCommentedId']),
    gradeImgClick(op,key) {
      switch (key){
        case 1:
            if(op==1){
                this.goodsgrade = 1;
                this.src1='/static/images/starRed.png';
                this.src2='/static/images/starBlank.png';
                this.src3='/static/images/starBlank.png';
                this.src4='/static/images/starBlank.png';
                this.src5='/static/images/starBlank.png';
            }
            else if(op==2){
                this.serviceGrade = 1;
                this.serviceSrc1='/static/images/starRed.png';
                this.serviceSrc2='/static/images/starBlank.png';
                this.serviceSrc3='/static/images/starBlank.png';
                this.serviceSrc4='/static/images/starBlank.png';
                this.serviceSrc5='/static/images/starBlank.png';
            }
            else{
                this.expressGrade = 1;
                this.expressSrc1='/static/images/starRed.png';
                this.expressSrc2='/static/images/starBlank.png';
                this.expressSrc3='/static/images/starBlank.png';
                this.expressSrc4='/static/images/starBlank.png';
                this.expressSrc5='/static/images/starBlank.png';
            }
            break;
        case 2:
            if(op==1){
                this.goodsgrade = 2;
                this.src1='/static/images/starRed.png';
                this.src2='/static/images/starRed.png';
                this.src3='/static/images/starBlank.png';
                this.src4='/static/images/starBlank.png';
                this.src5='/static/images/starBlank.png';
            }
            else if(op==2){
                this.serviceGrade = 2;
                this.serviceSrc1='/static/images/starRed.png';
                this.serviceSrc2='/static/images/starRed.png';
                this.serviceSrc3='/static/images/starBlank.png';
                this.serviecSrc4='/static/images/starBlank.png';
                this.sercieSrc5='/static/images/starBlank.png';
            }
            else{
                this.expressGrade = 2;
                this.expressSrc1='/static/images/starRed.png';
                this.expressSrc2='/static/images/starRed.png';
                this.expressSrc3='/static/images/starBlank.png';
                this.expressSrc4='/static/images/starBlank.png';
                this.expressSrc5='/static/images/starBlank.png';
            }
            break;
        case 3:
            if(op==1){
                this.goodsgrade = 3;
                this.src1='/static/images/starRed.png';
                this.src2='/static/images/starRed.png';
                this.src3='/static/images/starRed.png';
                this.src4='/static/images/starBlank.png';
                this.src5='/static/images/starBlank.png';
            }
            else if(op==2){
                this.serviceGrade = 3;
                this.serviceSrc1='/static/images/starRed.png';
                this.serviceSrc2='/static/images/starRed.png';
                this.serviceSrc3='/static/images/starRed.png';
                this.serviceSrc4='/static/images/starBlank.png';
                this.serviceSrc5='/static/images/starBlank.png';
            }
            else{
                this.expressGrade = 3;
                this.expressSrc1='/static/images/starRed.png';
                this.expressSrc2='/static/images/starRed.png';
                this.expressSrc3='/static/images/starRed.png';
                this.expressSrc4='/static/images/starBlank.png';
                this.expressSrc5='/static/images/starBlank.png';
            }
            break;
        case 4:
            if(op==1){
                this.goodsgrade = 4;
                this.src1='/static/images/starRed.png';
                this.src2='/static/images/starRed.png';
                this.src3='/static/images/starRed.png';
                this.src4='/static/images/starRed.png';
                this.src5='/static/images/starBlank.png';
            }
            else if(op==2){
                this.serviceGrade = 4;
                this.serviceSrc1='/static/images/starRed.png';
                this.serviceSrc2='/static/images/starRed.png';
                this.serviceSrc3='/static/images/starRed.png';
                this.serviceSrc4='/static/images/starRed.png';
                this.serivceSrc5='/static/images/starBlank.png';
            }
            else{
                this.expressGrade = 4;
                this.expressSrc1='/static/images/starRed.png';
                this.expressSrc2='/static/images/starRed.png';
                this.expressSrc3='/static/images/starRed.png';
                this.expressSrc4='/static/images/starRed.png';
                this.expressSrc5='/static/images/starBlank.png';
            }
            break;
        case 5:
            if(op==1){
                this.goodsgrade = 5;
                this.src1='/static/images/starRed.png';
                this.src2='/static/images/starRed.png';
                this.src3='/static/images/starRed.png';
                this.src4='/static/images/starRed.png';
                this.src5='/static/images/starRed.png';
            }
            else if(op==2){
                this.serviceGrade = 5;
                this.serviceSrc1='/static/images/starRed.png';
                this.serviceSrc2='/static/images/starRed.png';
                this.serviceSrc3='/static/images/starRed.png';
                this.serviceSrc4='/static/images/starRed.png';
                this.serviceSrc5='/static/images/starRed.png';
            }
            else{
                this.expressGrade = 5;
                this.expressSrc1='/static/images/starRed.png';
                this.expressSrc2='/static/images/starRed.png';
                this.expressSrc3='/static/images/starRed.png';
                this.expressSrc4='/static/images/starRed.png';
                this.expressSrc5='/static/images/starRed.png';
            }
            break;
      }
    },
    removeImg(key){
        this.images.splice(key,1);
    },
    avatarError(){
        this.goodsImageUrl='https://pic.keede.com//app/images/goods_errimg.png';
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
        api.logging(`第${index+1}次上传图片到服务器`)
        wx.showLoading();
        wx.uploadFile({
            url:config.apiurl + '/api/comment/AddGoodsCommentPicture',
            filePath:currentTemp.images[index],
            name:'file',
            header:{
                SalePlatformId:config.salePlatformId,
                token:currentTemp.token
            },
            success(res){
                api.logging(`第${index+1}次上传图片到服务器成功`,JSON.parse(res.data).Data);
                index++;
                currentTemp.uploadedImgPath = currentTemp.uploadedImgPath.concat(JSON.parse(res.data).Data);
                if(index < currentTemp.images.length){
                    currentTemp.uploadFile(index,total);
                }
                else{
                    api.logging(`触发评价接口评价成功图片数据集合`,currentTemp.uploadedImgPath);
                    api.addGoodsComment(currentTemp.orderId,currentTemp.goodsId,currentTemp.goodsgrade,currentTemp.commentContent,currentTemp.uploadedImgPath,currentTemp.serviceGrade,currentTemp.expressGrade)
                    .then(({Data})=>{
                        wx.showToast({
                            title:"评价成功!",
                            icon:"none"
                        });
                        wx.setStorageSync('isCommentReturn',true)
                        currentTemp.setCommentedId(currentTemp.goodsId);
                        wx.navigateBack({
                            delta:1
                        })
                    }).catch((err)=>{
                    })
                }
            },
            fail(err){
                api.logging(`第${index+1}次上传图片到服务器失败`,err)
                wx.showToast({
                    title:"图片上传失败!",
                    icon:"none"
                });
            },
            complete(){
                wx.hideLoading();
            }
        })
    },
    submit(){
        var that = this;
        if(this.images.length == 0){
            api.addGoodsComment(this.orderId,this.goodsId,this.goodsgrade,this.commentContent,null,this.serviceGrade,this.expressGrade).then(({Data}) => {
                wx.showToast({
                        title:"评价成功!",
                        icon:"none"
                    });
                that.setCommentedId(that.goodsId);
                wx.setStorageSync('isCommentReturn',true)
                wx.navigateBack({
                  delta:1
                })
            })
        }
        else{
            this.uploadedImgPath = [],
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
        padding-bottom: 30rpx;
        .commentContent{
            margin:10px 5px;
            .commentContentTextArea{
                width: 100%;
                font-size:24rpx;
            }
        }
        .canInputNum{
            font-size: 20rpx;
            color:gray;
            text-align: right;
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
    .otherGrade{
        border-top: 20rpx solid #eee;
        padding:0 20rpx;
        .serviceGrade{
            border-bottom: 1px solid #eee;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items:center;
            text-align: center;
            padding:30rpx 0;
            .gradeStar{
                height: 20px;
                width: 20px;
                margin-right: 10px;
            }
        }
        .expressGrade{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items:center;
            text-align: center;
            padding:26rpx 0;
            .gradeStar{
                height: 20px;
                width: 20px;
                margin-right: 10px;
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