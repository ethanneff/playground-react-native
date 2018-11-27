// enum ItemType {
//   Input = "Input",
//   Checkbox = "Checkbox",
//   Radio = "Radio",
//   Switch = "Switch",
//   Slider = "Slider",
//   Button = "Button"
// }
// interface Item {
//   type: ItemType;
// }

// interface Question {
//   id: string;
//   title: string;
//   description: string;
// }

// interface Answer {
//   id: string;
//   value: string;
// }

// const questions = {
//   "1": {
//     name: "what type of counseling are you looking for?",
//     choices: ["4", "5", "6"]
//   },
//   "2": {
//     name: "what is your gender?",
//     choices: ["1", "2", "3"]
//   },
//   "3": { name: "how old are you?" },
//   "4": { name: "where do you live?" }
// };

// const answers = {
//   "1": { name: "Male" },
//   "2": { name: "Female" },
//   "3": { name: "Non-binary" },
//   "4": { name: "Individual counseling" },
//   "5": { name: "Couple counseling" },
//   "6": { name: "Teen counseling" },
//   "7": { name: "Belgium" },
//   "8": { name: "Canada" },
//   "9": { name: "Denmark" },
//   "10": { name: "France" },
//   "11": { name: "Germany" },
//   "12": { name: "Greece" },
//   "13": { name: "Iceland" },
//   "14": { name: "Italy" },
//   "15": { name: "Luxembourg" },
//   "16": { name: "Netherlands" },
//   "17": { name: "Norway" },
//   "18": { name: "Portugal" },
//   "19": { name: "Spain" },
//   "20": { name: "Turkey" },
//   "21": { name: "United Kingdom" },
//   "22": { name: "USA" },
//   "23": { name: "Israel" },
//   "24": { name: "Japan" },
//   "25": { name: "South Korea" },
//   "26": { name: "Australia" },
//   "27": { name: "New Zealand" },
//   "28": { name: "Austria" },
//   "29": { name: "Ireland" },
//   "30": { name: "Sweden" },
//   "31": { name: "Switzerland" },
//   "32": { name: "1" },
//   "33": { name: "2" },
//   "34": { name: "3" },
//   "35": { name: "4" },
//   "36": { name: "5" },
//   "37": { name: "6" },
//   "38": { name: "7" },
//   "39": { name: "8" },
//   "40": { name: "9" },
//   "41": { name: "10" },
//   "42": { name: "11" },
//   "43": { name: "12" },
//   "44": { name: "13" },
//   "45": { name: "14" },
//   "46": { name: "15" },
//   "47": { name: "16" },
//   "48": { name: "17" },
//   "49": { name: "18" },
//   "50": { name: "19" },
//   "51": { name: "20" },
//   "52": { name: "21" },
//   "53": { name: "22" },
//   "54": { name: "23" },
//   "55": { name: "24" },
//   "56": { name: "25" },
//   "57": { name: "26" },
//   "58": { name: "27" },
//   "59": { name: "28" },
//   "60": { name: "29" },
//   "61": { name: "30" },
//   "62": { name: "31" },
//   "63": { name: "32" },
//   "64": { name: "33" },
//   "65": { name: "34" },
//   "66": { name: "35" },
//   "67": { name: "36" },
//   "68": { name: "37" },
//   "69": { name: "38" },
//   "70": { name: "39" },
//   "71": { name: "40" },
//   "72": { name: "41" },
//   "73": { name: "42" },
//   "74": { name: "43" },
//   "75": { name: "44" },
//   "76": { name: "45" },
//   "77": { name: "46" },
//   "78": { name: "47" },
//   "79": { name: "48" },
//   "80": { name: "49" },
//   "81": { name: "50" },
//   "82": { name: "51" },
//   "83": { name: "52" },
//   "84": { name: "53" },
//   "85": { name: "54" },
//   "86": { name: "55" },
//   "87": { name: "56" },
//   "88": { name: "57" },
//   "89": { name: "58" },
//   "90": { name: "59" },
//   "91": { name: "60" },
//   "92": { name: "61" },
//   "93": { name: "62" },
//   "94": { name: "63" },
//   "95": { name: "64" },
//   "96": { name: "65" },
//   "97": { name: "66" },
//   "98": { name: "67" },
//   "99": { name: "68" },
//   "100": { name: "69" },
//   "101": { name: "70" },
//   "102": { name: "71" },
//   "103": { name: "72" },
//   "104": { name: "73" },
//   "105": { name: "74" },
//   "106": { name: "75" },
//   "107": { name: "76" },
//   "108": { name: "77" },
//   "109": { name: "78" },
//   "110": { name: "79" },
//   "111": { name: "80" },
//   "112": { name: "81" },
//   "113": { name: "82" },
//   "114": { name: "83" },
//   "115": { name: "84" },
//   "116": { name: "85" },
//   "117": { name: "86" },
//   "118": { name: "87" },
//   "119": { name: "88" },
//   "120": { name: "89" },
//   "121": { name: "90" },
//   "122": { name: "91" },
//   "123": { name: "92" },
//   "124": { name: "93" },
//   "125": { name: "94" },
//   "126": { name: "95" },
//   "127": { name: "96" },
//   "128": { name: "97" },
//   "129": { name: "98" },
//   "130": { name: "99" },
//   "131": { name: "100" },
//   "132": { name: "101" },
//   "133": { name: "102" },
//   "134": { name: "103" },
//   "135": { name: "104" },
//   "136": { name: "105" },
//   "137": { name: "106" },
//   "138": { name: "107" },
//   "139": { name: "108" },
//   "140": { name: "109" },
//   "141": { name: "110" },
//   "142": { name: "111" },
//   "143": { name: "112" },
//   "144": { name: "113" },
//   "145": { name: "114" },
//   "146": { name: "115" },
//   "147": { name: "116" },
//   "148": { name: "117" },
//   "149": { name: "118" },
//   "150": { name: "119" },
//   "151": { name: "120" },
//   "152": { name: "121" },
//   "153": { name: "122" },
//   "154": { name: "123" },
//   "155": { name: "124" },
//   "156": { name: "125" },
//   "157": { name: "126" },
//   "158": { name: "127" },
//   "159": { name: "128" },
//   "160": { name: "129" },
//   "161": { name: "130" },
//   "162": { name: "131" },
//   "163": { name: "132" },
//   "164": { name: "133" },
//   "165": { name: "134" },
//   "166": { name: "135" },
//   "167": { name: "136" },
//   "168": { name: "137" },
//   "169": { name: "138" },
//   "170": { name: "139" },
//   "171": { name: "140" },
//   "172": { name: "141" },
//   "173": { name: "142" },
//   "174": { name: "143" },
//   "175": { name: "144" },
//   "176": { name: "145" },
//   "177": { name: "146" },
//   "178": { name: "147" },
//   "179": { name: "148" },
//   "180": { name: "149" },
//   "181": { name: "150" },
//   "182": { name: "151" },
//   "183": { name: "152" },
//   "184": { name: "153" },
//   "185": { name: "154" },
//   "186": { name: "155" },
//   "187": { name: "156" },
//   "188": { name: "157" },
//   "189": { name: "158" },
//   "190": { name: "159" },
//   "191": { name: "160" },
//   "192": { name: "161" },
//   "193": { name: "162" },
//   "194": { name: "163" },
//   "195": { name: "164" },
//   "196": { name: "165" },
//   "197": { name: "166" },
//   "198": { name: "167" },
//   "199": { name: "168" },
//   "200": { name: "169" },
//   "201": { name: "170" },
//   "202": { name: "171" },
//   "203": { name: "172" },
//   "204": { name: "173" },
//   "205": { name: "174" },
//   "206": { name: "175" },
//   "207": { name: "176" },
//   "208": { name: "177" },
//   "209": { name: "178" },
//   "210": { name: "179" },
//   "211": { name: "180" },
//   "212": { name: "181" },
//   "213": { name: "182" },
//   "214": { name: "183" },
//   "215": { name: "184" },
//   "216": { name: "185" },
//   "217": { name: "186" },
//   "218": { name: "187" },
//   "219": { name: "188" },
//   "220": { name: "189" },
//   "221": { name: "190" },
//   "222": { name: "191" },
//   "223": { name: "192" },
//   "224": { name: "193" },
//   "225": { name: "194" },
//   "226": { name: "195" },
//   "227": { name: "196" },
//   "228": { name: "197" },
//   "229": { name: "198" },
//   "230": { name: "199" },
//   "231": { name: "200" },
//   "232": { name: "yes" },
//   "233": { name: "no" }
// };

// const questionaires = {
//   "1": {
//     name: "betterhelp",
//     questions: {
//       "1": {
//         title: "why type of counseling are you looking for?",
//         type: "button",
//         choices: {
//           "1": {
//             title: "individual counseling"
//           },
//           "2": {
//             title: "couple counseling"
//           },
//           "3": {
//             title: "teen counseling"
//           }
//         }
//       },
//       "2": {
//         title: "what is your gender?",
//         type: "button",
//         choices: {
//           "1": {
//             title: "male"
//           },
//           "2": {
//             title: "female"
//           },
//           "3": {
//             title: "non-binary"
//           }
//         }
//       },
//       "3": {
//         title: "how old are you?",
//         type: "select",
//         choices: {
//           "1": {
//             title: "13"
//           },
//           "2": {
//             title: "14"
//           },
//           "3": {
//             title: "15"
//           }
//         }
//       },
//       "4": {
//         title: "feeling tired or having little energy?",
//         description:
//           "over the past 2 weeks, how often have you been bothered by any of the following problems",
//         type: "button",
//         choices: {
//           "1": {
//             title: "not at all"
//           },
//           "2": {
//             title: "several days"
//           },
//           "3": {
//             title: "more than half the days"
//           },
//           "4": {
//             title: "nearly every day"
//           }
//         }
//       }
//     }
//   },
//   "2": {
//     name: "net promoter score"
//   }
// };

// const result = {
//   questionaire: "1",
//   responses: {
//     "1": "2",
//     "13": "42"
//   }
// };

import * as React from "react";
export class Questionnaire extends React.PureComponent {
  public render() {
    return <></>;
  }
}
