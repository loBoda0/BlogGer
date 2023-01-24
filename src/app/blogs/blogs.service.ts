import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Blog, Reply } from './blog';
import { createBlogDto } from './interfaces/createBlogDto';
import { API } from 'aws-amplify'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  isDataFetched = new BehaviorSubject<boolean>(false)
  apiName = 'bloggerApi'
  path = '/api1/blogs'

  constructor(private authService: AuthService) { }

  blogs: Blog[] = []
  /* private blogs: Blog[] = [
    new Blog("test", "Tern, white-winged",
      "Person on outside of car injured in collision with two- or three-wheeled motor vehicle in traffic accident, subsequent encounter Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac pretium dui. Cras id varius urna, lacinia dignissim orci. Aliquam erat volutpat. Aenean dapibus turpis id consequat vulputate. Mauris tempus tellus leo, quis laoreet risus consectetur at. Nulla quis semper tortor. Aliquam congue, sapien quis vulputate vehicula, metus leo efficitur sem, eget ultrices purus tellus non urna. Nulla eleifend, orci facilisis eleifend tincidunt, massa magna hendrerit arcu, eu pulvinar velit ipsum accumsan mauris. Morbi et felis neque. In imperdiet lectus vel leo vulputate congue. Integer eros elit, fermentum vel nisi a, scelerisque rhoncus est. Nullam luctus odio quam, eget accumsan turpis porttitor vehicula. Nullam id consequat tortor. Maecenas ullamcorper, tellus eu faucibus dignissim, urna eros dapibus ipsum, non imperdiet felis elit eu turpis. Pellentesque ornare felis nec libero suscipit, nec eleifend dui tristique. Fusce accumsan tempus diam eu efficitur. Quisque ut hendrerit purus. Etiam id diam a augue ultricies accumsan. Donec sit amet nisl est. Donec blandit, turpis vitae sagittis ultricies, velit sem pellentesque libero, sed porttitor magna eros sed dolor. Maecenas pharetra erat vitae nibh venenatis, in luctus purus rutrum. Praesent egestas volutpat metus, sit amet placerat purus iaculis sit amet. Phasellus lobortis felis nibh, et semper sapien fringilla eget. Nunc ex eros, efficitur at augue ut, feugiat efficitur erat. Integer tempor diam eget mauris interdum, eu auctor elit cursus. Nulla sodales cursus erat sit amet sollicitudin. Etiam auctor erat sit amet condimentum suscipit. Morbi posuere diam nec nisi volutpat, aliquet lobortis purus vehicula. Donec gravida libero ac nunc laoreet, quis vehicula sem malesuada. Proin eu felis sed felis mollis blandit. Maecenas eget maximus tortor, eu ultrices urna. Proin nec varius velit. Morbi consectetur, diam sit amet maximus volutpat, risus mauris semper urna, blandit eleifend orci orci at arcu. Vivamus facilisis placerat duisit amet malesuada. Aliquam quis tincidunt mi. Vestibulum maximus euismod lacus. Phasellus augue est, efficitur mollis lacus nec, accumsan semper tortor",
      "https://picsum.photos/500"
    ),
    new Blog("test", "Monitor, water",
      "Unspecified traumatic spondylolisthesis of third cervical vertebra velit ipsum accumsan mauris. Morbi et felis neque. In imperdiet lectus vel leo vulputate congue. Integer eros elit, fermentum vel nisi a, scelerisque rhoncus est. Nullam luctus odio quam, eget accumsan turpis porttitor vehicula. Nullam id consequat tortor. Maecenas ullamcorper, tellus eu faucibus dignissim, urna eros dapibus ipsum, non imperdiet felis elit eu turpis. Pellentesque ornare felis nec libero suscipit, nec eleifend dui tristique. Fusce accumsan tempus diam eu efficitur. Quisque ut hendrerit purus. Etiam id diam a augue ultricies accumsan. Donec sit amet nisl est. Donec blandit, turpis vitae sagittis ultricies, velit sem pellentesque libero, sed porttitor magna eros sed dolor. Maecenas pharetra erat vitae nibh venenatis, in luctus purus rutrum. Praesent egestas volutpat metus, sit amet placerat purus iaculis sit amet. Phasellus lobortis felis nibh, et semper sapien fringilla eget. Nunc ex eros, efficitur at augue ut, feugiat efficitur erat. Integer tempor diam eget mauris interdum, eu auctor elit cursus. Nulla sodales cursus erat sit amet sollicitudin. Etiam auctor erat sit amet condimentum suscipit. Morbi posuere diam nec nisi volutpat, aliquet lobortis purus vehicula. Donec gravida libero ac nunc laoreet, quis vehicula sem malesuada. Proin eu felis sed felis mollis blandit. Maecenas eget maximus ",
      "https://picsum.photos/500"
    ),
      new Blog("test", "Woylie",
      "Complete lesion at C1 level of cervical spinal cord",
    ),
    new Blog("test", "Tortoise, galapagos",
      "Fracture of unspecified part of neck of femur",
      "https://picsum.photos/500"
    ),
    new Blog("test", "Sarus crane",
      "Acute rheumatic pericarditis felis nec libero suscipit, nec eleifend dui tristique. Fusce accumsan tempus diam eu efficitur. Quisque ut hendrerit purus. Etiam id diam a augue ultricies accumsan. Donec sit amet nisl est. Donec blandit, turpis vitae sagittis ultricies, velit sem pellentesque libero, sed porttitor magna eros sed dolor. Maecenas pharetra erat vitae nibh venenatis, in luctus purus rutrum. Praesent egestas volutpat metus, sit amet placerat purus iaculis sit amet. Phasellus lobortis felis nibh, et semper sapien fringilla eget. Nunc ex eros, efficitur at augue ut, feugiat efficitur erat. I"
    ),
    new Blog("test", "Vulture, white-rumped",
      "Furuncle of umbilicus",
      "https://picsum.photos/500"
    ),
    new Blog("test", "White-tailed deer",
      "Insect bite (nonvenomous) of right ear, initial encounter",
      "https://picsum.photos/500"
    ),
    new Blog("test", "Skunk, striped",
      "Corrosion of first degree of unspecified axilla, subsequent encounter",
      "https://picsum.photos/500"
    ),
    new Blog("test", "Francolin, swainson's",
      "Toxic effect of venom of ants, accidental (unintentional), initial encounter"
    ),
    new Blog("test", "Bahama pintail",
      "Multiple fractures of ribs",
      "https://images.unsplash.com/photo-1671050579179-5cd444a8a166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    )
  ] */
  
  getBlogs() {
    return this.blogs.slice()
  }

  getBlogById(id: string) {
    return this.blogs.find((blog) => blog.blogId == id)
  }

  async createBlog(blogData: createBlogDto) {
    const { title, body, image } = blogData
    const userId = await this.authService.getCurrentUser()
    const blog: Blog = new Blog(userId, title, body, image)
    this.blogs.push(blog)
    const myInit = {
      body: blog
    }
    const data = await API.post(this.apiName, this.path, myInit)
    this.isDataFetched.next(true)
    return data
  }
  
  updateBlogPost(id: number, blog: Blog) {
    this.blogs[id] = blog;
  }
  
  deleteBlogPost(id: number) {
    this.blogs.splice(id, 1)
  }
  
  async fetchBlogsFromDB() {
    const { data } = await API.get(this.apiName, this.path, {})
    this.blogs.push(...data)
    this.isDataFetched.next(true)
  }
  
  async postComment(blogId: string, commentBody: string){
    const userId = await this.authService.getCurrentUser()
    const reply = new Reply(userId, commentBody)
    let updatedBlog = this.blogs.find(blog => {
      return blog.blogId === blogId
    })
    updatedBlog.replies.push(reply)
    /* this.blogs.forEach(blog => {
      if (blog.blogId === blogId) {
        blog.replies.push()
      }
    }) */
    console.log(updatedBlog)
    const myInit = {
      body: updatedBlog
    }
    const data = await API.put(this.apiName, this.path, myInit)
    console.log(data)
  }
}
