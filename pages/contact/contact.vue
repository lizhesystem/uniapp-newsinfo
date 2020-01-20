<template>
	<view class="content-contact">
		<view class="contact-top"><view>关于我们</view></view>
		<view class="contact-message">
			<view @click="callPhone">联系电话：400-618-99090（点击拨打）</view>
			<view>地址：河南省郑州市高新区总部企业基地56号楼</view>
		</view>
		<map style="width: 100%; height:410px;" :scale="scale" :markers="covers" :latitude="latitude" :longitude="longitude"></map>
	</view>
</template>

<script>
export default {
	data() {
		return {
			latitude: 34.8130900000,
			longitude: 113.5674700000,
			covers: [{
			    latitude: 34.8130900000,
			    longitude: 113.5674700000,
			    iconPath: '../../static/logo.png'
			}],
			scale:13
		};
	},
	methods:{
		callPhone(){
			uni.makePhoneCall({
			    phoneNumber: '400-618-99090' //仅为示例
			});
		}
	}
};
</script>

<style lang="scss">
// 关于我们
.contact-top {
	height: 350rpx;
	background: url(../../static/images/bj.jpg);
	display: flex;
	justify-content: center;

	view {
		color: $uni-red-color;
		font-size: 50rpx;
		margin: auto;
		color: #eee;
		font-weight: 600;
	}
}
// 联系方式
.contact-message {
	font-size: 30rpx;
	line-height: 30rpx;
	margin-top: 20rpx;
	view {
		padding: 20rpx;
		border-bottom: 1px solid #eee;
	}
}
// 地图区域

</style>
