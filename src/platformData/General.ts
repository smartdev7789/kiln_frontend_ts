import { Option } from "../components/ValidatedForm/MultipleDropdownsToString";
import { FieldType } from "../components/ValidatedForm/ValidatedForm";

const stringToCategoryOptions = (string: string) =>
  string.split(", ").map((categoryDisplay, i) => {
    return {
      key: i.toString(),
      value: i.toString(),
      text: categoryDisplay,
    };
  });

export const generalCategory0Options =
  "Entertainment, Tools, Finance, Social, Lifestyle, Navigation & transport, Personalized themes, Education, Sports & health, Photo & video, News & reading, Shopping, Food & drink, Cars, Travel, Business, Kids";
export const huawaiCategory1Options =
  "Puzzle & casual, Strategy, Action, Role-playing, Card & board, Sports games";

export const generalSubcat0Options = [
  "Karaoke, Streaming, Radio, Videos, TV, Music",
  "Alarms, Browsers, Keyboards, Wi-Fi, Tools, Security",
  "Accounting, Personal finance, Lottery, Banking, Equity funds, Loans",
  "Chatting, Love & marriage, Communication, Community",
  "House refurbishment, Movie tickets, Rent and buy houses, Local life, Housekeeping, Weather & calendars",
  "Public transport, Navigation, Cars, Maps, Transport & tickets",
  "Launchers, Screen locks, Wallpapers, Ringtones",
  "Translation, Exams, Learning, English",
  "Healthcare, Health, Sports, Well-being",
  "Photography, Photo galleries, Short videos, AV editors, Beautification",
  "Magazines, Humor, Books, Sports, Audiobooks, News, Anime & comics",
  "Mails, Discounts, Shopping guides, Deliveries and packages, International shopping, Group purchasing",
  "Take-out, Catering, Receipes, Fresh food",
  "Car care, Car info, Driving test, Traffic violations",
  "Travel, Acommodation, Travel assistance",
  "Notes, Efficiency, Email, Jobs, Business software",
  "Early learning, Nursery rhymes, Mom & baby",
];
export const generalSubcat1Options = [
  "Music, Puzzle, Mystery, Tile-matching, Casual, IO",
  "Historical strategy, Modern strategy, Business management, 10065, Life simulation, Tower defense",
  "Fighting, Flying, Shooting, Running",
  "Xianxia, Incremental games, Fantasy, Legend, Trading cards, Wuxia, Online multiplayer, Survival games, Action, Turn-based strategy, Adventure",
  "Fight the landlord, Board & chess, Mahjong, Fishing, Cards",
  "Basketball, Sports, Racing, Soccer",
];

export const generalCategoryDropdownData = [
  {
    key: "0",
    label: "editGame.info.categories.mainCategory",
    placeholder: "editGame.info.categories.mainCategory",
    options: [
      {
        key: "0",
        value: "0",
        text: "editGame.info.categories.app",
      },
      {
        key: "1",
        value: "1",
        text: "editGame.info.categories.game",
      },
    ],
  },
  {
    key: "1",
    label: "editGame.info.categories.category",
    placeholder: "editGame.info.categories.category",
    options: {
      "0": stringToCategoryOptions(generalCategory0Options),
      "1": stringToCategoryOptions(huawaiCategory1Options),
    },
  },
  {
    key: "2",
    label: "editGame.info.categories.subcategory",
    placeholder: "editGame.info.categories.subcategory",
    options: {
      "0": generalSubcat0Options.reduce((obj, optionsString, i) => {
        obj[i.toString()] = stringToCategoryOptions(optionsString);
        return obj;
      }, {} as { [key: string]: Option[] }),
      "1": generalSubcat1Options.reduce((obj, optionsString, i) => {
        obj[i.toString()] = stringToCategoryOptions(optionsString);
        return obj;
      }, {} as { [key: string]: Option[] }),
    },
  },
];

export const generalID = 1;

export const additionalFormFieldsForGeneral = [
  {
    key: `assets_${generalID}`,
    type: FieldType.MultipleAssets,
    label: "editGame.info.assets.label",
  },
  {
    key: `categories_${generalID}`,
    type: FieldType.MultipleDropdowns,
    label: "editGame.info.categories.label",
    delimiter: "-",
  },
  {
    key: `age_rating_${generalID}`,
    type: FieldType.Dropdown,
    label: "editGame.info.age_rating",
    moreInfoLink: "https://developer.general.com/consumer/en/doc/50125",
    options: ["3+", "7+", "12+", "16+", "18+"].map((rating) => ({
      key: rating,
      value: rating,
      text: rating,
    })),
  },
];
