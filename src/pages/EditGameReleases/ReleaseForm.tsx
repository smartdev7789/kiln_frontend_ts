import React, { useEffect, useRef, useState } from "react";
import { APIResponse, Build, Platform, Release } from "../../api/DataTypes";
import { FieldType, FormField, ValidatedForm } from "../../components/ValidatedForm/ValidatedForm";
import { useTranslation } from "react-i18next";
import { API, API_ADDRESS } from "../../api/API";
import { Button, Table } from "semantic-ui-react";
import { TableCard } from "../../components/Cards/TableCard";
import { getToken } from "../../authentication/Authentication";

interface Properties {
  appId: string | null,
  platforms: Platform[];
  index: number;
  release: Release; 
  onSubmit: (data: Release, index: number, file?: File) => Promise<APIResponse | undefined>;
  onDelete: (index: number) => void;
}

export const ReleaseForm = ({ appId, platforms, index, release, onSubmit, onDelete }: Properties) => {
  const { t } = useTranslation();

  const [token, setToken] = useState<string>(''); 
  const [file, setFile] = useState<File | null>(null);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [error, setError] = useState(false);

  let waitingForResponse = false;
  
  const nameInput = useRef<HTMLInputElement>(null);

  const handlePackageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(error) setError(false);
  };

  const fields: FormField[] = [
    // TODO: Regions
    // {
    //   key: 'age_rating',
    //   type: FieldType.Dropdown,
    //   label: "editGame.info.age_rating",
    //   moreInfoLink: "https://developer.huawei.com/consumer/en/doc/50125",
    //   options: ["3+", "7+", "12+", "16+", "18+"].map((rating) => ({
    //     key: rating,
    //     value: rating,
    //     text: rating,
    //   })),
    // },
    {
      key: "name",
      type: FieldType.Text,
      required: true,
      label: "editGame.releases.form.name",
      unique: false,
      useRef: nameInput,
      onChange: handleNameChange,
    },
    {
      key: "changelog",
      type: FieldType.Textarea,
      required: true,
      label: "editGame.releases.form.changelog",
    },
  ];
  
  // If we don't have a package uploaded, we'll add that bit to the form.
  // Otherwise, we'll just let them know that they can't replace the APK
  if (!release.package || !release.package.file) {
    fields.push(
      {
        key: "package",
        type: FieldType.FileUpload,
        label: "editGame.releases.form.package",
        onChange: handlePackageChange,
      }
    );
  }
  
  let initialFormData = {
    "name": release.name || "",
    "changelog": release.changelog || ""
  };

  const handleSubmit = async (formData: object) => {
    waitingForResponse = true;

    const response = file ? await onSubmit(formData as Release, index, file) : await onSubmit(formData as Release, index);
console.log(response)
    if (response?._status === "ERR") {
      setError(true);
    }
  
    waitingForResponse = false;
  };

  
  /**
   * Instruct the backend to process builds for all connected platforms
   */
  const processAllBuilds = async (event: any) => {
    const response = await API.processReleases(token, appId!, release.id);

    if (response._status === "OK") {
      setBuilds(response._items! as Build[])
    }
  }

  /**
   * Instruct the backend to process a build for a particular platform
   * @param platformId Platform to process build for
   */
  const processBuild = (platformId: number) => async (event: any) => {
    const response = await API.processReleases(token, appId!, release.id, [platformId]);

    if (response._status === "OK") {
      setBuilds([
        ...builds,
        response._items![0] as Build
      ])
    }
  }

  /**
   * Download a build
   * @param id Id of build to download
   */
  const downloadBuild = (downloadToken: string) => async (event: any) => {
    window.open(API.downloadReleaseBuild(downloadToken));
  }
  
  /**
   * Publish build
   * @param id Id of build to publish
   */
  const publishBuild = (id: number) => async (event: any) => {
    const response = await API.publishRelease(token, appId!, release.id, [id]);

    if (response._status === "OK") {
      const updatedBuild = response._items![0] as Build;
      setBuilds(
        builds.map((b: Build, i: number) => (b.id === updatedBuild!.id ? updatedBuild : b)),  
      ) 
    }
  }
  
  /**
   * Erase and unpublish build
   * @param id Id of build to erase and unpublish
   */
  // const deleteBuild = (id: number, index: number) => async (event: any) => {
  const deleteBuild = (build: Build) => async (event: any) => {
    if (window.confirm(t("editGame.releases.form.unpublishMessage"))) {
      const response = await API.deleteReleaseBuild(token, appId!, release.id, build.platform);
      
      if (response._status === "OK") {
        if (release.builds) {
          release.builds = release.builds.filter((b) => b !== build); 
        }
        setBuilds(builds.filter((b: Build) => (b !== build)));
      }
    }
  }

  useEffect(() => {
    fields[0].unique = error;     
    setFormFields(fields);

   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])
  
  useEffect(() => {
    
  }, [formFields]);

  useEffect(() => {
    if (builds.length === 0 && release.builds && release.builds?.length > 0) {
      setBuilds(release.builds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builds])

  // Set the access token
  useEffect(() => {
    const t = getToken();
    if (t!) setToken(t);
  }, []);

  return (
        initialFormData! && formFields
        ?
        <>
          <ValidatedForm
            loading={waitingForResponse}
            onSubmit={handleSubmit}
            fields={formFields}
            initialFormData={initialFormData}
            buttons={[
              {
                text: "editGame.releases.save",
                positive: true,
                submit: true,
              },
              {
                text: "editGame.releases.delete",
                positive: false,
                disabled: true,
                onClick: () => { onDelete(index); }
              },
            ]}
          />

          {release.package && release.package.file &&
          
            <div>
              <h1><a href={`${API_ADDRESS}${release.package.file}`}>APK Uploaded</a></h1>
              <Button
                compact
                positive
                style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
                onClick={processAllBuilds}
                disabled={false}
                content={t("editGame.releases.form.processAll")}
              />
            </div>
          
          }

        {release.package && release.package.file &&
          <TableCard
          headers={["platform", "status", "actions"].map((string) =>
            t(`editGame.releases.table.headers.${string}`)
          )}
          >
                {platforms!.map((platform, index) => {
                  // If there's a build for this platform, we'll store it
                  let build;
                  if (builds) {
                    const thisBuild = builds.filter(b => b.platform === platform.id);
                    if (thisBuild.length !== 0) {
                      build = thisBuild[0];
                    }
                  }
                  return (
                    <Table.Row key={`platform-${index}`}>
                      <Table.Cell>{platform.name}</Table.Cell>
                      {!build ?
                        <>
                          <Table.Cell></Table.Cell>
                          <Table.Cell>
                            <Button
                              positive
                              content={t("editGame.releases.table.process")}
                              onClick={processBuild(platform.id)}
                            />
                          </Table.Cell>
                        </>
                        :
                        <>
                          <Table.Cell>
                            {
                              t(
                                [
                                  "editGame.releases.table.status.standby",
                                  "editGame.releases.table.status.processing",
                                  "editGame.releases.table.status.ready",
                                  "editGame.releases.table.status.testing",
                                  "editGame.releases.table.status.publishing",
                                  "editGame.releases.table.status.published",
                                  "editGame.releases.table.status.processingFailed",
                                  "editGame.releases.table.status.testingFailed",
                                  "editGame.releases.table.status.publishFailed",
                                ][Math.log(build.status) / Math.log(2)]
                              )
                            }
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              positive
                              basic
                              content={t("editGame.releases.table.download")}
                              onClick={downloadBuild(build.token)}
                              disabled={build.status < 4}
                            />
                            {build.status === 4 &&
                              <Button
                                positive
                                content={t("editGame.releases.table.publish")}
                                onClick={publishBuild(platform.id)}
                                disabled={build.status < 4}
                              />
                            }
                            {build.status === 32 &&
                              <Button
                                negative
                                basic
                                content={t("editGame.releases.table.unpublish")}
                                // onClick={deleteBuild(platform.id, index)}
                                onClick={deleteBuild(build)}
                                disabled={build.status < 32}
                              />
                            }
                          </Table.Cell>
                          </>
                        }
                    </Table.Row>
                  )
                })}
            
            </TableCard>
          }
        </>
      : 
      <div></div>
  )
}