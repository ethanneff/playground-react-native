export const bob = 1;
// const determinePhrases = sentence => {
// 	const types = {
// 		bold: true,
// 		italics: true,
// 		strike: true,
// 		code: true
// 	};

// 	const SYNTAX = {
// 		_: types.bold,
// 		"*": types.italics,
// 		"~": types.strike,
// 		"`": types.code
// 	};

// 	// go backwards
// 	// character by character
// 	// add to object array
// 	// if syntax, then loop
// 	// save indexes
// 	// if end of loop, update object array
// 	// go back to previous index

// 	const syntaxFound = {}; // all letters and their syntax
// 	const syntaxConfrim = [];

// 	// needs space or opposite syntax on either size
// 	const isSyntax = current => SYNTAX[current];

// 	const isSyntax2 = index => {
// 		if (index <= 0 || index >= syntaxConfrim.length - 1) {
// 			return true;
// 		}
// 		const left = syntaxConfrim[index - 1].c;
// 		const mid = syntaxConfrim[index].c;
// 		const right = syntaxConfrim[index + 1].c;

// 		const middleIsSyntax = SYNTAX[mid];
// 		const neighborsNotBothSpace = left === " " && right === " ";
// 		const neighborNotSameSyntax =
// 			SYNTAX[mid] === SYNTAX[left] || SYNTAX[mid] === SYNTAX[right];
// 		return (
// 			middleIsSyntax && !neighborNotSameSyntax && !neighborsNotBothSpace
// 		);
// 	};

// 	for (let i = 0; i < sentence.length; i++) {
// 		const current = sentence[i];
// 		syntaxConfrim.push({ c: current });
// 		if (isSyntax(current)) {
// 			// issyntax2
// 			if ([current] >= 0) {
// 				// goes back until find previous
// 				for (let j = syntaxFound[current]; j <= i; j++) {
// 					if (isSyntax(syntaxConfrim[j].c)) {
// 						// issyntax2
// 						// set all
// 						syntaxConfrim[j].d = true;
// 					} else {
// 						syntaxConfrim[j][current] = true;
// 					}
// 				}
// 				delete syntaxFound[current];
// 			}
// 		}
// 	}
// 	console.log(syntaxConfrim);
// };

// // determinePhrases(
// // 	"*bold* notbold ** notbold *bold bold bold* notbold  *bold~* notbold *bold bold *~ notbold **notbold** ~*boldstriek*~ normal ~*boldstrike*  strike strike~ * notbold * * *~_ adoiasn doan *oad _~ asda* "
// // );

// determinePhrases(
// 	"*bold _in talic_ *notbold ~_*all*_~ _okay ** ~strike~ _not_italic_"
// );

// // determinePhrases("*bold _in talic_ *notbold ~_*all*_~ _okay ** ~strike~");

// // determinePhrase("_not*bold_*  _is *bold_*");
