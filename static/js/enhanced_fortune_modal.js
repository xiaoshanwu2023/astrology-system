/**
 * 增强版详细运势解读前端交互模块
 * Enhanced Fortune Modal Frontend Module
 * 支持行星逆行、日月食显示
 */

class EnhancedFortuneModal {
  constructor(options = {}) {
    this.options = {
      apiEndpoint: '/api/comprehensive-fortune',
      testEndpoint: '/api/enhanced/test',
      modalId: 'enhancedFortuneModal',
      buttonId: 'enhancedFortuneBtn',
      ...options
    };
    
    this.modal = null;
    this.button = null;
    this.isOpen = false;
    this.currentData = null;
    
    this.init();
  }
  
  /**
   * 初始化模块
   */
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  /**
   * 设置事件监听
   */
  setup() {
    this.modal = document.getElementById(this.options.modalId);
    this.button = document.getElementById(this.options.buttonId);
    
    if (!this.modal || !this.button) {
      console.warn('EnhancedFortuneModal: 找不到必要的DOM元素');
      return;
    }
    
    // 按钮点击事件
    this.button.addEventListener('click', () => this.open());
    
    // 关闭按钮事件
    const closeBtn = this.modal.querySelector('.fortune-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }
    
    // 点击遮罩关闭
    const overlay = this.modal.querySelector('.fortune-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.close());
    }
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // 详情折叠面板
    const detailsToggle = document.getElementById('detailsToggle');
    if (detailsToggle) {
      detailsToggle.addEventListener('click', () => this.toggleDetails());
    }
    
    // 重试按钮
    const retryBtn = document.getElementById('retryBtn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.loadFortune());
    }
    
    console.log('✅ EnhancedFortuneModal 初始化完成');
  }
  
  /**
   * 打开模态框
   */
  open() {
    if (!this.modal) return;
    
    this.isOpen = true;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    this.showLoading();
    this.loadFortune();
    
    setTimeout(() => {
      this.modal.querySelector('.fortune-modal-content').classList.add('animate-in');
    }, 10);
  }
  
  /**
   * 关闭模态框
   */
  close() {
    if (!this.modal) return;
    
    this.isOpen = false;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    const content = this.modal.querySelector('.fortune-modal-content');
    if (content) {
      content.classList.remove('animate-in');
    }
  }
  
  /**
   * 显示加载状态
   */
  showLoading() {
    const loading = document.getElementById('fortuneLoading');
    const content = document.getElementById('fortuneContent');
    const error = document.getElementById('fortuneError');
    
    if (loading) loading.style.display = 'block';
    if (content) content.style.display = 'none';
    if (error) error.style.display = 'none';
  }
  
  /**
   * 显示内容
   */
  showContent() {
    const loading = document.getElementById('fortuneLoading');
    const content = document.getElementById('fortuneContent');
    const error = document.getElementById('fortuneError');
    
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'block';
    if (error) error.style.display = 'none';
  }
  
  /**
   * 显示错误
   */
  showError(message) {
    const loading = document.getElementById('fortuneLoading');
    const content = document.getElementById('fortuneContent');
    const error = document.getElementById('fortuneError');
    const errorMessage = document.getElementById('errorMessage');
    
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'none';
    if (error) error.style.display = 'block';
    if (errorMessage) errorMessage.textContent = message;
  }
  
  /**
   * 切换详情面板
   */
  toggleDetails() {
    const content = document.getElementById('detailsContent');
    const toggle = document.getElementById('detailsToggle');
    
    if (!content || !toggle) return;
    
    const isExpanded = content.style.display !== 'none';
    
    if (isExpanded) {
      content.style.display = 'none';
      toggle.classList.remove('expanded');
    } else {
      content.style.display = 'block';
      toggle.classList.add('expanded');
    }
  }
  
  /**
   * 获取页面上的星盘数据
   */
  getChartData() {
    const sunSignEl = document.getElementById('sunSign') || 
                      document.querySelector('.sun-sign') ||
                      document.querySelector('[data-sign]');
    
    const dateEl = document.getElementById('transitDate') || 
                   document.querySelector('.transit-date');
    
    // 从localStorage获取保存的日期（用户从index页面选择的）
    const savedDate = localStorage.getItem('selectedTransitDate');
    
    // 从URL参数获取日期
    const urlParams = new URLSearchParams(window.location.search);
    const urlDate = urlParams.get('date');
    
    // 今天日期作为默认
    const today = new Date().toISOString().split('T')[0];
    
    const defaultData = {
      sun_sign: '白羊座',
      transit_date: urlDate || savedDate || today,
      include_retrograde: true,
      include_eclipse: true
    };
    
    if (sunSignEl) {
      const signText = sunSignEl.textContent.trim();
      // 提取星座名称（去掉符号）
      const signMatch = signText.match(/[\u4e00-\u9fa5]+/);
      if (signMatch) {
        defaultData.sun_sign = signMatch[0];
      }
    }
    
    // 如果页面上有日期元素，且格式正确，优先使用
    if (dateEl) {
      const pageDate = dateEl.textContent.trim();
      // 检查是否为 YYYY-MM-DD 格式
      if (pageDate && pageDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        defaultData.transit_date = pageDate;
      }
    }
    
    return defaultData;
  }
  
  /**
   * 加载运势数据
   */
  async loadFortune() {
    try {
      const chartData = this.getChartData();
      
      // 先测试API是否可用
      const testResponse = await fetch(this.options.testEndpoint);
      if (!testResponse.ok) {
        throw new Error('API服务暂时不可用');
      }
      
      // 调用综合运势API
      const response = await fetch(this.options.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chartData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        this.currentData = result.data;
        this.renderFortune(result.data);
        this.showContent();
      } else {
        throw new Error(result.error || '获取运势解读失败');
      }
      
    } catch (error) {
      console.error('加载运势失败:', error);
      this.showError(error.message || '网络连接失败，请稍后重试');
    }
  }
  
  /**
   * 渲染运势内容
   */
  renderFortune(data) {
    // 更新头部信息
    const signNameEl = document.getElementById('fortuneSignName');
    const signIconEl = document.querySelector('#fortuneSignBadge .sign-icon');
    const dateValueEl = document.getElementById('fortuneDate');
    const sentimentValueEl = document.querySelector('#fortuneSentiment .sentiment-value');
    const readingTextEl = document.getElementById('fortuneReadingText');
    const subtitleEl = document.getElementById('fortuneSubtitle');
    
    // 星座名称和图标
    const signIcons = {
      '白羊座': '♈', '金牛座': '♉', '双子座': '♊', '巨蟹座': '♋',
      '狮子座': '♌', '处女座': '♍', '天秤座': '♎', '天蝎座': '♏',
      '射手座': '♐', '摩羯座': '♑', '水瓶座': '♒', '双鱼座': '♓'
    };
    
    if (signNameEl) signNameEl.textContent = data.sun_sign;
    if (signIconEl) signIconEl.textContent = signIcons[data.sun_sign] || '⭐';
    if (dateValueEl) dateValueEl.textContent = data.transit_date;
    
    // 整体运势标签
    const sentimentMap = {
      'very_positive': '非常积极',
      'positive': '积极',
      'mixed': '需要关注'
    };
    const sentimentText = sentimentMap[data.overall_sentiment] || '积极';
    
    if (sentimentValueEl) {
      sentimentValueEl.textContent = sentimentText;
      sentimentValueEl.className = `sentiment-value sentiment-${data.overall_sentiment}`;
    }
    
    // 副标题
    const totalItems = (data.sections?.length || 0) + 
                      (data.retrograde_info?.length || 0) + 
                      (data.eclipse_info?.length || 0);
    if (subtitleEl) {
      subtitleEl.textContent = `找到 ${totalItems} 条星象解读 · ${sentimentText}`;
    }
    
    // 运势正文
    if (readingTextEl) {
      let readingHTML = '';
      
      // 按类别渲染
      if (data.sections && data.sections.length > 0) {
        data.sections.forEach(section => {
          readingHTML += `<div class="reading-section">`;
          readingHTML += `<h3 class="section-title">${section.title}</h3>`;
          section.readings.forEach(reading => {
            readingHTML += `<p>${reading}</p>`;
          });
          readingHTML += `</div>`;
        });
      }
      
      readingTextEl.innerHTML = readingHTML;
    }
    
    // 渲染星象详情
    this.renderDetails(data);
  }
  
  /**
   * 渲染星象详情
   */
  renderDetails(data) {
    // 逆行信息
    const retroSection = document.getElementById('retrogradeSection');
    const retroList = document.getElementById('retrogradeList');
    
    if (retroSection && retroList && data.retrograde_info) {
      if (data.retrograde_info.length > 0) {
        let retroHTML = '';
        data.retrograde_info.forEach(item => {
          const statusClass = item.is_retrograde ? 'retrograde' : 'direct';
          const statusText = item.is_retrograde ? '逆行中' : '顺行';
          retroHTML += `
            <div class="detail-card ${statusClass}">
              <div class="detail-header">
                <span class="detail-title">${item.planet}</span>
                <span class="detail-status ${statusClass}">${statusText}</span>
              </div>
              <p class="detail-content">${item.reading.substring(0, 120)}...</p>
              <div class="detail-areas">影响领域: ${item.affected_areas.join(', ')}</div>
            </div>
          `;
        });
        retroList.innerHTML = retroHTML;
        retroSection.style.display = 'block';
      } else {
        retroSection.style.display = 'none';
      }
    }
    
    // 日月食信息
    const eclipseSection = document.getElementById('eclipseSection');
    const eclipseList = document.getElementById('eclipseList');
    
    if (eclipseSection && eclipseList && data.eclipse_info) {
      if (data.eclipse_info.length > 0) {
        let eclipseHTML = '';
        data.eclipse_info.forEach(item => {
          const typeClass = item.is_positive ? 'positive' : 'neutral';
          eclipseHTML += `
            <div class="detail-card ${typeClass}">
              <div class="detail-header">
                <span class="detail-title">${item.type}</span>
                <span class="detail-house">${item.house_name}</span>
              </div>
              <p class="detail-content">${item.reading.substring(0, 120)}...</p>
              <div class="detail-themes">相关主题: ${item.themes.join(', ')}</div>
            </div>
          `;
        });
        eclipseList.innerHTML = eclipseHTML;
        eclipseSection.style.display = 'block';
      } else {
        eclipseSection.style.display = 'none';
      }
    }
    
    // 宫位解读
    const houseSection = document.getElementById('houseSection');
    const houseList = document.getElementById('houseList');
    
    if (houseSection && houseList && data.sections) {
      let houseHTML = '';
      data.sections.forEach(section => {
        section.readings.forEach(reading => {
          houseHTML += `
            <div class="detail-card">
              <div class="detail-header">
                <span class="detail-title">${section.title}</span>
              </div>
              <p class="detail-content">${reading.substring(0, 150)}...</p>
            </div>
          `;
        });
      });
      houseList.innerHTML = houseHTML;
    }
  }
}

// 自动初始化
const enhancedFortuneModal = new EnhancedFortuneModal();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedFortuneModal;
}
