import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationFrameId = 0;
  private stars: Array<{ x: number; y: number; radius: number; opacity: number; flickerSpeed: number }> = [];
  private shootingStars: Array<{
    x: number; y: number; length: number; angle: number; speed: number; progress: number;
  }> = [];

  constructor(public theme: ThemeService) {}

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.onResize);
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/Mohamed_Shahil.pdf';
    link.download = 'Mohamed_Shahil.pdf';
    link.click();
  }

  private onResize = (): void => {
    this.resizeCanvas();
  };

  private initCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.initStars(canvas.width, canvas.height);
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const starColor = this.theme.isDarkTheme ? 'rgba(255, 255, 255, ' : 'rgba(59, 130, 246, ';

      this.stars.forEach(star => {
        star.opacity += Math.sin(Date.now() * star.flickerSpeed) * 0.05;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${starColor}${star.opacity})`;
        ctx.fill();
      });

      this.shootingStars = this.shootingStars.filter(star => {
        star.progress += star.speed;
        if (star.progress >= 100) return false;

        const opacity = star.progress < 10 ? star.progress / 10 :
          star.progress > 90 ? (100 - star.progress) / 10 : 1;
        const endX = star.x + Math.cos(star.angle) * star.length * (star.progress / 100);
        const endY = star.y + Math.sin(star.angle) * star.length * (star.progress / 100);
        const tailX = star.x + Math.cos(star.angle) * star.length * Math.max(0, (star.progress - 10) / 100);
        const tailY = star.y + Math.sin(star.angle) * star.length * Math.max(0, (star.progress - 10) / 100);
        const gradient = ctx.createLinearGradient(tailX, tailY, endX, endY);
        gradient.addColorStop(0, `${starColor}0)`);
        gradient.addColorStop(1, `${starColor}${opacity})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        return true;
      });

      if (this.shootingStars.length < 3 && Math.random() < 0.01) {
        this.shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height / 3,
          length: Math.random() * 100 + 50,
          angle: Math.PI / 4 + Math.random() * Math.PI / 4,
          speed: Math.random() * 15 + 10,
          progress: 0
        });
      }

      this.animationFrameId = requestAnimationFrame(drawStars);
    };

    this.resizeCanvas = resizeCanvas;
    window.addEventListener('resize', this.onResize);
    resizeCanvas();
    drawStars();
  }

  private resizeCanvas!: () => void;

  private initStars(width: number, height: number): void {
    this.stars = [];
    const count = Math.floor(width * height / 1000);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        flickerSpeed: Math.random() * 0.05
      });
    }
  }
}
