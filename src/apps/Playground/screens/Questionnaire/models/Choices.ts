import {ActionType, createAction} from 'typesafe-actions';
import {RootAction} from '../../../../../containers';

/* ACTIONS */
export const createChoice = createAction('choices/CREATE')<Choice>();
export const updateChoice = createAction('choices/UPDATE')<Choice>();
export const removeChoice = createAction('choices/REMOVE')<string>();

/* INTERFACES */
interface Choice {
  id: string;
  display: string;
  value?: number;
}

export interface Choices {
  [id: string]: Choice;
}

export type ChoicesActions = ActionType<
  typeof createChoice | typeof updateChoice | typeof removeChoice
>;

/* REDUCERS */
export const choicesInitialState: Choices = {
  '001': {
    display: 'Male',
    id: '001',
  },
  '002': {
    display: 'Female',
    id: '002',
  },
  '003': {
    display: 'Non-binary',
    id: '003',
  },
  '004': {
    display: 'Individual counseling',
    id: '004',
  },
  '005': {
    display: 'Couple counseling',
    id: '005',
  },
  '006': {
    display: 'Teen counseling',
    id: '006',
  },
  '007': {
    display: 'Belgium',
    id: '007',
  },
  '008': {
    display: 'Canada',
    id: '008',
  },
  '009': {
    display: 'Denmark',
    id: '009',
  },
  '010': {
    display: 'France',
    id: '010',
  },
  '011': {
    display: 'Germany',
    id: '011',
  },
  '012': {
    display: 'Greece',
    id: '012',
  },
  '013': {
    display: 'Iceland',
    id: '013',
  },
  '014': {
    display: 'Italy',
    id: '014',
  },
  '015': {
    display: 'Luxembourg',
    id: '015',
  },
  '016': {
    display: 'Netherlands',
    id: '016',
  },
  '017': {
    display: 'Norway',
    id: '017',
  },
  '018': {
    display: 'Portugal',
    id: '018',
  },
  '019': {
    display: 'Spain',
    id: '019',
  },
  '020': {
    display: 'Turkey',
    id: '020',
  },
  '021': {
    display: 'United Kingdom',
    id: '021',
  },
  '022': {
    display: 'USA',
    id: '022',
  },
  '023': {
    display: 'Israel',
    id: '023',
  },
  '024': {
    display: 'Japan',
    id: '024',
  },
  '025': {
    display: 'South Korea',
    id: '025',
  },
  '026': {
    display: 'Australia',
    id: '026',
  },
  '027': {
    display: 'New Zealand',
    id: '027',
  },
  '028': {
    display: 'Austria',
    id: '028',
  },
  '029': {
    display: 'Ireland',
    id: '029',
  },
  '030': {
    display: 'Sweden',
    id: '030',
  },
  '031': {
    display: 'Switzerland',
    id: '031',
  },
  '032': {
    display: '1',
    id: '032',
    value: 1,
  },
  '033': {
    display: '2',
    id: '033',
    value: 2,
  },
  '034': {
    display: '3',
    id: '034',
    value: 3,
  },
  '035': {
    display: '4',
    id: '035',
    value: 4,
  },
  '036': {
    display: '5',
    id: '036',
    value: 5,
  },
  '037': {
    display: '6',
    id: '037',
    value: 6,
  },
  '038': {
    display: '7',
    id: '038',
    value: 7,
  },
  '039': {
    display: '8',
    id: '039',
    value: 8,
  },
  '040': {
    display: '9',
    id: '040',
    value: 9,
  },
  '041': {
    display: '10',
    id: '041',
    value: 10,
  },
  '042': {
    display: '11',
    id: '042',
    value: 11,
  },
  '043': {
    display: '12',
    id: '043',
    value: 12,
  },
  '044': {
    display: '13',
    id: '044',
    value: 13,
  },
  '045': {
    display: '14',
    id: '045',
    value: 14,
  },
  '046': {
    display: '15',
    id: '046',
    value: 15,
  },
  '047': {
    display: '16',
    id: '047',
    value: 16,
  },
  '048': {
    display: '17',
    id: '048',
    value: 17,
  },
  '049': {
    display: '18',
    id: '049',
    value: 18,
  },
  '050': {
    display: '19',
    id: '050',
    value: 19,
  },
  '051': {
    display: '20',
    id: '051',
    value: 20,
  },
  '052': {
    display: '21',
    id: '052',
    value: 21,
  },
  '053': {
    display: '22',
    id: '053',
    value: 22,
  },
  '054': {
    display: '23',
    id: '054',
    value: 23,
  },
  '055': {
    display: '24',
    id: '055',
    value: 24,
  },
  '056': {
    display: '25',
    id: '056',
    value: 25,
  },
  '057': {
    display: '26',
    id: '057',
    value: 26,
  },
  '058': {
    display: '27',
    id: '058',
    value: 27,
  },
  '059': {
    display: '28',
    id: '059',
    value: 28,
  },
  '060': {
    display: '29',
    id: '060',
    value: 29,
  },
  '061': {
    display: '30',
    id: '061',
    value: 30,
  },
  '062': {
    display: '31',
    id: '062',
    value: 31,
  },
  '063': {
    display: '32',
    id: '063',
    value: 32,
  },
  '064': {
    display: '33',
    id: '064',
    value: 33,
  },
  '065': {
    display: '34',
    id: '065',
    value: 34,
  },
  '066': {
    display: '35',
    id: '066',
    value: 35,
  },
  '067': {
    display: '36',
    id: '067',
    value: 36,
  },
  '068': {
    display: '37',
    id: '068',
    value: 37,
  },
  '069': {
    display: '38',
    id: '069',
    value: 38,
  },
  '070': {
    display: '39',
    id: '070',
    value: 39,
  },
  '071': {
    display: '40',
    id: '071',
    value: 40,
  },
  '072': {
    display: '41',
    id: '072',
    value: 41,
  },
  '073': {
    display: '42',
    id: '073',
    value: 42,
  },
  '074': {
    display: '43',
    id: '074',
    value: 43,
  },
  '075': {
    display: '44',
    id: '075',
    value: 44,
  },
  '076': {
    display: '45',
    id: '076',
    value: 45,
  },
  '077': {
    display: '46',
    id: '077',
    value: 46,
  },
  '078': {
    display: '47',
    id: '078',
    value: 47,
  },
  '079': {
    display: '48',
    id: '079',
    value: 48,
  },
  '080': {
    display: '49',
    id: '080',
    value: 49,
  },
  '081': {
    display: '50',
    id: '081',
    value: 50,
  },
  '082': {
    display: '51',
    id: '082',
    value: 51,
  },
  '083': {
    display: '52',
    id: '083',
    value: 52,
  },
  '084': {
    display: '53',
    id: '084',
    value: 53,
  },
  '085': {
    display: '54',
    id: '085',
    value: 54,
  },
  '086': {
    display: '55',
    id: '086',
    value: 55,
  },
  '087': {
    display: '56',
    id: '087',
    value: 56,
  },
  '088': {
    display: '57',
    id: '088',
    value: 57,
  },
  '089': {
    display: '58',
    id: '089',
    value: 58,
  },
  '090': {
    display: '59',
    id: '090',
    value: 59,
  },
  '091': {
    display: '60',
    id: '091',
    value: 60,
  },
  '092': {
    display: '61',
    id: '092',
    value: 61,
  },
  '093': {
    display: '62',
    id: '093',
    value: 62,
  },
  '094': {
    display: '63',
    id: '094',
    value: 63,
  },
  '095': {
    display: '64',
    id: '095',
    value: 64,
  },
  '096': {
    display: '65',
    id: '096',
    value: 65,
  },
  '097': {
    display: '66',
    id: '097',
    value: 66,
  },
  '098': {
    display: '67',
    id: '098',
    value: 67,
  },
  '099': {
    display: '68',
    id: '099',
    value: 68,
  },
  '100': {
    display: '69',
    id: '100',
    value: 69,
  },
  '101': {
    display: '70',
    id: '101',
    value: 70,
  },
  '102': {
    display: '71',
    id: '102',
    value: 71,
  },
  '103': {
    display: '72',
    id: '103',
    value: 72,
  },
  '104': {
    display: '73',
    id: '104',
    value: 73,
  },
  '105': {
    display: '74',
    id: '105',
    value: 74,
  },
  '106': {
    display: '75',
    id: '106',
    value: 75,
  },
  '107': {
    display: '76',
    id: '107',
    value: 76,
  },
  '108': {
    display: '77',
    id: '108',
    value: 77,
  },
  '109': {
    display: '78',
    id: '109',
    value: 78,
  },
  '110': {
    display: '79',
    id: '110',
    value: 79,
  },
  '111': {
    display: '80',
    id: '111',
    value: 80,
  },
  '112': {
    display: '81',
    id: '112',
    value: 81,
  },
  '113': {
    display: '82',
    id: '113',
    value: 82,
  },
  '114': {
    display: '83',
    id: '114',
    value: 83,
  },
  '115': {
    display: '84',
    id: '115',
    value: 84,
  },
  '116': {
    display: '85',
    id: '116',
    value: 85,
  },
  '117': {
    display: '86',
    id: '117',
    value: 86,
  },
  '118': {
    display: '87',
    id: '118',
    value: 87,
  },
  '119': {
    display: '88',
    id: '119',
    value: 88,
  },
  '120': {
    display: '89',
    id: '120',
    value: 89,
  },
  '121': {
    display: '90',
    id: '121',
    value: 90,
  },
  '122': {
    display: '91',
    id: '122',
    value: 91,
  },
  '123': {
    display: '92',
    id: '123',
    value: 92,
  },
  '124': {
    display: '93',
    id: '124',
    value: 93,
  },
  '125': {
    display: '94',
    id: '125',
    value: 94,
  },
  '126': {
    display: '95',
    id: '126',
    value: 95,
  },
  '127': {
    display: '96',
    id: '127',
    value: 96,
  },
  '128': {
    display: '97',
    id: '128',
    value: 97,
  },
  '129': {
    display: '98',
    id: '129',
    value: 98,
  },
  '130': {
    display: '99',
    id: '130',
    value: 99,
  },
  '131': {
    display: '100',
    id: '131',
    value: 100,
  },
  '132': {
    display: '101',
    id: '132',
    value: 101,
  },
  '133': {
    display: '102',
    id: '133',
    value: 102,
  },
  '134': {
    display: '103',
    id: '134',
    value: 103,
  },
  '135': {
    display: '104',
    id: '135',
    value: 104,
  },
  '136': {
    display: '105',
    id: '136',
    value: 105,
  },
  '137': {
    display: '106',
    id: '137',
    value: 106,
  },
  '138': {
    display: '107',
    id: '138',
    value: 107,
  },
  '139': {
    display: '108',
    id: '139',
    value: 108,
  },
  '140': {
    display: '109',
    id: '140',
    value: 109,
  },
  '141': {
    display: '110',
    id: '141',
    value: 110,
  },
  '142': {
    display: '111',
    id: '142',
    value: 111,
  },
  '143': {
    display: '112',
    id: '143',
    value: 112,
  },
  '144': {
    display: '113',
    id: '144',
    value: 113,
  },
  '145': {
    display: '114',
    id: '145',
    value: 114,
  },
  '146': {
    display: '115',
    id: '146',
    value: 115,
  },
  '147': {
    display: '116',
    id: '147',
    value: 116,
  },
  '148': {
    display: '117',
    id: '148',
    value: 117,
  },
  '149': {
    display: '118',
    id: '149',
    value: 118,
  },
  '150': {
    display: '119',
    id: '150',
    value: 119,
  },
  '151': {
    display: '120',
    id: '151',
    value: 120,
  },
  '152': {
    display: '121',
    id: '152',
    value: 121,
  },
  '153': {
    display: '122',
    id: '153',
    value: 122,
  },
  '154': {
    display: '123',
    id: '154',
    value: 123,
  },
  '155': {
    display: '124',
    id: '155',
    value: 124,
  },
  '156': {
    display: '125',
    id: '156',
    value: 125,
  },
  '157': {
    display: '126',
    id: '157',
    value: 126,
  },
  '158': {
    display: '127',
    id: '158',
    value: 127,
  },
  '159': {
    display: '128',
    id: '159',
    value: 128,
  },
  '160': {
    display: '129',
    id: '160',
    value: 129,
  },
  '161': {
    display: '130',
    id: '161',
    value: 130,
  },
  '162': {
    display: '131',
    id: '162',
    value: 131,
  },
  '163': {
    display: '132',
    id: '163',
    value: 132,
  },
  '164': {
    display: '133',
    id: '164',
    value: 133,
  },
  '165': {
    display: '134',
    id: '165',
    value: 134,
  },
  '166': {
    display: '135',
    id: '166',
    value: 135,
  },
  '167': {
    display: '136',
    id: '167',
    value: 136,
  },
  '168': {
    display: '137',
    id: '168',
    value: 137,
  },
  '169': {
    display: '138',
    id: '169',
    value: 138,
  },
  '170': {
    display: '139',
    id: '170',
    value: 139,
  },
  '171': {
    display: '140',
    id: '171',
    value: 140,
  },
  '172': {
    display: '141',
    id: '172',
    value: 141,
  },
  '173': {
    display: '142',
    id: '173',
    value: 142,
  },
  '174': {
    display: '143',
    id: '174',
    value: 143,
  },
  '175': {
    display: '144',
    id: '175',
    value: 144,
  },
  '176': {
    display: '145',
    id: '176',
    value: 145,
  },
  '177': {
    display: '146',
    id: '177',
    value: 146,
  },
  '178': {
    display: '147',
    id: '178',
    value: 147,
  },
  '179': {
    display: '148',
    id: '179',
    value: 148,
  },
  '180': {
    display: '149',
    id: '180',
    value: 149,
  },
  '181': {
    display: '150',
    id: '181',
    value: 150,
  },
  '182': {
    display: '151',
    id: '182',
    value: 151,
  },
  '183': {
    display: '152',
    id: '183',
    value: 152,
  },
  '184': {
    display: '153',
    id: '184',
    value: 153,
  },
  '185': {
    display: '154',
    id: '185',
    value: 154,
  },
  '186': {
    display: '155',
    id: '186',
    value: 155,
  },
  '187': {
    display: '156',
    id: '187',
    value: 156,
  },
  '188': {
    display: '157',
    id: '188',
    value: 157,
  },
  '189': {
    display: '158',
    id: '189',
    value: 158,
  },
  '190': {
    display: '159',
    id: '190',
    value: 159,
  },
  '191': {
    display: '160',
    id: '191',
    value: 160,
  },
  '192': {
    display: '161',
    id: '192',
    value: 161,
  },
  '193': {
    display: '162',
    id: '193',
    value: 162,
  },
  '194': {
    display: '163',
    id: '194',
    value: 163,
  },
  '195': {
    display: '164',
    id: '195',
    value: 164,
  },
  '196': {
    display: '165',
    id: '196',
    value: 165,
  },
  '197': {
    display: '166',
    id: '197',
    value: 166,
  },
  '198': {
    display: '167',
    id: '198',
    value: 167,
  },
  '199': {
    display: '168',
    id: '199',
    value: 168,
  },
  '200': {
    display: '169',
    id: '200',
    value: 169,
  },
  '201': {
    display: '170',
    id: '201',
    value: 170,
  },
  '202': {
    display: '171',
    id: '202',
    value: 171,
  },
  '203': {
    display: '172',
    id: '203',
    value: 172,
  },
  '204': {
    display: '173',
    id: '204',
    value: 173,
  },
  '205': {
    display: '174',
    id: '205',
    value: 174,
  },
  '206': {
    display: '175',
    id: '206',
    value: 175,
  },
  '207': {
    display: '176',
    id: '207',
    value: 176,
  },
  '208': {
    display: '177',
    id: '208',
    value: 177,
  },
  '209': {
    display: '178',
    id: '209',
    value: 178,
  },
  '210': {
    display: '179',
    id: '210',
    value: 179,
  },
  '211': {
    display: '180',
    id: '211',
    value: 180,
  },
  '212': {
    display: '181',
    id: '212',
    value: 181,
  },
  '213': {
    display: '182',
    id: '213',
    value: 182,
  },
  '214': {
    display: '183',
    id: '214',
    value: 183,
  },
  '215': {
    display: '184',
    id: '215',
    value: 184,
  },
  '216': {
    display: '185',
    id: '216',
    value: 185,
  },
  '217': {
    display: '186',
    id: '217',
    value: 186,
  },
  '218': {
    display: '187',
    id: '218',
    value: 187,
  },
  '219': {
    display: '188',
    id: '219',
    value: 188,
  },
  '220': {
    display: '189',
    id: '220',
    value: 189,
  },
  '221': {
    display: '190',
    id: '221',
    value: 190,
  },
  '222': {
    display: '191',
    id: '222',
    value: 191,
  },
  '223': {
    display: '192',
    id: '223',
    value: 192,
  },
  '224': {
    display: '193',
    id: '224',
    value: 193,
  },
  '225': {
    display: '194',
    id: '225',
    value: 194,
  },
  '226': {
    display: '195',
    id: '226',
    value: 195,
  },
  '227': {
    display: '196',
    id: '227',
    value: 196,
  },
  '228': {
    display: '197',
    id: '228',
    value: 197,
  },
  '229': {
    display: '198',
    id: '229',
    value: 198,
  },
  '230': {
    display: '199',
    id: '230',
    value: 199,
  },
  '231': {
    display: '200',
    id: '231',
    value: 200,
  },
  '232': {
    display: 'yes',
    id: '232',
    value: 1,
  },
  '233': {
    display: 'no',
    id: '233',
    value: 0,
  },
  '234': {
    display: 'placeholder',
    id: '234',
  },
  '235': {
    display: '0',
    id: '235',
    value: 0,
  },
  '236': {
    display: 'Very Unsatisfied',
    id: '236',
    value: 1,
  },
  '237': {
    display: 'Unsatisfied',
    id: '237',
    value: 2,
  },
  '238': {
    display: 'Neutral',
    id: '238',
    value: 3,
  },
  '239': {
    display: 'Satisfied',
    id: '239',
    value: 4,
  },
  '240': {
    display: 'Very Satisfied',
    id: '240',
    value: 5,
  },
  '241': {
    display: 'Strongly Disagree',
    id: '241',
    value: 1,
  },
  '242': {
    display: 'Disagree',
    id: '242',
    value: 2,
  },
  '243': {
    display: 'Agree',
    id: '243',
    value: 4,
  },
  '244': {
    display: 'Strongly Agree',
    id: '244',
    value: 5,
  },
};

export const choicesReducer = (
  state: Choices = choicesInitialState,
  action: RootAction,
): Choices => {
  switch (action.type) {
    default:
      return state;
  }
};
