import { EstudanteService } from './../estudante.service';
import { Aluno } from '../estudante';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent {
  estudante: Aluno[] = [];
  isEditing: boolean = false;
  formGroupEstudante: FormGroup;

  constructor(
    private alunoService: EstudanteService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupEstudante = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      telefone: [''],
      idade: [''],
      rg: [''],
    });
  }

  ngOnInit(): void {
    this.loadEstudantes();
  }
  loadEstudantes(){
    this.alunoService.getEstudantes().subscribe({
      next: (data) => (this.estudante = data),
    });
  }

  save() {
    if (this.isEditing) {
      this.alunoService.update(this.formGroupEstudante.value).subscribe({
        next: () => {
          this.loadEstudantes();
          this.formGroupEstudante.reset();
          this.isEditing = false;
        }
      });
    }
    else {
      this.alunoService.save(this.formGroupEstudante.value).subscribe({
        next: data => {
          this.estudante.push(data)
          this.formGroupEstudante.reset();
        }
      });
    }
  }

  clean(){
    this.formGroupEstudante.reset();
    this.isEditing = false;
  }

  edit(estudante: Aluno) {
    this.formGroupEstudante.setValue(estudante);
    this.isEditing = true;
  }

  remove(estudante: Aluno) {
    this.alunoService.delete(estudante).subscribe({
      next: () => this.loadEstudantes(),
    });
  }
}
