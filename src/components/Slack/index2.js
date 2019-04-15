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

// 	const syntaxConfrim = []; // character:syntax
// 	const syntaxFound = {}; // syntax:index

// 	// needs space or opposite syntax on either size
// 	const isSyntax = current => SYNTAX[current];

// 	const isSyntax2 = (sentence, index) => {
// 		if (index <= 0 || index >= sentence.length - 1) {
// 			return true;
// 		}
// 		const left = sentence[index - 1];
// 		const mid = sentence[index];
// 		const right = sentence[index + 1];

// 		const middleIsSyntax = SYNTAX[mid];

// 		const neighborsNotBothSpace = left === " " && right === " ";
// 		const neighborNotSameSyntax =
// 			SYNTAX[mid] === SYNTAX[left] || SYNTAX[mid] === SYNTAX[right];
// 		return (
// 			middleIsSyntax && !neighborNotSameSyntax && !neighborsNotBothSpace
// 		);
// 	};

// 	// NEXT
// 	// char by char
// 	// if initial syntax (char or other syntax left), find ending syntax (char or other syntax left, no same syntax = break)
// 	// if find, update all previous char
// 	// go back to next char

// 	// character by character
// 	for (let i = 0; i < sentence.length; i++) {
// 		const current = sentence[i];
// 		// add each character by syntax object
// 		syntaxConfrim.push({ c: current });
// 		// is syntax
// 		if (isSyntax(current)) {
// 			// if previously found
// 			const previousSyntaxLocation = syntaxFound[current];
// 			if (previousSyntaxLocation >= 0) {
// 				//
// 				for (let j = previousSyntaxLocation; j <= i; j++) {
// 					if (isSyntax(syntaxConfrim[j].c)) {
// 						syntaxConfrim[j].d = true;
// 					} else {
// 						syntaxConfrim[j][current] = true;
// 					}
// 				}
// 				delete syntaxFound[current];
// 			} else {
// 				syntaxFound[current] = i;
// 			}
// 		}
// 	}
// 	console.log(syntaxConfrim);
// };

// // determinePhrases(
// // 	"*bold* notbold ** notbold *bold bold bold* notbold  *bold~* notbold *bold bold *~ notbold **notbold** ~*boldstriek*~ normal ~*boldstrike*  strike strike~ * notbold * * *~_ adoiasn doan *oad _~ asda* "
// // );

// // determinePhrases(
// // 	"*bold _in talic_ *notbold ~_*all*_~ _okay ** ~strike~ _not_italic_"
// // );

// // determinePhrases("*bold _in talic_ *notbold ~_*all*_~ _okay ** ~strike~");

// determinePhrases("*yes yes* | **no** | *no * * ** *** | *yes* | no* *no ");
// determinePhrases("_yes *yes_* | _no*no_*");
// determinePhrases("_do nothing | _italic *bold_*");
