import { Component, OnInit } from "@angular/core";
import { hasCameraPermissions, requestCameraPermissions } from 'nativescript-advanced-permissions/camera';
import {
    MLKitScanBarcodesOnDeviceResult,
    MLKitScanBarcodesResultBarcode
} from "nativescript-plugin-firebase/mlkit/barcodescanning";
import { isAndroid, PropertyChangeData } from "tns-core-modules/ui/content-view/content-view";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

import { CustomTransitionBack } from "../../../util/klook-transition";
import { HomeRoutingService } from "../home-routing.service";
import { PaymentService } from "../../../service/payment.service";

import * as Toast from 'nativescript-toast';

@Component({
    selector: "qr-scan",
    templateUrl: "./qr-scan.component.html",
    styleUrls: ["./qr-scan.component.scss"]
})
export class QrScanComponent implements OnInit {
    tag = this.constructor.name;
    barcodes: Array<MLKitScanBarcodesResultBarcode>;

    is_cam_allowed = false;
    pause: boolean = false;
    torchOn: boolean = false;

    toggleTorch(args: PropertyChangeData): void {
        if (args.value !== null && args.value !== this.torchOn) {
            this.torchOn = args.value;
        }
    }

    constructor(
        private routerExtensions: RouterExtensions,
        private routingService: HomeRoutingService,
        private paymentService: PaymentService) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) {}
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        if( !hasCameraPermissions() ) {
            requestCameraPermissions().then((hasPermission) => {
                console.log("hasPermission = ", hasPermission);
                if( hasPermission ) {
                    // grant permission done
                    this.is_cam_allowed = true;
                    console.log("new allowed!!");
                } else {
                    // don't do something
                    Toast.makeText("User denied the permission").show();
                }
            });
        }else{
            // allowed cam already
            this.is_cam_allowed = true;
        }
    }
    onBarcodeScanResult(event: any): void {
        const result: MLKitScanBarcodesOnDeviceResult = event.value;
        this.barcodes = result.barcodes;

        if (this.barcodes.length > 0) {
            // console.log("this.barcodes: " + JSON.stringify(this.barcodes));
            // this.pause = true;
            // setTimeout(() => this.pause = false, 500)
            let pay_info = {
                type: "식당",
                merchant: "Central Department Store",
                amount: 419,
                description: "포인트사용",
                taxfree: false,
                utu: true,
            };
            this.barcodes.forEach((elem) => {
                console.log(elem.value);
                pay_info = JSON.parse(elem.value);
                console.log(pay_info);
            });
            this.paymentService.storePayData(pay_info);
            this.routingService.emitChange('pay');
            this.routerExtensions.navigate(['/main/home/pay'], {
                transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }
            });
        }
    }
}
