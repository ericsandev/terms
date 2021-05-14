import { Component, Input, OnInit } from '@angular/core';
import { CoalService } from 'src/app/shared/services/mock/coal.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  @Input('mostrarTodo') mostrarTodo: number;
  @Input('idSeekOp') idSeekOp: string;
  @Input('aceptoAviso') aceptoAviso: number;
  constructor(private readonly coalService: CoalService) { }

  ngOnInit(): void {
  }

  changeAviso = () => {
    if (this.aceptoAviso === 1) {
      this.aceptoAviso = 0;
    } else {
      this.aceptoAviso = 1;
    }
    this.coalService.postService('aviso/postInsUsuarioAcepta', {
      idSeekOp: this.idSeekOp,
      aceptoAviso: this.aceptoAviso,
    }).subscribe((res: any) => {
      console.log(res);
    });
  }

}
