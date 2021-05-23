
let template = document.createElement("template")
template.innerHTML = `
  <span class="tooltiptext">
    <div class="tooltip"></div>
</span>
<style>
:root{
  --arrowColor:red;
}
.tooltiptext {
  position: relative;
  -webkit-text-decoration: gray dotted underline;
          text-decoration: gray dotted underline;
  text-decoration-thickness: 0.08em;
  cursor: help;
}
.tooltiptext .tooltip {
  --height:8px;
  --width: 6px;
  --tooltipWidth:50px;
  --left:0;
  --bottom:none;
  
  color: white;
  text-decoration: none;
  position: absolute;
  left: var(--left);
  bottom:var(--bottom);
  width: var(--tooltipWidth);
  border-radius: 5px;
  background-color: black;
  font-family: monospace;
  padding: 5px 10px;
  margin-left: 10px;
  margin-top: var(--height);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.tooltiptext .tooltip::after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 var(--width) var(--height) var(--width);
  border-color: transparent transparent var(--arrowColor) transparent;
  display: block;
  position: absolute;
  top: calc(var(--height) * -1);
}
.tooltiptext:hover .tooltip {
  opacity: 1;
}
</style>
`

class Tooltip extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  connectedCallback(){
    this.tooltiptext = this.shadowRoot.querySelector(".tooltiptext")
    this.tooltip = this.shadowRoot.querySelector(".tooltip")
    this.tooltiptext.insertAdjacentHTML('afterbegin', this.innerHTML);
    this.tooltip.innerHTML = this.getInfo()
    this.readyStyle()
  }
  getInfo(){
    if(this.hasAttribute("info")){
      return this.getAttribute("info")
    }
    return "";
  }
  readyStyle(){
    Object.assign(this.tooltip.style,{
      color:this.getAttr("tipcolor","white"),
      width: this.getAttr("width","50") + "px",
      backgroundColor:this.getAttr("tipbgcolor","black")
    })
    this.style.setProperty("--arrowColor",this.getAttr("arrowcolor","black"))
  }

  getAttr(attr,defaultValue){
    return this.findAttr(attr) ? this.findAttr(attr) : defaultValue
  }

  findAttr(attr){
    if(this.hasAttribute(attr)){
      return this.getAttribute(attr)
    }
    return undefined
  }
}

customElements.define("a-tooltip",Tooltip)
