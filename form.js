form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // [...] 之前的代码
    
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // 展示星盘数据
            displayChartResults(result);
            
            // 展示事件解读
            displayEvents(result.events);
        } else {
            alert('计算失败: ' + result.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('请求失败: ' + error.message);
    });
});
