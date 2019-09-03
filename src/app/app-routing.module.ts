import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'horse-list', pathMatch: 'full' },
  { path: 'horse-list', loadChildren: './horse-list/horse-list.module#HorseListPageModule' },
  { path: 'horse-detail', loadChildren: './horse-detail/horse-detail.module#HorseDetailPageModule' },
  { path: 'exercise-list', loadChildren: './exercise-list/exercise-list.module#ExerciseListPageModule' },
  { path: 'exercise-detail', loadChildren: './exercise-detail/exercise-detail.module#ExerciseDetailPageModule' },
  { path: 'exercise-log-list', loadChildren: './exercise-log-list/exercise-log-list.module#ExerciseLogListPageModule' },
  { path: 'exercise-log-detail', loadChildren: './exercise-log-detail/exercise-log-detail.module#ExerciseLogDetailPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
