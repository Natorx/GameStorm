<script setup lang="ts">
</script>
<template>
    <footer>
    <!-- 主内容区域 -->
    <div class="footer-main">
      <div class="footer-content">
        <!-- 左侧链接区域 -->
        <div class="footer-links">
          <div class="link-group">
            <h3 class="group-title">下载客户端</h3>
            <ul class="link-list">
              <li class="link-item">
                <div class="i-ri-windows-fill link-icon"></div>
                <span>Windows版</span>
              </li>
              <li class="link-item">
                <div class="i-ri-mac-line link-icon"></div>
                <span>Mac版</span>
              </li>
              <li class="link-item">
                <div class="i-ri-android-fill link-icon"></div>
                <span>Android版</span>
              </li>
              <li class="link-item">
                <div class="i-ri-apple-fill link-icon"></div>
                <span>iOS版</span>
              </li>
            </ul>
          </div>

          <div class="link-group">
            <h3 class="group-title">官方渠道</h3>
            <ul class="link-list">
              <li class="link-item">
                <div class="i-ri-wechat-2-fill link-icon"></div>
                <span>微信公众号</span>
              </li>
              <li class="link-item">
                <div class="i-ri-microsoft-fill link-icon"></div>
                <span>官方微博</span>
              </li>
              <li class="link-item">
                <div class="i-ri-bilibili-fill link-icon"></div>
                <span>B站官方</span>
              </li>
              <li class="link-item">
                <div class="i-ri-tiktok-fill link-icon"></div>
                <span>抖音号</span>
              </li>
            </ul>
          </div>

          <div class="link-group">
            <h3 class="group-title">友情链接</h3>
            <ul class="link-list">
              <li class="link-item">竹影居博客</li>
              <li class="link-item">游戏星空</li>
              <li class="link-item">游民星空</li>
              <li class="link-item">3DM游戏网</li>
            </ul>
          </div>

          <div class="link-group">
            <h3 class="group-title">关于我们</h3>
            <ul class="link-list">
              <li class="link-item">公司简介</li>
              <li class="link-item">联系我们</li>
              <li class="link-item">加入我们</li>
              <li class="link-item">商务合作</li>
            </ul>
          </div>
        </div>

        <!-- 右侧 Logo 区域 -->
        <div class="footer-logo">
          <div class="logo-wrapper">
            <a-image
              width="60"
              src="src/assets/logo.svg"
              class="logo-image"
              :preview="false"
            />
            <span class="logo-text">GameStorm</span>
          </div>
          <div class="social-links">
            <div class="social-icon i-ri-wechat-fill"></div>
            <div class="social-icon i-ri-weibo-fill"></div>
            <div class="social-icon i-ri-bilibili-fill"></div>
            <div class="social-icon i-ri-tiktok-fill"></div>
            <div class="social-icon i-ri-qq-fill"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <div class="footer-bottom">
      <div class="copyright-info">
        <p>Copyright © 1999-2024, gstorm.com. All rights reserved.</p>
        <div class="license-info">
          <span>ICP证：苏B2-20240603</span>
          <span class="separator">|</span>
          <span>沪ICP备08023580号-3</span>
        </div>
      </div>

      <div class="certificate-info">
        <span>镇江高职321101200602012812号</span>
        <span class="separator">|</span>
        <span>（苏）互联网平台备字[2024]第00001号</span>
        <span class="separator">|</span>
        <span>苏网备1050001号</span>
        <span class="separator">|</span>
        <span>旅游度假资质</span>
        <span class="separator">|</span>
        <span>平台信息</span>
      </div>

      <div class="contact-info">
        <span>违法和不良信息举报电话：021-22500846</span>
        <span class="separator">|</span>
        <span>全国旅游投诉热线：12345</span>
        <span class="separator">|</span>
        <span>镇江市旅游网站落实诚信建设主体责任承诺书</span>
      </div>
    </div>
    </footer>
</template>

<style scoped>
footer{
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  padding: 0;
  margin-top: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-main {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 5% 40px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

/* 左侧链接区域 */
.footer-links {
  display: flex;
  gap: 80px;
  flex-wrap: wrap;
  flex: 1;
}

.link-group {
  min-width: 120px;
}

.group-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.group-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #f97316, #ffa500);
  border-radius: 2px;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-item {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.link-item:hover {
  color: #f97316;
  transform: translateX(5px);
}

.link-icon {
  font-size: 18px;
}

/* 右侧 Logo 区域 */
.footer-logo {
  text-align: right;
  min-width: 200px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 20px;
}

.logo-image {
  filter: brightness(0) invert(1);
  transition: transform 0.3s ease;
}

.logo-wrapper:hover .logo-image {
  transform: scale(1.05);
}

.logo-text {
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(135deg, #f97316, #ffa500);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.social-links {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.social-icon {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #f97316;
  color: white;
  transform: translateY(-3px);
}

/* 底部版权信息 */
.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 5% 25px;
  text-align: center;
}

.copyright-info {
  margin-bottom: 15px;
}

.copyright-info p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  margin: 0 0 8px 0;
}

.license-info {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

.certificate-info {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  margin-bottom: 12px;
  line-height: 1.6;
}

.contact-info {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  line-height: 1.6;
}

.separator {
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.3);
}

/* 响应式设计 */
@media (max-width: 968px) {
  .footer-content {
    flex-direction: column;
    gap: 30px;
  }
  
  .footer-links {
    gap: 40px;
    justify-content: space-between;
  }
  
  .footer-logo {
    text-align: center;
  }
  
  .logo-wrapper {
    justify-content: center;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .footer-links {
    flex-direction: column;
    gap: 30px;
  }
  
  .link-group {
    text-align: center;
  }
  
  .group-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .link-item {
    justify-content: center;
  }
  
  .certificate-info, 
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .separator {
    display: none;
  }
  
  .license-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .license-info .separator {
    display: none;
  }
}

@media (max-width: 480px) {
  .footer-main {
    padding: 30px 20px 20px;
  }
  
  .logo-text {
    font-size: 22px;
  }
  
  .social-icon {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
}
</style>