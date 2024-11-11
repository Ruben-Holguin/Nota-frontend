import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { Nota } from '../../models/nota';
import { Alumno } from '../../models/alumno';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { AlumnoService } from '../../services/alumno.service';
import { NotaService } from '../../services/nota.service';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule],
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent {
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];
  notas: Nota[] = [];
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  nota = new Nota();
  titulo: string = '';
  opc: string = '';
  op = 0; 
  selectedCurso: Curso | undefined;
  selectedAlumno: Alumno | undefined;

  constructor(
    private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private notaService: NotaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarNotas();
    this.listarAlumnos();
    this.listasCursos();
  }

  listarAlumnos() {
    this.alumnoService.getAlumnos().subscribe((data) => {
        this.alumnos = data;
        console.log(this.alumnos);
    });
  }

  listasCursos() {
    this.cursoService.getCursos().subscribe((data) => {
      this.cursos = data;
      console.log(this.cursos);
    });
  }

  listarNotas() {
    this.notaService.getNotas().subscribe((data) => {
      this.notas = data;
    });
  }

  showDialogCreate() {
    this.titulo = "Crear nota";
    this.opc = "Save";   
    this.op = 0;
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = "Editar Nota";
    this.opc = "Editar"; 
    this.notaService.getNotaById(id).subscribe((data) => {
      this.nota = data; 
      this.op = 1;     
    });    
    this.visible = true;
  }

  deleteNota(id: number) {
    this.isDeleteInProgress = true;
    this.notaService.deleteNota(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Nota eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarNotas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el Nota',
        });
      },
    });
  }

  opcion() {
    if (this.op == 0) {
      this.addNota();
      this.limpiar();
    } else if (this.op == 1) {
      this.editNota();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  addNota() {
    this.notaService.crearNota(this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Registrada',
        });
        this.listarNotas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Crear la Nota',
        });
      },
    });    
    this.visible = false;
  }

  editNota() {
    this.notaService.updateNota(this.nota, this.nota.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Editada',
        });
        this.listarNotas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar la Nota',
        });
      },
    });    
    this.visible = false;
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0; 
    this.nota.id = 0;
    this.nota.curso;
    this.nota.alumno;
    this.nota.nota1 = 0;
    this.nota.nota2 = 0;
    this.nota.nota3 = 0;
    this.nota.promedio = 0;
  }

  calcularPromedio() {
    const nota1 = Number(this.nota.nota1);
    const nota2 = Number(this.nota.nota2);
    const nota3 = Number(this.nota.nota3);
    
    console.log('Nota1:', nota1, 'Nota2:', nota2, 'Nota3:', nota3); // Agrega esta línea
    
    if (!isNaN(nota1) && !isNaN(nota2) && !isNaN(nota3)) {
      this.nota.promedio = (nota1 + nota2 + nota3) / 3;
    } else {
      this.nota.promedio = 0;
    }
  }
}
