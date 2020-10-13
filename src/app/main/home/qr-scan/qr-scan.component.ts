import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "nativescript-barcodescanner";
import {
    MLKitScanBarcodesOnDeviceResult,
    MLKitScanBarcodesResultBarcode
} from "nativescript-plugin-firebase/mlkit/barcodescanning";
import * as firebase from "nativescript-plugin-firebase";
import { isAndroid, PropertyChangeData } from "tns-core-modules/ui/content-view/content-view";
import { RouterExtensions } from "@nativescript/angular";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";

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

    constructor(private barcodeScanner: BarcodeScanner, private routerExtensions: RouterExtensions) {
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
                    if (!granted) {
                        // if not allowed yet
                        this.barcodeScanner.requestCameraPermission().then((yes)=>{
                            // request permission
                            if(yes === true){
                                // grant permission done
                                this.is_cam_allowed = true;
                            }
                        });
                    }else{
                        // allowed cam already
                        this.is_cam_allowed = true;
                    }
                });
            }
        });
    }
    onBarcodeScanResult(event: any): void {
        const result: MLKitScanBarcodesOnDeviceResult = event.value;
        this.barcodes = result.barcodes;

        if (this.barcodes.length > 0) {
            console.log("this.barcodes: " + JSON.stringify(this.barcodes));
            // this.pause = true;
            // setTimeout(() => this.pause = false, 500)
        }
    }
}
