import { Routes } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AddComponent } from './components/comments/add/add.component';
import { FoodComponent } from './components/food/food.component';
import { FoodDetailsComponent } from './components/food/food-details/food-details.component';
import { OrderComponent } from './components/order/order.component';
import { AddFoodComponent } from './components/food/add-food/add-food.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { SearchComponent } from './components/search/search.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizedGuard } from './guards/authorized.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OwncommentsComponent } from './components/comments/owncomments/owncomments.component';

export const routes: Routes = [
    {path: '', component: CommentsComponent, pathMatch: 'full'},
    {path: 'register', component: RegistrationComponent, canActivate: [AuthorizedGuard]},
    {path: 'login', component: LoginComponent, canActivate: [AuthorizedGuard]},
    {path: 'add/comment', component: AddComponent, canActivate: [AuthGuard]},
    {path: 'own/comments', component: OwncommentsComponent, canActivate: [AuthGuard]},
    {path: 'all/food', component: FoodComponent},
    {path: 'food/details/:id', component: FoodDetailsComponent},
    {path: 'order/review', component: OrderComponent, canActivate: [AuthGuard]},
    {path: 'food/add', component: AddFoodComponent, canActivate: [AdminGuard]},
    {path: 'food/edit/:id', component: AddFoodComponent},
    {path: 'profiles', component: ProfilesComponent, canActivate: [AdminGuard]},
    {path: 'food/search', component: SearchComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '/404'}
];
