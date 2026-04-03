import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap/gsap-core';

@Component({
  selector: 'app-ganpati-anime',
  imports: [],
  template: `
  
  <div class="bg-[#8d79bd] h-[100vh] w-full text-[white] text-xl josefin flex items-center justify-center">
    <div class="bg-[#8d79bd] h-[500px] w-[500px] rounded-3xl flex flex-col items-center justify-center">
      <img id="animeImage" style="border: 4px solid #fc657e; border-radius: 100%; background-color: black;" class="h-[400px]" src="ganpati.png" alt="Image of Lord Ganesh">
      <span>Om Ganpataya Namah:</span>
    </div>
  </div>
  
  `,
  styles: `
  
  
  
  `,
})
export class GanpatiAnime implements AfterViewInit {

  ngAfterViewInit() {
    // 1. Create a looping timeline
    let tl = gsap.timeline({ repeat: -1 });

    // 2. Add animations (note the # for ID)
    tl.to("#animeImage", {
      backgroundColor: "#85c5d4",
      duration: 1,
      ease: "power1.inOut"
    })
      .to("#animeImage", {
        backgroundColor: "#fcad4c",
        duration: 1,
        ease: "power1.inOut"
      })
      .to("#animeImage", {
        backgroundColor: "black",
        duration: 1,
        ease: "power1.inOut"
      });
  }

}
