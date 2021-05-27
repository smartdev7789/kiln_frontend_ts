import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
import { Segment } from "semantic-ui-react";
import { Option } from "../components/ValidatedForm/MultipleDropdownsToString";
import { FormField, FieldType, ValidatedForm } from "../components/ValidatedForm/ValidatedForm";

const stringToCategoryOptions = (string: string) =>
  string.split(", ").map((categoryDisplay, i) => {
    return {
      key: i.toString(),
      value: i.toString(),
      text: categoryDisplay,
    };
  });

const huaweiCategory0Options =
  "Entertainment, Tools, Finance, Social, Lifestyle, Navigation & transport, Personalized themes, Education, Sports & health, Photo & video, News & reading, Shopping, Food & drink, Cars, Travel, Business, Kids";
const huawaiCategory1Options =
  "Puzzle & casual, Strategy, Action, Role-playing, Card & board, Sports games";

const huaweiSubcat0Options = [
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
const huaweiSubcat1Options = [
  "Music, Puzzle, Mystery, Tile-matching, Casual, IO",
  "Historical strategy, Modern strategy, Business management, 10065, Life simulation, Tower defense",
  "Fighting, Flying, Shooting, Running",
  "Xianxia, Incremental games, Fantasy, Legend, Trading cards, Wuxia, Online multiplayer, Survival games, Action, Turn-based strategy, Adventure",
  "Fight the landlord, Board & chess, Mahjong, Fishing, Cards",
  "Basketball, Sports, Racing, Soccer",
];

const huaweiCategoryDropdownData = [
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
      "0": stringToCategoryOptions(huaweiCategory0Options),
      "1": stringToCategoryOptions(huawaiCategory1Options),
    },
  },
  {
    key: "2",
    label: "editGame.info.categories.subcategory",
    placeholder: "editGame.info.categories.subcategory",
    options: {
      "0": huaweiSubcat0Options.reduce((obj, optionsString, i) => {
        obj[i.toString()] = stringToCategoryOptions(optionsString);
        return obj;
      }, {} as { [key: string]: Option[] }),
      "1": huaweiSubcat1Options.reduce((obj, optionsString, i) => {
        obj[i.toString()] = stringToCategoryOptions(optionsString);
        return obj;
      }, {} as { [key: string]: Option[] }),
    },
  },
];

const categories_1 = huaweiCategoryDropdownData;

const formFields: FormField[] = [
  {
    // TODO
    key: "categories_1",
    type: FieldType.MultipleDropdowns,
    label: "editGame.info.categories.label",
    delimiter: "-",
  },
  {
    key: 'age_rating',
    type: FieldType.Dropdown,
    label: "editGame.info.age_rating",
    moreInfoLink: "https://developer.huawei.com/consumer/en/doc/50125",
    options: ["3+", "7+", "12+", "16+", "18+"].map((rating) => ({
      key: rating,
      value: rating,
      text: rating,
    })),
  },
  {
    key: "assets",
    type: FieldType.MultipleAssets,
    label: "editGame.info.assets.label",
  },
];

export const HuaweiForm = () => {
  const [ waitingForResponse, setWaitingForResponse ] = useState(false);
  const handleSubmit = async (formData: object) => {
    setWaitingForResponse(true);
    // const app = await API.updateApp(gameData!.id!, formData as AppInfo);
    setWaitingForResponse(false);
  };

  // TODO - para pruebas.
  const gameData = {
    categories_1: "0-0-0",
    age_rating: null,
    assets: [
      // { type:0, width:360, height:360, url:"https://play-lh.googleusercontent.com/ecbXmgbcfIE631S3pQmkPxT9B1NBkKqAIWte9dFH37uBwC1hvuDQ2laeeosA7neBvbpl=s360-rw" },
      // { type:1, width:1920, height:1080, url:"https://play-lh.googleusercontent.com/4ek-DNeaFzPeFw_24Yy1VlSEgmjmeKw0IGzL2ZOWGwxUD5bJNzOyDgsmGIEEYjNOXJU=w3360-h1942-rw"},
      // { type:2, width:1920, height:1080, url:"https://youtu.be/co1wqrGI9tM" }
    ]
  }

  const initialFormData = formFields.reduce(
    (data: { [key: string]: any }, field) => {
      data[field.key] = (gameData as any)[field.key];
      return data;
    },
    {}
  );

  return (
    <div>
      <ValidatedForm
        loading={waitingForResponse}
        onSubmit={handleSubmit}
        fields={formFields}
        initialFormData={initialFormData}
        additionalFieldData={{ categories_1, }}
        buttons={[
          {
            text: "editGame.info.submit",
            positive: true,
            submit: true,
          },
        ]}
      />
    </div>
  )
}
