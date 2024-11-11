import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl='http://localhost:8080/api/Cursos';
  constructor(private http:HttpClient) { }

  getCursos():Observable<Curso[]>{
    return this.http.get<Curso[]>(this.apiUrl);
  }
  
  getCursoById(id:number):Observable<Curso>{
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  crearCurso(curso:Curso):Observable<Curso>{
    return this.http.post<Curso>(this.apiUrl, curso);
  }
  
  deleteCurso(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCurso(curso:Curso, id:number):Observable<Curso>{
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }
}
