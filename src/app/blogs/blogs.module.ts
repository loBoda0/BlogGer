import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsHomeComponent } from './blogs-home/blogs-home.component';
import { BlogsHeroComponent } from './blogs-hero/blogs-hero.component';
import { NavComponent } from './nav/nav.component';
import { BlogsWallComponent } from './blogs-wall/blogs-wall.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogsNewComponent } from './blogs-new/blogs-new.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { SharedModule } from '../shared/shared.module';
import { ReplyComponent } from './blog-item/reply/reply.component';
import { BlogsEditComponent } from './blogs-edit/blogs-edit.component';


@NgModule({
  declarations: [
    BlogsHomeComponent,
    BlogsHeroComponent,
    NavComponent,
    BlogsWallComponent,
    BlogCardComponent,
    BlogsNewComponent,
    BlogItemComponent,
    ReplyComponent,
    BlogsEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlogsRoutingModule,
    SharedModule,
  ]
})
export class BlogsModule { }
