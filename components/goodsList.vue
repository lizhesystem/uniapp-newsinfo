<template>
	<view class="goods-list">
		<view class="goods-item" v-for="item in goods" :key="item.id" @click="navigator(item.id)">
			<image :src="item.img_url"></image>
			<view class="goods-price">
				<text>￥{{ item.sell_price }}</text>
				<text>￥{{ item.market_price }}</text>
			</view>
			<view class="goods-name">{{ item.title }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['goods'],
	data() {
		return {};
	},
	methods: {
		// 使用$emit调用父类的goodsItemClick方法,参数传入id
		navigator(id) {
			this.$emit('goodsItemClick', id);
		}
	}
};
</script>

<style lang="scss">
.goods-list {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 0 15rpx;
	background-color: #eee;
	.goods-item {
		width: 354rpx;
		padding: 15rpx;
		margin: 10rpx 0;
		background: #fff;
		box-sizing: border-box;
		image {
			width: 100%;
			height: 150px;
			background: #fff;
		}
		.goods-price {
			color: $uni-red-color;
			font-size: 36rpx;
			margin: 20rpx 0 10rpx 0;
			text:nth-child(2) {
				color: #c0c0c0;
				font-size: 22rpx;
				margin-left: 10rpx;
				text-decoration: line-through;
			}
		}
		.goods-name {
			font-size: 28rpx;
			line-height: 50rpx;
		}
	}
}
</style>
