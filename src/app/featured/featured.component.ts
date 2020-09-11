import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { BarcodeScanner } from "nativescript-barcodescanner";
import {
  MLKitScanBarcodesOnDeviceResult,
  MLKitScanBarcodesResultBarcode
} from "nativescript-plugin-firebase/mlkit/barcodescanning";
import * as firebase from "nativescript-plugin-firebase";
import { PropertyChangeData } from "tns-core-modules/ui/content-view/content-view";

@Component({
  selector: "Featured",
  templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {
  barcodes: Array<MLKitScanBarcodesResultBarcode>;

  pause: boolean = false;
  torchOn: boolean = false;

  toggleTorch(args: PropertyChangeData): void {
    if (args.value !== null && args.value !== this.torchOn) {
      this.torchOn = args.value;
    }
  }


  constructor(private barcodeScanner: BarcodeScanner) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {

    this.barcodeScanner.available().then((available) => {
      if (available) {
        this.barcodeScanner.hasCameraPermission().then((granted) => {
          if (!granted) {
            this.barcodeScanner.requestCameraPermission();
          }
        });
      }
    });

    // let scan = () => {
    //   this.barcodeScanner.scan({
    //     formats: "QR_CODE, EAN_13",
    //     beepOnScan: true,
    //     reportDuplicates: true,
    //     preferFrontCamera: false
    //     continuousScanCallback: scanResult => {
    //       console.log("result: " + JSON.stringify(scanResult));
    //       this.barcodeScanner.stop();
    //     }
    //   })
    //     .then(result => console.log(JSON.stringify(result)))
    //     .catch(error => console.log(error));
    // };

    // Init your component properties here.
    // this.barcodeScanner.scan({
    //   formats: "QR_CODE, EAN_13",
    //   cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
    //   cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
    //   message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
    //   showFlipCameraButton: true,   // default false
    //   preferFrontCamera: false,     // default false
    //   showTorchButton: true,        // default false
    //   beepOnScan: true,             // Play or Suppress beep on scan (default true)
    //   fullScreen: false,             // Currently only used on iOS; with iOS 13 modals are no longer shown fullScreen by default, which may be actually preferred. But to use the old fullScreen appearance, set this to 'true'. Default 'false'.
    //   torchOn: false,               // launch with the flashlight on (default false)
    //   closeCallback: () => { console.log("Scanner closed") }, // invoked when the scanner was closed (success or abort)
    //   resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
    //   orientation: "portrait",     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
    //   openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
    //   presentInRootViewController: true // iOS-only; If you're sure you're not presenting the (non embedded) scanner in a modal, or are experiencing issues with fi. the navigationbar, set this to 'true' and see if it works better for your app (default false).
    // }).then((result) => {
    //   // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
    //   alert({
    //     title: "Scan result",
    //     message: "Format: " + result.format + ",\nValue: " + result.text,
    //     okButtonText: "OK"
    //   });
    //   console.log("Format: " + result.format + ",\nValue: " + result.text);
    //   this.result = result.text;
    // }, (errorMessage) => {
    //   console.log("No scan. " + errorMessage);
    // }
    // );
  }

  onScanResult(evt) {
    console.log(`onScanResult: ${evt.text} (${evt.format})`);

    this.pause = true;
    console.log("Paused");
    setTimeout(() => {
      this.pause = false;
      console.log("Unpaused");
    }, 4000);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }
}
