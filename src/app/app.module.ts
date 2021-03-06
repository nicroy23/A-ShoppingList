import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListItemComponent } from './list-item/list-item.component';
import { MatCardModule } from '@angular/material/card';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListComponent } from './list/list.component';
import { MatInputModule } from '@angular/material/input';
import { AddItemComponent } from './add-item/add-item.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListPreviewComponent } from './list-preview/list-preview.component';
import { AllClientListsComponent } from './all-client-lists/all-client-lists.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AddListComponent } from './add-list/add-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    TitleBarComponent,
    ListComponent,
    AddItemComponent,
    ListPreviewComponent,
    AllClientListsComponent,
    LoginComponent,
    AddListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    DragDropModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
