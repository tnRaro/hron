/*
	C. 2014. tnRaro <admin@tnraro.com>
*/

var hron = (function(exports){
	var VERSION = "0.1.1";


	function cos(v){
		var r = '';
		switch(typeof v){
			case 'string':
				var t = encodeURIComponent(v);
				r += 'y';
				r += t.length;
				r += 'v';
				r += t;
				break;
			case 'number':
				if(isNaN(v)){
					r += 'k';
				}else{
					if(isFinite(v)){
						if(v == 0){
							r += 'z';
						}else{
							r += 'd';
							r += v;
						}
					}else{
						if(v === Infinity)
							r += 'p';
						else
						if(v === -Infinity)
							r += 'm';
					}
				}
				break;
			case 'boolean':
				r += v?'t':'f';
				break;
			case 'object':
				r += co('', v);
				break;
			default:

		}
		return r;
	}

	function co(r, o){
		var isa = Array.isArray(o);
		if(typeof o == 'object'){
			isa
				?	r += 'a'
				:	r += 'o'
			;
			for(k in o){

				if(!isa && typeof k == 'string'){
					var t = encodeURIComponent(k);
					r += 'y';
					r += t.length;
					r += 'v';
					r += t;
				}

				var v = o[k];
				if(v === null){
					r += 'n';
				}else{
					r += cos(v);
				}
			}
			isa
				?	r += 'h'
				:	r += 'g'
			;
		}else{
			r += cos(o);
		}
		return r;
	}
	
	function xo(o){
		var pos=0;
		var stack = [];
		var r;
		while(pos<o.length){
			switch(o.charAt(pos)){
				case 'n':
					stack.push(null);
					break;
				case 'k':
					stack.push(NaN);
					break;
				case 'm':
					stack.push(-Infinity);
					break;
				case 'p':
					stack.push(Infinity);
					break;
				case 'd':
					var t = o.substr(pos+1).match(/([0-9]|\.)+/)[0];
					stack.push(parseFloat(t));
					pos += t.length;
					break;
				case 'z':
					stack.push(0);
					break;
				case 't':
					stack.push(true);
					break;
				case 'f':
					stack.push(false);
					break;
				case 'y':
					var slen = '';
					var t = '';
					while(o.charAt(pos+1)!='v'){
						slen += o.charAt(++pos);
					}
					pos++;
					for(i=0;i<parseInt(slen);i++){
						t += o.charAt(++pos);
					}
					stack.push(decodeURIComponent(t));
					break;
				case 'a':
					stack.push('[');
					break;
				case 'h':
					stack.push(']');
					break;
				case 'o':
					stack.push('{');
					break;
				case 'g':
					stack.push('}');
					break;
				default:
					stack.push(o.charAt(pos));
			}
			
			pos++;
		}
		
		//console.log(stack);
		if(stack[0]=='{'||stack[0]=='['){
			if(stack[0]=='{')	r = {};
			if(stack[0]=='[')	r = [];

			function re(pos, t){
				var isa = Array.isArray(t);
				while(stack.length>pos){
					var p = stack[pos++];

					if(p == '{'){
						if(isa){
							t.push({});
							pos = re(pos, t[t.length-1]);
						}else{
							if(stack[pos-2]){
								t[stack[pos-2]] = {};
								pos = re(pos, t[stack[pos-2]]);
							}
						}
					}else
					if(p == '}'){
						return pos;
					}else
					if(p == '['){
						if(isa){
							t.push([]);
							pos = re(pos, t[t.length-1]);
						}else{
							if(stack[pos-2]){
								t[stack[pos-2]] = [];
								pos = re(pos, t[stack[pos-2]]);
							}
						}
					}else
					if(p == ']'){
						return pos;
					}else{
						if(isa){
							t.push(p);
						}else{
							var ps = stack[pos++];
							if(ps == '{'){
								pos--;
							}else
							if(ps == '['){
								pos--;
							}else{
								t[p] = ps;
							}
						}
					}
				}
			}
			re(1, r);
		}else{
			r = stack[0];
		}
		
		return r;
	}
	
	exports.encode = function(raw){
		return co('', raw);
	}
	
	exports.decode = function(raw){
		return xo(raw);
	}
	exports.version = function(){
		return VERSION;
	}
	
	return exports;
})(typeof module!='undefined'?module.exports:{});
