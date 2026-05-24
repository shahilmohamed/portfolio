import { Component } from '@angular/core';

interface Certification {
  name: string;
  provider: string;
  logo: string;
  date?: string;
  credlyUrl?: string;
  viewUrl?: string;
  viewLabel?: string;
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent {
  certifications: Certification[] = [
    {
      name: 'AWS Cloud Quest: Cloud Practitioner',
      provider: 'Amazon Web Services (AWS)',
      date: 'July 2022',
      logo: 'https://images.credly.com/images/30816e43-2550-4e1c-be22-3f03c5573bb9/blob'
    },
    {
      name: 'SQL (Basic)',
      provider: 'HackerRank',
      date: 'June 2025',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hackerrank.svg',
      viewUrl: 'https://www.hackerrank.com/certificates/eb5f71d5ea1f',
      viewLabel: 'View on HackerRank'
    }
  ];

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.includes('/blob')) {
      img.onerror = null;
      img.src = img.src.replace('/blob', '/image.png');
      return;
    }
    img.onerror = null;
    img.src = 'https://via.placeholder.com/60x60?text=AWS';
  }
}
