import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  model = { name: '', email: '', message: '' };
  submitted = false;
  successMessage = '';
  errorMessage = '';

  submit() {
    if (this.model.name && this.model.email && this.model.message) {
      this.submitted = true;
      emailjs
        .send(
          'service_h0z7hfk',
          'template_vq6lxlo',
          this.model,
          'Egt9NVVn8wdp9gZlj'
        )
        .then(
          (result: EmailJSResponseStatus) => {
            this.successMessage = 'Message sent successfully!';
            this.model = { name: '', email: '', message: '' };
          },
          (error) => {
            this.errorMessage = 'Something went wrong. Please try again.';
          }
        );
    }
  }
}
