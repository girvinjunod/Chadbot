function levenshtein(str1, str2, i, j){
    if (Math.min(i, j) === 0){
        //console.log("Max =" + Math.max(i,j));
        return Math.max(i,j);
    }
    else{
        let a;
        let b;
        let c;
        a = levenshtein(str1, str2, i-1, j) + 1;
        b = levenshtein(str1, str2, i, j-1) + 1;
        c = levenshtein(str1, str2, i-1, j-1);
        if (str1[i-1] !== str2[j-1]){
            c+=1;
        }
        //console.log("Min =" +Math.min(a,b,c));
        return Math.min(a,b,c);
    }
}

function similarityscore(str1, str2, ldist){
	return 1- (ldist/(Math.max(str1.length, str2.length)));
}

export { levenshtein, similarityscore }