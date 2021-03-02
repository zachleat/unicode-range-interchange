import CharacterSet from "./characterset.js";

class URI {
  constructor() {
    this.fromLeft = document.getElementById("from-a");
    this.fromRight = document.getElementById("from-b");
    this.to = document.getElementById("to");
    this.ops = document.querySelectorAll("input[name=operations]")

    this.size = {
      fromLeft: document.getElementById("from-a-size"),
      fromRight: document.getElementById("from-b-size"),
      to: document.getElementById("to-size"),
    }
  }

  getOperationName() {
    let checked = Array.from(this.ops).filter(entry => entry.checked);
    return checked[0].value;
  }

  doMath() {
    let leftVal = (this.fromLeft.value || "").trim();
    let rightVal = (this.fromRight.value || "").trim();

    let charset1 = CharacterSet.parseUnicodeRange(leftVal);
    let charset2 = CharacterSet.parseUnicodeRange(rightVal);

    if(leftVal.length && charset1.getSize() === 0) {
      charset1 = new CharacterSet(leftVal);
    }
    if(rightVal.length && charset2.getSize() === 0) {
      charset2 = new CharacterSet(rightVal);
    }

    let opName = this.getOperationName();
    let output = charset1[opName](charset2);

    if(output.toHexRangeString) {
      this.to.value = output.toHexRangeString();
      this.size.to.innerText = output.getSize();
    } else {
      this.to.value = output;
      this.size.to.innerText = "N/A";
    }

    this.size.fromLeft.innerText = charset1.getSize();
    this.size.fromRight.innerText = charset2.getSize();
  }

  bind() {
    this.fromLeft.addEventListener("input", this.doMath.bind(this));
    this.fromRight.addEventListener("input", this.doMath.bind(this));

    for(let op of this.ops) {
      op.addEventListener("change", this.doMath.bind(this));
    }
  }
}

let uri = new URI();
uri.bind();
uri.doMath();