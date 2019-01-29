enum QuestionType {
  Input = "Input",
  Checkbox = "Checkbox",
  Slider = "Slider",
  Button = "Button"
}

type Id = string;
type AnswerId = Id;

interface Question {
  id: Id;
  title: string;
  type: QuestionType;
  description?: string;
  answers: Id[];
}

interface Answer {
  id: Id;
  value: string;
}

interface Questions {
  [id: string]: Question;
}

interface Answers {
  [id: string]: Answer;
}

interface Responses {
  [questionId: string]: AnswerId[];
}

interface Questionnaire {
  id: Id;
  title: string;
  questions: Id[];
  responses: Responses;
}

export const questions: Questions = {
  "1": {
    answers: ["4", "5", "6"],
    id: "1",
    title: "what type of counseling are you looking for?",
    type: QuestionType.Checkbox
  },
  "2": {
    answers: ["1", "2", "3"],
    id: "2",
    title: "what is your gender?",
    type: QuestionType.Button
  },
  "3": {
    answers: ["32", "33", "34"],
    id: "3",
    title: "how old are you?",
    type: QuestionType.Slider
  },
  "4": {
    answers: ["10", "11", "12"],
    id: "4",
    title: "where do you live?",
    type: QuestionType.Button
  },
  "5": {
    answers: ["234"],
    id: "5",
    title: "How's life",
    type: QuestionType.Input
  }
};

export const answers: Answers = {
  "001": {
    id: "001",
    value: "Male"
  },
  "002": {
    id: "002",
    value: "Female"
  },
  "003": {
    id: "003",
    value: "Non-binary"
  },
  "004": {
    id: "004",
    value: "Individual counseling"
  },
  "005": {
    id: "005",
    value: "Couple counseling"
  },
  "006": {
    id: "006",
    value: "Teen counseling"
  },
  "007": {
    id: "007",
    value: "Belgium"
  },
  "008": {
    id: "008",
    value: "Canada"
  },
  "009": {
    id: "009",
    value: "Denmark"
  },
  "010": {
    id: "010",
    value: "France"
  },
  "011": {
    id: "011",
    value: "Germany"
  },
  "012": {
    id: "012",
    value: "Greece"
  },
  "013": {
    id: "013",
    value: "Iceland"
  },
  "014": {
    id: "014",
    value: "Italy"
  },
  "015": {
    id: "015",
    value: "Luxembourg"
  },
  "016": {
    id: "016",
    value: "Netherlands"
  },
  "017": {
    id: "017",
    value: "Norway"
  },
  "018": {
    id: "018",
    value: "Portugal"
  },
  "019": {
    id: "019",
    value: "Spain"
  },
  "020": {
    id: "020",
    value: "Turkey"
  },
  "021": {
    id: "021",
    value: "United Kingdom"
  },
  "022": {
    id: "022",
    value: "USA"
  },
  "023": {
    id: "023",
    value: "Israel"
  },
  "024": {
    id: "024",
    value: "Japan"
  },
  "025": {
    id: "025",
    value: "South Korea"
  },
  "026": {
    id: "026",
    value: "Australia"
  },
  "027": {
    id: "027",
    value: "New Zealand"
  },
  "028": {
    id: "028",
    value: "Austria"
  },
  "029": {
    id: "029",
    value: "Ireland"
  },
  "030": {
    id: "030",
    value: "Sweden"
  },
  "031": {
    id: "031",
    value: "Switzerland"
  },
  "032": {
    id: "032",
    value: "1"
  },
  "033": {
    id: "033",
    value: "2"
  },
  "034": {
    id: "034",
    value: "3"
  },
  "035": {
    id: "035",
    value: "4"
  },
  "036": {
    id: "036",
    value: "5"
  },
  "037": {
    id: "037",
    value: "6"
  },
  "038": {
    id: "038",
    value: "7"
  },
  "039": {
    id: "039",
    value: "8"
  },
  "040": {
    id: "040",
    value: "9"
  },
  "041": {
    id: "041",
    value: "10"
  },
  "042": {
    id: "042",
    value: "11"
  },
  "043": {
    id: "043",
    value: "12"
  },
  "044": {
    id: "044",
    value: "13"
  },
  "045": {
    id: "045",
    value: "14"
  },
  "046": {
    id: "046",
    value: "15"
  },
  "047": {
    id: "047",
    value: "16"
  },
  "048": {
    id: "048",
    value: "17"
  },
  "049": {
    id: "049",
    value: "18"
  },
  "050": {
    id: "050",
    value: "19"
  },
  "051": {
    id: "051",
    value: "20"
  },
  "052": {
    id: "052",
    value: "21"
  },
  "053": {
    id: "053",
    value: "22"
  },
  "054": {
    id: "054",
    value: "23"
  },
  "055": {
    id: "055",
    value: "24"
  },
  "056": {
    id: "056",
    value: "25"
  },
  "057": {
    id: "057",
    value: "26"
  },
  "058": {
    id: "058",
    value: "27"
  },
  "059": {
    id: "059",
    value: "28"
  },
  "060": {
    id: "060",
    value: "29"
  },
  "061": {
    id: "061",
    value: "30"
  },
  "062": {
    id: "062",
    value: "31"
  },
  "063": {
    id: "063",
    value: "32"
  },
  "064": {
    id: "064",
    value: "33"
  },
  "065": {
    id: "065",
    value: "34"
  },
  "066": {
    id: "066",
    value: "35"
  },
  "067": {
    id: "067",
    value: "36"
  },
  "068": {
    id: "068",
    value: "37"
  },
  "069": {
    id: "069",
    value: "38"
  },
  "070": {
    id: "070",
    value: "39"
  },
  "071": {
    id: "071",
    value: "40"
  },
  "072": {
    id: "072",
    value: "41"
  },
  "073": {
    id: "073",
    value: "42"
  },
  "074": {
    id: "074",
    value: "43"
  },
  "075": {
    id: "075",
    value: "44"
  },
  "076": {
    id: "076",
    value: "45"
  },
  "077": {
    id: "077",
    value: "46"
  },
  "078": {
    id: "078",
    value: "47"
  },
  "079": {
    id: "079",
    value: "48"
  },
  "080": {
    id: "080",
    value: "49"
  },
  "081": {
    id: "081",
    value: "50"
  },
  "082": {
    id: "082",
    value: "51"
  },
  "083": {
    id: "083",
    value: "52"
  },
  "084": {
    id: "084",
    value: "53"
  },
  "085": {
    id: "085",
    value: "54"
  },
  "086": {
    id: "086",
    value: "55"
  },
  "087": {
    id: "087",
    value: "56"
  },
  "088": {
    id: "088",
    value: "57"
  },
  "089": {
    id: "089",
    value: "58"
  },
  "090": {
    id: "090",
    value: "59"
  },
  "091": {
    id: "091",
    value: "60"
  },
  "092": {
    id: "092",
    value: "61"
  },
  "093": {
    id: "093",
    value: "62"
  },
  "094": {
    id: "094",
    value: "63"
  },
  "095": {
    id: "095",
    value: "64"
  },
  "096": {
    id: "096",
    value: "65"
  },
  "097": {
    id: "097",
    value: "66"
  },
  "098": {
    id: "098",
    value: "67"
  },
  "099": {
    id: "099",
    value: "68"
  },
  "100": {
    id: "100",
    value: "69"
  },
  "101": {
    id: "101",
    value: "70"
  },
  "102": {
    id: "102",
    value: "71"
  },
  "103": {
    id: "103",
    value: "72"
  },
  "104": {
    id: "104",
    value: "73"
  },
  "105": {
    id: "105",
    value: "74"
  },
  "106": {
    id: "106",
    value: "75"
  },
  "107": {
    id: "107",
    value: "76"
  },
  "108": {
    id: "108",
    value: "77"
  },
  "109": {
    id: "109",
    value: "78"
  },
  "110": {
    id: "110",
    value: "79"
  },
  "111": {
    id: "111",
    value: "80"
  },
  "112": {
    id: "112",
    value: "81"
  },
  "113": {
    id: "113",
    value: "82"
  },
  "114": {
    id: "114",
    value: "83"
  },
  "115": {
    id: "115",
    value: "84"
  },
  "116": {
    id: "116",
    value: "85"
  },
  "117": {
    id: "117",
    value: "86"
  },
  "118": {
    id: "118",
    value: "87"
  },
  "119": {
    id: "119",
    value: "88"
  },
  "120": {
    id: "120",
    value: "89"
  },
  "121": {
    id: "121",
    value: "90"
  },
  "122": {
    id: "122",
    value: "91"
  },
  "123": {
    id: "123",
    value: "92"
  },
  "124": {
    id: "124",
    value: "93"
  },
  "125": {
    id: "125",
    value: "94"
  },
  "126": {
    id: "126",
    value: "95"
  },
  "127": {
    id: "127",
    value: "96"
  },
  "128": {
    id: "128",
    value: "97"
  },
  "129": {
    id: "129",
    value: "98"
  },
  "130": {
    id: "130",
    value: "99"
  },
  "131": {
    id: "131",
    value: "100"
  },
  "132": {
    id: "132",
    value: "101"
  },
  "133": {
    id: "133",
    value: "102"
  },
  "134": {
    id: "134",
    value: "103"
  },
  "135": {
    id: "135",
    value: "104"
  },
  "136": {
    id: "136",
    value: "105"
  },
  "137": {
    id: "137",
    value: "106"
  },
  "138": {
    id: "138",
    value: "107"
  },
  "139": {
    id: "139",
    value: "108"
  },
  "140": {
    id: "140",
    value: "109"
  },
  "141": {
    id: "141",
    value: "110"
  },
  "142": {
    id: "142",
    value: "111"
  },
  "143": {
    id: "143",
    value: "112"
  },
  "144": {
    id: "144",
    value: "113"
  },
  "145": {
    id: "145",
    value: "114"
  },
  "146": {
    id: "146",
    value: "115"
  },
  "147": {
    id: "147",
    value: "116"
  },
  "148": {
    id: "148",
    value: "117"
  },
  "149": {
    id: "149",
    value: "118"
  },
  "150": {
    id: "150",
    value: "119"
  },
  "151": {
    id: "151",
    value: "120"
  },
  "152": {
    id: "152",
    value: "121"
  },
  "153": {
    id: "153",
    value: "122"
  },
  "154": {
    id: "154",
    value: "123"
  },
  "155": {
    id: "155",
    value: "124"
  },
  "156": {
    id: "156",
    value: "125"
  },
  "157": {
    id: "157",
    value: "126"
  },
  "158": {
    id: "158",
    value: "127"
  },
  "159": {
    id: "159",
    value: "128"
  },
  "160": {
    id: "160",
    value: "129"
  },
  "161": {
    id: "161",
    value: "130"
  },
  "162": {
    id: "162",
    value: "131"
  },
  "163": {
    id: "163",
    value: "132"
  },
  "164": {
    id: "164",
    value: "133"
  },
  "165": {
    id: "165",
    value: "134"
  },
  "166": {
    id: "166",
    value: "135"
  },
  "167": {
    id: "167",
    value: "136"
  },
  "168": {
    id: "168",
    value: "137"
  },
  "169": {
    id: "169",
    value: "138"
  },
  "170": {
    id: "170",
    value: "139"
  },
  "171": {
    id: "171",
    value: "140"
  },
  "172": {
    id: "172",
    value: "141"
  },
  "173": {
    id: "173",
    value: "142"
  },
  "174": {
    id: "174",
    value: "143"
  },
  "175": {
    id: "175",
    value: "144"
  },
  "176": {
    id: "176",
    value: "145"
  },
  "177": {
    id: "177",
    value: "146"
  },
  "178": {
    id: "178",
    value: "147"
  },
  "179": {
    id: "179",
    value: "148"
  },
  "180": {
    id: "180",
    value: "149"
  },
  "181": {
    id: "181",
    value: "150"
  },
  "182": {
    id: "182",
    value: "151"
  },
  "183": {
    id: "183",
    value: "152"
  },
  "184": {
    id: "184",
    value: "153"
  },
  "185": {
    id: "185",
    value: "154"
  },
  "186": {
    id: "186",
    value: "155"
  },
  "187": {
    id: "187",
    value: "156"
  },
  "188": {
    id: "188",
    value: "157"
  },
  "189": {
    id: "189",
    value: "158"
  },
  "190": {
    id: "190",
    value: "159"
  },
  "191": {
    id: "191",
    value: "160"
  },
  "192": {
    id: "192",
    value: "161"
  },
  "193": {
    id: "193",
    value: "162"
  },
  "194": {
    id: "194",
    value: "163"
  },
  "195": {
    id: "195",
    value: "164"
  },
  "196": {
    id: "196",
    value: "165"
  },
  "197": {
    id: "197",
    value: "166"
  },
  "198": {
    id: "198",
    value: "167"
  },
  "199": {
    id: "199",
    value: "168"
  },
  "200": {
    id: "200",
    value: "169"
  },
  "201": {
    id: "201",
    value: "170"
  },
  "202": {
    id: "202",
    value: "171"
  },
  "203": {
    id: "203",
    value: "172"
  },
  "204": {
    id: "204",
    value: "173"
  },
  "205": {
    id: "205",
    value: "174"
  },
  "206": {
    id: "206",
    value: "175"
  },
  "207": {
    id: "207",
    value: "176"
  },
  "208": {
    id: "208",
    value: "177"
  },
  "209": {
    id: "209",
    value: "178"
  },
  "210": {
    id: "210",
    value: "179"
  },
  "211": {
    id: "211",
    value: "180"
  },
  "212": {
    id: "212",
    value: "181"
  },
  "213": {
    id: "213",
    value: "182"
  },
  "214": {
    id: "214",
    value: "183"
  },
  "215": {
    id: "215",
    value: "184"
  },
  "216": {
    id: "216",
    value: "185"
  },
  "217": {
    id: "217",
    value: "186"
  },
  "218": {
    id: "218",
    value: "187"
  },
  "219": {
    id: "219",
    value: "188"
  },
  "220": {
    id: "220",
    value: "189"
  },
  "221": {
    id: "221",
    value: "190"
  },
  "222": {
    id: "222",
    value: "191"
  },
  "223": {
    id: "223",
    value: "192"
  },
  "224": {
    id: "224",
    value: "193"
  },
  "225": {
    id: "225",
    value: "194"
  },
  "226": {
    id: "226",
    value: "195"
  },
  "227": {
    id: "227",
    value: "196"
  },
  "228": {
    id: "228",
    value: "197"
  },
  "229": {
    id: "229",
    value: "198"
  },
  "230": {
    id: "230",
    value: "199"
  },
  "231": {
    id: "231",
    value: "200"
  },
  "232": {
    id: "232",
    value: "yes"
  },
  "233": {
    id: "233",
    value: "no"
  },
  "234": {
    id: "234",
    value: "placeholder"
  }
};

export const questionnaire: Questionnaire = {
  id: "1",
  questions: ["1", "2", "3", "4", "5"],
  responses: {},
  title: "example"
};
