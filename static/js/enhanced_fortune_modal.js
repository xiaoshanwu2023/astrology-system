/**
 * 珊姐运势解读模态框前端交互模块（服务端渲染版）
 * 模态框内容由 Jinja 在 /result 渲染时生成（data.fortune_detail），
 * 本模块只保留开/关功能，不再请求 /api/comprehensive-fortune。
 */

class EnhancedFortuneModal {
  constructor(options = {}) {
    this.options = {
      modalId: 'enhancedFortuneModal',
      buttonId: 'enhancedFortuneBtn',
      ...options
    };

    this.modal = null;
    this.button = null;
    this.isOpen = false;

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

    console.log('✅ EnhancedFortuneModal 初始化完成（服务端渲染模式）');
  }

  /**
   * 打开模态框（内容已由服务端渲染，直接展示）
   */
  open() {
    if (!this.modal) return;

    this.isOpen = true;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const content = document.getElementById('fortuneContent');
    if (content) content.style.display = 'block';

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
}

// 自动初始化
const enhancedFortuneModal = new EnhancedFortuneModal();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedFortuneModal;
}
