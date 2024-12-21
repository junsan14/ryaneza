

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function roundToTwo(num) {
    let newNum = Math.round(num * 10) / 10;
    if(Number.isInteger(newNum))
     newNum = newNum+".0";
    return newNum;
}

function calculateAge(birth_year){
    const year =(new Date()).getFullYear();
    const age = year -birth_year;
    if(age < 20){
        return "10s"
    }else if(age < 30){
        return "20s"
    }else if(age < 40){
        return "30s"
    }else if(age < 50){
        return "40s"
    }else if(age < 60){
        return "50s"
    }else if(age < 70){
        return "60s"
    }else if(age > 80){
        return "over 70s"
    }
}

function formatDate(date){
    if(date){
        let formatDate = new Date(date).getFullYear()+ "/" 
            +(new Date(date).getMonth()+1).toString().padStart(2, '0')+ "/" 
            +new Date(date).getDate().toString().padStart(2, '0');
        return formatDate;
    }else{
        return null;
    }
}
function authPermission (auth){
    if(auth){
        if(auth.email_verified_at &&
             (auth.gender && auth.country && auth.birth_year && auth.locality_type))
        {
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

function GorillaIcon ({color_code}){
    console.log
    return(
    <div className={`gorilla-icon ${String(color_code).indexOf("ff") !== -1&& "black"}`} >
        <svg version="1.0"  viewBox="0 0 512 512"preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"fill={color_code} stroke="none">
            <path d="M2465 4749 c-349 -30 -599 -253 -720 -644 -45 -144 -83 -223 -161
            -330 -182 -251 -218 -304 -261 -383 -58 -106 -105 -228 -137 -359 -34 -135
            -44 -200 -61 -424 -21 -277 -50 -363 -139 -419 -20 -11 -90 -43 -156 -70 -142
            -57 -217 -98 -326 -176 -231 -165 -368 -328 -423 -503 -46 -147 -58 -283 -75
            -903 l-5 -178 2559 0 2559 0 -5 178 c-20 718 -35 846 -119 1011 -56 111 -177
            243 -327 356 -134 102 -216 148 -378 215 -77 32 -156 69 -174 84 -78 59 -101
            136 -121 406 -38 500 -114 700 -423 1115 -104 139 -150 229 -197 380 -69 222
            -157 363 -299 479 -107 87 -266 151 -400 162 -39 3 -82 6 -96 8 -14 1 -66 -1
            -115 -5z m-220 -1562 c66 -18 161 -51 210 -71 50 -21 97 -38 105 -38 8 0 56
            17 105 38 232 97 472 137 599 100 94 -28 196 -138 267 -289 79 -171 28 -324
            -134 -400 -69 -33 -206 -67 -270 -67 -48 0 -48 -1 -43 -27 36 -184 90 -509 90
            -546 1 -63 -19 -80 -122 -104 -68 -16 -127 -18 -492 -18 -365 0 -424 2 -492
            18 -103 24 -123 41 -122 104 0 37 54 362 90 546 5 26 5 27 -43 27 -64 0 -201
            34 -270 67 -162 76 -213 229 -134 400 67 142 166 253 253 285 84 30 247 20
            403 -25z m170 -1533 c127 -4 307 -2 454 5 213 11 245 11 258 -2 41 -41 -37
            -142 -151 -197 -117 -55 -220 -74 -411 -75 -178 0 -269 13 -380 57 -141 55
            -240 167 -192 217 9 10 36 12 112 7 55 -3 195 -9 310 -12z"/>
            <path d="M2054 2880 c-36 -14 -64 -59 -64 -102 0 -105 145 -137 196 -42 45 83
            -44 180 -132 144z"/>
            <path d="M2970 2868 c-47 -32 -61 -85 -36 -132 34 -63 117 -76 167 -27 87 87
            -29 228 -131 159z"/>
            <path d="M2314 2090 c-85 -35 -60 -164 31 -164 72 0 111 84 63 138 -26 29 -63
            39 -94 26z"/>
            <path d="M2744 2090 c-85 -35 -60 -164 31 -164 72 0 111 84 63 138 -26 29 -63 39 -94 26z"/>
            </g>
        </svg>
    </div>
    )
}


export {numberWithCommas,roundToTwo,calculateAge,formatDate,authPermission,GorillaIcon}