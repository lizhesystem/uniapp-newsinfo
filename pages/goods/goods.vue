<template>
	<view class="goods_list">
		<goodsItems @goodsItemClick="goGoodsDetail" :goods="goodsList"></goodsItems>
		<view class="content-bottom" v-if="flag">----- 我是有底线的 -----</view>
	</view>
</template>

<script>
import goodsItems from '../../components/goodsList.vue';

export default {
	data() {
		return {
			goodsList: [],
			pageindex: 1,
			flag: false
		};
	},
	// 获取商品
	onLoad() {
		this.getgoodsList();
	},
	// 监听下拉刷新,在setTimeout传入一个callback方法监听刷新后请求结果,根据结果调用uni.stopPullDownRefresh
	onPullDownRefresh() {
		this.pageindex = 1;
		this.goodsList = [];
		this.flag = false;
		setTimeout(() => {
			this.getgoodsList(() => {
				uni.stopPullDownRefresh();
			});
		}, 500);
	},
	methods: {
		// 获取商品列表方法,这个callback其实就是下拉刷新传入的uni.stopPullDownRefresh();
		async getgoodsList(callback) {
			const { data: res } = await this.$api({
				url: '/api/getgoods?pageindex=' + this.pageindex
			});
			// 每次获取新的数据合并数据
			this.goodsList = [...this.goodsList, ...res.message];
			callback && callback();
		},
		// 下拉到底的触发获取商品列表数据
		onReachBottom() {
			if (this.goodsList.length % this.pageindex !== 0) return (this.flag = 'true');
			this.pageindex = this.pageindex += 1;
			this.getgoodsList();
		},
		// 子类调用父类方法,根据id跳转到商品详情页
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
.content-bottom {
	background-color: #eee;
	font-size: 30rpx;
	color: #999999;
	text-align: center;
	padding: 20rpx 0;
}
</style>
