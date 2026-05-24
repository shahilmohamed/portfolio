import { Component } from '@angular/core';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  isCurrent: boolean;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experiences: ExperienceItem[] = [
    {
      id: 1,
      role: 'Software Developer',
      company: 'TYASuite Software Solutions Pvt. Ltd.',
      location: 'Bangalore',
      period: 'March 2025 – Present',
      isCurrent: true,
      achievements: [
        'Improved application performance by optimizing MySQL queries and backend services using Java and Spring Boot.',
        'Increased system uptime and reliability by resolving production issues and implementing permanent bug fixes.',
        'Developed scalable RESTful APIs using Spring Boot and Hibernate following microservices architecture principles.',
        'Enhanced code quality by participating in code reviews and following best development practices.',
        'Delivered backend modules across full SDLC in Agile environment ensuring timely releases.'
      ]
    },
    {
      id: 2,
      role: 'Trainee Software Engineer',
      company: 'Finzly India Pvt. Ltd.',
      location: 'Chennai',
      period: 'July 2022 – October 2022',
      isCurrent: false,
      achievements: [
        'Developed RESTful APIs using Java and Spring Boot for financial applications.',
        'Improved API reliability by implementing structured error handling.'
      ]
    }
  ];
}
