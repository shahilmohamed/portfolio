import { Component, OnInit } from '@angular/core';

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


  submit() {
    if (this.model.name && this.model.email && this.model.message) {
      this.submitted = true;
      console.log('Contact form submitted:', this.model);
      alert('Thank you for reaching out! Your message has been logged in the console.');
      this.model = { name: '', email: '', message: '' };
    }
  }

}
