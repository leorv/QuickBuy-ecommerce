import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraRealizadaSucessoComponent } from './compra-realizada-sucesso.component';

describe('CompraRealizadaSucessoComponent', () => {
  let component: CompraRealizadaSucessoComponent;
  let fixture: ComponentFixture<CompraRealizadaSucessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraRealizadaSucessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraRealizadaSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
