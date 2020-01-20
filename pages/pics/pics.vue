<template>
	<view class="pics">
		<!-- 左边导航区域,样式一定要写到scroll-view里，并且使用scroll-y属性，不要包裹它。滚动的元素是他，给他设置高度100% -->
		<scroll-view class="pics-left" scroll-y>
			<view v-for="(item, index) in categoryList" :key="item.id" :class="choose == index ? 'choose' : ''" @click="clickHandle(item.id, index)">{{ item.title }}</view>
		</scroll-view>

		<!-- 右边图片区域 -->
		<scroll-view class="pics-right" scroll-y>
			<view class="graphic" v-for="(item, index) in pics" :key="item.id">
				<image :src="item.img_url" @click="imageHandle(index)"></image>
				<text>{{ item.title }}</text>
			</view>
			<view class="tag" v-if="pics.length === 0">暂无数据...</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categoryList: [],
			choose: 0,
			pics: []
		};
	},
	onLoad() {
		this.getCategory();
	},
	methods: {
		// 获取分类数据
		async getCategory() {
			const { data: res } = await this.$api({
				url: '/api/getimgcategory'
			});
			this.categoryList = res.message;
			// 获取后直接查询第一页签的数据
			this.clickHandle(this.categoryList[0].id || 14, this.choose);
		},
		// 根据ID获取图片列表
		async clickHandle(catid, choose) {
			this.choose = choose;
			const { data: res } = await this.$api({
				url: '/api/getimages/' + catid
			});
			this.pics = res.message;
		},
		// 点击图片的事件
		imageHandle(current) {
			uni.previewImage({
				current,
				urls: this.pics.map(p => {
					return p.img_url;
				}),
				loop:true
			});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}
.pics {
	display: flex;
	height: 100%;
	.pics-left {
		height: 100%;
		width: 200rpx;
		border-right: 1px solid #eee;
		view {
			height: 60px;
			font-size: 30rpx;
			line-height: 120rpx;
			text-align: center;
			border-top: 1px solid #eee;
			color: #333;
		}
		.choose {
			background-color: $uni-red-color;
			color: #fff;
		}
	}
	.pics-right {
		height: 100%;
		width: 535rpx;
		margin-left: 10rpx;
		.graphic {
			margin: 20rpx 0;
		}
		image {
			border-radius: 5px;
			width: 100%;
		}
		text {
			font-size: 30rpx;
			line-height: 30rpx;
		}
		.tag {
			color: #999999;
			font-size: 30rpx;
			margin: 10px 0 0 20px;
		}
	}
}
</style>
