// 封装请求对象
const BASE_URL = "http://www.liulongbin.top:3005"
// options代表传过来的请求地址,
// 返回一个Promise对象,对象里调用uni-app封装的接口请求对象,resolve代表成功,reject代表失败.
export const Myrequet = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			data: options.data || {},
			success: (res) => {
				if(res.data.status !== 0){
					return uni.showToast({
						title:"获取数据失败"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:"请求接口失败"
				})
				reject(err)
			}
			
		})

	})

}
