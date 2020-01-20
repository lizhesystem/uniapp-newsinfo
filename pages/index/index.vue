<template>
	<view class="content">
		<!-- 轮播图区域 -->
		<swiper indicator-dots autoplay circular>
			<swiper-item v-for="(item,index) in navList" :key="index"><image :src="item.pic"></image></swiper-item>
		</swiper>
		<!-- 四宫格区域 -->
		<view class="nav">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navItemClick(item.path)">
				<view :class="'iconfont ' + item.icon"></view>
				<text>{{ item.title }}</text>
			</view>
		</view>
		<!-- 商品区域,封装组件-->
		<view class="goods">
			<view class="goods-text">推荐商品</view>
			<goodsItems @goodsItemClick="goGoodsDetail" :goods="goodsList"></goodsItems>
		</view>
	</view>
</template>

<script>
import goodsItems from '../../components/goodsList.vue';

export default {
	data() {
		return {
			swipers: [],
			goodsList: [],
			pageindex: 1,
			navList: [
				{
					icon: 'icon-ziyuan',
					title: '年货商城',
					path: '/pages/goods/goods',
					pic:'../../static/images/pic1.jpg'
				},
				{
					icon: 'icon-guanyuwomen',
					title: '联系我们',
					path: '/pages/contact/contact',
					pic:'../../static/images/pic2.jpg'
				},
				{
					icon: 'icon-tupian',
					title: '社区图片',
					path: '/pages/pics/pics',
					pic:'../../static/images/pic3.jpg'
				},
				{
					icon: 'icon-shipin',
					title: '直播购物',
					pic:'../../static/images/pic4.jpg'
				}
			]
		};
	},
	onLoad() {
		// this.getSwiper();
		this.getgoodsList();
	},
	methods: {
		// 获取轮播图方法
		// async getSwiper() {
		// 	const swiperList = await this.$api({
		// 		url: '/api/getlunbo'
		// 	});
		// 	this.swipers = swiperList.data.message;
		// },
		// 获取商品列表方法
		async getgoodsList() {
			const { data: res } = await this.$api({
				url: '/api/getgoods?pageindex=' + this.pageindex
			});
			// 每次获取新的数据合并数据
			this.goodsList = [...this.goodsList, ...res.message];
		},
		// 下拉到底的触发获取商品列表数据
		onReachBottom() {
			if (this.goodsList.length % this.pageindex !== 0) return false;
			this.pageindex = this.pageindex += 1;
			this.getgoodsList();
		},
		// 编程式导航跳转对应的四宫格
		navItemClick(url) {
			uni.navigateTo({
				url: url
			});
		},
		// 跳转到详情页
		goGoodsDetail(id) {
			uni.navigateTo({
				url: '../goods-detail/goods-detail?id=' + id
			});
		}
	},
	components: {
		goodsItems
	}
};
</script>

<style lang="scss">
page {
	width: 750rpx;
}
.content {
	// 轮播图区域
	swiper {
		height: 380rpx;
		image {
			height: 100%;
			width: 100%;
		}
	}
	// 导航区域
	.nav {
		display: flex;
		.nav-item {
			width: 25%;
			text-align: center;
			view {
				width: 120rpx;
				height: 120rpx;
				background-color: $uni-index-color;
				border-radius: 60rpx;
				line-height: 120rpx;
				font-size: 50rpx;
				color: #fff;
				margin: 20rpx auto;
			}
			text {
				font-size: 30rpx;
			}
		}
	}
	// 推荐商品区域
	.goods {
		.goods-text {
			height: 85rpx;
			text-align: center;
			font-size: 45rpx;
			letter-spacing: 20rpx;
			line-height: 85rpx;
			color: $uni-red-color;
			border-top: 8rpx solid #eee;
			margin-top: 30rpx;
		}
	}
}
</style>
