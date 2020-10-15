import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import {TrHistoryComponent} from "./tr-history/tr-history.component";
import {TrHistoryDetailComponent} from "./tr-history-detail/tr-history-detail.component";

const routes: Routes = [
        {path:'', redirectTo:'history', pathMatch:'full'},
        {path:'history', component: TrHistoryComponent},
        {path:'detail/:id', component:TrHistoryDetailComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TrRoutingModule { }