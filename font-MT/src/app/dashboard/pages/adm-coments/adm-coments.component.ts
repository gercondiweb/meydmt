import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adm-coments',
  standalone: false,
  templateUrl: './adm-coments.component.html',
  styleUrl: './adm-coments.component.css'
})
export class AdmComentsComponent implements OnInit{

  public frmComents !: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdmComentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RestService:RestService) {}

  ngOnInit(): void {

     this.frmComents = this.formBuilder.group({
      opc:[''],
      id_ticket:['',[Validators.required]]
     });

  }

  grabar(){

  }

  cancelar() {
    this.dialogRef.close();
  }

}
