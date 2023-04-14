import {DatePipe} from '@angular/common'
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TeamsInterface} from "../interfaces/teams.interface";
import {TeamsService} from "../services/teams.service";
import {ModalComponent} from "../components/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateTime} from "luxon";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit, OnInit {

  form: FormGroup
  isLogged: boolean = false

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private readonly teamsService: TeamsService,
    private readonly datepipe: DatePipe,
    private readonly router: Router,
  ) {

  }


  displayedColumns: string[] = [
    'Nombre',
    'Estadio',
    'Sitio Web',
    'Nacionalidad',
    'Año de Fundación',
    'Entrenador',
    'Capacidad',
    'Valor',
  ];
  ELEMENT_DATA: TeamsInterface[] = []
  dataSource = new MatTableDataSource<TeamsInterface>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    if (localStorage.getItem('jwt')) {
      this.isLogged = true
      this.displayedColumns.push('Acciones')
    } else {
      this.isLogged = false
      this.displayedColumns = this.displayedColumns.filter(current => current !== 'Acciones')
    }

    this.form = this.fb.group({
      start: ['', [Validators.required,]],
      end: ['', [Validators.required,]],
    });
    this.loadTeams()
  }

  loadTeams() {
    this.teamsService.getTeams()
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
      });
  }

  getTeamDetail(id: string) {

    this.teamsService.findTeamById(id)
      .subscribe((resp) => {
        this.openDialog(resp)
      })

  }

  openDialog(team?: TeamsInterface) {
    const dialog = this.dialog.open(ModalComponent, {
      width: '100%',
      data: {...team},
    });

    dialog.afterClosed().subscribe((result) => {

      if (result.id !== null) {
        Swal.fire({
          title: 'Advertencia',
          icon: 'question',
          text: 'Esta seguro que desea actualizar el equipo?',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCancelButton: true,
          showCloseButton: true
        }).then((resp) => {
          if (resp.isConfirmed) {
            this.teamsService.updateTeam(result).subscribe((resp) => {
              if (resp.id) {
                this.successTransaction()
              }
            })
          }
        })
      } else {
        delete result.id
        this.teamsService
          .createTeams(result)
          .subscribe((resp) => {
            if (resp.id) {
              this.successTransaction()
            }
          })
      }
    });
  }

  delete(id: string) {
    Swal.fire({
      title: 'Advertencia',
      icon: 'question',
      text: 'Esta seguro que desea eliminar el equipo?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.teamsService.deleteTeam(id).subscribe((resp) => {
          if (resp) {
            this.successTransaction()
          }
        })
      }
    })
  }

  successTransaction() {
    Swal.fire({
      title: 'Genial!',
      icon: 'success',
      text: 'El proceso se realizo correctamente'
    })
    this.loadTeams()
  }

  findByDates() {
    if (this.form.invalid) {
      Swal.fire({
        title: 'Hey',
        icon: 'error',
        text: 'Debes llenar ambos campos para realizar una busqueda'
      })
    }

    const end = DateTime.fromISO(<string>this.datepipe.transform(this.form.value.end, 'yyyy-MM-dd'))
      .plus({day: 1})
      .toFormat('yyyy-MM-dd')

    this.teamsService.findTeamsByDates({
      start: this.datepipe.transform(this.form.value.start, 'yyyy-MM-dd'),
      end
    })
      .subscribe((resp) => {
        this.dataSource = new MatTableDataSource(resp);
      })
  }

  logout() {

    localStorage.removeItem('jwt')
    this.router.navigate(['/']);
  }
}

