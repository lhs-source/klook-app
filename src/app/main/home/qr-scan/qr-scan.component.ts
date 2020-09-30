import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "nativescript-barcodescanner";
import {
    MLKitScanBarcodesOnDeviceResult,
    MLKitScanBarcodesResultBarcode
} from "nativescript-plugin-firebase/mlkit/barcodescanning";
import * as firebase from "nativescript-plugin-firebase";
import { PropertyChangeData } from "tns-core-modules/ui/content-view/content-view";

@Component({
    selector: "qr-scan",
    templateUrl: "./qr-scan.component.html",
    styleUrls: ["./qr-scan.component.scss"]
})
export class QrScanComponent implements OnInit {
    barcodes: Array<MLKitScanBarcodesResultBarcode>;

    pause: boolean = false;
    torchOn: boolean = false;

    toggleTorch(args: PropertyChangeData): void {
        if (args.value !== null && args.value !== this.torchOn) {
            this.torchOn = args.value;
        }
    }

    constructor(private barcodeScanner: BarcodeScanner) {
        console.log("constructor QrScanComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit QrScanComponent");

        this.barcodeScanner.available().then((available) => {
            if (available) {
                this.barcodeScanner.hasCameraPermission().then((granted) => {
                    if (!granted) {
                        this.barcodeScanner.requestCameraPermission();
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
