import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TeamsInterface} from "../interfaces/teams.interface";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<TeamsInterface[]> {
    return this.http.get<TeamsInterface[]>(`${environment.baseURL}/equipos/listar`);
  }

  createTeams(team: TeamsInterface): Observable<TeamsInterface> {
    return this.http.post<TeamsInterface>(`${environment.baseURL}/equipos/crear`, {...team})
  }

  findTeamsByDates(dates: any): Observable<TeamsInterface[]> {
    return this.http.get<TeamsInterface[]>(`${environment.baseURL}/equipos/consultar/${dates.start}/${dates.end}`);
  }

  findTeamById(id: string): Observable<TeamsInterface> {
    return this.http.get<TeamsInterface>(`${environment.baseURL}/equipos/consultar/${id}`);
  }

  updateTeam(data: any): Observable<TeamsInterface> {
    return this.http.patch<TeamsInterface>(`${environment.baseURL}/equipos/actualizar/${data.id}`, {...data});
  }

  deleteTeam(id: string): Observable<TeamsInterface> {
    return this.http.delete<TeamsInterface>(`${environment.baseURL}/equipos/eliminar/${id}`);
  }

}
