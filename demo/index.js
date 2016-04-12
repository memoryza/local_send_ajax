$(function() {
	$('#send').on('click', function(){
		$.ajax({
			url: 'http://gupiao.baidu.com/api/news/gettoporinews?from=h5&os_ver=0&cuid=xxx&vv=2.2&format=json',
			params: {},
			type: 'get',
			success: function(data) {
				console.log(data);
			}
		})
	})
})