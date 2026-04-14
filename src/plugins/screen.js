export default {
  install(app) {
    app.config.globalProperties.$screen = {
      isMobile: () => window.innerWidth < 768,
      isTablet: () => window.innerWidth >= 768 && window.innerWidth < 1024,
      isDesktop: () => window.innerWidth >= 1024
    }
  }
}