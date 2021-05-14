import { Service } from 'typedi';
import { default as config } from '../config';
import { Query } from '../data/queryCommon';
const jsonxml = require('jsontoxml');

@Service()
export class CommonRepository {
    private conf: any; // variabel para guardar la configuración
    query: any;

    constructor() {
        const env: string = process.env.NODE_ENV || 'development';
        this.conf = (config as any)[env]; // ejemplo de llamada al confg.js
        this.query = new Query();
    }

    // ************ SERVICIOS GET ************
    GetEmpresaucursalDepartamento(query: any): PromiseLike<{}> {
        return this.query.spExecute(query, "[bpro].[SEL_EMPRESAS_DEPARTAMENTO_SUCURSAL_SP]")
    }
    
    // ************* TERMINA GET *************

    // ************ SERVICIOS POST ************

 

    // ************* TERMINA POST *************

    // ************ SERVICIOS PUT ************
    // ************* TERMINA PUT *************

    // ************ SERVICIOS DELETE ************
    // ************* TERMINA DELETE *************
}