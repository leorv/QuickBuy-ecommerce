import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaProdutoComponent } from './loja-produto.component';

describe('LojaProdutoComponent', () => {
  let component: LojaProdutoComponent;
  let fixture: ComponentFixture<LojaProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojaProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
