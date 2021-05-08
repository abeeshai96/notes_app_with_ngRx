import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotesDetailComponent } from './home/notes-detail/notes-detail.component';
import { NotesEditComponent } from './home/notes-edit/notes-edit.component';
import { NotesResolverService } from './home/notes-resolver.service';
import { NotesStartComponent } from './home/notes-start/notes-start.component';

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  {
    path: 'notes',
    component: HomeComponent,
    resolve: [NotesResolverService],
    children: [
      { path: '', component: NotesStartComponent },
      { path: 'new', component: NotesEditComponent },
      {
        path: ':id',
        component: NotesDetailComponent,
      },
      {
        path: ':id/edit',
        component: NotesEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
