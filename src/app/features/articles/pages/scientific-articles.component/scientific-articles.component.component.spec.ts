import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificArticlesComponentComponent } from './scientific-articles.component.component';

describe('ScientificArticlesComponentComponent', () => {
  let component: ScientificArticlesComponentComponent;
  let fixture: ComponentFixture<ScientificArticlesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientificArticlesComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScientificArticlesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
