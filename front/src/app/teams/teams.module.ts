import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ListComponent } from './list/list.component';
import {TeamsRoutingModule} from "./teams-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS} from "@angular/material/core";



@NgModule({
  declarations: [
    ModalComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDatepickerModule
  ],
  providers:[
    DatePipe
  ]
})
export class TeamsModule { }
