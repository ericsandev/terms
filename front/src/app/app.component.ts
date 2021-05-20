import { Component, OnInit } from '@angular/core';
import { MockService } from './shared/services/mock/mock.service';
import { CoalService } from './shared/services/mock/coal.service';
import { DataModel } from './shared/models/data.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  aceptoAviso: number;

  spinner: boolean;


  constructor(
    private readonly mock: MockService,
    private route: ActivatedRoute,
    private readonly coalService: CoalService
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.idSeekOp) {
        this.idSeekOp = params.idSeekOp;
        this.getDatosCampania();
        this.getDatosUsuario();
      }
    });
  }

  cambioCheck = (camp: any, indexCampania: number) => {
    this.idCampania = camp.idCampania;
    const indexArea = this.data[0].areas.findIndex((c: any) => c.idArea === camp.idArea);
    if (camp.recibirAviso === 1) {
      this.data[0].areas[indexArea].campanias[indexCampania].recibirAviso = 0;
      this.checked = 0;
    } else {
      this.data[0].areas[indexArea].campanias[indexCampania].recibirAviso = 1;
      this.checked = 1;
    }
    this.guardarRecibirAviso();
  }

  getDatosCampania = () => {
    this.spinner = true;
    this.coalService.getService(`aviso/getCampania?idSeekOp=${this.idSeekOp}`).subscribe((res: any) => {
      const rs = res.recordsets[0];
      if (rs[0]) {
        this.spinner = false;
        this.data = rs;
        this.obtenerAreasCampania(res.recordsets[1]);
      }
    }, (err) => {
      this.spinner = false;
    });
  };

  getDatosUsuario = () => {
    this.spinner = true;
    this.coalService.getService(`aviso/getUsuario?idSeekOp=${this.idSeekOp}`).subscribe((res: any) => {
      const rs = res.recordsets[0];
      this.spinner = false;
      if (rs[0]) {
        this.aceptoAviso = rs[0].aceptoAviso;
      }
    }, (err) => {
      this.spinner = false;
    });
  };

  obtenerAreasCampania = (data: any) => {
    this.data[0].areas = Array.from(new Set(data.map(e => e.idArea)))
      .map((idArea: number) => {
        return {
          idArea,
          area: data.find(e => e.idArea === idArea).area,
          campanias: data.filter(e => e.idArea === idArea),
          recibirAviso: data.find(e => e.idArea === idArea).recibirAviso
        }
      });
      this.data[0].areas.map((area: any) => {
        area.mostrarChekAviso = this.data.find((d: any) => d.idArea == area.idArea).mostrarChekAviso;
        return area;
      });
  }

  guardarRecibirAviso = () => {
    this.spinner = true;
    this.coalService.postService('aviso/postRecibirAviso', {
      idSeekOp: this.idSeekOp,
      idCampania: this.idCampania,
      recibirAviso: this.checked
    }).subscribe((res: any) => {
      console.log(res.recordsets[0]);
      this.spinner = false;
    }, (err) => {
      this.spinner = false;
    });
  }
}
