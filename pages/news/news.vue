<template>
	<view class="news">
		<view class="news-item" v-for="item in news" :key="item.id" @click="newsHandel(item.id)">
			<image :src="item.img_url"></image>
			<view class="news-content">
				<view class="news-title">{{ item.title }}{{ item.zhaiyao }}</view>
				<view class="news-detail">
					<text>发表时间:{{ item.add_time | timeFormat }}</text>
					<text>点击量:{{ item.click }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			news: []
		};
	},
	onLoad() {
		this.getNews();
	},
	// 监听下拉刷新,在setTimeout传入一个callback方法监听刷新后请求结果,根据结果调用uni.stopPullDownRefresh
	onPullDownRefresh() {
		this.news = [];
		setTimeout(() => {
			this.getNews(() => {
				uni.stopPullDownRefresh();
			});
		}, 500);
	},
	methods: {
		// 获取新闻列表
		async getNews(callback) {
			const { data: res } = await this.$api({
				url: '/api/getnewslist'
			});
			this.news = res.message;
			callback && callback();
		},
		// 点击新闻事件
		newsHandel(id) {
			uni.navigateTo({
				url: '../news/news-detail?id=' + id
			});
			// const { data: res} = await this.$api({
			// 	url:'api/getnew/' + id
			// })
		}
	}
};
</script>

<style lang="scss">
.news {
	.news-item {
		display: flex;
		width: 100%;
		height: 180rpx;
		padding: 20rpx;
		image {
			height: 100%;
			width: 200rpx;
			border-radius: 5px;
		}
		.news-content {
			font-size: 30rpx;
			width: 510rpx;
			margin-left: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.news-detail {
				display: flex;
				justify-content: space-between;
				font-size: 25rpx;
			}
		}
	}
}
</style>
