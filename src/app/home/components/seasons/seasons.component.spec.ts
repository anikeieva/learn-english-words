import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsComponent } from './seasons.component';
import { VideoService } from '../../../shared/services/video.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../shared/tests/activatedRouteStub';

describe('SeasonsComponent', () => {
  let component: SeasonsComponent;
  let fixture: ComponentFixture<SeasonsComponent>;

  beforeEach(async(() => {
    const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ SeasonsComponent ],
      providers: [ VideoService, {
        provide: ActivatedRoute, useValue: activatedRoute
      } ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
