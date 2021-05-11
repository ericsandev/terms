import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataModel } from '../../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  getData(): Observable<DataModel[]> {
    return of([
      {
        idCampania: 11,
        campania: 'Recordatorio de servicios básicos de mantenimiento preventivo',
        idArea: 4,
        area: 'Servicio',
        idCategoria: 2,
        categoria: 'Primarias',
        mostrarChekAviso: 1,
        textoAviso: `But I must explain to you how all this mistaken idea of
        denouncing pleasure and praising pain was born and I will give you a
        complete account of the system, and expound the actual teachings of the
        great explorer of the truth, the master-builder of human happiness. No one
        rejects, dislikes, or avoids pleasure itself, because it is pleasure, but
        because those who do not know how to pursue pleasure rationally encounter
        consequences that are extremely painful. Nor again is there anyone who loves
        or pursues or desires to obtain pain of itself, because it is pain, but because
        occasionally circumstances occur in which toil and pain can procure him some great
        pleasure. To take a trivial example, which of us ever undertakes laborious physical
        exercise, except to obtain some advantage from it? But who has any right to find
        fault with a man who chooses to enjoy a pleasure that has no annoying consequences,
        or one who avoids a pain that produces no resultant pleasure?`,
        minimoCaracteres: 200,
        areas: [
          {
            area: 'Nuevos',
            recibirAviso: 1,
            campanias: [
              {
                idCampania: 1,
                campania: 'Oferta comercial'
              },
              {
                idCampania: 2,
                campania: 'Lanzamientos y eventos'
              },
            ]
          },
          {
            area: 'Seminuevos',
            recibirAviso: 0,
            campanias: [
              {
                idCampania: 3,
                campania: 'Oferta comercial'
              },
              {
                idCampania: 4,
                campania: 'Lanzamientos y eventos'
              },
            ]
          }
        ]
      }
    ])
  }
  constructor() { }
}
