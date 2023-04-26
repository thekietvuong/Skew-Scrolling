import './App.css';
import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from "react";

function App() {

  gsap.registerPlugin(ScrollTrigger);
  const Ref = useRef(null);

  useEffect(()=>{
    let proxy = { skew: 0},
    skewSetter = gsap.quickSetter(Ref.current, "skewY", "deg"), // fast
    //apply it to the Ref element's skewY property and append a "deg" unit
    clamp = gsap.utils.clamp(-10, 10); // don't let the skew go beyond 10 degrees. 

    ScrollTrigger.create({
      trigger: Ref.current,
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -50);
        // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {skew: 0, duration: 3, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
        }
      },
    });
    
  },[])

  return (
    <div className="App">
      <h1 className="text">Skew Scrolling</h1>
      <h1 className="text outline-text">Skew Scrolling</h1>
      <h1 className="text filter-text">Skew Scrolling</h1>

      <div id="wrapper" >
        <section className="images" ref={Ref}>
          <img src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="model"/>
          <img src="https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="model"/>
          <img src="https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="model"/>
          <img src="https://images.pexels.com/photos/5220075/pexels-photo-5220075.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="model"/>
          <img src="https://images.pexels.com/photos/3565370/pexels-photo-3565370.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="model"/>
          <img src="https://images.pexels.com/photos/5265000/pexels-photo-5265000.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="model"/>
          <img src="https://images.pexels.com/photos/2956690/pexels-photo-2956690.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="model"/>
          <img src="https://images.pexels.com/photos/15565598/pexels-photo-15565598.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="model"/>
        </section>
      </div>
    </div>
  );
}

export default App;
