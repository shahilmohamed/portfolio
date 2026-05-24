import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;

  navLinks = [
    { id: 'hero', text: 'About' },
    { id: 'skills', text: 'Skills' },
    { id: 'certifications', text: 'Certifications' },
    { id: 'projects', text: 'Projects' },
    { id: 'experience', text: 'Experience' },
    { id: 'contact', text: 'Contact' }
  ];

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigate(id: string, event: Event): void {
    event.preventDefault();
    this.closeMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
