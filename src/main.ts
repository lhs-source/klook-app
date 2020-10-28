// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as application from "tns-core-modules/application";

import { AppModule } from "./app/app.module";

declare var android;

application.android.on(application.AndroidApplication.activityCreatedEvent, (event) => {

    const activity = event.activity;

    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
        // activity.getWindow().addFlags(android.view.WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        activity.getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        activity.getWindow().getDecorView().setSystemUiVisibility(
            android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE | 
            android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | 
            android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR); 
        activity.getWindow().setStatusBarColor(android.graphics.Color.TRANSPARENT);
        // activity.getWindow().setNavigationBarColor(android.graphics.Color.WHITE);

    } else {
        activity.getWindow().addFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
    }

    const parent = activity.findViewById(android.R.id.content);
    for (let i = 0; i < parent.getChildCount(); i++) {
        const childView = parent.getChildAt(i);
        if (childView instanceof android.view.ViewGroup) {
            childView.setFitsSystemWindows(true);
            childView.setClipToPadding(true);
        }
    }
});

// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization:
// modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);

