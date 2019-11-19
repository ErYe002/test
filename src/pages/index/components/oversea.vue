<template>
  <article>
    <div class="slideshow">
      <swiper class="swiperClass" autoplay="true" 
	  @change="swiperChangeEvent"
	  v-if="BannerList != null && BannerList.length > 0"
	  >
        <div class="swiperDiv" v-for="(item,index) in BannerList" :key="index">
          <swiper-item>
            <a href="" >
              <img class="swiperImg" :src="item.ImageUrl" />
            </a>
          </swiper-item>
        </div>
      </swiper>
	  <ul class="pages">
		<li
			:class="{active: idx == swiperIndex}"
			v-for="(item,idx) in BannerList"
			:key="idx"
		></li>
	  </ul>
    </div>
    <div class="quickNavigation">
      <div class="headBar">
		<div class="tag">
			<img class="tagLogo" src='/static/images/overseaTag2.png' />
			<p class="tagTitle">直邮 保税仓</p>
		</div>
		<div class="tag">
			<img class="tagLogo" src='/static/images/overseaTag3.png' />
			<p class="tagTitle">100%正品</p>
		</div>
		<div class="tag">
			<img class="tagLogo" src='/static/images/overseaTag1.png' />
			<p class="tagTitle">全场包税</p>
		</div>
		<div class="tag">
			<img class="tagLogo" src='/static/images/overseaTag4.png' />
			<p class="tagTitle">破损退换</p>
		</div>
      </div>
		<div class="list-box" v-if="BrandList.length > 0">
			<ul class="list">
				<li class="item" v-for="item in BrandList" :key="item.Id">
				<a click="">
					<img class="normal" :src="item.ColorImageUrl" />
					<!-- <img class="colorful" src="https://pic.keede.com/AppImages/8b0280ce-27ba-415d-86b5-5d12effaecbc.png"/> -->
				</a>
				</li>
			</ul>
			<p class="dorpdown-icon">
				<img
				:class="{up: BrandList.length > 12}"
				src="/static/images/icon_dropdown.png"
				v-if="OriginalBrandList.length > 12"
				@click="toggleBrandEvent"
				/>
			</p>
		</div>
      <!-- <div class="brandShow">
		  <p>BRAND SELECTED|品牌精选</p>
		  <div class="brandWall">
		  </div>
      </div> -->
    </div>
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
		  <div @click="footerLogoNavDivClick(1)" :class="{active:footerLogoNavDivCheck == 1,footerLogoNavDiv:footerLogoNavDivCheck !=1}" >
			  <img v-if="footerLogoNavDivCheck!=1" class="footerLogoNavDivImg" src="/static/images/overseaList1.png" />
			  <img v-if="footerLogoNavDivCheck==1" class="footerLogoNavDivImg" src="/static/images/overseaList1-show.png" />
			  <p class="footerLogoNavDivP">价好物美</p>
			  <span></span>
		  </div>
		  <div @click="footerLogoNavDivClick(2)" :class="{active:footerLogoNavDivCheck == 2,footerLogoNavDiv:footerLogoNavDivCheck !=2}">
			  <img v-if="footerLogoNavDivCheck!=2" class="footerLogoNavDivImg" src="/static/images/overseaList2.png" />
			  <img v-if="footerLogoNavDivCheck==2" class="footerLogoNavDivImg" src="/static/images/overseaList2-show.png" />
			  <p class="footerLogoNavDivP">新品体验</p>
			  <span></span>
		  </div>
		  <div @click="footerLogoNavDivClick(3)" :class="{active:footerLogoNavDivCheck == 3,footerLogoNavDiv:footerLogoNavDivCheck !=3}">
			  <img v-if="footerLogoNavDivCheck!=3" class="footerLogoNavDivImg" src="/static/images/overseaList3.png" />
			  <img v-if="footerLogoNavDivCheck==3" class="footerLogoNavDivImg" src="/static/images/overseaList3-show.png" />
			  <p class="footerLogoNavDivP">花样彩瞳</p>
			  <span></span>
		  </div>
		  <div @click="footerLogoNavDivClick(4)" :class="{active:footerLogoNavDivCheck == 4,footerLogoNavDiv:footerLogoNavDivCheck !=4}" >
			  <img v-if="footerLogoNavDivCheck!=4" class="footerLogoNavDivImg" src="/static/images/overseaList4.png" />
			  <img v-if="footerLogoNavDivCheck==4" class="footerLogoNavDivImg" src="/static/images/overseaList4-show.png" />
			  <p class="footerLogoNavDivP">透明隐形</p>
			  <span></span>
		  </div>
		  <div @click="footerLogoNavDivClick(5)" :class="{active:footerLogoNavDivCheck == 5,footerLogoNavDiv:footerLogoNavDivCheck !=5}" >
			  <img v-if="footerLogoNavDivCheck!=5" class="footerLogoNavDivImg" src="/static/images/overseaList5.png" />
			  <img v-if="footerLogoNavDivCheck==5" class="footerLogoNavDivImg" src="/static/images/overseaList5-show.png" />
			  <p class="footerLogoNavDivP">日韩隐形</p>
			  <span></span>
		  </div>
      </div>
      <div class="footerRecommend">
        <img class="footerNavBodyImg" v-if="recommendCheck == 1" :src="OverSeasTabList[0].AdvertisementImageUrl" />
		<img class="footerNavBodyImg" v-if="recommendCheck == 2" />
		<img class="footerNavBodyImg" v-if="recommendCheck == 3" />
		<img class="footerNavBodyImg" v-if="recommendCheck == 4" />
		<img class="footerNavBodyImg" v-if="recommendCheck == 5" />
        <div class="footerNavBodyContent">
			<div class="recItemDiv" v-for="item in RecommendList" :key="item.key">
				<a class="recItemA" >
					<img class="recImg" :src="item.ImageUrl" />
					<p class="recTitle">{{item.GoodsName}}</p>
					<p class="recNational">{{item.National}}</p>
					<p class="recDesc">{{item.ShortDescription}}</p>
					<div class="recPrice">
						<i class="recPraiseProportion">
							{{item.PraiseProportion}}好评
						</i>
						<em class="recSalePrice">
							￥{{item.SalePrice}}
						</em>
						<em class="recPriceLabel" v-if="item.PriceLabel != ''">
							{{item.PriceLabel}}
						</em>
						<em class="recShopCartLogo">
							<img class="recShopCartLogoImg" src="/static/images/redCart.png" />
						</em>
					</div>
				</a>
			</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return {
	  recommendCheck:1,
	  swiperIndex:0,
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
		}],
	  OriginalBrandList:[{
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
	  }],
	  RecommendList: [{
			"National": "上海保税区",
			"SeoCode": "cooper2",
			"GoodsName": "酷柏奥克拉UltraFlex 1 Day Extra睛润日拋30片",
			"ImageUrl": "https://pic.keede.com/MobileMain/ea8681b8-2fb6-42ea-b6a5-495b38c66b1b-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 117.00,
			"PriceLabel": "已降2元",
			"PraiseProportion": "80.0%",
			"ShortDescription": "台湾原装进口"
		}, {
			"National": "上海保税区",
			"SeoCode": "largan1",
			"GoodsName": "星欧珠光彩色日拋隐形眼镜10片裝-巴黎金",
			"ImageUrl": "https://pic.keede.com/MobileMain/94b31b25-2720-4ab8-bdad-67cec85ad6aa-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 86.00,
			"PriceLabel": "已降3元",
			"PraiseProportion": "100.0%",
			"ShortDescription": "双眸闪耀珍珠光泽"
		}, {
			"National": "韩国",
			"SeoCode": "olens16",
			"GoodsName": "OLENS Someday 清新系列彩色隐形眼镜月抛2片装-甜心棕色",
			"ImageUrl": "https://pic.keede.com/MobileMain/2c019649-a614-4382-a61d-45a6fe589b48-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 127.00,
			"PriceLabel": "已降17元",
			"PraiseProportion": "100.0%",
			"ShortDescription": ""
		}, {
			"National": "韩国",
			"SeoCode": "olens57",
			"GoodsName": "OLENS Purspur 纯臻系列彩色隐形眼镜季抛1片装-柔润棕色",
			"ImageUrl": "https://pic.keede.com/MobileMain/9d1efc6f-0df5-4582-869b-d05116b194d7-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 135.00,
			"PriceLabel": "已降9元",
			"PraiseProportion": "",
			"ShortDescription": ""
		}, {
			"National": "韩国",
			"SeoCode": "olens22",
			"GoodsName": "OLENS Blossom 樱花3色彩色隐形眼镜月抛2片装-樱花粽色",
			"ImageUrl": "https://pic.keede.com/MobileMain/76f72a65-2c39-4c3e-a47f-929ff58f4a38-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 122.00,
			"PriceLabel": "已降15元",
			"PraiseProportion": "100.0%",
			"ShortDescription": ""
		}, {
			"National": "韩国",
			"SeoCode": "olens31",
			"GoodsName": "OLENS Spanish 西班牙系列彩色隐形眼镜月抛2片装-滢彩绿色",
			"ImageUrl": "https://pic.keede.com/MobileMain/a9b35f18-8772-46e6-a0cc-708217a4ee8f-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 122.00,
			"PriceLabel": "已降15元",
			"PraiseProportion": "100.0%",
			"ShortDescription": ""
		}, {
			"National": "韩国",
			"SeoCode": "olens77",
			"GoodsName": "OLENS Silicone 狗狗眼彩色隐形眼镜半年抛1片装-自然棕色",
			"ImageUrl": "https://pic.keede.com/MobileMain/9c591b73-b85a-4ec5-a18e-e7fa1955f178-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 88.00,
			"PriceLabel": "已降1元",
			"PraiseProportion": "100.0%",
			"ShortDescription": ""
		}, {
			"National": "日本",
			"SeoCode": "shobih91",
			"GoodsName": "SHO-BI新PienAge55美妆彩片日抛型12片-101_GIRLY",
			"ImageUrl": "https://pic.keede.com/MobileMain/b7a08cd1-d890-48a2-9168-4c537e895ab4-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 144.00,
			"PriceLabel": "已降4元",
			"PraiseProportion": "100.0%",
			"ShortDescription": ""
		}, {
			"National": "上海保税区",
			"SeoCode": "cooper1",
			"GoodsName": "酷柏奥克拉UltraFlex 55双周抛6片",
			"ImageUrl": "https://pic.keede.com/MobileMain/3e72c239-767a-4df2-adbc-7a64cc2343af-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 93.00,
			"PriceLabel": "已降6元",
			"PraiseProportion": "88.9%",
			"ShortDescription": "台湾原装进口"
		}, {
			"National": "韩国",
			"SeoCode": "olens61",
			"GoodsName": "OLENS SIO幻彩系列彩色隐形眼镜半年抛1片装-自然棕色",
			"ImageUrl": "https://pic.keede.com/MobileMain/7838bdeb-b1a6-44bc-a823-e394105845d2-350-350.jpg",
			"BrandImageUrl": "",
			"SalePrice": 134.00,
			"PriceLabel": "",
			"PraiseProportion": "100.0%",
			"ShortDescription": ""
		}],
	footerLogoNavDivCheck:1,
    }
  },
  methods:{
	//同步swiper page
    swiperChangeEvent(e) {
      this.swiperIndex = e.mp.detail.current;
    },
	//显示所有品牌
    toggleBrandEvent() {
      this.BrandList =
        this.BrandList.length == this.OriginalBrandList.length
          ? this.OriginalBrandList.slice(0, 12)
          : this.OriginalBrandList;
	},
	footerLogoNavDivClick(key){
		this.footerLogoNavDivCheck=key;
	}
  }

}
</script>

<style lang="less" scoped>
.slideshow{
	width:710rpx;
	margin: 10px;
	.swiperClass{
		width: 710rpx;
		height: 771rpx;
		overflow:hidden;
		border-radius:9px;
		
		height: 711rpx;
		.swiperImg{
			width: 100%;
			height: 711rpx;
		}
	}
	.pages {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4px;
      li {
        width: 7.5px;
        height: 3px;
        background: #f7e6c3;
        margin: 0 5px;
        border-radius: 5px;
        &.active {
          width: 36.5px;
          background: #3e3a39;
        }
      }
    }
}
.quickNavigation{
	width:700rpx;
	margin: 30rpx 25rpx;
	border:1px solid #e9e9e9;
	border-radius:20rpx;
	overflow:hidden;
	.headBar{
		display:flex;
		align-item:center;
		background: #cfbb98;
		height: 112rpx;
		width: 100%;
		margin-bottom:15rpx;
		.tag{
			width: 25%;
			height: 77.4rpx;
			margin:auto;
			display:flex;
			flex-direction: column;
			align-items: center;
			.tagLogo{
				width:35rpx;
				height: 33rpx;
			}
			.tagTitle{
				margin-top: 7.6rpx;
				font-size: 24rpx;
				text-align: center;
				color:white;
			}
		}
	}
	.list-box {
		position: relative;
		.list {
			display: flex;
			flex-wrap: wrap;
			padding: 0 14px 5px;
			.item {
			flex: 0 0 10%;
			box-sizing: border-box;
			border-bottom: 0.5px solid #e9e9e9;
			border-right: 0.5px solid #e9e9e9;
			img {
				display: block;
				width: 160rpx;
				height: 90rpx;
			}
			// &:nth-child(-n+4){
			//   border-top: none;
			// }
			&:nth-child(4n) {
				border-right: none;
			}
			}
		}
		.dorpdown-icon {
			position: absolute;
			bottom: 5px;
			height: 1px;
			width: 100%;
			background: #fff;
			left: 0;
			right: 0;
			margin: 0 auto;
			img {
			display: block;
			position: absolute;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 20.5px;
			height: 10.5px;
			top: -2px;
			&.up {
				transform: rotateZ(180deg);
			}
			}
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
	
	.footerLogoNav{
		display: flex;
		flex-direction: row;
		flex-wrap:nowrap;
		width:100%;
		margin-bottom: 10rpx;
		.footerLogoNavDiv{
			display: flex;
			flex-direction: column;
			align-items:center;
			width: 20%;
			position: relative;
			.footerLogoNavDivImg{
				width: 36rpx;
				height: 36rpx;
			}
			.footerLogoNavDivP{
				font-size: 26rpx;
				margin-bottom: 10rpx;
			}
		}
		.active{
			display: flex;
			flex-direction: column;
			align-items:center;
			width: 20%;
			position: relative;
			color:#A74C2D;
			.footerLogoNavDivImg{
				width: 36rpx;
				height: 36rpx;
			}
			.footerLogoNavDivP{
				font-size: 26rpx;
				margin-bottom: 4rpx;
			}
			// .footerLogoNavDivP:after{
			// 	height: 4rpx;
			// 	width: 50rpx;
			// 	background: #A74C2D;
			// }
			span{
				height: 4rpx;
				width: 50rpx;
				background: #A74C2D;
			}
		}
		.footerLogoNavDiv:nth-child(-n+4):before{
			content:"";
			width:1px;
			height: 80%;
			top:10%;
			right: 0;
			background:#f5f5f5;
			position: absolute;
		}
	}
	.footerRecommend{
		width: 100%;
		border-radius:30rpx;
		background: #f5f5f5;
		overflow: hidden;
		.footerNavBodyImg{
			width: 100%;
			height: 294rpx;
		}
		.footerNavBodyContent{
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding-left: 2%;
			padding-top: 1%;
			.recItemDiv{
				width: 43%;
				height: 530rpx;
				padding: 2%;
				margin-bottom: 14rpx;
				margin-right: 2%;
				border-radius:20rpx;
				overflow: hidden;
				background: #fff;
				.recItemA{
					display: flex;
					flex-direction:column;
					width:100%;
					.recImg{
						width: 100%;
						height: 306rpx;
					}
					.recTitle{
						color: #B6A380;
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						min-height: 75rpx;
					}
					.recNational{
						background: #C4C5C5;
						color: #fff;
						border-radius: 20rpx;
						font-size: 24rpx;
						display: inline-block;
						padding: 0 10rpx;
						width: fit-content;
					}
					.recDesc{
						color: #878788;
						font-size: 22rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						min-height: 68rpx;
					}
					.recPrice{
						width: 100%;
						display:flex;
						flex-direction: row;
						flex-wrap:nowrap;
						justify-content: space-around;
						.recPraiseProportion{
							color:#878788;
							font-size: 18rpx;
							margin:auto;
						}
						.recSalePrice{
							color:#e25256;
							font-size: 30rpx;
							margin:auto;
						}
						.recPriceLabel{
							color:#fff;
							font-size: 14rpx;
							background: #E25256;
							border-radius:40%;
							margin: auto;
							padding: 8rpx;
						}
						.recShopCartLogo{
							display: flex;
							flex-direction: row;
							align-items: center;
							.recShopCartLogoImg{
								width:30rpx;
								height: 30rpx;;
							}
						}
					}
				}
			}
		}
	}
}

</style>