import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NotaComponent } from './componentes/nota/nota.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        title:'home'
    },
    {
        path:'Nota',
        component:NotaComponent,
        title:'Nota'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
