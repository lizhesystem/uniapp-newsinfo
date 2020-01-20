<template>
	<view class="continer">
		<view class="title">
			{{newsInfo.title }}
		</view>
		<view class="newsInfo">
			<text>发布时间：{{ newsInfo.add_time | timeFormat }}</text>
			<text>点击量：{{newsInfo.click }}</text>
		</view>
		<view class="content">
			<view v-html="newsInfo.content">
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			newsid: 0,
			newsInfo: {}
		};
	},
	// option获取路径的参数
	onLoad(option) {
		this.newsid = option.id;
		this.getNewsDetail(option.id);
	},
	methods: {
		// 获取新闻详情
		async getNewsDetail(id) {
			const { data: res } = await this.$api({
				url: '/api/getnew/' + id
			});
			this.newsInfo = res.message[0];
		}
	}
};
</script>

<style lang="scss">
	.continer{
		padding: 10rpx;
		.title{
			font-size:35rpx;
			text-align: center;
			margin: 20rpx 0;
		}
		.newsInfo{
			display: flex;
			justify-content: space-between;
			font-size: 25rpx;
			margin-bottom: 20rpx;
		}
		.content{
			font-size: 30rpx;
			text-indent:5rpx;
		}
	}
	
</style>
