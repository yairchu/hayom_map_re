// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
var answers = {
    'm2_1': 0,
    'm2_2': 0,
    'm2_3': 0,
    'm3_1': 0,
    'm3_2': 0,
    'm3_3': 0,
    'm4_1': 0,
    'm4_2': 0,
    'm4_3': 0,
    'm5_1': 0,
    'm5_2': 0,
    'm5_3': 0,
    'm6_1': 0,
    'm6_2': 0,
    'm6_3': 0,
    'V1': 0,
    'V16': 0
};
var likud;
var israelbeitenu;
var yeshatid;
var avoda;
var shas;
var yahaduthatora;
var habait;
var kulanu;
var meretz;
var haamitanu;
var aravim;
var parties;
var partiesObj = [];
var shorturl;
var top3 = [];

var results = {
    likud: {
        name: 'הליכוד',
        chairman: 'בנימין נתניהו',
        desc: '"הליכוד" בראשות ראש הממשלה, בנימין נתניהו, היא מפלגת ימין שצמחה על מורשתו של זאב ז\'בוטינסקי. עקרונותיה הם קידום כלכלה חופשית, שמירה על רגישות חברתית ושמירה על ביטחון ישראל. בסוגיית הסכסוך, בשש השנים האחרונות לא הכירו בליכוד בתביעות הפלסטינים לריבונות, אבל עם השנים העמדות התמתנו.'
    },
    israelbeitenu: {
        name: 'ישראל ביתנו',
        chairman: 'אביגדור ליברמן',
        desc: '"ישראל ביתנו" בראשות אביגדור ליברמן הוקמה בשנת 1999 ומחזיקה בעקרונות של אחדות העם, מדינת ישראל כמדינתו של העם היהודי וכן מקדמת את הסיסמא "בלי נאמנות אין אזרחות". בנוגע לערביי ישראל, המפלגה מאמינה שהסדר עם הפלסטינים חייב לכלול את תכנית חילופי השטחים והאוכלוסיות.'
    },
    yeshatid: {
        name: 'יש עתיד',
        chairman: 'יאיר לפיד',
        desc: '"יש עתיד" בראשות יאיר לפיד, היא מפלגת מרכז שהוקמה לקראת הבחירות לכנסת ה-19. במצע של המפלגה הורדת יוקר המחייה, העברת כספים לניצולי שואה ויצירת עוד 100 אלף דירות חדשות לשוק הנדל"ן בארץ.'
    },
    avoda: {
        name: 'המחנה הציוני',
        chairman: 'יצחק הרצוג',
        desc: 'יצחק הרצוג, יו"ר העבודה וציפי לבני, יו"ר התנועה, החליטו בבחירות 2015 על איחוד המפלגות ל"המחנה הציוני". המפלגה תומכת בחידוש המשא ומתן עם הפלסטינים וצמצום הפערים החברתיים. התכנית הכלכלית של המפלגה מחזירה את האחריות של המדינה על החינוך, הבריאות והדיור.'
    },
    shas: {
        name: 'ש״ס',
        chairman: 'אריה דרעי',
        desc: 'מפלגת ש"ס בראשות אריה דרעי, היא מפלגה ספרדית-חרדית שדוגלת ב"החזרת עטרה ליושנה" ובתיקון אפליה כלכלית וחברתית מתמשכת. המפלגה הוקמה לקראת הבחירות לכנסת ה-11 בשנת 1984 במחאה על הנציגות הזניחה של ספרדים ברשימת אגודת ישראל. בכנסת ה-15 הגיעה לשיא של 17 מושבים. למרות שעמדותיה של ש"ס ימניות, הרב עובדיה יוסף, מנהיגה הרוחני של התנועה, קבע כי חיי אדם חשובים יותר משטחים. '
    },
    yahaduthatora: {
        name: 'יהדות התורה',
        chairman: 'יעקב ליצמן',
        desc: 'יהדות התורה בראשות יעקב ליצמן היא רשימה אשכנזית משותפת למפלגות החרדיות - אגודת ישראל ודגל התורה. הרשימה פועלת לקידום אינטרסים במגזר החרדי בתחומי חינוך ורווחה ונאבקת בגיוס חרדים לצבא. מטרתה של יהדות התורה היא להשפיע על החברה בישראל לשמור על אורח חיים יהודי על פי ערכי התורה, בדרכים חינוכיות ובפעולות דמוקרטיות.'
    },
    habait: {
        name: 'הבית היהודי',
        chairman: 'נפתלי בנט',
        desc: 'מפלגת הבית היהודי הוקמה לקראת הכנסת ה-19 בראשותו של נפתלי בנט. המפלגה היא מפלגת ימין, הפונה לזרם הציונות-הדתית, מתנגדת לנישואים חד-מיניים, פועלת לחיזוק הציביון היהודי של המדינה, דוגלת בכלכלה חופשית, עצירת גלי המסתננים ושמירה על אדמות הלאום.'
    },
    kulanu: {
        name: 'כולנו',
        chairman: 'משה כחלון',
        desc: 'מפלגת "כולנו" בראשות משה כחלון, הוקמה ב-2015 כדי להניף את דגל החברתיות ולהילחם ביוקר המחייה. כחלון, שהוביל את הרפורמה בשוק הסלולר, רוצה לצמצם את הפערים הכלכליים, להילחם בעוני, לצמצם את הבירוקרטיה הממשלתית ולפרק את המונופלים על משאבי הציבור.'
    },
    haamitanu: {
        name: 'העם איתנו',
        chairman: 'אלי ישי',
        desc: '"העם איתנו" הוקמה לקראת בחירות 2015 על ידי יוצא מפלגת ש"ס, אלי ישי. עם מינויו של ישי לשר הפנים ב-2009 פעל רבות לגירוש המסתננים מאפריקה לישראל. כמו ש"ס, גם "יחד" דוגלת ב"החזרת עטרה ליושנה" ובצמצום הפערים החברתיים והכלכליים.'
    },
    meretz: {
        name: 'מרצ',
        chairman: 'זהבה גלאון',
        desc: 'מרצ בהנהגתה של זהבה גלאון ממוקמת בשמאל הציוני של המפה הפוליטית הישראלית ותומכת באופן מסורתי בשוויון חברתי ובפתרון של שתי מדינות לשני עמים. היא דוגלת בחתירה לשלום מתוך ויתור על השטחים והפסקת מפעל ההתנחלויות.'
    },
    aravim: {
        name: 'הרשימה המשותפת',
        chairman: 'איימן עודה',
        desc: 'המפלגה הערבית המאוחדת הוקמה לקראת בחירות 2015, לאור העלאת אחוז החסימה ומתוך כוונה להוות גוש ערבי חזק. המפלגה כוללת את חד"ש, רע"מ-תע"ל, בל"ד ומד"ע. בראש המפלגה המאוחדת עומד איימן עודה מחד"ש.'
    }
};

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function calculateLikud() {
    likud = answers.m6_3 * 2.2824199001018;
    likud += answers.m6_2 * 1.08479654212607;
    likud += answers.m6_1 * 2.74026931374461;
    likud += answers.m5_3 * -1.33245948099526;
    likud += answers.m5_2 * -0.8;
    likud += answers.m5_1 * -1.42519383137793;
    likud += answers.m4_3 * 0.723182536662932;
    likud += answers.m4_2 * 0.931045228344325;
    likud += answers.m4_1 * -2.77277218823125;
    likud += answers.m3_3 * 0.866772668717615;
    likud += answers.m3_2 * 1.01732567239775;
    likud += answers.m3_1 * 2.20350416205305;
    likud += answers.m2_3 * 0.723;
    likud += answers.m2_2 * -0.494614394764931;
    likud += answers.m2_1 * 3.60459914008656;
    likud += answers.V16 * 4.8057745797972;
    likud += answers.V1 * 5.774;
    likud += 0;

    return likud;
}

function calculateIsraelbeitenu() {
    israelbeitenu = answers.m6_3 * 0.589445282736341;
    israelbeitenu += answers.m6_2 * 1.2231683500609;
    israelbeitenu += answers.m6_1 * 3.23433241396207;
    israelbeitenu += answers.m5_3 * -2.07567991214517;
    israelbeitenu += answers.m5_2 * -2.82131236280231;
    israelbeitenu += answers.m5_1 * 1.31372186006171;
    israelbeitenu += answers.m4_3 * 0.723182536662932;
    israelbeitenu += answers.m4_2 * 1.23163746655095;
    israelbeitenu += answers.m4_1 * -2.77277218823125;
    israelbeitenu += answers.m3_3 * 0.235;
    israelbeitenu += answers.m3_2 * 2.94886764787185;
    israelbeitenu += answers.m3_1 * 1.29407193201301;
    israelbeitenu += answers.m2_3 * 0.723;
    israelbeitenu += answers.m2_2 * -1.59581506039359;
    israelbeitenu += answers.m2_1 * -0.3422365421459;
    israelbeitenu += answers.V16 * -0.912526847204564;
    israelbeitenu += answers.V1 * 1.400;
    israelbeitenu += 0;

    return israelbeitenu;
}

function calculateYeshatid() {
    yeshatid = answers.m6_3 * 1.2188734310882;
    yeshatid += answers.m6_2 * 0.869640418007318;
    yeshatid += answers.m6_1 * -2.16415277175841;
    yeshatid += answers.m5_3 * -0.37570232905935;
    yeshatid += answers.m5_2 * -3.37956633937396;
    yeshatid += answers.m5_1 * 1.09852714148082;
    yeshatid += answers.m4_3 * -0.307320876672965;
    yeshatid += answers.m4_2 * 2.36352370558661;
    yeshatid += answers.m4_1 * 1.95599674348877;
    yeshatid += answers.m3_3 * 1.50934870167088;
    yeshatid += answers.m3_2 * 3.5128130698095;
    yeshatid += answers.m3_1 * -3.16811038922243;
    yeshatid += answers.m2_3 * -0.307;
    yeshatid += answers.m2_2 * -2.8244147642694;
    yeshatid += answers.m2_1 * 0.604599140086568;
    yeshatid += answers.V16 * -4.85596517807925;
    yeshatid += answers.V1 * -.184;
    yeshatid += 0;

    return yeshatid;
}

function calculateAvoda() {
    avoda = answers.m6_3 * -2.27263594305448;
    avoda += answers.m6_2 * -2.37938682739383;
    avoda += answers.m6_1 * -4.26997714119921;
    avoda += answers.m5_3 * 2.68362617052522;
    avoda += answers.m5_2 * -2.93761958086715;
    avoda += answers.m5_1 * 1.60582126491695;
    avoda += answers.m4_3 * -0.404168734685309;
    avoda += answers.m4_2 * 1.42735573715123;
    avoda += answers.m4_1 * 5.15357054880355;
    avoda += answers.m3_3 * -1.16406742344995;
    avoda += answers.m3_2 * 2.93151115063861;
    avoda += answers.m3_1 * -4.25018049698474;
    avoda += answers.m2_3 * -0.404;
    avoda += answers.m2_2 * -1.87408823511254;
    avoda += answers.m2_1 * -2.3918263978004;
    avoda += answers.V16 * -2.77736432402219;
    avoda += answers.V1 * -4.620;
    avoda += 0;

    return avoda;
}

function calculateShas() {
    shas = answers.m6_3 * -0.100153712071878;
    shas += answers.m6_2 * 2.09769177763737;
    shas += answers.m6_1 * 1.7670508142779;
    shas += answers.m5_3 * -0.133851016874533;
    shas += answers.m5_2 * 3.57843534644896;
    shas += answers.m5_1 * -1.04529312357687;
    shas += answers.m4_3 * -0.320570200023214;
    shas += answers.m4_2 * -3.60922300056293;
    shas += answers.m4_1 * 1.58960025662642;
    shas += answers.m3_3 * -2.1640674234499;
    shas += answers.m3_2 * -3.93151115063861;
    shas += answers.m3_1 * -0.414582593000511;
    shas += answers.m2_3 * -0.321;
    shas += answers.m2_2 * 1.58741038735803;
    shas += answers.m2_1 * 3.55516133290079;
    shas += answers.V16 * 7;
    shas += answers.V1 * -1.320;
    shas += 0;

    return shas;
}

function calculateYahaduthatora() {
    yahaduthatora = answers.m6_3 * -1.78741508493683;
    yahaduthatora += answers.m6_2 * 1.48578267544162;
    yahaduthatora += answers.m6_1 * 0.845376985895344;
    yahaduthatora += answers.m5_3 * 0.390474738720336;
    yahaduthatora += answers.m5_2 * 4.18394392777309;
    yahaduthatora += answers.m5_1 * -1.97127716513747;
    yahaduthatora += answers.m4_3 * -0.320570200023214;
    yahaduthatora += answers.m4_2 * -6.42135261131845;
    yahaduthatora += answers.m4_1 * 2.06246977609621;
    yahaduthatora += answers.m3_3 * -2.7640674234499;
    yahaduthatora += answers.m3_2 * -3.93151115063861;
    yahaduthatora += answers.m3_1 * -0.414582593000511;
    yahaduthatora += answers.m2_3 * -0.321;
    yahaduthatora += answers.m2_2 * 1.50349739691031;
    yahaduthatora += answers.m2_1 * 3.55516133290079;
    yahaduthatora += answers.V16 * 7;
    yahaduthatora += answers.V1 * -1.419;
    yahaduthatora += 0;

    return yahaduthatora;
}

function calculateHabait() {
    habait = answers.m6_3 * 1.94161578441988;
    habait += answers.m6_2 * 2.09769177763737;
    habait += answers.m6_1 * 3.76651392340582;
    habait += answers.m5_3 * -3.65913144672756;
    habait += answers.m5_2 * -4.85190404295619;
    habait += answers.m5_1 * -2.23586664809848;
    habait += answers.m4_3 * 1.19483649100667;
    habait += answers.m4_2 * -3.39828065996676;
    habait += answers.m4_1 * -3.44008649359111;
    habait += answers.m3_3 * 1.789;
    habait += answers.m3_2 * -3.93151115063861;
    habait += answers.m3_1 * 2.94700124644678;
    habait += answers.m2_3 * 1.195;
    habait += answers.m2_2 * 0.81677294051402;
    habait += answers.m2_1 * 4.23925744414546;
    habait += answers.V16 * 5.8;
    habait += answers.V1 * 3.300;
    habait += 0;

    return habait;
}

function calculateKulanu() {
    kulanu = answers.m6_3 * -0.744996248296854;
    kulanu += answers.m6_2 * -1.1161866598858;
    kulanu += answers.m6_1 * 2.0585212740387;
    kulanu += answers.m5_3 * 0.726984008332623;
    kulanu += answers.m5_2 * -2.18409042770117;
    kulanu += answers.m5_1 * -0.0342460698897118;
    kulanu += answers.m4_3 * -0.269478861191719;
    kulanu += answers.m4_2 * -0.423263671561503;
    kulanu += answers.m4_1 * -1.47605638615231;
    kulanu += answers.m3_3 * -0.227531542820169;
    kulanu += answers.m3_2 * 1.6068441800147;
    kulanu += answers.m3_1 * 1.0667385964747;
    kulanu += answers.m2_3 * -0.269;
    kulanu += answers.m2_2 * 0.494614394764931;
    kulanu += answers.m2_1 * 2.55516133290079;
    kulanu += answers.V16 * 3.9;
    kulanu += answers.V1 * -2.385;
    kulanu += 0;

    return kulanu;
}

function calculateMeretz() {
    meretz = answers.m6_3 * -1.68406459371186;
    meretz += answers.m6_2 * -2.53591158393744;
    meretz += answers.m6_1 * -6.26997714119921;
    meretz += answers.m5_3 * 2.25660522864242;
    meretz += answers.m5_2 * -2.93761958086715;
    meretz += answers.m5_1 * 2.347875008966;
    meretz += answers.m4_3 * -0.167774291910245;
    meretz += answers.m4_2 * 1.76411692244967;
    meretz += answers.m4_1 * 6.15357054880355;
    meretz += answers.m3_3 * -1.41872507972088;
    meretz += answers.m3_2 * 3.93151115063861;
    meretz += answers.m3_1 * -4.55018049698474;
    meretz += answers.m2_3 * -0.168;
    meretz += answers.m2_2 * -2.8244147642694;
    meretz += answers.m2_1 * -4.70062053930899;
    meretz += answers.V16 * -3.91411816704132;
    meretz += answers.V1 * -4.620;
    meretz += 0;

    return meretz;
}

function calculateAravim() {
    aravim = answers.m6_3 * -1.68406459371186;
    aravim += answers.m6_2 * -2.53591158393744;
    aravim += answers.m6_1 * -6.26997714119921;
    aravim += answers.m5_3 * 2.25660522864242;
    aravim += answers.m5_2 * -2.93761958086715;
    aravim += answers.m5_1 * 2.347875008966;
    aravim += answers.m4_3 * -0.167774291910245;
    aravim += answers.m4_2 * 1.76411692244967;
    aravim += answers.m4_1 * 6.15357054880355;
    aravim += answers.m3_3 * -1.41872507972088;
    aravim += answers.m3_2 * 3.93151115063861;
    aravim += answers.m3_1 * -4.55018049698474;
    aravim += answers.m2_3 * -0.168;
    aravim += answers.m2_2 * -2.8244147642694;
    aravim += answers.m2_1 * -4.70062053930899;
    aravim += answers.V16 * -3.91411816704132;
    aravim += answers.V1 * -3.000;
    aravim += -0;

    return aravim;
}

function calculateHaamitanu() {
    haamitanu = answers.m6_3 * -0.166343306661973;
    haamitanu += answers.m6_2 * 0.188993014555994;
    haamitanu += answers.m6_1 * 1.7670508142779;
    haamitanu += answers.m5_3 * -0.0702384378869173;
    haamitanu += answers.m5_2 * 2.97404193435067;
    haamitanu += answers.m5_1 * 0.736866059717714;
    haamitanu += answers.m4_3 * -1.45563464719286;
    haamitanu += answers.m4_2 * -1.38684300193893;
    haamitanu += answers.m4_1 * -1.1996053916401;
    haamitanu += answers.m3_3 * -1.16406742344995;
    haamitanu += answers.m3_2 * -3.93151115063861;
    haamitanu += answers.m3_1 * 1.53087044002808;
    haamitanu += answers.m2_3 * -1.456;
    haamitanu += answers.m2_2 * 1.06024168815729;
    haamitanu += answers.m2_1 * 3.15516133290079;
    haamitanu += answers.V16 * 4.8057745797972;
    haamitanu += answers.V1 * .252;
    haamitanu += 0;

    return haamitanu;
}

function sortParties() {
    parties = [parseFloat(likud), parseFloat(israelbeitenu), parseFloat(yeshatid), parseFloat(avoda), parseFloat(shas), parseFloat(yahaduthatora), parseFloat(habait), parseFloat(kulanu), parseFloat(meretz), parseFloat(haamitanu), parseFloat(aravim)];
    parties.sort(function (a, b) {
        return b - a;
    });
    $(parties).each(function () {
        if (parseFloat(this) == likud) {
            partiesObj[parseFloat(this)] = 'likud';
            return;
        }
        if (parseFloat(this) == israelbeitenu) {
            partiesObj[parseFloat(this)] = 'israelbeitenu';
            return;
        }
        if (parseFloat(this) == yeshatid) {
            partiesObj[parseFloat(this)] = 'yeshatid';
            return;
        }
        if (parseFloat(this) == avoda) {
            partiesObj[parseFloat(this)] = 'avoda';
            return;
        }
        if (parseFloat(this) == shas) {
            partiesObj[parseFloat(this)] = 'shas';
            return;
        }
        if (parseFloat(this) == yahaduthatora) {
            partiesObj[parseFloat(this)] = 'yahaduthatora';
            return;
        }
        if (parseFloat(this) == habait) {
            partiesObj[parseFloat(this)] = 'habait';
            return;
        }
        if (parseFloat(this) == kulanu) {
            partiesObj[parseFloat(this)] = 'kulanu';
            return;
        }
        if (parseFloat(this) == meretz) {
            partiesObj[parseFloat(this)] = 'meretz';
            return;
        }
        if (parseFloat(this) == aravim) {
            partiesObj[parseFloat(this)] = 'aravim';
            return;
        }
        if (parseFloat(this) == haamitanu) {
            partiesObj[parseFloat(this)] = 'haamitanu';
            return;
        }

    })
}

function calculate() {
    var val;
    val = (parseFloat($('[name="m6_3"]:checked').val()));
    if (isNaN(val)) {
        answers.m6_3 = 0;
    } else {
        answers.m6_3 = val;
    }
    val = (parseFloat($('[name="m6_2"]:checked').val()));
    if (isNaN(val)) {
        answers.m6_2 = 0;
    } else {
        answers.m6_2 = val;
    }
    val = (parseFloat($('[name="m6_1"]:checked').val()));
    if (isNaN(val)) {
        answers.m6_1 = 0;
    } else {
        answers.m6_1 = val;
    }
    val = (parseFloat($('[name="m5_3"]:checked').val()));
    if (isNaN(val)) {
        answers.m5_3 = 0;
    } else {
        answers.m5_3 = val;
    }
    val = (parseFloat($('[name="m5_2"]:checked').val()));
    if (isNaN(val)) {
        answers.m5_2 = 0;
    } else {
        answers.m5_2 = val;
    }
    val = (parseFloat($('[name="m5_1"]:checked').val()));
    if (isNaN(val)) {
        answers.m5_1 = 0;
    } else {
        answers.m5_1 = val;
    }
    val = (parseFloat($('[name="m4_3"]:checked').val()));
    if (isNaN(val)) {
        answers.m4_3 = 0;
    } else {
        answers.m4_3 = val;
    }
    val = (parseFloat($('[name="m4_2"]:checked').val()));
    if (isNaN(val)) {
        answers.m4_2 = 0;
    } else {
        answers.m4_2 = val;
    }
    val = (parseFloat($('[name="m4_1"]:checked').val()));
    if (isNaN(val)) {
        answers.m4_1 = 0;
    } else {
        answers.m4_1 = val;
    }
    val = (parseFloat($('[name="m3_3"]:checked').val()));
    if (isNaN(val)) {
        answers.m3_3 = 0;
    } else {
        answers.m3_3 = val;
    }
    val = (parseFloat($('[name="m3_2"]:checked').val()));
    if (isNaN(val)) {
        answers.m3_2 = 0;
    } else {
        answers.m3_2 = val;
    }
    val = (parseFloat($('[name="m3_1"]:checked').val()));
    if (isNaN(val)) {
        answers.m3_1 = 0;
    } else {
        answers.m3_1 = val;
    }
    val = (parseFloat($('[name="m2_3"]:checked').val()));
    if (isNaN(val)) {
        answers.m2_3 = 0;
    } else {
        answers.m2_3 = val;
    }
    val = (parseFloat($('[name="m2_2"]:checked').val()));
    if (isNaN(val)) {
        answers.m2_2 = 0;
    } else {
        answers.m2_2 = val;
    }
    val = (parseFloat($('[name="m2_1"]:checked').val()));
    if (isNaN(val)) {
        answers.m2_1 = 0;
    } else {
        answers.m2_1 = val;
    }
    val = (parseFloat($('[name="V16"]:checked').val()));
    if (isNaN(val)) {
        answers.V16 = 0;
    } else {
        answers.V16 = val;
    }
    val = (parseFloat($('[name="V1"]:checked').val()));
    if (isNaN(val)) {
        answers.V1 = 0;
    } else {
        answers.V1 = val;
    }
    calculateLikud();
    calculateIsraelbeitenu();
    calculateYeshatid();
    calculateAvoda();
    calculateShas();
    calculateYahaduthatora();
    calculateHabait();
    calculateKulanu();
    calculateMeretz();
    calculateAravim();
    calculateHaamitanu();
    sortParties();
    top3 = [
        partiesObj[parties[0]],
        partiesObj[parties[1]],
        partiesObj[parties[2]]
    ];
}

function moveGraph() {

    var first;
    first = parseFloat(parties[0]);
    $(parties).each(function () {
        $('#graph .' + partiesObj[parseFloat(this)]).height(((parseFloat(this) / first) * 100) + '%');

    });

}

function nextQst() {
    if (!$('.question.cur').hasClass('last')) {
        $('.question.cur').removeClass('cur').next().addClass('cur');
        $('.tab').removeClass('cur');
        $('.tab.' + $('.question.cur').attr('class').replace('question', '').replace('cur', '').replace('last', '').replace(' ', '')).addClass('cur');
    } else {
        $('#graph, #questions').hide();
        buildResult();
        buildUrl();
        $('#result').show();
        machResHeights();
    }
}

function buildResult() {
    for (i = 0; i < 3; i++) {
        var cur = $('#result .' + i);
        cur.addClass(top3[i]);
        cur.find('.name').html(results[top3[i]]['name']);
        cur.find('.chairman').html(results[top3[i]]['chairman']);
        cur.find('.desc').html(results[top3[i]]['desc']);
    }

}

function buildUrl() {
    $.get('https://api-ssl.bitly.com/v3/shorten', {
        access_token: '368eb541f67a7c53468e69c7cdfc8a07af68228f',
        longUrl: encodeURI(window.location.origin + window.location.pathname + '?share=true&d=' + btoa(JSON.stringify({
            1: top3[0],
            2: top3[1],
            3: top3[2]
        }))),
        format: 'txt'
    }, function (res) {
        shorturl = res;
    });
}

function machResHeights() {
    var highest = $('#result .first .desc').height();
    $('#result .desc').each(function () {
        highest = ($(this).height() > highest ) ? $(this).height() : highest;
    });
    //console.log(highest);
    $('#result .desc').height(highest);

}
function restart() {
    $('#result').hide();
    parties = null;
    partiesObj = [];
    $('input[type="radio"]').each(function () {
        $(this).prop('checked', false);
    });
    $('label').removeClass('selected');
    $('.tab').removeClass('cur').first().addClass('cur');
    $.each(answers, function (a, b) {
        answers[a] = 0;
    });
    likud = 0;
    israelbeitenu = 0;
    yeshatid = 0;
    avoda = 0;
    shas = 0;
    yahaduthatora = 0;
    habait = 0;
    kulanu = 0;
    meretz = 0;
    haamitanu = 0;
    aravim = 0;
    top3 = [];
    calculate();
    $('.nextQst').prop('disabled', 'disabled');
    $('.question').removeClass('cur').first().addClass('cur');
    $('#graph').find('> div').height(0);
    $('#start').click();
    $('.result.0').attr('class', '').attr('class', 'result first 0');
    $('.result.1').attr('class', '').attr('class', 'result second 1');
    $('.result.2').attr('class', '').attr('class', 'result third 2');
}