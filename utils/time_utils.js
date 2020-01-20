export const dataformat = (dataStr,pattern="") =>{
	let date = new Date(dataStr);
	// 数字类型转字符串并且补全0，padStart()第一个参数指目标字符串长度。第二个参数是需要补全的值
	let y = date.getFullYear();
	let m = date.getMonth().toString().padStart(2, '0');
	let d = date.getDay().toString().padStart(2, '0');
	
	if (pattern.toLowerCase() === 'yyyy-mm-dd') {
		return `${y}-${m}-${d} `
	} else {
		let hours = date.getHours().toString().padStart(2, '0');
		let minutes = date.getMinutes().toString().padStart(2, '0');
		let seconds = date.getSeconds().toString().padStart(2, '0');
		return `${y}-${m}-${d} ${hours}:${minutes}:${seconds}`
	}
}