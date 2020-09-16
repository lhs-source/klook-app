import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { PinRootComponent } from "./pin/pin-root.component";

const routes: Routes = [
    { path: "", redirectTo: "/pin", pathMatch: "full" },
    { path: "pin", loadChildren: () => import("./pin/pin.module").then((m) => m.PinModule) },
    { path: "main", loadChildren: () => import("./main/main.module").then((m) => m.MainModule) },
    // { path: "browse", loadChildren: () => import("./browse/browse.module").then((m) => m.PinModule) },
    // { path: "search", loadChildren: () => import("./search/search.module").then((m) => m.SearchModule) },
    // { path: "featured", loadChildren: () => import("./featured/featured.module").then((m) => m.FeaturedModule) },
    // { path: "settings", loadChildren: () => import("./settings/settings.module").then((m) => m.SettingsModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
