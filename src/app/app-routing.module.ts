import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AllPostsComponent } from "./all-posts/all-posts.component";
import { FollowingComponent } from "./following/following.component";
import { FavaritesComponent } from "./favarites/favarites.component";
import { MyPostsComponent } from "./my-posts/my-posts.component";
import { NgModule } from "@angular/core";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { RouteGuard } from "./auth/route-guard";

const appRoute: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate:[RouteGuard]
    },
    {
        path: "allPost",
        component: AllPostsComponent,
        canActivate:[RouteGuard]
    },
    {
        path: "following",
        component: FollowingComponent,
        canActivate:[RouteGuard]
    },
    {
        path: "favorites",
        component: FavaritesComponent,
        canActivate:[RouteGuard]
    },
    {
        path: "myPosts",
        component: MyPostsComponent,
        canActivate:[RouteGuard]
    },
    {
        path: "sign-up",
        component: SignupComponent
    },
    {
        path: "login",
        component: LoginComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports : [
        RouterModule
    ]
})
export class AppRoutingModule {

}