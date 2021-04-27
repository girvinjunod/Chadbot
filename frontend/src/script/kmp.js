function b(k, p){ //border function
	if (k === 0) return 0;
	if (k === 1) return 0;
	let awal;
	let akhir;
	var b = 0;
	for (let i = 0; i < k; i++){
		awal = p.substring(0, i+1);
		akhir = p.substring(k-i, k+1);
		if (awal === akhir){ //mencari prefix terbesar dari p[0..k] yang juga suffix dri p[1..k]
			b = awal.length; //ambil ukurannya
		}
	}
	return b;
}
function barray(pattern){
	let j = pattern.length-1; //panjang p
	let fail = []
	for (let k = 0; k< j; k++){ //mengisi semua array border function
		fail[k] = b(k,pattern);
	}
	/*
	//ini versi 2 yang g pake fungsi di atas, g tau cepetan mana
	let fail = [];
	fail[0] = 0;
	let m = pattern.length;
	let j = 0;
	let i = 1;
	while (i < m-1) {
		if (pattern[j] == pattern[i]){
			fail[i] = j+1;
			i++;
			j++;
		}
		else if (j > 0){
			j = fail[j-1];
		}
		else{
			fail[i] = 0;
			i++;
		}
	}*/
	return fail;
}
function kmp(t, p){
	let n = t.length;
	let m = p.length;
	let fail = barray(p); //array border function
	let i =0;
	let j = 0;
	let res;
	let imax = -1;
	let jmax = -1;
	let temp;
	let reg;
	while (i < n){
		reg = new RegExp(p[j], "i"); //pakai regex agar tidak case sensitive
		//if (t[i] == p[j])
		if (t[i].match(reg) != null){ //jika match
			if (j === m-1) { //jika match di karakter terakhir p
				res = [true, i-m+1] //return bahwa ketemu, dan indeks ketemunya
				return res;
			}
			i++;
			j++;
		}
		else if (j>0){ //jika tidak match
			temp = j-1;
			if (temp > jmax) { //menyimpan match terdekat sejauh ini
				jmax = temp;
				imax = i-j;
			}
			j = fail[j-1]; //j = b(k)
		}
		else i++;
	}
	let strsisa;
	if (imax === -1){
		strsisa = "";
	}
	else{
		strsisa = t.substring(imax, imax + m);
		strsisa = strsisa.toLowerCase();
	}
	res = [false, strsisa] //return string terdekat dengan pattern jika tidak ketemu
	return res;
}

export { kmp }