import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input() blog: Blog

  constructor() { }

  ngOnInit(): void {
  }

}
