// static/js/main.js

// 导入其他模块（如果使用模块化开发）
// import { initializeForm } from './events.js';
// import { renderChart } from './chart.js';

// 全局配置
const CONFIG = {
    apiBaseUrl: '/api',
    defaultCity: '北京',
    defaultProvince: '北京'
};

// DOM元素
const DOM = {
    form: document.getElementById('astrologyForm'),
    provinceSelect: document.getElementById('province'),
    citySelect: document.getElementById('city'),
    resultContainer: document.getElementById('result-container'),
    loadingIndicator: document.getElementById('loading-indicator'),
    errorContainer: document.getElementById('error-container')
};

// 数据映射
const DATA_MAPPING = {
    planets: {
        'sun': '太阳',
        'moon': '月亮',
        'mercury': '水星',
        'venus': '金星',
        'mars': '火星',
        'jupiter': '木星',
        'saturn': '土星',
        'uranus': '天王星',
        'neptune': '海王星',
        'pluto': '冥王星',
        'ascendant': '上升',
        'midheaven': '天顶'
    },
    signs: {
         'Aries': '白羊座',
    'Taurus': '金牛座',
    'Gemini': '双子座',
    'Cancer': '巨蟹座',
    'Leo': '狮子座',
    'Virgo': '处女座',
    'Libra': '天秤座',
    'Scorpio': '天蝎座',
    'Sagittarius': '射手座',
    'Capricorn': '摩羯座',
    'Aquarius': '水瓶座',
    'Pisces': '双鱼座'
    },
    houses: {
        '1st': '第一宫',
        '2nd': '第二宫',
        '3rd': '第三宫',
    '4th': '第四宫',
    '5th': '第五宫',
    '6th': '第六宫',
    '7th': '第七宫',
    '8th': '第八宫',
    '9th': '第九宫',
    '10th': '第十宫',
    '11th': '第十一宫',
    '12th': '第十二宫'
    }
};

// 初始化应用
function initApp() {
    // 初始化城市选择
    initCitySelect();
    
    // 初始化表单提交
    initFormSubmit();
    
    // 加载默认数据
    loadDefaultData();
    
    // 其他初始化逻辑
    setupEventListeners();
}

// 初始化城市选择
function initCitySelect() {
    if (!DOM.provinceSelect || !DOM.citySelect) return;

    DOM.provinceSelect.addEventListener('change', function() {
        const province = this.value;
        updateCityOptions(province);
    });

    // 设置默认省份
    DOM.provinceSelect.value = CONFIG.defaultProvince;
    updateCityOptions(CONFIG.defaultProvince);
}

// 更新城市选项
function updateCityOptions(province) {
    DOM.citySelect.innerHTML = '<option value="">请选择城市</option>';
    
    if (!province || !cityData[province]) {
        DOM.citySelect.disabled = true;
        return;
    }
    
    cityData[province].forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.name;
        option.dataset.coordinates = city.coordinates;
        DOM.citySelect.appendChild(option);
    });
    
    DOM.citySelect.disabled = false;
    DOM.citySelect.value = CONFIG.defaultCity;
}

// 初始化表单提交
function initFormSubmit() {
    if (!DOM.form) return;

    DOM.form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            // 显示加载状态
            showLoading();
            
            // 收集表单数据
            const formData = collectFormData();
            
            // 验证数据
            validateFormData(formData);
            
            // 发送请求
            const result = await submitFormData(formData);
            
            // 处理结果
            handleSuccessResponse(result);
            
        } catch (error) {
            // 处理错误
            handleError(error);
            
        } finally {
            // 隐藏加载状态
            hideLoading();
        }
    });
}

// 收集表单数据
function collectFormData() {
    const formData = new FormData(DOM.form);
    const selectedCity = DOM.citySelect.options[DOM.citySelect.selectedIndex];
    
    // 确保坐标格式符合后端要求
    let coordinates = selectedCity.dataset.coordinates;
    
    // 更健壮的坐标格式转换
    if (!coordinates.includes(':')) {
        const [lon, lat] = coordinates.split(',').map(parseFloat);
        const lonDeg = Math.floor(lon);
        const lonMin = Math.round((lon - lonDeg) * 60);
        const latDeg = Math.floor(lat);
        const latMin = Math.round((lat - latDeg) * 60);
        
        coordinates = `${lonDeg}:${lonMin}E,${latDeg}:${latMin}N`;
    }
    
    return {
        name: formData.get('name'),
        gender: formData.get('gender'),
        birthDate: formData.get('birthDate'),
        birthTime: formData.get('birthTime'),
        province: formData.get('province'),
        city: formData.get('city'),
        coordinates: coordinates,
        transitDate: formData.get('transitDate'),
        transitTime: formData.get('transitTime'),
        description: formData.get('description')
    };
}

// 验证表单数据
function validateFormData(data) {
    const requiredFields = [
        'name', 'gender', 'birthDate', 'birthTime',
        'province', 'city', 'transitDate', 'transitTime'
    ];
    
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`请填写所有必填项: ${missingFields.join(', ')}`);
    }
    
    // 可以添加更复杂的验证逻辑
    if (!isValidDate(data.birthDate)) {
        throw new Error('无效的出生日期');
    }
}

// 提交表单数据
async function submitFormData(data) {
    showLoading();  // 显示加载状态
       try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '请求失败');
        }
        
        const result = await response.json();
        handleSuccessResponse(result);  // 调用处理函数
        
    } catch (error) {
        handleError(error);
    } finally {
        hideLoading();  // 隐藏加载状态
    }
}

// 处理成功响应
function handleSuccessResponse(result) {
    if (!result.success) {
        throw new Error(result.error || '未知错误');
    // 存储结果用于结果页面
  sessionStorage.setItem('astrologyResult', JSON.stringify(result));
  
  // 跳转到结果页面
  window.location.href = 'result.html';
}

    // 渲染结果
    renderNatalChart(result.natal_chart);
    renderTransitChart(result.transit_chart);
    renderAspects(result.aspects);
    renderEvents(result.events);
    
    // 显示结果容器
    DOM.resultContainer.style.display = 'block';
    DOM.errorContainer.style.display = 'none';
    
    // 滚动到结果区域
    DOM.resultContainer.scrollIntoView({ behavior: 'smooth' });
}


// 渲染本命星盘
function renderNatalChart(chartData) {
     if (!chartData || Object.keys(chartData).length === 0) {
    container.innerHTML = '<p>没有找到星盘数据</p>';
    return;
}
    const container = document.getElementById('natal-chart-container'); 
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建表格
    const table = document.createElement('table');
    table.className = 'chart-table';
    
    // 添加表头
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>行星</th>
            <th>星座</th>
            <th>宫位</th>
            <th>经度</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // 添加表体
    const tbody = document.createElement('tbody');
    
    // 遍历行星数据
    for (const [planet, data] of Object.entries(chartData.planets)) {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${DATA_MAPPING.planets[planet] || planet}</td>
            <td>${DATA_MAPPING.signs[data.sign] || data.sign}</td>
            <td>${DATA_MAPPING.houses[data.house] || data.house}</td>
            <td>${data.longitude.toFixed(2)}°</td>
        `;
        
        tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    container.appendChild(table);
}

// 渲染行运星盘
function renderTransitChart(transitChart) {
     if (!chartData || Object.keys(chartData).length === 0) {
    container.innerHTML = '<p>没有找到星盘数据</p>';
    return;
}
    const container = document.getElementById('transit-chart-container');
    if (!container) return;
     // 清空容器
    container.innerHTML = '';
    
    // 创建表格
    const table = document.createElement('table');
    table.className = 'chart-table';
    
    // 添加表头
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>行星</th>
            <th>星座</th>
            <th>宫位</th>
            <th>经度</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // 添加表体
    const tbody = document.createElement('tbody');
    
    // 遍历行星数据
    for (const [planet, data] of Object.entries(transitChart)) {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${DATA_MAPPING.planets[planet] || planet}</td>
            <td>${DATA_MAPPING.signs[data.sign] || data.sign}</td>
            <td>${DATA_MAPPING.houses[data.house] || data.house}</td>
            <td>${data.longitude.toFixed(2)}°</td>
        `;
        
        tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    container.appendChild(table);
}

// 渲染相位关系
function renderAspects(aspects) {
    const container = document.getElementById('aspects-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!aspects || aspects.length === 0) {
        container.innerHTML = '<p>没有检测到显著的相位关系</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'aspect-table';
    
    // 表头
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>本命行星</th>
            <th>行运行星</th>
            <th>相位</th>
            <th>角度</th>
            <th>容许度</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // 表体
    const tbody = document.createElement('tbody');
    
    aspects.forEach(aspect => {
        const row = document.createElement('tr');
        row.className = `aspect-${aspect.aspect_type}`;
        
        row.innerHTML = `
            <td>${DATA_MAPPING.planets[aspect.natal_planet] || aspect.natal_planet}</td>
            <td>${DATA_MAPPING.planets[aspect.transit_planet] || aspect.transit_planet}</td>
            <td>${aspect.aspect_name}</td>
            <td>${aspect.actual_degree.toFixed(2)}°</td>
            <td>±${aspect.max_orb.toFixed(2)}°</td>
        `;
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    container.appendChild(table);
}

// 渲染事件解读
function renderEvents(events) {
    const container = document.getElementById('events-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!events || (!events.sun_sign.events.length && !events.asc_sign.events.length)) {
        container.innerHTML = '<p>没有找到相关的事件解读</p>';
        return;
    }
    
    // 渲染太阳星座事件
    if (events.sun_sign.events.length) {
        const section = document.createElement('div');
        section.className = 'event-section';
        
        section.innerHTML = `
            <h3>太阳星座 (${DATA_MAPPING.signs[events.sun_sign.sign] || events.sun_sign.sign}) 相关事件</h3>
            <ul class="event-list">
                ${events.sun_sign.events.map(event => `<li>${event}</li>`).join('')}
            </ul>
        `;
        
        container.appendChild(section);
    }
    
    // 渲染上升星座事件
    if (events.asc_sign.events && events.asc_sign.events.length > 0) {
        const section = document.createElement('div');
        section.className = 'event-section';
        
        section.innerHTML = `
            <h3>上升星座 (${DATA_MAPPING.signs[events.asc_sign.sign] || events.asc_sign.sign}) 相关事件</h3>
            <ul class="event-list">
                ${events.asc_sign.events.map(event => `<li>${event}</li>`).join('')}
            </ul>
        `;
        
        container.appendChild(section);
    }
    
    // 渲染相位相关事件
    if (events.asc_sign && events.asc_sign.events.length) {
        const section = document.createElement('div');
        section.className = 'event-section';
        
         let aspectEventsHTML = '<h3>相位相关事件</h3>';
        
        events.aspect_events.forEach(eventGroup => {
            if (eventGroup.events && eventGroup.events.length > 0) {
                aspectEventsHTML += `
                    <div class="aspect-group">
                        <h4>${eventGroup.query}</h4>
                        <ul class="event-list">
                            ${eventGroup.events.map(event => `<li>${event}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        });
        section.innerHTML = aspectEventsHTML;
        container.appendChild(section);
    }
   

// 错误处理
function handleError(error) {
    let message = error.message || '发生未知错误';
    
    // 解析后端返回的具体错误
    if (error.responseData) {
        message = error.responseData.error || message;
    }
    
    DOM.errorContainer.innerHTML = `
        <div class="alert alert-danger">
            <strong>错误:</strong> ${error.message || '发生未知错误'}
        </div>
    `;
    
    DOM.errorContainer.style.display = 'block';
    DOM.resultContainer.style.display = 'none';
}

// 显示加载状态
function showLoading() {
    if (DOM.loadingIndicator) {
        DOM.loadingIndicator.style.display = 'block';
    }
}

// 隐藏加载状态
function hideLoading() {
    if (DOM.loadingIndicator) {
        DOM.loadingIndicator.style.display = 'none';
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 可以添加其他事件监听器
    // 例如：重置按钮、选项卡切换等
}

// 加载默认数据
function loadDefaultData() {
    // 可以加载默认设置或缓存数据
}

// 日期验证
function isValidDate(dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    return regEx.test(dateString);
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp);
