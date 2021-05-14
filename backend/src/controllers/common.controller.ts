import { Request } from 'express';
import {
    JsonController,
    UploadedFile,
    Body,
    Get,
    Post,
    Req,
    Put,
    Delete,

} from 'routing-controllers';
import { CommonRepository } from '../repository/common.repository';

@JsonController('/common')
export class CommonController {
    private repository: CommonRepository;

    constructor(repository: CommonRepository) {
        this.repository = repository;
    }

    // ************ Servicios GET ************

      /**
   * @description Obtiene la lista de empresa, sucursales y departamentos
   * @author Andres Farias
   * SP: [bpro].[SEL_EMPRESAS_DEPARTAMENTO_SUCURSAL_SP]
   * Url: http://{server}:{port}/GetTipoPago
   * Wiki: 
   */
  @Get('/GetEmpresaSucursalDepartamento')
  GetTipoPago(@Req() req: Request) {
      return this.repository.GetEmpresaucursalDepartamento(req.query);
  }

    // ************ END Servicios GET ************

    // ************ Servicios POST ************



    // ************ END Servicios POST ************

    // ************ Servicios PUT ************
    // ************ END Servicios POST ************

    // ************ Servicios DELETE ************
    // ************ END Servicios DELETE ************
}