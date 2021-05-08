import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSplitModule } from 'angular-split';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotesStartComponent } from './home/notes-start/notes-start.component';
import { NotesListComponent } from './home/notes-list/notes-list.component';
import { NotesEditComponent } from './home/notes-edit/notes-edit.component';
import { NotesDetailComponent } from './home/notes-detail/notes-detail.component';
import { NotesItemComponent } from './home/notes-list/notes-item/notes-item.component';
import { NotesEffects } from './home/store/notes.effects';
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NotesStartComponent,
    NotesListComponent,
    NotesEditComponent,
    NotesDetailComponent,
    NotesItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSplitModule,
    NgScrollbarModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
    }),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([NotesEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
