// Smooth scroll functionality for anchor links
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav ul.links a");

  for (const link of links) {
    link.addEventListener("click", clickHandler);
  }

  function clickHandler(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var getStarted = document.getElementById("scroll");
  var tool = document.getElementById("getstarted");

  // Add an event listener to the button
  getStarted.addEventListener("click", function () {
    tool.scrollIntoView({ behavior: "smooth" });
  });
});

const inputs = document.querySelectorAll(".input");
function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}
function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}
inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

window.onload = function () {
  var btn = document.getElementById("run"),
    // cd = document.getElementById("code"),
    test = document.getElementById("test1"),
    chart;

  // ... Existing code ...

  btn.onclick = function () {
    // ... Existing code ...

    (btn.onclick = function () {
      let str = "";
      let keywords = [
        "start",
        "if",
        "then",
        "while",
        "else",
        "end",
        "stop",
        "read",
        "print",
        "perform",
        "until",
        "initialize",
        "goto",
      ];
      let item = test.value.split("\n");
      let connect = [];
      let k = 0;
      let iocount = 0;
      let ifcount = 0;
      let opercount = 0;
      let Ifstack = [];
      let Whstack = [];
      let currentIfCount = 0;
      let whilecount = 0;
      let untilOccur = 0;
      let num;
      let gotoCount = 0;
      let item3, item4;

      for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < keywords.length; j++) {
          if (item[i].includes(keywords[j])) {
            if (keywords[j] === "read" || keywords[j] === "print") {
              moded = item[i];
            } else moded = item[i].replace(keywords[j], "");
            switch (keywords[j]) {
              case "start":
                str += "st=>start: Start";
                connect[k++] = "st";
                break;

              case "initialize":
                op = moded;
                str += `\noper${++opercount}=>operation:${op}`;
                connect[k++] = `oper${opercount}`;
                break;

              case "if":
                currentIfCount = ++ifcount; // Store the current ifcount
                var cond = moded;
                str += `\nc${currentIfCount}=>condition: ${cond}|rejected`;
                connect[k++] = `c${currentIfCount}`;
                connect[k++] = `c${currentIfCount}(yes)`;
                Ifstack.push(currentIfCount); // Push the currentIfCount onto the stack
                break;

              case "then":
                op = moded;
                str += `\noper${++opercount}=>operation:${op}`;
                connect[k++] = `oper${opercount}`;
                break;

              /* case "while":
               whilecount = ++ifcount; // Store the current whilecount
               cond = moded;
               str += `\nwhile${whilecount}=>condition: ${cond}|approved`;
               connect[k++] = `while${whilecount}`;
               stack.push(whilecount); // Push the currentIfCount onto the stack
               insideLoop = true;
               whileCounter++;
               whileStack[whileCounter] = whilecount; // Store the whilecount for nesting
               break;

               */

              case "while":
                cond = moded;
                str += `\nwhile${++whilecount}=>condition: ${cond}|approved`;
                connect[k++] = `while${whilecount}`;
                connect[k++] = `while${whilecount}(yes)`;
                untilOccur++;
                Whstack.push(whilecount);
                //insideLoop = true;
                // whileCounter++;
                // whileStack[whileCounter] = whilecount;
                // lastWhile = whilecount; // Update last occurring while
                break;

              /* case "until":
               if (stack.length > 0) {
                 let parentWhile = stack.pop();
                 if (printInsideloop) connect[k++] = `io${iocount}(left)->while${whilecount}`;
                 else connect[k++] = `oper${opercount}(left)->while${whilecount}`;
                 insideLoop = false;
                 connect[k++] = `while${whilecount}(false)`;
               }
               break;

               */

              case "until":
                if (Whstack.length > 0) {
                  let parentWhile = Whstack.pop();

                  connect[k++] = `while${parentWhile}`;
                  connect[k++] = `while${parentWhile}(no)`;
                }
                break;

              case "else":
                let ops = moded;
                if (Ifstack.length > 0) {
                  let parentIf = Ifstack.pop(); // Pop the parent if condition
                  str += `\noper${++opercount}=>operation:${ops}`;
                  connect[k++] = `c${parentIf}(no)`;
                  connect[k++] = `oper${opercount}`;
                }
                break;

              case "stop":
                str += "\ne=>end: Stop";
                connect[k++] = "e";
                break;

              case "perform":
                op = moded;
                str += `\noper${++opercount}=>operation:${op}`;
                connect[k++] = `oper${opercount}`;
                break;

              case "goto":
                op = moded;
                //num = Number.parseInt(op);

                connect[k++] = `goto${++gotoCount}${moded}`;
                console.log(`goto${gotoCount}${moded}`);
                break;

              case "read":
                console.log(moded);
                str += `\nio${++iocount}=>inputoutput: ${moded}|request\n`;
                connect[k++] = `io${iocount}`;
                break;

              case "print":
                console.log(moded);
                str += `\nio${++iocount}=>inputoutput: ${moded}|request\n`;
                connect[k++] = `io${iocount}`;
                break;
            }

            console.log("found " + keywords[j] + " at line " + i);
            console.log("modded:  " + moded + " at line " + i);
          }
        }
      }

      str +=
        "\nop1=>operation: Do this\nop2=>operation: Stuff\ncond=>condition: ${cond}\ncond2=>condition: Good idea\n";

      let item1, item2;
      let i = 0;
      while (i < connect.length - 1) {
        item1 = connect[i];
        item2 = connect[i + 1];

        if (
          !item2.includes("no") &&
          !item2.includes("yes") &&
          !item1.includes("goto")
        ) {
          if (item2.includes("goto")) {
            console.log("You  here ");
            item3 = item1;
            console.log("Item 3 = " + item3);

            item4 = item2.replace(`goto${gotoCount}`, "");
            num = Number.parseInt(item4);
            str += `${item3}->${connect[num + 1]}\n`;
          } else str += `${item1}->${item2}\n`;
        }

        i++;
      }

      console.log(str);
      console.log(connect);

      if (chart) {
        chart.clean();
      }

      chart = flowchart.parse(str);

      chart.drawSVG("canvas", {
        x: 0,
        y: 0,
        "line-width": 3,
        "line-length": 40,
        "text-margin": 10,
        "font-size": 18,
        "font-color": "white",
        "line-color": "white",
        "element-color": "black",
        fill: "white",
        "yes-text": "yes",
        "no-text": "no",
        "arrow-end": "block",
        scale: 1,
        // style symbol types
        symbols: {
          start: {
            "font-color": "red",
            "element-color": "green",
            fill: "yellow",
          },
          end: {
            class: "end-element",
          },
        },

        flowstate: {
          past: { fill: "#CCCCCC", "font-size": 12 },
          current: {
            fill: "yellow",
            "font-color": "red",
            "font-weight": "bold",
          },
          future: { fill: "orange" },
          request: { fill: "cyan" },
          invalid: { fill: "#444444" },
          approved: {
            fill: "#58C4A3",
            "font-size": 15,
            "yes-text": "true",
            "no-text": "false",
          },
          rejected: {
            fill: "red",
            "font-size": 15,
            "yes-text": "true",
            "no-text": "false",
          },
        },
      });

      $("[id^=sub1]").click(function () {
        alert("info here");
      });
    })();
  };
};

function myFunction(event, node) {
  console.log("You just clicked this node:", node);
}
