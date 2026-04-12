// 事件处理模块
export function handleFormSubmit() {
    const form = document.getElementById('astrologyForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            // 1. 收集表单数据
            const formData = new FormData(form);
            const payload = {
                name: formData.get('name'),
                birthDate: formData.get('birthDate'),
                birthTime: formData.get('birthTime'),
                // 其他字段...
            };

            // 2. 发送请求
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) throw new Error('请求失败');
            
            // 3. 处理响应
            const result = await response.json();
            
            if (result.success) {
                // 更新DOM展示结果
                updateCharts(result);
                displayAspects(result.aspects);
                visualizeEvents(result.events);
            } else {
                showError(result.error);
            }
            
        } catch (error) {
            console.error('Error:', error);
            showError(error.message);
        }
    });
}

// 星盘数据可视化
export function updateCharts(data) {
    // 调用chart.js中的方法
    renderNatalChart(data.natalChart);
    renderTransitChart(data.transitChart);
}

// 相位关系展示
function displayAspects(aspects) {
    const container = document.getElementById('aspects-container');
    container.innerHTML = aspects.map(aspect => `
        <div class="aspect-item">
            <span class="natal-planet">${aspect.natalPlanet}</span>
            <span class="aspect-type">${aspect.type}</span>
            <span class="transit-planet">${aspect.transitPlanet}</span>
            <span class="degrees">${aspect.degrees.toFixed(1)}°</span>
        </div>
    `).join('');
}

// 事件时间线可视化
function visualizeEvents(events) {
    const timeline = document.getElementById('event-timeline');
    timeline.innerHTML = events.map(event => `
        <div class="timeline-event">
            <div class="event-date">${event.date}</div>
            <div class="event-content">${event.description}</div>
            <div class="event-planets">
                ${event.relatedPlanets.map(p => `<span class="planet">${p}</span>`).join('')}
            </div>
        </div>
    `).join('');
}
