import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { Platform, PlatformInfo } from "../api/DataTypes";
// import { PlatformInfo } from "../api/DataTypes";
import { Option } from "../components/ValidatedForm/MultipleDropdownsToString";
import { FormField, FieldType, ValidatedForm } from "../components/ValidatedForm/ValidatedForm";
import { getToken } from "../authentication/Authentication";
import { API } from "../api/API";
import { FieldValue } from "../hooks/useForm";
import { Resoruces } from "./Resources"

// Category options
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

// Form fields.
const formFields: FormField[] = [
  {
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


// Interfaces
interface HuaweiFormProps {
  appID: string;
  platformInfoID: number | null
}

interface interfaceFormData {
  [key: string]: FieldValue
}

/**
 * Huawei form componet.
 * @param param0
 * @returns 
 */
export const HuaweiForm = ( { appID, platformInfoID }:HuaweiFormProps ) => {
  const platformID = 1 // maybe this will be a problem at future. 
  const [ token ] = useState( getToken() )
  const [ eTag, setETag ] = useState('')
  const [ pInfoID, SetPInfoID ] = useState(platformInfoID)
  const [ toUpdate, setToUpdate ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ waitingForResponse, setWaitingForResponse ] = useState(false);
  // const [ platformInfo, setPlatformInfo ] = useState<PlatformInfo>();
  const [ initialFormData, setInitialFormData ] = useState<interfaceFormData>()
 
  /**
   * On validate form submit
   * 
   * @param formData Data forms
   */
  const handleSubmit = async (formData: interfaceFormData) => {
    setWaitingForResponse(true);
    
    // Save platform info.
    const data = {
      platform: platformID,
      age_rating: formData.age_rating,
      categories: formData.categories_1,
      // assets: [
      //   { type:0, width:360, height:360, url:"https://play-lh.googleusercontent.com/ecbXmgbcfIE631S3pQmkPxT9B1NBkKqAIWte9dFH37uBwC1hvuDQ2laeeosA7neBvbpl=s360-rw" },
      //   { type:1, width:1920, height:1080, url:"https://play-lh.googleusercontent.com/4ek-DNeaFzPeFw_24Yy1VlSEgmjmeKw0IGzL2ZOWGwxUD5bJNzOyDgsmGIEEYjNOXJU=w3360-h1942-rw"},
      //   { type:2, width:1920, height:1080, url:"https://youtu.be/co1wqrGI9tM" }
      // ]
    }

    if ( toUpdate ) {
      const response = await API.updatePlatformInfo(token, appID, pInfoID!, data, eTag)
      console.log("Update")
      if (response?._status === 'OK') {
        setETag(response?._etag!)
      }  else {
        setError(true)
      }
    } else {
      const response = await API.createPlatformInfo(token, appID, pInfoID!, data)
      console.log("Create")
      if (response?._status === 'OK') {
        setETag(response?._etag!)
        SetPInfoID(Number(response?.id!))
      }  else {
        setError(true)
      }
    }

    // Remove spiner.
    setWaitingForResponse(false)
  };

  /**
   * Error popup
   */
  useEffect( () => {
    if (error) {
      console.log("We need to show the error message")
    }
  }, [error])


  /**
   * Set initial form data 
   */
  useEffect( () => {
    if (pInfoID!) {
      
      API.getPlatformInfo(token, appID, pInfoID! ).then((data) => {
        
        // if (data?._status === 'OK' ) { // TODO.
        if ( Object.keys(data!).length > 2 ) {
          setETag(data?._etag!)
          setToUpdate(true)
          // TODO. Pay attention to categories_1
          const gameData = {
            categories_1: data?.categories! ? data?.categories : '0-0-0',
            age_rating: data?.age_rating,
            // TODO: Need to finish up how this works to replace the "Bag of Resources" that Lucas put in place
            // * Icon (Max. size: 2 MB. Resolution: 216 x 216 px or 512 x 512 px. Format: PNG, WEBP.)
            // * Screenshot and videos
            // * Screenshots (Upload 3 to 8 screenshots. Resolution: 800 x 450 px or 450 x 800 px. Side length: 320–3840 px. Max. size: 5 MB. Format: PNG, JPG, JPEG, WEBP.)
            //     Introduction Videos (Max 3)
            //         Landscape / Portrait
            //         Upload a video in landscape mode. Format: MOV or MP4. Recommended resolution: 1280 x 720 px. Aspect ratio: 16:9. Max. size: 500 MB. Length: 15 seconds to 2 minutes.
            //     Promotion Video (Max 1)
            //         Upload a promotion video. Format: MOV or MP4. Recommended resolution: 1600 x 1200 px or 1200 x 900 px. Aspect ratio: 4:3. Max. size: 500 MB. Length: 15 seconds to 2 minutes.
            assets: [
              { type: 0, width: 360, height: 360, url: "https://play-lh.googleusercontent.com/ecbXmgbcfIE631S3pQmkPxT9B1NBkKqAIWte9dFH37uBwC1hvuDQ2laeeosA7neBvbpl=s360-rw" },
              { type: 0, width: 360, height: 360, url: "https://play-lh.googleusercontent.com/4ek-DNeaFzPeFw_24Yy1VlSEgmjmeKw0IGzL2ZOWGwxUD5bJNzOyDgsmGIEEYjNOXJU=w3360-h1942-rw" },
              { type: 1, width: 1920, height: 1080, url: "https://play-lh.googleusercontent.com/4ek-DNeaFzPeFw_24Yy1VlSEgmjmeKw0IGzL2ZOWGwxUD5bJNzOyDgsmGIEEYjNOXJU=w3360-h1942-rw"},
              { type: 2, width: 1920, height: 1080, url: "https://youtu.be/co1wqrGI9tM" }
            ]
          }
          setInitialFormData(gameData as interfaceFormData)
        } else {
          setInitialFormData( 
            { categories_1: '0-0-0', age_rating: '' } as interfaceFormData
          )
        }
      })
      
    } else {
      setInitialFormData( 
        { categories_1: '0-0-0', age_rating: '' } as interfaceFormData
      )
    }
  },[token, appID, pInfoID])

  return (
    initialFormData!
    ?
      <>
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
        { toUpdate ? <Resoruces platformInfoID={pInfoID!} /> : null }
      </>
    : 
      <div></div>
  )
}
