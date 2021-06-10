// import React, { useContext, useEffect, useState } from "react";

import { useEffect, useState } from "react"
import { API } from "../api/API"
import { ResourcesData } from "../api/DataTypes";
import { getToken } from "../authentication/Authentication";
import { Form, Dropdown, Button } from 'semantic-ui-react'
import { useTranslation } from "react-i18next";

interface ResourceProps { platformInfoID: number }
export const Resoruces = ( { platformInfoID }:ResourceProps ) => {

    const token = getToken() 
    const [resources, setResouces] = useState<ResourcesData[]>([])
    const { t } = useTranslation();

    // Get resources
    useEffect(()=>{
        API.getAllResources(token, platformInfoID).then( (data) => {
            console.log(data)
            // setResouces(data?._items)
        })

    }, [platformInfoID, token])

    return (
        <>
            <h1>Resources</h1>

            <Form>
                <Form.Field styled type="file">
                    <Dropdown text={`${t("release.type")}`}>
                        <Dropdown.Menu>
                        <Dropdown.Item text={`${t("release.type.icon")}`} />
                        <Dropdown.Item text={`${t("release.type.screenshot")}`} />
                        <Dropdown.Item text={`${t("release.type.video")}`} />
                        </Dropdown.Menu>
                    </Dropdown>

                    <label>Last Name</label>
                    <input type="file" placeholder='Last Name' />
                
                </Form.Field>

                <Button type='submit'>Submit</Button>
            </Form>

            { resources!
            ?
                resources.map( (resource) => {
                    return (
                        <>Resource</>
                    )
                })
            : null }

        </>
    )
}