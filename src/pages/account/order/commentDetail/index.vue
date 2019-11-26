<template>
  <div class="container">
    <div class="commentHead">
        <img class="headImg" :src="userAvatar" v-if="userAvatar != ''" />
        <img class="headImg" src="/static/images/default_img.gif"  v-if="userAvatar == ''" />
        <div class="userNameDiv">
            <span class="userNameP">{{userName}}</span>
            <div class="goodsGrade">
                <img class="gradeStar" src="/static/images/starBlank.png" v-if="goodsgrade < 1" />
                <img class="gradeStar" src="/static/images/starRed.png" v-if="goodsgrade >= 1" />
                <img class="gradeStar" src="/static/images/starBlank.png" v-if="goodsgrade < 2" />
                <img class="gradeStar" src="/static/images/starRed.png" v-if="goodsgrade >= 2" />
                <img class="gradeStar" src="/static/images/starBlank.png" v-if="goodsgrade < 3" />
                <img class="gradeStar" src="/static/images/starRed.png" v-if="goodsgrade >= 3" />
                <img class="gradeStar" src="/static/images/starBlank.png" v-if="goodsgrade < 4" />
                <img class="gradeStar" src="/static/images/starRed.png" v-if="goodsgrade >= 4" />
                <img class="gradeStar" src="/static/images/starBlank.png" v-if="goodsgrade < 5" />
                <img class="gradeStar" src="/static/images/starRed.png" v-if="goodsgrade >= 5" />
            </div>
        </div>
    </div>
    <div class="commentBody">
        <div class="commentContent">
            <textarea class="commentContentTextArea" v-model="commentContent" autoheight='true' maxlength="500">
            </textarea>
        </div>
        <div class="commentImg">
            <ul class="checkedImg">
                <li class="uploadImgLi" v-for="(item,index) in images" :key="index" >
                    <img class="uploadImg" @click="imagePreview(index)" :src="item"/>
                </li>
            </ul>
        </div>
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
      userAvatar:'',
      userName:'',
      goodsgrade:0,
      commentContent:'',
      images:[]
    //   commentContent:'因为有会员等级价。所以比在这家花店还便宜，赞',
    //   images:["https://pic.keede.com//remark/e17750b0-d689-430a-96bf-54e4842d5acf.jpg",
    //   "https://pic.keede.com//remark/41a56f81-9dee-479a-bf0b-efdd6e710060.jpg",
    //   "https://pic.keede.com//remark/5b10385a-1ee5-4a27-ad5e-78aae0e6cc77.jpg"],
    };
  },
  onLoad(options) {
    // this.userAvatar = "https://pic.keede.com//User/Head/1dcc8fa4-869b-4967-9d45-4620b0abb479.jpeg";
    // this.userName = "15171330197QMY";
    this.userAvatar = options.userAvatar;
    this.userName = options.userName;
    api.getGoodsComment({commentId:options.commentId})
        .then(({Data}) => {
            this.goodsgrade = Data.GoodsScore;
            this.commentContent = Data.Remark;
            this.images = Data.CommentPicture;
        })
    
  },
  methods: {
    imagePreview(index){
        wx.previewImage({
            current: this.images[index],
            urls: this.images
        })
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
            height: 120rpx;
            width: 120rpx;
            margin-right:20rpx;
        }
        .userNameDiv{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .userNameP{
                font-size: 28rpx;
                width: 100%;
                line-height: 30rpx;
                text-align: left;
                margin-bottom: 4rpx;
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
                    margin-right: 4px;
                }
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
                height: 200rpx;
            }
        }
        .commentImg{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-item:center;
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
                }
            }
        }
    }
}
</style>