/* ============================================
   溯砺咨询 - 交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 导航栏 ---------- */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // 移动端菜单
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // 点击导航链接后关闭菜单
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // 滚动时添加阴影
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    // 回到顶部按钮
    document.getElementById('backToTop').classList.toggle('show', window.scrollY > 400);
  });

  /* ---------- 回到顶部 ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 统计数字动画 ---------- */
  const statsSection = document.querySelector('.stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'));
      const duration = 1500;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  // IntersectionObserver 触发动画
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) animateStats();
      });
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(statsSection);

  /* ---------- 近期活动（模拟数据） ---------- */
  const upcomingData = [
    {
      day: '20', month: '7月',
      title: 'AI时代的领导力变革',
      desc: '探讨AI如何重塑管理思维与企业决策模式',
      tag: '公开课', tagClass: 'tag-public',
      status: '报名中', statusClass: 'open'
    },
    {
      day: '26', month: '7月',
      title: '走进华为·数字化转型研学',
      desc: '三天深度研学，参访华为松山湖基地',
      tag: '研学', tagClass: 'tag-study',
      status: '即将截止', statusClass: ''
    },
    {
      day: '3', month: '8月',
      title: '创业者破局——增长密码',
      desc: '三位连续创业者分享从0到1的真实经历',
      tag: '创业下午茶', tagClass: 'tag-tea',
      status: '报名中', statusClass: 'open'
    },
    {
      day: '10', month: '8月',
      title: '《思考，快与慢》共读沙龙',
      desc: '丹尼尔·卡尼曼经典作品深度领读与讨论',
      tag: '读书会', tagClass: 'tag-book',
      status: '报名中', statusClass: 'open'
    },
  ];

  const upcomingList = document.getElementById('upcomingList');
  if (upcomingList) {
    upcomingList.innerHTML = upcomingData.map(item => `
      <div class="upcoming-item">
        <div class="upcoming-date">
          <span class="day">${item.day}</span>
          <span class="month">${item.month}</span>
        </div>
        <div class="upcoming-info">
          <span class="upcoming-tag ${item.tagClass}">${item.tag}</span>
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
        <div class="upcoming-status ${item.statusClass}">
          <i class="fas ${item.statusClass ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
          ${item.status}
        </div>
      </div>
    `).join('');
  }

  /* ---------- 表单提交流程 ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';

      // 收集表单数据
      const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value.trim(),
      };

      try {
        // 模拟 API 调用（后续替换为真实接口）
        await new Promise(resolve => setTimeout(resolve, 1200));

        // 显示成功消息
        showToast('✅ 提交成功！我们会尽快与您联系');
        contactForm.reset();

      } catch (err) {
        showToast('❌ 提交失败，请稍后重试');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  /* ---------- Toast 通知 ---------- */
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ---------- 平滑滚动 (Safari 兼容) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
