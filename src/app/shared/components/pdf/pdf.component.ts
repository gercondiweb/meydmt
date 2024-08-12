import { Component, Input, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchAll } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  @Input() element: any;
  @Input() nameRepo : any;

  constructor( private http: HttpClient,) { }

  ngOnInit() {
  }

  getBase64ImageFromURL(url: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Observable<string>(observer => {
          reader.onloadend = () => {
            observer.next(reader.result as string);
            observer.complete();
          };
        });
      }),
      switchAll()
    );
  }

  imprimirRepo(){

    //todo: creamos e imprimimos el reporte del ticket
    const imageUrl = '../uploads/logo4.png'; // URL de la imagen

    const imgBase64 =  this.getBase64ImageFromURL(imageUrl);

    console.log(this.element)

    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      const docDefinition = {
        content: [
          {
            style:'tableHeader',
            table:{
              widths:[200,'*'],
              body:[
                [
                  {image: base64data, width: 100, style:'imageHeader', rowSpan:3, alignment: 'center'},
                  {text:'Reporte Servicio Completado', style: 'header', border: [true, true, true, false],
                    fillColor: '#eeeeee'}
                ],
                [
                  {},
                  {text:'Ticket Numero: ' + this.element.Id, style: 'header', border: [true, false, true, false],
                    fillColor: '#eeeeee'}
                ],
                [
                  {},
                  {text:'Fecha: ', style: 'header', border: [true, false, true, true],fillColor: '#eeeeee'}
                ]

              ]
            }
          },

          {
            style: 'tableExample',
            table: {
              widths:['*',200],
              body: [
                ['Cliente', 'Nit'],
                [this.element.Cliente, '901002345-8'],
                [{text:'Tecnico Atendio' ,fillColor: '#eeeeee'}, {text:'Fecha',fillColor: '#eeeeee'}],
                [this.element.id_tecnico+ ' ' + this.element.Nombre, '2024-08-10'],
                [{text:'Location:\nSuc.'+  this.element.nombreSucursal + ', '+ this.element.direccion + ', ' + this.element.ciudad, colSpan:2},{}],
              ]
            }
          },
          {
            text: 'INTERVENCION TECNICA',
			      style: 'header'
          },

          {
            table:{
              widths:['*',200],
              body:[
                 [{text:'TIPO DE SERVICIO', colSpan: 2,fillColor: '#eeeeee'},{}],
                 [{text:'Tipo Servicio'},{text:this.element.Serv}],
                 [{text:'Servicio'},{text:this.element.Descripcion}],
                 [{text:'Descripcion'},{text:this.element.DetalleTKT}],

                 [{text:'DATOS', colSpan: 2,fillColor: '#eeeeee'},{}],
                 [{text:'Contrato No.'},{text:this.element.Serv}],
                 [{text:'Autorizador'},{text:this.element.autorizador}],
                 [{text:'Telefono'},{text:this.element.telefonoautorizador}],
                 [{text:'Email'},{text:this.element.emailautorizador}],

                 [{text:'VISITAS', colSpan: 2,fillColor: '#eeeeee'},{}],
                 [{text:'Fecha'},{text:this.element.Fecha}],
                 [{text:'Hora'},{text:this.element.Hora}],
                 [{text:'Usuario'},{text:this.element.Usuario}],

                 [{text:'ADJUNTOS', colSpan: 2,fillColor: '#eeeeee'},{}],
                 [{
                    table:{
                      widths: [200, '*', 200],
                      heights: [10, 200],
                      body:[
                        ['Image1', 'Image2', 'image3'],
                        ['Image1', 'Image2', 'image3'],
                      ]
                    }, colSpan: 2
                  },{}],

                 [{text:'DATOS ENTREGA', colSpan: 2,fillColor: '#eeeeee'},{}],
                 [{text:'Servicio Completado'},{text:'Si'}],
                 [{text:'Recibido a Satisfacción'},{text:'Si'}],
                 [{text:'Observación del Servicio'},{text:'Aqui iran las comentarios que el que firma deja al completar el servicio'}],
                 [{text:'Firma '},{text:'Si'}],

              ]
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true
          },
          imageHeader:{

          }

        }
      };
      const pdf = pdfMake.createPdf(docDefinition);
      pdf.open();
      //pdfMake.createPdf(docDefinition).download('reporte.pdf');
    });
  }

}
