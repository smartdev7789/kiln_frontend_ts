import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { Platform, PlatformInfo } from "../api/DataTypes";
import { PlatformInfo } from "../api/DataTypes";
import { Option } from "../components/ValidatedForm/MultipleDropdownsToString";
import { FormField, FieldType, ValidatedForm } from "../components/ValidatedForm/ValidatedForm";
import { getToken } from "../authentication/Authentication";
import { API } from "../api/API";

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
  // {
  //   key: "assets",
  //   type: FieldType.MultipleAssets,
  //   label: "editGame.info.assets.label",
  // },
];


interface HuaweiFormProps {
  appID: string;
}

interface x {
  [key: string]: any;
}


export const HuaweiForm = ( { appID }:HuaweiFormProps ) => {
  const platformID = 1 // ???
  const [ waitingForResponse, setWaitingForResponse ] = useState(false);
  const [ platformInfo, setPlatformInfo ] = useState<PlatformInfo>();
  const [ token ] = useState( getToken() )
  const [ initialFormData, setInitialFormData ] = useState<x>()
  const handleSubmit = async (formData: object) => {
    setWaitingForResponse(true);
    console.log(formData)
    // Save platform info.
    // const platforminfo = await API.updateApp(gameData!.id!, formData as AppInfo);
    setWaitingForResponse(false);
  };
   
  console.log(platformInfo)

  // Get and set platform info
  useEffect( () => {
    API.getPlatformInfo(token, appID, platformID ).then((data) => {
      console.log(data)
      setPlatformInfo(data)
      // setInitialFormData(data)
      
      // TODO - para pruebas.
      const gameData = {
        categories_1: "0-0-0",
        age_rating: null,
        // assets: []
      }

      setInitialFormData( formFields.reduce(
        (data: { [key: string]: any }, field) => {
          data[field.key] = (gameData as any)[field.key];
          console.log(data)
          return data;
        },
        {}
      )
    )

    })
  },[token, appID])

  return (
        initialFormData! && formFields
        ?
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
      : 
      <div></div>
  )
}
