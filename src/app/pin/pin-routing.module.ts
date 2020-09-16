import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { PinRootComponent } from "./pin-root.component";
import { PinComponent } from "./pin.component";
import { NewPinComponent } from "./new-pin.component";
import { HomeComponent } from "../home/home.component";

const routes: Routes = [
    // { path: '', redirectTo: '(pinoutlet:input)', pathMatch: 'full' },
    // { path: '',  },
    { path: '', component : PinRootComponent, children:[
        {path: '', redirectTo: 'new', pathMatch:'full'},
        // { path: 'new', component: NewPinComponent, outlet:"pinoutlet"},
        // { path: 'input', component: PinComponent, outlet:"pinoutlet"},
        { path: 'new', component: NewPinComponent},
        { path: 'input', component: PinComponent},
    ]},
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PinRoutingModule { }
