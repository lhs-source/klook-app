import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { MainComponent } from "./main.component";

const routes: Routes = [
    // { path: "", redirectTo: "/search", pathMatch: "full" },
    { path: "", component : MainComponent, children:[
        {path:'', redirectTo:"search", pathMatch: "full" },
        { path: "home", loadChildren: () => import("../home/home.module").then((m) => m.HomeModule) },
        { path: "search", loadChildren: () => import("../search/search.module").then((m) => m.SearchModule) },
        { path: "settings", loadChildren: () => import("../settings/settings.module").then((m) => m.SettingsModule) }] 
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MainRoutingModule { }