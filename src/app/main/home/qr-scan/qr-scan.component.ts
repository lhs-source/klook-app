import { Component, OnInit } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { BarcodeScanner } from "nativescript-barcodescanner";
import {
    MLKitScanBarcodesOnDeviceResult,
    MLKitScanBarcodesResultBarcode
} from "nativescript-plugin-firebase/mlkit/barcodescanning";
import * as firebase from "nativescript-plugin-firebase";
import { isAndroid, PropertyChangeData } from "tns-core-modules/ui/content-view/content-view";
import { RouterExtensions } from "@nativescript/angular";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";
import { HomeRoutingService } from "../home-routing.service";
import { CustomTransitionBack } from "../klook-transition";
import { PaymentService } from "../../payment.service";

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

    constructor(private barcodeScanner: BarcodeScanner,
        private routerExtensions: RouterExtensions,
        private routingService: HomeRoutingService,
        private paymentService: PaymentService) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) {
            // Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            //     console.log("back button pressed on " + this.tag);
            //     data.cancel = true;
            //     this.routerExtensions.navigate(['/main/home'], {clearHistory : true});
            // });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        this.barcodeScanner.available().then((available) => {
            if (available) {
                this.barcodeScanner.hasCameraPermission().then((granted) => {
                    console.log("granted = ", granted);
                    if (!granted) {
                        // if not allowed yet
                        this.barcodeScanner.requestCameraPermission().then((yes) => {
                            // request permission
                            console.log("yes = ", yes);
                            if (yes === true) {
                                // grant permission done
                                this.is_cam_allowed = true;
                                console.log("new allowed!!");
                            }
                        });
                    } else {
                        // allowed cam already
                        this.is_cam_allowed = true;
                        console.log("already allowed!!");
                    }
                });
            }
        });
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
