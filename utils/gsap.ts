import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(Flip);

export { gsap, SplitText, Flip };