import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { TodosModule } from './todos/todos.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, CoreModule, SharedModule, TodosModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
