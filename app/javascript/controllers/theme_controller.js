import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["darkIcon", "lightIcon"]

  connect() {
    // Check for saved theme preference, otherwise use system preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      this.showLightIcon()
    } else {
      document.documentElement.classList.remove('dark')
      this.showDarkIcon()
    }
  }

  toggle(event) {
    // Toggle icons
    this.darkIconTarget.classList.toggle('hidden')
    this.lightIconTarget.classList.toggle('hidden')

    // If set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      }
    }
  }

  showDarkIcon() {
    this.darkIconTarget.classList.remove('hidden')
    this.lightIconTarget.classList.add('hidden')
  }

  showLightIcon() {
    this.darkIconTarget.classList.add('hidden')
    this.lightIconTarget.classList.remove('hidden')
  }
} 