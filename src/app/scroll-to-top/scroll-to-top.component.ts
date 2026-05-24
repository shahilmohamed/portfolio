import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  styleUrls: ['./scroll-to-top.component.css'],
  template: `
    <button
      class="scroll-to-top"
      [class.visible]="isVisible"
      (click)="scrollToTop()"
      aria-label="Scroll to top">
      <span>↑</span>
    </button>
  `
})
export class ScrollToTopComponent implements OnInit {
  isVisible = false;

  ngOnInit(): void {
    this.checkVisibility();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    this.isVisible = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
