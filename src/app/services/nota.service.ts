import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl='http://localhost:8080/api/Notas';
  constructor(private http:HttpClient) { }

  getNotas():Observable<Nota[]>{
    return this.http.get<Nota[]>(this.apiUrl);
  }

  getNotaById(id:number):Observable<Nota>{
    return this.http.get<Nota>(`${this.apiUrl}/${id}`);
  }

  crearNota(coche:Nota):Observable<Nota>{
    return this.http.post<Nota>(this.apiUrl, coche);
  }
  
  deleteNota(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateNota(coche:Nota, id:number):Observable<Nota>{
    return this.http.put<Nota>(`${this.apiUrl}/${id}`, coche);
  }
}
