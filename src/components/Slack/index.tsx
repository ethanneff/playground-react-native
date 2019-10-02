import React from "react";
import { View } from "react-native";

export function Slack() {
  return <View />;
}

// // todo
// // make sure tests pass
// // make sure new tests pass
// // update code color
// // add code section
// // add bullets
// // add numbers
// // split based on /n

// class SlackController {
//   constructor(sentence) {
//     this.sentence = sentence;
//     this.syntaxTypes = {
//       bold: true,
//       italics: true,
//       strike: true,
//       code: true
//     };
//     this.syntax = {
//       _: this.syntaxTypes.bold,
//       "*": this.syntaxTypes.italics,
//       "~": this.syntaxTypes.strike,
//       "`": this.syntaxTypes.code
//     };
//     this.characters = [];
//   }

//   render() {
//     console.log(this.sentence);

//     for (let i = 0; i < this.sentence.length; i++) {
//       const ch = this.sentence[i];
//       this._updateCharacters(i);
//       if (!this._isLeading(i)) continue;
//       this.characters[i].leading = true;
//       for (let j = i + 1; j < this.sentence.length; j++) {
//         this._updateCharacters(j);
//         if (!this._isTrailing(i, j)) continue;
//         if (this._isDeleted(j)) continue;
//         this.characters[j].trailing = true;
//         this.characters[i].deleted = true;
//         this.characters[j].deleted = true;
//         for (let k = i + 1; k < j; k++) {
//           if (this.characters[k].deleted) continue;
//           this.characters[k][ch] = true;
//         }
//       }
//     }
//     return this.characters;
//     console.log(this.characters);
//   }

//   _isDeleted(j) {
//     return this.characters[j] ? this.characters[j].deleted : false;
//   }

//   _updateCharacters(i) {
//     this.characters[i] = Object.assign({}, this.characters[i], {
//       i,
//       ch: this.sentence[i]
//     });
//   }

//   _updateInBetween() {
//     for (let k = i + 1; j < this.sentence.length; j++) {
//       this.characters[i].deleted = true;
//       this.characters[j].deleted = true;
//       for (let k = i + 1; k < j; k++) {
//         this.characters[k][ch] = true;
//       }
//     }
//   }

//   _isLeading(i) {
//     if (this.sentence.length < 2 || i >= this.sentence.length - 1) {
//       return false;
//     }
//     const current = this.sentence[i];
//     if (!this.syntax[current]) {
//       return false;
//     }
//     if (i < 1) {
//       return true;
//     }
//     const prev = this.sentence[i - 1];
//     const next = this.sentence[i + 1];
//     if (this.sentence[i - 1] !== " ") {
//       return false;
//     }
//     if (prev === " " && next === " ") {
//       return false;
//     }
//     if (current === next) {
//       return false;
//     }
//     return true;
//   }

//   _isTrailing(i, j) {
//     // last char, space afterwards, syntax afterwards
//     const match = this.sentence[i];
//     const current = this.sentence[j];
//     const next = this.sentence[j + 1];
//     if (match !== current) {
//       return false;
//     }
//     if (i >= this.sentence.length - 1) {
//       return true;
//     }
//     if (next === " ") {
//       return true;
//     }
//     if (this.syntax[next] && next !== current) {
//       return true;
//     }

//     return false;
//   }
// }

// module.exports = SlackController;

// // const determinePhrases = sentence => {
// //   const types = {
// //     bold: true,
// //     italics: true,
// //     strike: true,
// //     code: true
// //   };

// //   const SYNTAX = {
// //     _: types.bold,
// //     "*": types.italics,
// //     "~": types.strike,
// //     "`": types.code
// //   };

// //   const isLeading = (sentence, i) => {
// //     if (sentence.length < 2 || i >= sentence.length - 1) {
// //       return false;
// //     }
// //     const current = sentence[i];
// //     if (!SYNTAX[current]) {
// //       return false;
// //     }
// //     if (i < 1) {
// //       return true;
// //     }
// //     const prev = sentence[i - 1];
// //     const next = sentence[i + 1];
// //     if (sentence[i - 1] !== " ") {
// //       return false;
// //     }
// //     if (SYNTAX[prev] && !prev.deleted) {
// //       return false;
// //     }
// //     if (prev === " " && next === " ") {
// //       return false;
// //     }
// //     if (current === next) {
// //       return false;
// //     }
// //     return true;
// //   };

// //   const isTrailing = i => {
// //     if (i >= sentence.length - 1) {
// //       return true;
// //     }
// //     if (sentence[i + 1] === " ") {
// //       return true;
// //     }
// //     if (newSentence[i + 1].deleted) {
// //       return true;
// //     }
// //     return false;
// //   };
// //   // console.log(newSentence);

// //   // needs space or opposite syntax on either size
// //   const isSyntax = current => SYNTAX[current];

// //   // NEXT
// //   // char by char
// //   // if initial syntax (char or other syntax left), find ending syntax (char or other syntax left, no same syntax = break)
// //   // if find, update all previous char
// //   // go back to next char

// //   // character by character
// //   const newSentence = [];
// //   for (let i = 0; i < sentence.length; i++) {
// //     const ch = sentence[i];
// //     newSentence.push({ ch });
// //   }

// //   for (let i = 0; i < newSentence.length; i++) {
// //     console.log(sentence[i], isLeading(i));

// //     // const left = newSentence[i].ch;
// //     // const next = newSentence[i + 1].ch;
// //     // if (SYNTAX[left] && left !== next && next !== " ") {
// //     //   // search
// //     //   for (let j = i + 1; j < newSentence.length; j++) {
// //     //     const right = newSentence[j].ch;
// //     //     const prev = newSentence[j - 1].ch;
// //     //     if (left === right) {
// //     //       if (left !== prev && prev !== " ") {
// //     //         // update
// //     //         newSentence[i].delete = true;
// //     //         newSentence[j].delete = true;
// //     //         for (let k = i + 1; k < j; k++) {
// //     //           newSentence[k][left] = true;
// //     //         }
// //     //       } else {
// //     //         break;
// //     //       }
// //     //     }
// //     //   }
// //     // }
// //   }
// // };

// // determinePhrases(
// //   "*bold* notbold ** notbold *bold bold bold* notbold  *bold~* notbold *bold bold *~ notbold **notbold** ~*boldstriek*~ normal ~*boldstrike*  strike strike~ * notbold * * *~_ adoiasn doan *oad _~ asda* "
// // );

// // determinePhrases(
// //  "*bold _in talic_ *notbold ~_*all*_~ _okay ** ~strike~ _not_italic_"
// // );

// // determinePhrases("*bold _in talic_ *notbold ~_*all*_~ _okay ** ~strike~");

// // determinePhrases(
// //   "*yes yes* | **no** | *no * * ** *** | *yes* | no* *no  ~_yes_~"
// // );
// // determinePhrases("_yes *yes_* | _no*no_*");

// const a = new SlackController(`_do nothing | _italic *bold_* `).render();

// console.log(a);

// //*bold _in talic_ *notbold ~_*all*_~ _okay ** ~strike~ _not_italic_
// // determinePhrases("_do nothing | _italic *bold_* ");
// // determinePhrases(" ");
// // determinePhrases(" *");
// // determinePhrases("*");

// // write jest for isLeading
