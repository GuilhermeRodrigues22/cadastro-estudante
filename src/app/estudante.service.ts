import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from './estudante';


@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
  url = "http://localhost:3000/aluno"
  constructor(private http: HttpClient) { }

getEstudantes(): Observable<Aluno[]> {
  return this.http.get<Aluno[]>(this.url);
}

  save(estudante: Aluno): Observable<Aluno>{
    return this.http.post<Aluno>(this.url, estudante);
  }

  update(estudante: Aluno): Observable<Aluno>{
    return this.http.put<Aluno>(`${this.url}/${estudante.id}`, estudante);
  }


  delete(estudante: Aluno): Observable<void>{
    return this.http.delete<void>(`${this.url}/${estudante.id}`);
  }

}
