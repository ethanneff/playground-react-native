import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Screen, Text} from '../../../components';
import {ScrollView} from '../../../conversions';
import {useColor} from '../../../features';
import {combinations, reels} from './config';
import {Slots} from './Slots';
import {
  getRandomReelArrays,
  getReturnPercentage,
  getWinPercentage,
} from './utils';

const winPercentage = (getWinPercentage(combinations, reels) * 100).toFixed(2);
const returnPercentage = (
  getReturnPercentage(combinations, reels) * 100
).toFixed(2);

const getInitialState = () => ({
  tokens: 14,
  spinning: false,
  active: reels.map(() => 0),
  reels: getRandomReelArrays(reels),
});

export const SlotMachine = memo(function PlaygroundSlotMachine() {
  const color = useColor();
  const {goBack} = useNavigation();

  const [state, setState] = useState(() => getInitialState());
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background.primaryA,
    },
  });

  const onSpin = useCallback(() => {
    setState(p => ({...p, spinning: true}));
  }, []);

  return (
    <Screen onLeftPress={goBack} title="Slot Machine">
      <ScrollView style={styles.container}>
        <Text title={`win percentage: ${winPercentage}%`} />
        <Text title={`return percentage: ${returnPercentage}%`} />
        <Text title={`${state}`} />

        <Button onPress={onSpin} title="spin" />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Slots
          combinations={{
            '🍓🍓🍓': 200,
            '🍇🍇🍇': 100,
            '🍉🍉🍉': 100,
            '🍉🍉🍇': 100,
            '🥭🥭🥭': 18,
            '🥭🥭🍇': 18,
            '🍏🍏🍏': 14,
            '🍏🍏🍇': 14,
            '🍊🍊🍊': 10,
            '🍊🍊🍇': 10,
            '🍒🍒🍒': 8,
            '🍒🍒': 5,
            '🍒': 2,
          }}
          credits={20}
          randomize
          reels={[
            '🍓🍇🍉🍉🥭🥭🥭🥭🥭🍏🍏🍏🍏🍏🍊🍊🍊🍊🍊🍒🍒🍒🍒🍋🍋',
            '🍓🍇🍇🍉🍉🥭🥭🥭🍏🍏🍏🍊🍊🍊🍊🍊🍒🍒🍒🍒🍒🍒🍒🍋🍋',
            '🍓🍇🍉🍉🥭🥭🥭🥭🍏🍏🍊🍊🍊🍊🍊🍒🍒🍒🍒🍒🍋🍋🍋🍋🍋',
          ]}
        />
      </ScrollView>
    </Screen>
  );
});

// var WinningSound = () => {
//   return (
//     <audio autoPlay="autoplay" className="player" preload="false">
//       <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
//     </audio>
//   );
// };

// class App extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       winner: null,
//     };
//     this.finishHandler = this.finishHandler.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     this.setState({winner: null});
//     this.emptyArray();
//     this._child1.forceUpdateHandler();
//     this._child2.forceUpdateHandler();
//     this._child3.forceUpdateHandler();
//   }

//   static loser = [
//     'Not quite',
//     'Stop gambling',
//     'Hey, you lost!',
//     'Ouch! I felt that',
//     "Don't beat yourself up",
//     'There goes the college fund',
//     'I have a cat. You have a loss',
//     "You're awesome at losing",
//     'Coding is hard',
//     "Don't hate the coder",
//   ];

//   static matches = [];

//   finishHandler(value) {
//     App.matches.push(value);

//     if (App.matches.length === 3) {
//       const {winner} = this.state;
//       const first = App.matches[0];
//       let results = App.matches.every((match) => match === first);
//       this.setState({winner: results});
//     }
//   }

//   emptyArray() {
//     App.matches = [];
//   }

//   render() {
//     return (
//       <>
//         <View className="spinner-container">
//           <Spinner
//             onFinish={this.finishHandler}
//             ref={(child) => {
//               this._child1 = child;
//             }}
//             timer="1000"
//           />
//           <Spinner
//             onFinish={this.finishHandler}
//             ref={(child) => {
//               this._child2 = child;
//             }}
//             timer="1400"
//           />
//           <Spinner
//             onFinish={this.finishHandler}
//             ref={(child) => {
//               this._child3 = child;
//             }}
//             timer="2200"
//           />
//         </View>
//         <Button onClick={this.handleClick} title="repeatButton" />
//       </>
//     );
//   }
// }

// class Spinner extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
//   }

//   forceUpdateHandler() {
//     this.reset();
//   }

//   reset() {
//     if (this.timer) {
//       clearInterval(this.timer);
//     }

//     this.start = this.setStartPosition();

//     this.setState({
//       position: this.start,
//       timeRemaining: this.props.timer,
//     });

//     this.timer = setInterval(() => {
//       this.tick();
//     }, 100);
//   }

//   state = {
//     position: 0,
//     lastPosition: null,
//   };
//   static iconHeight = 188;
//   multiplier = Math.floor(Math.random() * (4 - 1) + 1);

//   start = this.setStartPosition();
//   speed = Spinner.iconHeight * this.multiplier;

//   setStartPosition() {
//     return Math.floor(Math.random() * 9) * Spinner.iconHeight * -1;
//   }

//   moveBackground() {
//     this.setState({
//       position: this.state.position - this.speed,
//       timeRemaining: this.state.timeRemaining - 100,
//     });
//   }

//   getSymbolFromPosition() {
//     let {position} = this.state;
//     const totalSymbols = 9;
//     const maxPosition = Spinner.iconHeight * (totalSymbols - 1) * -1;
//     let moved = (this.props.timer / 100) * this.multiplier;
//     let startPosition = this.start;
//     let currentPosition = startPosition;

//     for (let i = 0; i < moved; i++) {
//       currentPosition -= Spinner.iconHeight;

//       if (currentPosition < maxPosition) {
//         currentPosition = 0;
//       }
//     }

//     this.props.onFinish(currentPosition);
//   }

//   tick() {
//     if (this.state.timeRemaining <= 0) {
//       clearInterval(this.timer);
//       this.getSymbolFromPosition();
//     } else {
//       this.moveBackground();
//     }
//   }

//   componentDidMount() {
//     clearInterval(this.timer);

//     this.setState({
//       position: this.start,
//       timeRemaining: this.props.timer,
//     });

//     this.timer = setInterval(() => {
//       this.tick();
//     }, 100);
//   }

//   render() {
//     let {position, current} = this.state;

//     return (
//       <View
//         className="icons"
//         style={{backgroundPosition: '0px ' + position + 'px'}}
//       />
//     );
//   }
// }

// // (function ($) {
// //   var slotMachine = (function () {
// //     var credits = 15,
// //       spinning = 3,
// //       spin = [0, 0, 0],
// //       slotsTypes = {
// //         🍒: [2, 5, 10],
// //         🍊: [0, 15, 30],
// //         🍐: [0, 40, 50],
// //         🔔: [0, 50, 80],
// //         🍋: [0, 0, 100],
// //         🥝: [0, 0, 150],
// //         🍉: [0, 0, 250],
// //         🍍: [0, 0, 500],
// //         anybar: [0, 0, 80],
// //       },
// //       slots = [
// //         [
// //           '🍊',
// //           '🔔',
// //           '🍊',
// //           '🥝',
// //           '🍐',
// //           '🍊',
// //           '🍉',
// //           '🍐',
// //           '🍊',
// //           '🍋',
// //           '🔔',
// //           '🍒',
// //           '🍊',
// //           '🍐',
// //           '🔔',
// //           '🍋',
// //           '🍒',
// //           '🍍',
// //           '🍊',
// //           '🍐',
// //           '🍊',
// //           '🔔',
// //           '🍊',
// //         ],
// //         [
// //           '🍒',
// //           '🍐',
// //           '🍊',
// //           '🔔',
// //           '🍋',
// //           '🍒',
// //           '🍐',
// //           '🍉',
// //           '🍒',
// //           '🔔',
// //           '🍊',
// //           '🍋',
// //           '🍍',
// //           '🍒',
// //           '🥝',
// //           '🍒',
// //           '🔔',
// //           '🍐',
// //           '🍒',
// //           '🍊',
// //           '🍒',
// //           '🍐',
// //           '🍊',
// //         ],
// //         [
// //           '🍒',
// //           '🍊',
// //           '🔔',
// //           '🍐',
// //           '🥝',
// //           '🍒',
// //           '🍐',
// //           '🍊',
// //           '🍉',
// //           '🍒',
// //           '🔔',
// //           '🍊',
// //           '🍒',
// //           '🍊',
// //           '🍒',
// //           '🍐',
// //           '🍋',
// //           '🍍',
// //           '🔔',
// //           '🍒',
// //           '🍒',
// //           '🍊',
// //           '🔔',
// //         ],
// //       ],
// //       startSlot = function () {
// //         spinning = false;

// //         $('#slot-trigger').removeClass('slot-triggerDisabled');

// //         this.blur();

// //         return false;
// //       },
// //       endSlot = function () {
// //         $('#slot-block').show();
// //         $('#slot-credits').text('VERLOREN!!!');

// //         setInterval(blink($('#slot-credits')), 1000);
// //       },
// //       addCredit = function (incrementCredits) {
// //         var currentCredits = credits;
// //         credits += incrementCredits;

// //         blink($('#slot-credits'));

// //         $('#slot-credits')
// //           .css('credit', 0)
// //           .animate(
// //             {
// //               credit: incrementCredits,
// //             },
// //             {
// //               duration: 400 + incrementCredits,
// //               easing: 'easeOut',
// //               step: function (now) {
// //                 $(this).html(parseInt(currentCredits + now, 10));
// //               },
// //               complete: function () {
// //                 $(this).html(credits);
// //                 blink($('#slot-credits'));
// //               },
// //             },
// //           );
// //       },
// //       spin = function () {
// //         this.blur();

// //         if (spinning == false) {
// //           $('#slot-machine .arm').animate({top: '45px', height: '2%'});
// //           $('#slot-machine .arm .knob').animate({top: '-20px', height: '20px'});
// //           $('#slot-machine .arm-shadow').animate({top: '40px'}, 380);
// //           $(
// //             '#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow',
// //           ).animate({top: '50%', opacity: 1});

// //           spinning = 3;
// //           credits--;

// //           $('#slot-credits').html(credits);

// //           spin[0] = parseInt(Math.random() * 23);
// //           spin[1] = parseInt(Math.random() * 23);
// //           spin[2] = parseInt(Math.random() * 23);

// //           $('#slot-trigger').addClass('slot-triggerDisabled');

// //           $('img.slotSpinAnimation').show();

// //           $('#wheel1 img:first').css('top', -(spin[0] * 44 + 16) + 'px');
// //           $('#wheel2 img:first').css('top', -(spin[1] * 44 + 16) + 'px');
// //           $('#wheel3 img:first').css('top', -(spin[2] * 44 + 16) + 'px');

// //           setTimeout(function () {
// //             $('#slot-machine .arm').animate({
// //               top: '-25px',
// //               height: '50%',
// //               overflow: 'visible',
// //             });
// //             $('#slot-machine .arm .knob').animate({
// //               top: '-15px',
// //               height: '16px',
// //             });
// //             $('#slot-machine .arm-shadow').animate({top: '13px'});
// //             $(
// //               '#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow',
// //             ).animate({top: '0', opacity: 0});
// //           }, 500);

// //           setTimeout(function () {
// //             stopSpin(1);
// //           }, 1500 + parseInt(1500 * Math.random()));

// //           setTimeout(function () {
// //             stopSpin(2);
// //           }, 1500 + parseInt(1500 * Math.random()));

// //           setTimeout(function () {
// //             stopSpin(3);
// //           }, 1500 + parseInt(1500 * Math.random()));
// //         }

// //         return false;
// //       },
// //       stopSpin = function (slot) {
// //         $('#wheel' + slot)
// //           .find('img:last')
// //           .hide()
// //           .end()
// //           .find('img:first')
// //           .animate(
// //             {
// //               top: -spin[slot - 1] * 44,
// //             },
// //             {
// //               duration: 500,
// //               easing: 'elasticOut',
// //               complete: function () {
// //                 spinning--;

// //                 if (spinning <= 0) {
// //                   endSpin();
// //                 }
// //               },
// //             },
// //           );
// //       },
// //       endSpin = function () {
// //         var slotType = slots[0][spin[0]],
// //           matches = 1,
// //           barMatch = /bar/.test(slotType) ? 1 : 0,
// //           winnedCredits = 0,
// //           waitToSpin = 10;

// //         if (slotType == slots[1][spin[1]]) {
// //           matches++;

// //           if (slotType == slots[2][spin[2]]) {
// //             matches++;
// //           } else if (barMatch != 0 && /bar/.test(slots[2][spin[2]])) {
// //             barMatch++;
// //           }
// //         } else if (barMatch != 0 && /bar/.test(slots[1][spin[1]])) {
// //           barMatch++;

// //           if (/bar/.test(slots[2][spin[2]])) {
// //             barMatch++;
// //           }
// //         }

// //         if (matches != 3 && barMatch == 3) {
// //           slotType = 'anybar';
// //           matches = 3;
// //         }

// //         var winnedCredits = slotsTypes[slotType][matches - 1];

// //         if (winnedCredits > 0) {
// //           addCredit(winnedCredits);
// //           waitToSpin = 410 + winnedCredits;
// //         }

// //         setTimeout(function () {
// //           if (credits == 0) {
// //             endSlot();
// //           } else {
// //             $('#slot-trigger').removeClass('slot-triggerDisabled');
// //             spinning = false;
// //           }
// //         }, waitToSpin);
// //       };
// //     return {
// //       init: function () {
// //         startSlot();

// //         $('#slot-trigger')
// //           .bind('mousedown', function () {
// //             $(this).addClass('slot-triggerDown');
// //           })
// //           .bind('click', spin);

// //         $(document).bind('mouseup', function () {
// //           $('#slot-trigger').removeClass('slot-triggerDown');
// //         });

// //         $('#wheel1 img:first').css(
// //           'top',
// //           -(parseInt(Math.random() * 23) * 44) + 'px',
// //         );
// //         $('#wheel2 img:first').css(
// //           'top',
// //           -(parseInt(Math.random() * 23) * 44) + 'px',
// //         );
// //         $('#wheel3 img:first').css(
// //           'top',
// //           -(parseInt(Math.random() * 23) * 44) + 'px',
// //         );
// //       },
// //     };
// //   })();

// //   $.extend($.easing, {
// //     bounceOut: function (x, t, b, c, d) {
// //       if ((t /= d) < 1 / 2.75) {
// //         return c * (7.5625 * t * t) + b;
// //       } else if (t < 2 / 2.75) {
// //         return c * (7.5625 * (t -= 1.5 / 2.75) * t + 00.75) + b;
// //       } else if (t < 2.5 / 2.75) {
// //         return c * (7.5625 * (t -= 2.25 / 2.75) * t + 00.9375) + b;
// //       } else {
// //         return c * (7.5625 * (t -= 2.625 / 2.75) * t + 00.984375) + b;
// //       }
// //     },
// //     easeOut: function (x, t, b, c, d) {
// //       return -c * (t /= d) * (t - 2) + b;
// //     },
// //     elasticOut: function (x, t, b, c, d) {
// //       var s = 1.70158;
// //       var p = 0;
// //       var a = c;
// //       if (t == 0) return b;
// //       if ((t /= d) == 1) return b + c;
// //       if (!p) p = d * 00.3;
// //       if (a < Math.abs(c)) {
// //         a = c;
// //         var s = p / 4;
// //       } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
// //       return (
// //         a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
// //         c +
// //         b,
// //       );
// //     },
// //   });

// //   $(document).ready(slotMachine.init);
// // })(jQuery);

// // function blink(element) {
// //   element.animate({opacity: 0}, 200, 'linear', function () {
// //     $(this).animate({opacity: 1}, 200);
// //   });
// // }
