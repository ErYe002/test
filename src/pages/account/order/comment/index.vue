<template>
  <div class="container">
    <div class="commentHead">
        <div class="headImg">
            <img  :src='goodsImageUrl' @error="avatarError" />  
        </div>
        <div class="goodsName">{{goodsName}}</div>
    </div>
    <div class="commentBody">
        <div class="commentImg">
            <div class="commentImgBtn" @click="chooseImg">
                <img class="cameraIcon" src="/static/images/camera.png" />
            </div>
            <div class="commentImgTag" v-if="images.length>0">
                <div class="commentTag">
                    <div v-if="tags.length==0" class="noTag">
                        添加话题让更多人看到
                    </div>
                    <div v-for="(items,index) in tagsHandle" :key="index" :class="{'tag':true,'tag0':index==0,'tag1':index==1,'tag2':index==2,'tag3':index==3}" >
                        + {{items}}
                        <img class="uploadTagDel" @click="removeTag(index)" src="/static/images/delete.png" />
                    </div>
                    <div :class="{'addTag':true}" @click="addTag">+</div>
                </div>
                <div class="checkedImg">
                    <scroll-view class="swiper-box" scroll-x='true' scroll-with-animation='true'>
                        <div class="uploadImgLi" v-for="(item,index) in images" :key="index" >
                            <img class="uploadImg" @click="imagePreview(index)" :src="item"/> 
                            <img class="uploadImgDel" @click="removeImg(index)" src="/static/images/delete.png" />
                        </div>
                    </scroll-view>
                </div>
            </div>
        </div>
        <div class="commentContent">
            <div class="content-padd">
                <textarea class="commentContentTextArea" v-model="commentContent" autoheight='true' maxlength="500"
                    placeholder="写出真实使用体验，将有机会选入社区内容，获取更多关注" 
                >
                </textarea>
                <p class="canInputNum">
                    {{500-commentContent.length}}/500
                </p>
            </div>
        </div>
    </div>
    <div class="otherGrade">
        <div class="goodsGrade">
            <span class="mark">评<span class="mark-one">评分</span>分</span>
            <img class='gradeStar' :src="src1" @click="gradeImgClick(1,1)" />
            <img class='gradeStar' :src="src2" @click="gradeImgClick(1,2)" />
            <img class='gradeStar' :src="src3" @click="gradeImgClick(1,3)" />
            <img class='gradeStar' :src="src4" @click="gradeImgClick(1,4)" />
            <img class='gradeStar' :src="src5" @click="gradeImgClick(1,5)" />
        </div>
        <div class="serviceGrade">
            <span class="mark">服务态度</span>
            <img class='gradeStar' :src="serviceSrc1" @click="gradeImgClick(2,1)" />
            <img class='gradeStar' :src="serviceSrc2" @click="gradeImgClick(2,2)" />
            <img class='gradeStar' :src="serviceSrc3" @click="gradeImgClick(2,3)" />
            <img class='gradeStar' :src="serviceSrc4" @click="gradeImgClick(2,4)" />
            <img class='gradeStar' :src="serviceSrc5" @click="gradeImgClick(2,5)" />
        </div>
        <div class="expressGrade">
            <span class="mark">物流服务</span>
            <img class='gradeStar' :src="expressSrc1" @click="gradeImgClick(3,1)" />
            <img class='gradeStar' :src="expressSrc2" @click="gradeImgClick(3,2)" />
            <img class='gradeStar' :src="expressSrc3" @click="gradeImgClick(3,3)" />
            <img class='gradeStar' :src="expressSrc4" @click="gradeImgClick(3,4)" />
            <img class='gradeStar' :src="expressSrc5" @click="gradeImgClick(3,5)" />
        </div>
    </div>
    <div class="submit">
        <button class="submitBtn" @click="submit">提交评价</button>
    </div>
    <centerFlip :isShow.sync="isShowTag" @hide="_closeTag">
      <div class="dialog_tag">
          <input type="text" placeholder="输入话题快搜索吧" class="tag_input" @confirm="serachtag" confirm-type="搜索" v-model="targetTag">
          <div class="tag_list">
               <div  v-if="TagLists.length==0" class="noResult">
                    <div>无搜索结果</div>
                    <div>换个关键词试试吧</div>
                </div>
               <scroll-view class="swiper-box" scroll-y='true' scroll-with-animation='true'  v-else>
                    <div class="tagLi" v-for="(item,index) in TagLists" :key="index" @click="showTag(item)">
                        <text class="tag_name">
                            #{{item.Theme}}
                        </text>
                    </div>
                </scroll-view>
                <div class="newtag" @click="addNewTag(targetTag)">
                    + 创建话题 #{{targetTag}}
                </div>
          </div>
      </div>
    </centerFlip>
  </div>
</template>

<script>
import api from "@/api/order";
import { mapState,mapActions } from "vuex";
import config from '@/utils/config.js';
import centerFlip from "@/components/centerFlip";

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
      goodsName:"",
      commentContent:'',
      images:[],
      tags:[],
      tagsHandle:[],
      uploadedImgPath:[],
      isShowTag:false,
      targetTag:"",
      TagLists:[]
    };
  },
  computed: {
    ...mapState("user", ["token"])
  },
   components: {
    centerFlip
  },
  onLoad(options) {
    this.orderId = options.orderId;
    this.goodsId = options.goodsId;
    this.goodsName = options.goodsName;
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
                this.serviceSrc1='/static/images/starYellow.png';
                this.serviceSrc2='/static/images/starBlank.png';
                this.serviceSrc3='/static/images/starBlank.png';
                this.serviceSrc4='/static/images/starBlank.png';
                this.serviceSrc5='/static/images/starBlank.png';
            }
            else{
                this.expressGrade = 1;
                this.expressSrc1='/static/images/starGod.png';
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
                this.serviceSrc1='/static/images/starYellow.png';
                this.serviceSrc2='/static/images/starYellow.png';
                this.serviceSrc3='/static/images/starBlank.png';
                this.serviecSrc4='/static/images/starBlank.png';
                this.sercieSrc5='/static/images/starBlank.png';
            }
            else{
                this.expressGrade = 2;
                this.expressSrc1='/static/images/starGod.png';
                this.expressSrc2='/static/images/starGod.png';
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
                this.serviceSrc1='/static/images/starYellow.png';
                this.serviceSrc2='/static/images/starYellow.png';
                this.serviceSrc3='/static/images/starYellow.png';
                this.serviceSrc4='/static/images/starBlank.png';
                this.serviceSrc5='/static/images/starBlank.png';
            }
            else{
                this.expressGrade = 3;
                this.expressSrc1='/static/images/starGod.png';
                this.expressSrc2='/static/images/starGod.png';
                this.expressSrc3='/static/images/starGod.png';
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
                this.serviceSrc1='/static/images/starYellow.png';
                this.serviceSrc2='/static/images/starYellow.png';
                this.serviceSrc3='/static/images/starYellow.png';
                this.serviceSrc4='/static/images/starYellow.png';
                this.serivceSrc5='/static/images/starBlank.png';
            }
            else{
                this.expressGrade = 4;
                this.expressSrc1='/static/images/starGod.png';
                this.expressSrc2='/static/images/starGod.png';
                this.expressSrc3='/static/images/starGod.png';
                this.expressSrc4='/static/images/starGod.png';
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
                this.serviceSrc1='/static/images/starYellow.png';
                this.serviceSrc2='/static/images/starYellow.png';
                this.serviceSrc3='/static/images/starYellow.png';
                this.serviceSrc4='/static/images/starYellow.png';
                this.serviceSrc5='/static/images/starYellow.png';
            }
            else{
                this.expressGrade = 5;
                this.expressSrc1='/static/images/starGod.png';
                this.expressSrc2='/static/images/starGod.png';
                this.expressSrc3='/static/images/starGod.png';
                this.expressSrc4='/static/images/starGod.png';
                this.expressSrc5='/static/images/starGod.png';
            }
            break;
      }
    },
    removeImg(key){
        this.images.splice(key,1);
        if(this.images.length==0){
            this.tags= [];
            this.tagsHandle=[];
        }
    },
     removeTag(key){
        this.tags.splice(key,1);
        this.tagsHandle.splice(key,1);
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
        wx.uploadFile({
            url:config.apiurl + '/api/comment/AddGoodsCommentPicture',
            filePath:currentTemp.images[index],
            name:'file',
            header:{
                SalePlatformId:config.salePlatformId,
                token:currentTemp.token
            },
            success(res){
                index++;
                currentTemp.uploadedImgPath = currentTemp.uploadedImgPath.concat(JSON.parse(res.data).Data);
                if(index < currentTemp.images.length){
                    currentTemp.uploadFile(index,total);
                }
                else{
                    api.addGoodsComment(currentTemp.orderId,currentTemp.goodsId,currentTemp.goodsgrade,currentTemp.commentContent,currentTemp.uploadedImgPath,currentTemp.serviceGrade,currentTemp.expressGrade,currentTemp.tags)
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
            }
        })
    },
    submit(){
        var that = this;
        if(this.images.length == 0){
            api.addGoodsComment(this.orderId,this.goodsId,this.goodsgrade,this.commentContent,null,this.serviceGrade,this.expressGrade,null).then(({Data}) => {
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
            if(that.tags.length==0){
                wx.showToast({
                    title:"至少添加一个话题",
                    icon:"none"
                })
                return
            }
            this.uploadedImgPath = [],
            this.uploadFile(0,this.images.length)
        }
    },
    addTag(){
        let that = this
        if(that.tags.length>=5){
           wx.showToast({
               title:"话题最多加至5个",
               icon:"none"
           })
           return;
        }
        if(that.TagLists.length<=0){
            api.getGoodsTag().then(({Data})=>{
                if(Data!=null&&Data.length>0){
                    that.TagLists = Data
                }
            })
        }
        
        this.isShowTag = true
    },
    _closeTag(){
        this.isShowTag = false
        this.TagLists = []
        this.targetTag = ""
        wx.hideLoading();
    },
    showTag(data){
        if(!data){
            return;
        }
        if(this.tags.some((item)=>{return item==data.Id})){
            wx.showToast({
                title:"请勿重复添加",
                icon:"none"
            })
            return;
        }
        wx.showLoading();
        //服务器数据
        let arr = [],theme = [];
        arr.push(data.Id);
        theme.push(data.Theme);
        this.tags = this.tags.concat(arr);
        //展示
        let temp = []
        theme.forEach((item)=>{
            if(item.length>4){
               item= item.substr(0,4)+"..."
            }
            temp.push(item)
        })
        this.tagsHandle = this.tagsHandle.concat(temp);

        this._closeTag()
    },
    addNewTag(value){
        let that = this;
        api.insertGoodsTag(encodeURIComponent(value)).then(({Data})=>{//Id
            console.log(Data)
            if(Data!=null){
                //服务器数据
                let arr = [],theme = [];
                arr.push(Data.Id);
                theme.push(Data.Theme);
                that.tags = that.tags.concat(arr);
                //展示
                let temp = []
                theme.forEach((item)=>{
                    if(item.length>4){
                    item= item.substr(0,4)+"..."
                    }
                    temp.push(item)
                })
                that.tagsHandle = that.tagsHandle.concat(temp);

                that._closeTag()
            }
        })
    },
    serachtag(){
         let that = this
        api.searchGoodsTag(encodeURIComponent(this.targetTag)).then(({Data})=>{
            if(Data!=null&&Data.length>0){
                that.TagLists = Data
            }else{
                that.TagLists = []
            }
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
        border-radius: 10px;
        overflow: hidden;
        margin:10px 10px; 
        border: 1px solid #D8D7D7;
        height: 84px;
        .headImg{
            margin-left: 5px;
            margin-right: 5px;
            img{
                height: 73px;
                width: 73px;
                border-radius: 5px;
                overflow: hidden;
            }
        }
        .goodsName{
            height: 60%;
            font-size: 13px;
            color: #0A0A0A;
            font-weight: bold;
            line-height: 20px;
        }
    }
    .commentBody{
        margin:10px 10px;
        .commentContent{
            border: 1px solid #D8D7D7;
            border-radius: 10px;
            .content-padd{
                padding: 10px;
            }
            .commentContentTextArea{
                width: 100%;
                font-size:24rpx;
                height: 110px;
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
            align-items:center;
            height: 110px;
            margin-bottom: 10px;
            .commentImgBtn{
                display: flex;
                flex-direction: column;
                justify-content:center;
                align-items:center;
                height: 110px;
                width: 110px;
                .cameraIcon{
                    height: 110px;
                    width: 110px;
                }
            }
            .commentImgTag{
                display: flex;
                padding: 5px;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                flex: 1;
                height: 100%;
                width: 235px;
                .commentTag{
                    width: 100%;
                    height: 50px;
                    text-overflow: ellipsis;         //超出部分用省略号 ...  来代替
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;           //限制要出现的行数
                    overflow: hidden;
                    position: relative;
                    .noTag{
                        color: #868484;
                        font-size: 12px;
                        display: inline-block;
                    }
                    .tag{
                        padding: 2px 4px;
                        border-radius: 5px;
                        background: #CAB894;
                        margin-left: 5px;
                        font-size: 11px;
                        color: #fff;
                        display: inline-block;
                        margin-top: 5px;
                        position: relative;
                        .uploadTagDel{
                            position: absolute;
                            height: 13px;
                            width:13px;
                            z-index: 2;
                            top:-5px;
                            right: -5px;
                        }
                    }
                     .tag1{
                        background: #a54c24;
                    }
                     .tag2{
                        background: #3aafb8;
                    }
                     .tag3{
                        background: #9c8374;
                    }
                    
                    .addTag{
                        width: 20px;
                        height: 20px;
                        background: #E8E8E8;
                        border-radius: 5px; 
                        text-align: center;
                        line-height: 20px;
                        display: inline-block;
                        margin-left: 5px;
                    }
                    .pos{
                        position: absolute;
                        right: 0;
                        bottom: 0;
                    }
                }
                .checkedImg{
                    display: flex;
                    flex-direction:row;
                    justify-content: flex-start;
                    align-items:center;
                    flex-wrap:wrap;
                    height: 60px;
                    width: 100%;
                    .swiper-box{
                         width: 100%;
                        height: 60px;
                        white-space: nowrap;
                        display: inline-block;
                        overflow: hidden;
                    }
                    .uploadImgLi{
                        position:relative;
                        clear:both;
                        height: 60px;
                        width: 60px;
                        display: inline-block;
                        margin-left: 10px;
                        .uploadImg{
                            height: 50px;
                            width: 50px;
                            margin-top: 10px;
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
    }
    .otherGrade{
        border: 1px solid #D8D7D7;
        margin:10px 10px;
        border-radius: 10px;
        overflow: hidden;
        .goodsGrade{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items:center;
            text-align: center;
            padding:10px 10px;
            .gradeStar{
                height: 17px;
                width: 18px;
                margin-right: 10px;
            }
        }
        .serviceGrade{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items:center;
            text-align: center;
            padding:10px 10px;
            .gradeStar{
                height: 17px;
                width: 18px;
                margin-right: 10px;
            }
        }
        .expressGrade{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items:center;
            text-align: center;
            padding:10px 10px;
            .gradeStar{
                height: 17px;
                width: 18px;
                margin-right: 10px;
            }
        }
        .mark{
            width: 80px;
            color: #484848;
            font-size: 14px;
        }
        .mark-one{
            color: transparent;
        }
    }
    .submit{
        width:100%;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        .submitBtn{
            width: 90%;
            height: 32px;
            background: #CAB894;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            font-size: 14px;
        }
    }
    .dialog_tag{
        position: fixed;
        z-index: 10000;
        left: 0;
        right: 0;
        top:0;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 90%;
        margin: 125px auto;
        padding: 10px;
        .tag_input{
            background: #fff;
            width: 100%;
            height: 20px;
            border-radius: 10px;
            font-size: 12px;
            padding:0 10px;
        }
        .tag_list{
            width: 100%;
            padding:0 10px;
            height: 200px;
            background: #fff;
            border-radius: 10px;
            margin-top: 5px;
            .swiper-box{
                height: 160px;
                width: 100%;
                .tag_name{
                    display: flex;
                    justify-content: flex-start;
                    font-size: 14px;
                    border-bottom: 1px solid #D8D7D7;
                    line-height: 30px;
                }

            }
            .noResult{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 160px;
                width: 100%;
            }
            .newtag{
                height: 40px;
                display:flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 14px;
                background: #fefefe;
            }
        }

    }

}
</style>