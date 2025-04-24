import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["drawer", "backdrop"]
  static values = {
    open: Boolean
  }

  connect() {
    this.close()
  }

  open() {
    this.openValue = true
    this.drawerTarget.classList.remove("-translate-x-full")
    this.backdropTarget.classList.remove("hidden")
    document.body.classList.add("overflow-hidden")
  }

  close() {
    this.openValue = false
    this.drawerTarget.classList.add("-translate-x-full")
    this.backdropTarget.classList.add("hidden")
    document.body.classList.remove("overflow-hidden")
  }

  toggle() {
    if (this.openValue) {
      this.close()
    } else {
      this.open()
    }
  }
} 
