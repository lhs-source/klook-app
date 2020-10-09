import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { OctopusMainComponent } from "./octopus-main/octopus-main.component";
import { OctopusChargeComponent } from "./octopus-charge/octopus-charge.component";
import { OctopusNewComponent } from "./octopus-new/octopus-new.component";
import { OctopusUseLocComponent } from "./octopus-use-loc/octopus-use-loc.component";

const routes: Routes = [
        {path:'', redirectTo:'main', pathMatch:'full'},
        {path:'main', component: OctopusMainComponent},
        {path:'charge/:index', component:OctopusChargeComponent},
        {path:'new', component:OctopusNewComponent},
        {path:'use-loc', component:OctopusUseLocComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OctopusRoutingModule { }