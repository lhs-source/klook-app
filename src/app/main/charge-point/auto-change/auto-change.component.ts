import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, TextField, LayoutBase, Color } from "tns-core-modules";
import { screen } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";

import { CustomTransitionBack } from "../../../util/klook-transition";
import { DataService } from "../../../service/data.service";
import { TransactionService } from "../../../service/transaction.service";
import { Output } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    selector: "auto-change",
    templateUrl: "./auto-change.component.html",
    styleUrls: ["./auto-change.component.scss"]
})
export class AutoChangeComponent implements OnInit {
    tag = this.constructor.name;

    @Output('onTapTf') onTapTf: EventEmitter<any> = new EventEmitter();
    // @Output('onBlurTextfield') onBlurTextfield : EventEmitter<any> = new EventEmitter();
    @Input('TapKeypad') TapKeypad: Subject<string>;
    @Input('shortCut') shortCut: Subject<number>;

    @ViewChild('amounttf_autounder', { static: true }) amounttf_autounder: ElementRef;
    @ViewChild('amounttf_auto', { static: true }) amounttf_auto: ElementRef;
    tf1: TextField;
    tf2: TextField;
    focused_tf: TextField;
    amount_auto_under = '';
    cursor_auto_under = 0;
    amount_auto = '';
    cursor_auto = 0;
    isUnder = true;

    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private transactionService: TransactionService) {
        console.log(`${this.tag} constructor `);

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        this.TapKeypad.subscribe(num => {
            let kf = this.focused_tf;
            let sel = kf.android.getSelectionStart();
            if (num == 'back') {
                if (sel <= 0) {

                }
                else if (sel === kf.text.length) {
                    if (this.isUnder)
                        this.cursor_auto_under = sel - 1;
                    else if (!this.isUnder)
                        this.cursor_auto = sel - 1;
                    kf.text = kf.text.slice(0, kf.text.length - 1);
                } else {
                    let front = kf.text.slice(0, sel - 1);
                    let back = kf.text.slice(sel, kf.text.length);
                    if (this.isUnder)
                        this.cursor_auto_under = sel - 1;
                    else if (!this.isUnder)
                        this.cursor_auto = sel - 1;
                    kf.text = front + back;
                }
            } else if (num == '-1') { }
            else {
                if (kf.text.length > 20) { }
                else if (sel === kf.text.length) {
                    if (this.isUnder)
                        this.cursor_auto_under = sel + 1;
                    else if (!this.isUnder)
                        this.cursor_auto = sel + 1;
                    kf.text = kf.text + String(num);
                } else {
                    let front = kf.text.slice(0, sel);
                    let back = kf.text.slice(sel, kf.text.length);
                    front = front + String(num);
                    if (this.isUnder)
                        this.cursor_auto_under = sel + 1;
                    else if (!this.isUnder)
                        this.cursor_auto = sel + 1;
                    kf.text = front + back;
                }
            }
        });
        this.shortCut.subscribe(num => {
            let fp = Number(this.focused_tf.text);
            console.log("onTouchShortcut", this.focused_tf);
            fp = fp + num;
            this.focused_tf.text = String(fp);
        });
    }

    onTapTextfield(event, index) {
        console.log("onTapTextfield");
        let kf = event.object as TextField;
        if (index === 1) {
            this.tf1 = kf;
        } else {
            this.tf2 = kf;
        }
        // let kl = this.modalkeypad.nativeElement as LayoutBase;
        // this.modal_show(kl, this.isKeypadShow, ()=>{
        //     this.isKeypadShow = true;
        // });
        // kf.editable = false;
        this.onTapTf.emit(index);
        kf.android.setRawInputType(0x00000000);
        kf.android.setTextIsSelectable(true);
        kf.android.setCursorVisible(true);
        kf.android.setFocusable(true);
        this.focused_tf = kf;
        if (index === 1) {
            this.isUnder = true;
        } else if (index === 2) {
            this.isUnder = false;
        }
        // kf.android.setFocusableInTouchMode(true);
        // kf.focus();
    }

    onChangeTextField(event) {
        let kf = event.object as TextField;
        if (this.isUnder) {
            kf.android.setSelection(this.cursor_auto_under);
        } else if (!this.isUnder) {
            kf.android.setSelection(this.cursor_auto);
        }
        console.log("onChangeTextField", kf.android.getSelectionStart());
    }

    onTapAutoCharge() {
        // console.log(this.tf1.text, this.tf2.text);
        if (!this.tf1 || !this.tf2 || 
            this.tf1.text.length === 0 || this.tf2.text.length === 0 ||
            Number(this.tf1.text) <= 0 || Number(this.tf2.text) <= 0) {
            alert({
                title: "포인트 자동충전",
                message: "자동충전을 금액을 확인해주세요",
                okButtonText: "확인"
            })
        }
        else if (Number(this.tf1.text) > Number(this.tf2.text) ) {
            alert({
                title: "포인트 자동충전",
                message: "자동충전을 금액이 기준금액보다 커야합니다",
                okButtonText: "확인"
            })
        }
        else {
            this.dataService.setAuto(Number(this.tf1.text), Number(this.tf2.text), this.dataService.selected_way.title);
            alert({
                title: "포인트 자동충전",
                message: "포인트 자동충전을 설정했습니다",
                okButtonText: "확인"
            }).then(() => {
                this.routerExtensions.navigate(['/main/home'], {
                    transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) },
                    clearHistory: true
                });
            });
        }
    }
}
