document.addEventListener('DOMContentLoaded', function() {
    // 获取结果ID
    const urlParams = new URLSearchParams(window.location.search);
    const resultId = urlParams.get('result_id');
    
    if (!resultId) {
        document.getElementById('loading').innerHTML = 
            '<p style="color: red;">结果ID缺失，请返回重新查询</p>';
        return;
    }
    
    // 从后端获取计算结果
    fetch(`/get-results?result_id=${resultId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        return response.json();
    })
    .then(data => {
        // 隐藏加载提示
        document.getElementById('loading').style.display = 'none';
        
        // 显示结果内容
        const resultContent = document.getElementById('resultContent');
        resultContent.style.display = 'block';
        
        // 填充本命星盘信息
        displayNatalChart(data.natalChart);
        
        // 填充行运星盘信息
        displayTransitChart(data.transitChart);
        
        // 填充相位信息
        displayAspects(data.aspects);
        
        // 填充预测信息
        displayPredictions(data.predictions);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loading').innerHTML = 
            '<p style="color: red;">获取结果失败，请刷新页面重试</p>';
    });
});

function displayNatalChart(chartData) {
    const natalChartInfo = document.getElementById('natalChartInfo');
    
    let html = '<h3>本命星盘行星位置</h3><table>';
    html += '<tr><th>行星</th><th>星座</th><th>宫位</th></tr>';
    
    for (const planet in chartData.planets) {
        const info = chartData.planets[planet];
        html += `<tr>
            <td>${info.name}</td>
            <td>${info.sign}</td>
            <td>${info.house}宫</td>
        </tr>`;
    }
    
    html += '</table>';
    
    // 添加宫位系统信息
    html += '<h3>本命宫位系统</h3><table>';
    html += '<tr><th>宫位</th><th>星座</th></tr>';
    
    chartData.houses.forEach((house, index) => {
        html += `<tr>
            <td>${index + 1}宫</td>
            <td>${house.sign}</td>
        </tr>`;
    });
    
    html += '</table>';
    
    natalChartInfo.innerHTML = html;
}

function displayTransitChart(chartData) {
    const transitChartInfo = document.getElementById('transitChartInfo');
    
    let html = '<h3>行运星盘行星位置</h3><table>';
    html += '<tr><th>行星</th><th>星座</th><th>本命宫位</th></tr>';
    
    for (const planet in chartData.planets) {
        const info = chartData.planets[planet];
        html += `<tr>
            <td>${info.name}</td>
            <td>${info.sign}</td>
            <td>${info.house}宫</td>
        </tr>`;
    }
    
    html += '</table>';
    transitChartInfo.innerHTML = html;
}

function displayAspects(aspectsData) {
    const aspectsTable = document.getElementById('aspectsTable');
    
    let html = '<h3>行星相位关系</h3><table>';
    html += '<tr><th>行星1</th><th>行星2</th><th>相位</th><th>度数</th></tr>';
    
    aspectsData.forEach(aspect => {
        html += `<tr>
            <td>${aspect.planet1}</td>
            <td>${aspect.planet2}</td>
            <td>${aspect.aspect_name}</td>
            <td>${aspect.degree}°</td>
        </tr>`;
    });
    
    html += '</table>';
    aspectsTable.innerHTML = html;
}

function displayPredictions(predictions) {
    const predictionResults = document.getElementById('predictionResults');
    
    if (predictions.length === 0) {
        predictionResults.innerHTML = '<p>未找到匹配的预测信息</p>';
        return;
    }
    
    let html = '<h3>事件预测</h3><div class="predictions-list">';
    
    predictions.forEach(prediction => {
        html += `<div class="prediction-item">
            <h4>${prediction.title}</h4>
            <p>${prediction.description}</p>
        </div>`;
    });
    
    html += '</div>';
    predictionResults.innerHTML = html;
}
