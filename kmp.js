function b(k, p){
	if (k ==0) return 0;
	if (k == 1) return 0;
	let sama = true;
	let awal;
	let akhir;
	var b = 0;
	for (let i = 0; i < k; i++){
		awal = p.substring(0, i+1);
		akhir = p.substring(k-i, k+1);
		if (awal == akhir){
			b = awal.length;
		}
	}
	return b;
}
function barray(pattern){
	let j = pattern.length-1;
	let fail = []
	for (let k = 0; k< j; k++){
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
	let fail = barray(p);
	let i =0;
	let j = 0;
	while (i < n){
		if (t[i] == p[j]){
			if (j == m-1) return (i-m+1);
			i++;
			j++;
		}
		else if (j>0){
			j = fail[j-1];
		}
		else i++;
	}
	return -1;
}