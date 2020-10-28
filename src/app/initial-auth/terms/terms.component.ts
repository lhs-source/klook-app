import { Component, OnInit } from "@angular/core";

import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { CustomTransitionBack } from "../../util/klook-transition";
import { AuthService } from "../../service/auth.service";

@Component({
    selector: "Terms",
    templateUrl: "./terms.component.html",
    styleUrls: ["./terms.component.scss"]
})
export class TermsComponent implements OnInit {
    tag = this.constructor.name;

    terms = [
        {
            required: true,
            str: "KLOOK PAY 개인정보 수집 및 이용 동의",
            checked: false,
        },
        {
            required: true,
            str: "KLOOK PAY 개인정보 제3자 제공 동의",
            checked: false,
        },
        {
            required: true,
            str: "KB국민카드 개인(신용)정보의 수집, 이용 동의",
            checked: false,
        },
        {
            required: true,
            str: "KB국민카드 개인(신용)정보의 조회 동의",
            checked: false,
        },
        {
            required: true,
            str: "KB국민카드 고유식별정보 처리 동의",
            checked: false,
        },
        {
            required: true,
            str: "KB국민카드 개인(신용)정보의 제3자 정보제공 동의",
            checked: false,
        },
        {
            required: true,
            str: "개인정보 해외결제 중계 제휴 시 제공 동의",
            checked: false,
        }
    ]

    ripple_button_props = {
        bgOn: "#ff5722",
        bgOff: "#ddd"
    }

    constructor(private routerExtensions: RouterExtensions, private authService : AuthService) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    onTapAgree(event, index) {
        console.log(this.tag, "onTapAgree index =", index);
        if (index < 0 || index > this.terms.length) {
            return;
        }

        this.terms[index].checked = !this.terms[index].checked;
    }

    onTapAllAgree(event) {
        if (this.isAllAgree === false) {
            this.terms.forEach((elem) => {
                elem.checked = true;
            });
        } else {

            this.terms.forEach((elem) => {
                elem.checked = false;
            });
        }
    }

    get isAllAgree() {
        let is = true;
        this.terms.forEach((elem) => {
            if (elem.required === true && elem.checked === false) {
                is = false;
                return false;
            }
        });
        return is;
    }

    onTapNext(event) {
        console.log(this.tag, "onTapNext");
        this.routerExtensions.navigate(['/initial-auth/userauth'], { transition: { name: 'slide', duration: 250, curve: AnimationCurve.easeOut } });
    }
    // actionbar emit click close
    actionbar_click_close(isclose){
        console.log(this.tag + " actionbar close button clicked = " + isclose);
        this.routerExtensions.navigate(['/initial-auth/klook-main'], { 
            clearHistory:true, 
            transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } 
        });
    }
}
