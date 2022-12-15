import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsWallComponent } from './blogs-wall.component';

describe('BlogsWallComponent', () => {
  let component: BlogsWallComponent;
  let fixture: ComponentFixture<BlogsWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsWallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
