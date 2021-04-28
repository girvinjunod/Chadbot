function extractdate(query){
    let dates = query.match(/(0?[1-9]|[12]\d|3[01])[-/](0?[1-9]|1[0-2])[/-][12]\d{3}/g) || query.match(/(0?[1-9]|[12]\d|3[01]) (([Jj]anuary)|([Ff]ebruary)|([Mm]arch)|([Aa]pril)|([Mm]ay)|([Jj]une)|([Jj]uly)|([Aa]ugust)|([Ss]eptember)|([Oo]ctober)|([Nn]ovember)|([Dd]ecember)) [12]\d{3}/ig); 
    let resDate = [];

    if (dates === null) return null

    for (const date of dates) {     
        if (date.includes(" ")) {
            let [day, month, year] = date.split(' ')
            
            switch (month.toLowerCase()) {
                case "january":
                    month = 1;
                    break;
                case "february":
                    month = 2;
                    break;
                case "march":
                    month = 3;
                    break;
                case "april":
                    month = 4;
                    break;
                case "may":
                    month = 5;
                    break;
                case "june":
                    month = 6;
                    break;
                case "july":
                    month = 7;
                    break;
                case "august":
                    month = 8;
                    break;
                case "september":
                    month = 9;
                    break;
                case "october":
                    month = 10;
                    break;
                case "november":
                    month = 11;
                    break;
                case "december":
                    month = 12;
                    break;
                default:
                    break;
            }

            resDate.push(new Date(year, month - 1, day))
        } else if (date.includes("/")) {
            let [day, month, year] = date.split('/')
            resDate.push(new Date(year, month - 1, day))
        } else if (date.includes("-")) {
            let [day, month, year] = date.split('-')
            resDate.push(new Date(year, month - 1, day))
        }
    }
    
    return (resDate.length === 1) ? resDate[0] : resDate
}

function extractmakul(query){
    let makul = query.match(/[A-Z]{2}\d{4}/ig);
    if (makul != null){
        let kode = makul[0].substring(0, 2);
        let angka = makul[0].substring(2);
        kode = kode.toUpperCase();
        return kode.concat(angka);
    }
    return null;
}  

function extracttopik(query){
    let topik = query.match(/"(.)+"/g);
    if (topik == null) return null;
    return topik[0].substring(1,topik[0].length-1);
}

function extractjenis(query){
    let jenis;
    jenis = query.match(/[Kk]uis/ig);
    if (jenis != null){
        return jenis[0].toLowerCase();
    }
    jenis = query.match(/[Pp]raktikum/ig);
    if (jenis != null){
        return jenis[0].toLowerCase();
    }
    jenis = query.match(/[Tt]ubes/ig);
    if (jenis != null){
        return jenis[0].toLowerCase();
    }
    jenis = query.match(/[Tt]ucil/ig);
    if (jenis != null){
        return jenis[0].toLowerCase();
    }
    jenis = query.match(/[Uu][Tt][Ss]/ig);
    if (jenis != null){
        return jenis[0].toLowerCase();
    }
    jenis = query.match(/[Uu][Aa][Ss]/ig);
    if (jenis != null){
        return jenis[0].toLowerCase();
    }
    return null;
}

function extractnminggu(query){
    let minggu = query.match(/\d week/ig);
    if (minggu != null){
        return minggu[0][0];
    }
    return null;
}

function extractnhari(query){
    let hari = query.match(/\d day/ig);
    if (hari != null){
        return hari[0][0]
    }
    return null;
}


function extracthariini(query){
    return query.match(/today/ig);
}

function extractid(query){
    let id = query.match(/[Ii][Dd] \d+/ig);
    if (id != null){
        return id[0].substring(3); //output udh angka
    }
    return null;
}

export { extractdate, extractmakul, extracttopik, extractjenis, extractnminggu, extractnhari, extracthariini, extractid }