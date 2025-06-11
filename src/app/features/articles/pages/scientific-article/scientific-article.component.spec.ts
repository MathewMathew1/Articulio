import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificArticleComponent } from './scientific-article.component';

describe('ScientificArticleComponent', () => {
  let component: ScientificArticleComponent;
  let fixture: ComponentFixture<ScientificArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientificArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScientificArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
