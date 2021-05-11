import { Component, OnInit } from '@angular/core';
import { MockService } from './shared/services/mock/mock.service';
import { DataModel } from './shared/models/data.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  filter: Observable<string>;

  data: DataModel[];

  idSeekOp: string;

  idCampania: string;

  isCollapsed = true;

  title = 'terms';

  constructor(
    private readonly mock: MockService,
    private route: ActivatedRoute
  ) {
    this.mock.getData().subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.idSeekOp && params.idCampania) {
        this.idSeekOp = params.idSeekOp;
        this.idCampania = params.idCampania;
        this.getDatosCampania();
      }
    });
  }

  getDatosCampania = () => {

  };

  guardarRecibirAviso = () => {

  }
}
