import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TeamsInterface} from "../../interfaces/teams.interface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form: FormGroup;
  data: TeamsInterface

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.data = data
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.name, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      stadium: [this.data.stadium, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      webSite: [this.data.webSite, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      country: [this.data.country, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      fundation: [this.data.fundation, [Validators.required]],
      coach: [this.data.coach, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      ability: [this.data.ability, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      worth: [this.data.worth, [Validators.required, Validators.min(0), Validators.pattern(/\d/g)]],
      id: [this.data.id,[]]
    });

  }

  save() {
    console.log(this.form.invalid)
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
