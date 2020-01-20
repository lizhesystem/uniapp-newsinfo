<template>
	<view class="goods-detail">
		<swiper class="goodsPic" indicator-dots>
			<swiper-item v-for="item in goodsPicList" :key="item.id"><image :src="item.src"></image></swiper-item>
		</swiper>
		<view class="price">
			<text>¥{{ goodsInfo.sell_price }}</text>
			<text>¥{{ goodsInfo.market_price }}</text>
		</view>
		<view class="box1">
			<text>{{ goodsInfo.title }}</text>
		</view>
		<view class="box2">
			<view>货号：{{ goodsInfo.goods_no }}</view>
			<view>库存：{{ goodsInfo.stock_quantity }}</view>
		</view>
		<view class="box3">
			<view class="tit">详细介绍</view>
			<view class="box3-content"><rich-text :nodes="goodsContent"></rich-text></view>
		</view>
		<view class="goods_nav"><uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav></view>
	</view>
</template>

<script>
import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';

export default {
	data() {
		return {
			id: 0,
			goodsPicList: [],
			goodsContent: '',
			goodsInfo: {},
			options: [
				{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
					text: '客服'
				},
				{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
					text: '店铺'
				},
				{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
					text: '购物车',
					info: 2
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.getGoodsPicList(option.id);
		this.getGoodsContent(option.id);
		this.getGoodsInfo(option.id);
	},
	methods: {
		// 获取商品详情轮播
		async getGoodsPicList(id) {
			const { data: res } = await this.$api({
				url: '/api/getthumimages/' + id
			});
			this.goodsPicList = res.message;
		},
		// 获取商品描述
		async getGoodsContent(id) {
			const { data: res } = await this.$api({
				url: '/api/goods/getdesc/' + id
			});
			this.goodsContent = res.message[0].content;
		},
		// 获取商品价格信息
		async getGoodsInfo(id) {
			const { data: res } = await this.$api({
				url: '/api/goods/getinfo/' + id
			});
			this.goodsInfo = res.message[0];
		},
		onClick(e) {
			// uni.showToast({
			// 	title: `点击${e.content.text}`,
			// 	icon: 'none'
			// })
			console.log(e);
		},
		buttonClick(e) {
			console.log(e);
			// this.options[2].info++
		}
	},
	components: { uniGoodsNav }
};
</script>

<style lang="scss">
.goods-detail {
	font-size: 32rpx;
	.goodsPic {
		height: 600rpx;
		image {
			height: 100%;
			width: 100%;
		}
	}
	.price {
		padding-left: 20rpx;
		color: $uni-red-color;
		text:nth-child(2) {
			font-size: 27rpx;
			color: #c0c0c0;
			text-decoration: line-through;
			margin-left: 20rpx;
		}
	}
	.box1 {
		border-bottom: 4px solid #eee;
		line-height: 60rpx;
		padding: 10px;
	}
	.box2 {
		padding: 0 10px;
		line-height: 60rpx;
		border-bottom: 4px solid #eee;
	}
	.box3 {
		padding-bottom: 50px;
		.tit {
			padding-left: 10px;
			border-bottom: 1px solid #eee;
			line-height: 60rpx;
		}
		.box3-content {
			padding: 10px;
			color: #333;
			line-height: 50rpx;
		}
	}
	.goods_nav {
		position: fixed;
		bottom:0;
		width: 100%;
	}
}
</style>
