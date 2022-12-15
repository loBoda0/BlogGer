import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogsHomeComponent } from './blogs-home/blogs-home.component';
import { BlogsNewComponent } from './blogs-new/blogs-new.component';
import { BlogsWallComponent } from './blogs-wall/blogs-wall.component';

const routes: Routes = [
  {path: '', component: BlogsHomeComponent,
    children: [
      { path: '', component: BlogsWallComponent },
      { path: 'new', component: BlogsNewComponent },
      { path: ':id', component: BlogItemComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
