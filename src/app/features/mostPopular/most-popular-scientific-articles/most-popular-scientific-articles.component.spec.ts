import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularArticlesComponent } from './most-popular-scientific-articles.component';

describe('MostPopularArticlesComponent', () => {
  let component: MostPopularArticlesComponent;
  let fixture: ComponentFixture<MostPopularArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostPopularArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostPopularArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
