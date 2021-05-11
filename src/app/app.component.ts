import { Component, OnInit } from '@angular/core';
import { MockService } from './shared/services/mock/mock.service';
import { CoalService } from './shared/services/mock/coal.service';
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

  data: any[];

  idSeekOp: string;

  idCampania: string;
  checked: number;
  idArea: number;

  isCollapsed = true;

  title = 'terms';


  constructor(
    private readonly mock: MockService,
    private route: ActivatedRoute,
    private readonly coalService: CoalService
  ) {
    // this.mock.getData().subscribe(data => {
    //   this.data = data;
    // });
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

  cambioCheck = ($event, i) => {
    this.idArea = this.data[0].areas[i].idArea;
    if (this.data[0].areas[i].recibirAviso === 1) {
      this.data[0].areas[i].recibirAviso = 0;
      this.checked = 0;
    } else {
      this.data[0].areas[i].recibirAviso = 1;
      this.checked = 1;
    }
    this.guardarRecibirAviso();
  }

  getDatosCampania = () => {
    this.coalService.getService(`aviso/getCampania?idCampania=${this.idCampania}&idSeekOp=${this.idSeekOp}`).subscribe((res: any) => {
      const rs = res.recordsets[0];
      if (rs[0]) {
        this.data = rs;
        this.obtenerAreasCampania(res.recordsets[1]);
      }
    });
  };

  obtenerAreasCampania = (data: any) => {
    this.data[0].areas = Array.from(new Set(data.map(e => e.idArea)))
    .map((idArea: number) => {
      return {
        idArea,
        area: data.find(e => e.idArea === idArea).area,
        campanias: data.filter(e => e.idArea === idArea),
        recibirAviso: data.find(e => e.idArea === idArea).recibirAviso,
      }
    });
  }

  guardarRecibirAviso = () => {
    this.coalService.postService('aviso/postRecibirAviso', {
      idSeekOp: this.idSeekOp,
      idArea: this.idArea,
      recibirAviso: this.checked
    }).subscribe((res: any) => {
      console.log(res.recordsets[0]);
    });
  }
}
