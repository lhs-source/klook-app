import { Transition, AndroidTransitionType } from "tns-core-modules/ui/transition";
import { screen } from "tns-core-modules/platform/platform"
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";


export class CustomTransition extends Transition {
    public createAndroidAnimator(transitionType: string): android.animation.Animator {
        
        var screenWidth = screen.mainScreen.widthPixels;

        const scaleValues = (<any>Array).create("float", 2);
        const yValues = (<any>Array).create("float", 2);
        const xValues = (<any>Array).create("float", 2);
        const zValues = (<any>Array).create("float", 2);
        const alphaValues = (<any>Array).create("float", 2);
        switch (transitionType) {
            case AndroidTransitionType.enter:{
                console.log("AndroidTransitionType.enter");
            }
            case AndroidTransitionType.popEnter:{
                console.log("AndroidTransitionType.popEnter");
                scaleValues[0] = 1;
                scaleValues[1] = 1;

                yValues[0] = 0;
                yValues[1] = 0;

                xValues[0] = screenWidth;
                xValues[1] = 0;
                
                zValues[0] = 100;
                zValues[1] = 100;

                alphaValues[0] = 0;
                alphaValues[1] = 1;
                break;
            }
            case AndroidTransitionType.exit:{
                console.log("AndroidTransitionType.exit");

            }
            case AndroidTransitionType.popExit:{
                console.log("AndroidTransitionType.popExit");
                scaleValues[0] = 1;
                scaleValues[1] = 1;

                yValues[0] = 0;
                yValues[1] = 32;

                xValues[0] = 0;
                xValues[1] = 72;
                
                zValues[0] = -1;
                zValues[1] = -1;
                
                alphaValues[0] = 1;
                alphaValues[1] = 0;
                break;
            }
            default:
                break;
        }
        const objectAnimators = (<any>Array).create(android.animation.Animator, 6);
        objectAnimators[0] = android.animation.ObjectAnimator.ofFloat(null, "scaleX", scaleValues);
        objectAnimators[1] = android.animation.ObjectAnimator.ofFloat(null, "scaleY", scaleValues);
        
        objectAnimators[2] = android.animation.ObjectAnimator.ofFloat(null, "translationY", yValues);
        objectAnimators[3] = android.animation.ObjectAnimator.ofFloat(null, "translationX", xValues);
        objectAnimators[4] = android.animation.ObjectAnimator.ofFloat(null, "translationZ", zValues);
        objectAnimators[5] = android.animation.ObjectAnimator.ofFloat(null, "alpha", alphaValues);

        const animatorSet = new android.animation.AnimatorSet();
        animatorSet.playTogether(objectAnimators);

        const duration = this.getDuration();
        if (duration !== undefined) {
            animatorSet.setDuration(duration);
        }

        animatorSet.setInterpolator(this.getCurve());
        return animatorSet;
    }
}

export class CustomTransitionBack extends Transition {
    public createAndroidAnimator(transitionType: string): android.animation.Animator {
        
        var screenWidth = screen.mainScreen.widthPixels;

        const scaleValues = (<any>Array).create("float", 2);
        const yValues = (<any>Array).create("float", 2);
        const xValues = (<any>Array).create("float", 2);
        const zValues = (<any>Array).create("float", 2);
        const alphaValues = (<any>Array).create("float", 2);
        switch (transitionType) {
            case AndroidTransitionType.enter:{
                console.log("AndroidTransitionType.enter");
            }
            case AndroidTransitionType.popEnter:{
                console.log("AndroidTransitionType.popEnter");
                scaleValues[0] = 1;
                scaleValues[1] = 1;

                yValues[0] = 32;
                yValues[1] = 0;

                xValues[0] = 72;
                xValues[1] = 0;
                
                zValues[1] = -1;
                zValues[0] = -1;

                alphaValues[0] = 0;
                alphaValues[1] = 1;
                break;
            }
            case AndroidTransitionType.exit:{
                console.log("AndroidTransitionType.exit");

            }
            case AndroidTransitionType.popExit:{
                console.log("AndroidTransitionType.popExit");
                scaleValues[0] = 1;
                scaleValues[1] = 1;
                
                yValues[0] = 0;
                yValues[1] = 0;

                xValues[0] = 0;
                xValues[1] = screenWidth;
                
                zValues[1] = 100;
                zValues[0] = 100;

                alphaValues[0] = 1;
                alphaValues[1] = 0;
                break;
            }
            default:
                break;
        }
        const objectAnimators = (<any>Array).create(android.animation.Animator, 6);
        objectAnimators[0] = android.animation.ObjectAnimator.ofFloat(null, "scaleX", scaleValues);
        objectAnimators[1] = android.animation.ObjectAnimator.ofFloat(null, "scaleY", scaleValues);
        
        objectAnimators[2] = android.animation.ObjectAnimator.ofFloat(null, "translationY", yValues);
        objectAnimators[3] = android.animation.ObjectAnimator.ofFloat(null, "translationX", xValues);
        objectAnimators[4] = android.animation.ObjectAnimator.ofFloat(null, "translationZ", zValues);
        objectAnimators[5] = android.animation.ObjectAnimator.ofFloat(null, "alpha", alphaValues);

        const animatorSet = new android.animation.AnimatorSet();
        animatorSet.playTogether(objectAnimators);

        const duration = this.getDuration();
        if (duration !== undefined) {
            animatorSet.setDuration(duration);
        }

        animatorSet.setInterpolator(this.getCurve());
        return animatorSet;
    }
}