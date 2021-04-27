function extractdate(query){
    return query.match(/(0?[1-9]|[12]\d|3[01])[-/](0?[1-9]|1[0-2])[/-][12]\d{3}/g) || query.match(/(0?[1-9]|[12]\d|3[01]) (([Jj]anuari)|([Ff]ebruari)|([Mm]aret)|([Aa]pril)|([Mm]ei)|([Jj]uni)|([Jj]uli)|([Aa]gustus)|([Ss]eptember)|([Oo]ktober)|([Nn]ovember)|([Dd]esember)) [12]\d{3}/g);
}

function extractmakul(query){
    return query.match(/[A-Z]{2}\d{4}/g);
}

function extracttopik(query){
    return query.match(/[Tt]opik ([A-Z]|[a-z]| )+/g); //ini mau diubah lagi biar ada penghentinya
}

console.log(extractdate("01-7-2012"))
console.log(extractmakul("MA2200"))
console.log(extracttopik("Topik admin labpro 1"))

export { extractdate, extractmakul, extracttopik}