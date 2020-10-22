import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [
    { path: "", redirectTo: "main", pathMatch: "full" },
    // user register
    { path: "initial-auth", loadChildren: () => import("./initial-auth/initial-auth.module").then((m) => m.InitialAuthModule) },
    // after register
    { path: "main", loadChildren: () => import("./main/main.module").then((m) => m.MainModule) },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
