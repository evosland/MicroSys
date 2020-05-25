
import {
  runBenchmarks, bench
// @ts-ignore
} from "http://deno.land/std/testing/bench.ts";


import {
  StringBuilder
// @ts-ignore
} from "../mod.ts";





class StringBuilder2 {
  public Values: string[] = [];

  constructor(value: string = "") {
    this.Values = new Array(value);
  }
  public ToString() {
    return this.Values.join('');
  }
  public Append(value: string) {
    this.Values.push(value);
  }
  public Clear() {
    this.Values = [];
  }
}







//           0         1         2         3         4         5         6         7         8         9         1
let input = "adnqinaLSEN$(2902alksd)(wasdfjaadlasdljfafLSDKFW4l02942049)($)$*@0239042lldjfasdljsdlfka2323g34g34g3s";

let length = 0;

let outerLoop = 100;
let innerLoop = 1000;

bench({
  name: `Vanilla String Concats ${outerLoop} x ${innerLoop} or ${outerLoop * innerLoop} times`,
  runs: outerLoop,
  func(timer: any): void {
    timer.start();

    for (let i=0; i<innerLoop; i++) {
      let which: number = Math.random() * 100;
      text = text + input.slice(0, which);
    }

    timer.stop();
  }
});

bench({
  name: `StringBuilder concats ${outerLoop} x ${innerLoop} or ${outerLoop * innerLoop} times`,
  runs: outerLoop,
  func(timer: any): void {
    timer.start();

    for (let i=0; i<innerLoop; i++) {
      let which: number = Math.random() * 100;
      sb.append(input.slice(0, which));
    }

    timer.stop();
  }
});

bench({
  name: `Array<string> concats ${outerLoop} x ${innerLoop} or ${outerLoop * innerLoop} times`,
  runs: outerLoop,
  func(timer: any): void {
    timer.start();

    for (let i=0; i<innerLoop; i++) {
      let which: number = Math.random() * 100;
      a.push(input.slice(0, which));
    }

    timer.stop();
  }
});

bench({
  name: `Array concats ${outerLoop} x ${innerLoop} or ${outerLoop * innerLoop} times`,
  runs: outerLoop,
  func(timer: any): void {
    timer.start();

    for (let i=0; i<innerLoop; i++) {
      let which: number = Math.random() * 100;
      b.push(input.slice(0, which));
    }

    timer.stop();
  }
});


bench({
  name: `StringBuilder2 concats ${outerLoop} x ${innerLoop} or ${outerLoop * innerLoop} times`,
  runs: outerLoop,
  func(timer: any): void {
    timer.start();

    for (let i=0; i<innerLoop; i++) {
      let which: number = Math.random() * 100;
      sb2.Append(input.slice(0, which));
    }

    timer.stop();
  }
});


bench({
  name: `String.concat concats ${outerLoop} x ${innerLoop} or ${outerLoop * innerLoop} times`,
  runs: outerLoop,
  func(timer: any): void {
    timer.start();

    for (let i=0; i<innerLoop; i++) {
      let which: number = Math.random() * 100;
      sc.concat(input.slice(0, which));
    }

    timer.stop();
  }
});

let text = "";
let sb = new StringBuilder();
let a = new Array<string>();
let b: string[] = [];
let sb2 = new StringBuilder2();
let sc: string = "";

runBenchmarks( { skip: /throw/ });
