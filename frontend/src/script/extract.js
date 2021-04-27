function extractdate(query){
    let dates = query.match(/(0?[1-9]|[12]\d|3[01])[-/](0?[1-9]|1[0-2])[/-][12]\d{3}/g) || query.match(/(0?[1-9]|[12]\d|3[01]) (([Jj]anuari)|([Ff]ebruari)|([Mm]aret)|([Aa]pril)|([Mm]ei)|([Jj]uni)|([Jj]uli)|([Aa]gustus)|([Ss]eptember)|([Oo]ktober)|([Nn]ovember)|([Dd]esember)) [12]\d{3}/g); 
    let resDate = [];

    if (dates === null) return null

    for (const date of dates) {     
        if (date.includes(" ")) {
            let [day, month, year] = date.split(' ')
            
            switch (month.toLowerCase()) {
                case "januari":
                    month = 1;
                    break;
                case "februari":
                    month = 2;
                    break;
                case "maret":
                    month = 3;
                    break;
                case "april":
                    month = 4;
                    break;
                case "mei":
                    month = 5;
                    break;
                case "juni":
                    month = 6;
                    break;
                case "juli":
                    month = 7;
                    break;
                case "agustus":
                    month = 8;
                    break;
                case "september":
                    month = 9;
                    break;
                case "oktober":
                    month = 10;
                    break;
                case "november":
                    month = 11;
                    break;
                case "desember":
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
    return query.match(/[A-Z]{2}\d{4}/g);
}

function extracttopik(query){
    return query.match(/"(.)+"/g); 
}

function extractjenis(query){
    let jenis;
    jenis = query.match(/[Kk]uis/g);
    if (jenis != null){
        return jenis;
    }
    jenis = query.match(/[Pp]raktikum/g);
    if (jenis != null){
        return jenis;
    }
    jenis = query.match(/[Tt]ubes/g);
    if (jenis != null){
        return jenis;
    }
    jenis = query.match(/[Tt]ucil/g);
    if (jenis != null){
        return jenis;
    }
    jenis = query.match(/[Uu][Tt][Ss]/g);
    if (jenis != null){
        return jenis;
    }
    jenis = query.match(/[Uu][Aa][Ss]/g);
    if (jenis != null){
        return jenis;
    }
}

function extractnminggu(query){
    return query.match(/\d minggu/ig);
}

function extractnhari(query){
    return query.match(/\d hari/ig);
}

function extracthariini(query){
    return query.match(/hari ini/ig);
}

function extractid(query){
    let id = query.match(/[Ii][Dd] \d+/g);
    return id.substring(3);
}

export { extractdate, extractmakul, extracttopik, extractjenis, extractnminggu, extractnhari, extracthariini, extractid }