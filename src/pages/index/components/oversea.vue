<template>
  <article>
    <div class="slideshow">
      <swiper class="swiperClass" autoplay="true" >
        <div class="swiperDiv" v-for="(item,index) in BannerList" :key="index">
          <swiper-item>
            <a href="" >
              <img class="swiperImg" :src="item.ImageUrl" />
            </a>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <!-- <div class="quickNavigation">
      <div class="headBar">
		<div class="tag">
			<img class="tagLogo" src='/static/images/overseaTag2' />
			<p>直邮保税仓</p>
		</div>
		<div class="tag">
			<img class="tagLogo" src='/static/images/overseaTag3' />
			<p>100%正品</p>
		</div>
		<div class="tag">
			<img class="tagLogo" src='/static/images/overseaTag1' />
			<p>全场包税</p>
		</div>
		<div class="tag">
			<img class="tagLogo" src='/static/images/overseaTag4' />
			<p>破损退换</p>
		</div>
      </div>
      <div class="brandShow">
		  <p>BRAND SELECTED|品牌精选</p>
		  <div class="brandWall">
		  </div>
      </div>
    </div> -->
    <div class="topImg">
		<div class="topImgBar">
			<text class="topImgBarText">  FEATURED SPECIALS | 精选特惠</text>
			<em class="topImgBarEm">到货时间<i class="topImgBarEmI">?</i></em>
		</div>
		<a class="topImgBody" :href='AdvertisementTopImage.TargetUrl'>
			<img class="topImgBodyImg" :src='AdvertisementTopImage.ImageUrl' />
		</a>
    </div>
    <div class="middleImg">
	  <a class="midImgNavBg" href="www.baidu.com">
		  <img class="midImgNavBgImg" :src="AdvertisementList[0].ImageUrl" />
		  <a class="midImgNavL" href="www.163.com">
			<img class="midImgNavLImg" :src="AdvertisementList[1].ImageUrl" />
		  </a>
		  <a class="midImgNavR" href="www.163.com">
			<img class="midImgNavRImg" :src="AdvertisementList[2].ImageUrl" />
		  </a>
	  </a>
    </div>
    <div class="bottomImg">
	  <a class="bottomImgA" href="">
		  <img class="bottomImgAImg" :src="AdvertisementBottomImage.ImageUrl" />
	  </a>
    </div>
    <div class="footerShow" >
      <div class="footerLogoNav">
      </div>
      <div class="footerRecommend">
        <img class="footerNavBodyImg" />
        <div class="footerNavBodyContent">
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return {
      //横幅1
      BannerList:[{
			"Id": "d696e44e-0d26-4573-a4f9-5a86b3f14220",
			"OrderIndex": 1,
			"ImageUrl": "https://pic.keede.com/AppImages/525d5f09-7fad-4779-8012-478f128473c2.jpg",
			"TargetUrl": "http://m.kede.com/event/ht201911"
		}, {
			"Id": "9cb68632-aeb8-4fe3-bfd7-21fcc47d27a8",
			"OrderIndex": 2,
			"ImageUrl": "https://pic.keede.com/AppImages/7090a044-3ba4-4cf5-b4c7-efa7dfc29a7a.jpg",
			"TargetUrl": "http://m.kede.com/Motecon3.html"
		}, {
			"Id": "cf71e2e3-28a6-4ed2-a5e1-4f63cb922eb6",
			"OrderIndex": 3,
			"ImageUrl": "https://pic.keede.com/AppImages/70551f81-91b1-464a-a349-5ad6e48c03fa.jpg",
			"TargetUrl": "http://m.kede.com/olens12.html"
		}],
      //品牌2
      BrandList:[{
			"Id": "ebb87125-b088-4d94-8758-bb479ec18838",
			"OrderIndex": 1,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/2ee96400-8fdb-4589-bc22-4b094c16c157.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/cd65c41c-c6ec-4e55-8725-f7a120654950.png",
			"TargetUrl": "http://m.kede.com/acuvueh.html"
		}, {
			"Id": "7fdd2450-077f-471c-98e4-8b195b3d14b5",
			"OrderIndex": 2,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/ebe6e76b-e7f7-4a92-b952-323aebd3392d.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/f429736a-02fe-45b5-9002-c6a3add57700.png",
			"TargetUrl": "http://m.kede.com/shobih.html"
		}, {
			"Id": "30d0357b-3515-4779-85d0-f4b1ae390d73",
			"OrderIndex": 3,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/237a3636-3ecd-40d8-9dd1-9b7430fafb03.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/b5e91ccb-13c7-46c2-97ab-a286ead1aa35.png",
			"TargetUrl": "http://m.kede.com/feliamo.html"
		}, {
			"Id": "35d52ce3-eae4-4704-8087-bcff0020aa8a",
			"OrderIndex": 4,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/2d452df8-3cff-4d7a-8cb2-27085e30f5a9.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/717c563f-38ef-45dc-89a0-95ea86abca0a.png",
			"TargetUrl": "http://m.kede.com/olens.html"
		}, {
			"Id": "38573fef-fbbe-4d78-8f8e-dd1fcde21f40",
			"OrderIndex": 5,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/555eca87-e307-4222-87e0-39d2676f1072.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/d791f6f1-5806-49ee-b040-9a31a312d6dd.png",
			"TargetUrl": "http://m.kede.com/evercolor.html"
		}, {
			"Id": "cdbc7a0e-9f13-49f7-be07-81f4d13ce4fe",
			"OrderIndex": 6,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/529edd35-49dc-4a72-b963-7ddfb3486f85.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/8fea21cf-95d3-4ff6-b969-a878a413bd52.png",
			"TargetUrl": "http://m.kede.com/Diyday.html"
		}, {
			"Id": "88dca3dd-eba1-44f7-bdac-2bfa9ba0f8a2",
			"OrderIndex": 7,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/b316ab62-cb11-4411-936b-792876c3c0aa.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/705ee970-b9cd-460f-a506-84487571a5f5.png",
			"TargetUrl": "http://m.kede.com/lilmoon.html"
		}, {
			"Id": "68904cfc-8c1a-4b7c-b7f7-8559eea12f82",
			"OrderIndex": 8,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/bca24a77-14c3-4200-ad38-6e007e756883.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/8720c775-6e14-4871-8b08-e50f7add6879.png",
			"TargetUrl": "http://m.kede.com/BL.html"
		}, {
			"Id": "73b59576-87e9-44ee-ac04-ff5b00c48d65",
			"OrderIndex": 9,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/ef7e609f-671f-4b5c-8e23-4957fb9fa17d.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/285934a6-1f0a-4e23-b35d-7a3144e4859b.png",
			"TargetUrl": "http://m.kede.com/largan.html"
		}, {
			"Id": "45954eba-93b0-456d-87c8-265a5e5ef05d",
			"OrderIndex": 10,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/cb608a54-f875-46ea-ad90-29543d93e790.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/8ee191a0-9eb1-473c-9bc3-b5a7a94cdf2b.png",
			"TargetUrl": "http://m.kede.com/PienAgeww.html"
		}, {
			"Id": "fb07bdd3-8083-4673-8cf3-911479ae2c10",
			"OrderIndex": 11,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/64c92814-ac8c-4557-a6f8-281e00d85dd1.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/18cc06a6-70fe-4584-9a58-afa99fe4d67b.png",
			"TargetUrl": "http://m.kede.com/minette.html"
		}, {
			"Id": "40cdbc16-1799-4324-b992-6cff640f92e2",
			"OrderIndex": 12,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/189529b3-8690-4169-95db-7d53ef1ee311.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/8cf3b696-10da-418f-8a35-3fa7267a2f3d.png",
			"TargetUrl": "http://m.kede.com/miacareh.html"
		}, {
			"Id": "1a1b29f3-7f3f-4afa-b233-c190346a35db",
			"OrderIndex": 13,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/839d2faa-f184-44cb-934a-4efbcc6254a4.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/77be8a97-8555-4456-99e0-af6e583668ad.png",
			"TargetUrl": "http://m.kede.com/cooper.html"
		}, {
			"Id": "9710cedc-f7c4-41ec-a989-c1ab413431f6",
			"OrderIndex": 14,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/ae6f28d2-cac0-4863-a479-c0f19e4fbf45.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/350a9869-21cd-4540-b6a0-dfe37b870917.png",
			"TargetUrl": "http://m.kede.com/camax.html"
		}, {
			"Id": "2523af59-af16-4fea-b9ad-3d61e1650a2c",
			"OrderIndex": 15,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/f02baabc-c2e3-496f-82f4-84617eb32f00.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/b0689162-b257-4602-b901-6e3919326002.png",
			"TargetUrl": "http://m.kede.com/sancity.html"
		}, {
			"Id": "4325cdc3-54d8-4546-a0e6-988596d1a6f5",
			"OrderIndex": 16,
			"DefaultImageUrl": "https://pic.keede.com/AppImages/f973f6a3-6bbd-44c6-9ffd-9cb06b37d94d.png",
			"ColorImageUrl": "https://pic.keede.com/AppImages/dc37c847-61c8-4c86-abe4-6251432a713d.png",
			"TargetUrl": "http://m.kede.com/sancityre.html"
		}],
      //3 Floor 广告顶部图片
      AdvertisementTopImage:{
			"Id": "a0d60f24-e3f5-496b-b8f0-847b865cf6f6",
			"OrderIndex": 0,
			"LayoutPosition": "上图",
			"ImageUrl": "https://pic.keede.com/AppImages/a9c0d647-5a5b-4388-a062-00b64e468be5.jpg",
			"TargetUrl": "http://m.kede.com/sancityre.html"
		},
      AdvertisementList:[{
			"Id": "956a9374-6b12-4c21-a7d5-c03ceb739d98",
			"OrderIndex": 1,
			"LayoutPosition": "中大图",
			"ImageUrl": "https://pic.keede.com/AppImages/50bc34fb-2da1-42db-b9eb-4223c31cd583.jpg",
			"TargetUrl": "http://m.kede.com/shobih94.html"
		}, {
			"Id": "fac00758-8f6a-47bf-b6c3-5e8c946e1103",
			"OrderIndex": 2,
			"LayoutPosition": "中小图左",
			"ImageUrl": "https://pic.keede.com/AppImages/64fa46b3-60ec-44fa-95af-eb59ccfed592.jpg",
			"TargetUrl": "http://m.kede.com/htyx1.html"
		}, {
			"Id": "cbf3bfea-cee4-49df-9245-e41b89f80deb",
			"OrderIndex": 3,
			"LayoutPosition": "中小图右",
			"ImageUrl": "https://pic.keede.com/AppImages/b0b0c0da-23c3-4091-96bb-a886ad86027f.jpg",
			"TargetUrl": "http://m.kede.com/htyx9.html"
		}],
      AdvertisementBottomImage: {
			"Id": "5a0ca5c8-e087-4171-9a8f-f6eec34ed3d1",
			"OrderIndex": 4,
			"LayoutPosition": "下图",
			"ImageUrl": "https://pic.keede.com/AppImages/2e4532dd-eff7-41a4-a70e-67e093cf98a4.jpg",
			"TargetUrl": "http://m.kede.com/acuvueh2.html"
		},
      OverSeasTabList:[{
        "Key": 4,
        "Value": "价好物美",
        "AdvertisementImageUrl": "https://pic.keede.com/AppImages/585d49c2-725e-4dda-9e1f-5db6d746b500.jpg",
        "TargetUrl": "http://m.kede.com/htyx2.html"
      }, {
        "Key": 5,
        "Value": "新品体验",
        "AdvertisementImageUrl": "https://pic.keede.com/AppImages/d8fbcf00-7786-4418-a7d8-8245dc6ff5d3.jpg",
        "TargetUrl": "http://m.kede.com/htyx1.html"
      }, {
        "Key": 6,
        "Value": "花样彩瞳",
        "AdvertisementImageUrl": "https://pic.keede.com/AppImages/2966e27d-f060-4e19-9eca-26c602a93f81.jpg",
        "TargetUrl": "http://m.kede.com/shobih91.html"
      }, {
        "Key": 7,
        "Value": "透明隐形",
        "AdvertisementImageUrl": "https://pic.keede.com/AppImages/e235426b-fbb4-4450-91a9-ffd286d191a8.jpg",
        "TargetUrl": "http://m.kede.com/acuvueh2.html"
      }, {
        "Key": 8,
        "Value": "日韩隐形",
        "AdvertisementImageUrl": "",
        "TargetUrl": null
      }]
    }
  }

}
</script>

<style lang="less" scoped>
.slideshow{
	width: 355px;
	height: 392px;
	overflow:hidden;
	border-radius:9px;
	margin: 10px;
	.swiperClass{
		width:100%;
		height: 100%;
		.swiperImg{
			width: 100%;
			height: 392px;
		}
	}
}
.topImg{
	overflow:hidden;
	margin: 15px 10px;
	border-radius:16px;
	border:1px solid #c7c7c7;
	width: 100%px;
	.topImgBar{
		height: 33.1px;
		line-height: 33.1px;
		.topImgBarText{
			color: #000;
			display: inline-block;
			margin-left: 15px;
			font-size: 30rpx;
		}
		.topImgBarEm{
			color: #fff;
			background: #A34C2C;
			width: 30%;
			text-align: right;
			display: inline-block;
			float: right;
			font-size: 30rpx;
			.topImgBarEmI{
				display: inline-block;
				width: 15px;
				height: 15px;
				text-align: center;
				line-height: 15px;
				border-radius: 100%;
				border: 1px solid #fff;
				margin-left: 10px;
				margin-right: 8px;
			}
		}
	}
	.topImgBody{
		width:100%;
		height: 234px;
		.topImgBodyImg{
			width: 100%;
			height: 234px;
		}
	}
}
.middleImg{
	overflow:hidden;
	margin: 30rpx 25rpx;
	border-radius:30rpx;
	border:1px solid white;
	width: 700rpx;
	height: 514rpx;
	.midImgNavBg{
		width: 100%;
		height: 514rpx;
		position: relative;
		display: block;
		clear: both;
		.midImgNavBgImg{
			width: 100%;
			height: 514rpx;
		}
		.midImgNavL{
			width: 320rpx;
			height: 158rpx;
			position: absolute;
			left:20rpx;
			bottom: 20rpx;
			border-radius:20rpx;
			overflow: hidden;
			z-index: 2;
			.midImgNavLImg{
				width: 100%;
				height: 100%;
			}
		}
		.midImgNavR{
			width: 320rpx;
			height: 158rpx;
			position: absolute;
			right:20rpx;
			bottom: 20rpx;
			border-radius:20rpx;
			overflow: hidden;
			z-index: 2;
			.midImgNavRImg{
				width: 100%;
				height: 100%;
			}
		}
	}
}
.bottomImg{
	width:700rpx;
	height:282rpx;
	margin: 30rpx 25rpx;
	border-radius:30rpx;
	border:1px solid white;
	overflow: hidden;
	.bottomImgA{
		width: 100%;
		height: 100%;
		.bottomImgAImg{
			width:100%;
			height: 100%;
		}
	}
}
.footerShow{
	width: 700rpx;
	margin: 30rpx 25rpx;
}

</style>