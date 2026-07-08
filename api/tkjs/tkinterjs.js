class a648daef0000{
	constructor(master,class_,id) {
		let a = document.createElement("ul");
		a.className = class_;
		a.id = id;
		master.appendChild(a);
		this.a = a;
	}
	appEnd(ele){
		this.a.appendChild(ele);
	}
	deleteEnd(){
		let lastEle = this.a.lastElementChild;
		if (lastEle)
		{
			this.a.removeChild(lastEle);
		}
	}
	getObj(){
		return this.a;
	}
}

class tk {
	static Tk = function(){return document.body;}
	static title(tit){
		document.title = tit;
	}
	
	static Frame(master,class_="tk.frame",id="tk",width=100,height=100){
		let a = document.createElement("div");
		a.style.width = width + "px";
		a.style.height = height + "px";
		a.className = class_;
		a.id = id;
		master.appendChild(a);
		return a;
	}
	
	static Label(master,class_="tk.label",id="tk",text="hello tkjs!"){
		let a = document.createElement("p");
		a.textContent = text;
		a.className = class_;
		a.id = id;
		master.appendChild(a);
		return a;
	}
	
	static Button(master,class_="tk.button",id="tk",text="hello tkjs!",onclick=function(){alert("hello tkjs!");}){
		let a = document.createElement("button");
		a.textContent = text;
		a.onclick = onclick;
		a.className = class_;
		a.id = id;
		master.appendChild(a);
		return a;
	}

	static Entry(master,class_="tk.entry",id="tk"){
		let a = document.createElement("input");
		a.type = "text";
		a.className = class_;
		a.id = id;
		master.appendChild(a);
		return a;
	}

	static Text(master,class_="tk.text",id="tk",width=50,height=50){
		let a = document.createElement("textarea");
		a.style.width = width + "ch";
		a.style.height = height + "em";
		a.className = class_;
		a.id = id;
		master.appendChild(a);
		return a;
	}

	static Listbox = a648daef0000;
	static ListboxLine(master,class_,id,ele){
		let a = document.createElement("li");
		a.textContent = ele;
		a.className = class_;
		a.id = id;
		master.appendChild(a);
		return a;
	}
}
