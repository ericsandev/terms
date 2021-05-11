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
  checked = true;

  isCollapsed = true;

  title = 'terms';


  constructor(
    private readonly mock: MockService,
    private route: ActivatedRoute,
    private readonly coalService: CoalService
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

  cambioCheck = ($event, i) => {
    this.checked = !this.checked;
    // if (checked === true) {
    //   this.data[0].areas[i].recibirAviso = 1;
    // } else {
    //   this.data[0].areas[i].recibirAviso = 0;
    // }
    console.log(this.checked);
    this.guardarRecibirAviso();
  }

  getDatosCampania = () => {
    // this.coalService.getService('aviso/getCampania?&idCampania=' + this.idCampania).subscribe((res: any) => {
    //   console.log(res.recordsets[0]);
    //   const rs = res.recordsets[0];
    //   if (rs[0]) {
    //     this.data = rs;
    //   }
    // });
  };

  guardarRecibirAviso = () => {
    // this.coalService.postService('aviso/postRecibirAviso', {
    //   idSeekOp: this.idSeekOp,
    //   idCategoria: this.data[0].idCategoria,
    //   recibirAviso: this.checked
    // }).subscribe((res: any) => {
    //   console.log(res.recordsets[0]);
    // });
  }
}
