import * as nodemailer from 'nodemailer';
import { default as config } from "../config";
var http = require("https");
const env: string = process.env.NODE_ENV || "development";
const conf = (config as any)[env];

// email sender function
export const sendEmail = function (req: any, res: any): Promise<any> {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'grupoandrade0101@gmail.com',
            pass: '512879a1'
        }
    });
    // Definimos el email
    var mailOptions = {
        from: 'coal.solutions.mex@gmail.com',
        to: req.email,
        subject: req.subject,
        html: req.body,
        attachments: req.attachments
    };
    return new Promise((resolve, rejected) => {
        // Enviamos el email
        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                rejected({
                    error: error,
                    excepcion: undefined,
                    recordsets: []
                });
            } else {
                resolve({
                    error: null,
                    excepcion: undefined,
                    recordsets: []
                });
            }
        });
    });
};

export const sendGridEMail = function (opt: any, data: any, idTemplate: string) {
    return new Promise((done, reject) => {
        const options = {
            "method": "POST",
            "hostname": "api.sendgrid.com",
            "port": null,
            "path": "/v3/mail/send",
            "headers": {
                "authorization": conf.sendGrid.token,
                "content-type": "application/json"
            }
        };
    
        let toSend: any = [];
        // emails.forEach((element: string) => {
        //     toSend.push({ 'email': element.trim() })
        // });
        toSend.push({ 'email': opt.email })
    
        var req = http.request(options, function (res: any) {
            var chunks: any[] = [];
    
            res.on("data", function (chunk: any) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body: any = Buffer.concat(chunks);
                try {
                    done(JSON.parse(body.toString()));
                } catch (error) {
                    done({ errors: null });
                }
            });
        });
    
        req.write(JSON.stringify({
            personalizations:
                [{
                    to: toSend,
                    dynamic_template_data: {
                        ... data
                    },
                    subject: 'Encuestas'
                }],
            from: { email: 'intranet@grupoandrade.com', name: 'Encuestas' },
            template_id: idTemplate //'d-afb2684e68bf4c89abb21313b0188236'
        }));
        req.end();
    });
};