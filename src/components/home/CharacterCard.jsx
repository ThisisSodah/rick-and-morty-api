import { Avatar, Card, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export const CharacterCard = ({ data }) => {
    const renderKeyValue = (key, value) => {
        if (value) {
            return (
                <span>
                    <Typography
                        display="inline"
                        className="grey"
                        variant="body2">
                        {`${key}:`}
                    </Typography>
                    <Typography
                        display="inline"
                        variant="body2"
                        className="white">
                        {" "}
                        {value}
                    </Typography>
                </span>
            );
        }
    };
    const renderLocationData = (data, locationType) => {
        if (data) {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "0.5rem",
                    }}>
                    <Typography
                        style={{ textAlign: "center" }}
                        className="white">
                        {locationType}
                    </Typography>
                    <div
                        className="infoContainer"
                        style={{ paddingTop: "0.5rem" }}>
                        {renderKeyValue("Planet", data.name)}
                        {renderKeyValue("Type", data.type)}
                    </div>
                    <div
                        className="infoContainer"
                        style={{ paddingTop: "0.5rem" }}>
                        {renderKeyValue("Dimension", data.dimension)}
                        {renderKeyValue(
                            "Residents",
                            data.residentsCount
                        )}
                    </div>
                </div>
            );
        }
    };

    const renderStatus = (status) => {
        if (status && status !== "unknown") {
            return (
                <div className="genderContainer">
                    <FiberManualRecordIcon
                        style={{ color: status === "Alive" ? "#6fd05c" : "red", paddingRight: "4px" }}
						fontSize="small"
                    />
					<Typography variant="caption" className="grey">
						{status} | 
					</Typography>
                </div>
            );
        }
    };
    return (
        <Card className="charCard">
            <CardContent style={{
				maxHeight: "355px",
				overflow: "auto"
				}}
			>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                        src={data.image}
                        alt={data.name}
                        className="charImage"
                    />
                </div>
                <div className="flexColumn w100" style={{ paddingTop: "1rem" }}>
                    <div
                        className="profileName white"
                        style={{ alignItems: "center" }}>
                        <Typography variant="h6" className="white">
                            {data.name}
                        </Typography>
                        {data.gender && data.gender !== "unknown" && (
                            <div style={{display: "flex",}}>
								{renderStatus(data.status)}
                                <Typography variant="caption" className="grey" style={{paddingLeft: "4px"}}>
                                    {data.gender}
                                </Typography>
                            </div>
                        )}
                    </div>

                    <div className="speciesEpisodesContainer">
						{renderKeyValue("Species", data.species)}
						{renderKeyValue("Episodes",data.episode?.length)}
					</div>
                    <Divider
                        variant="middle"
                        style={{
                            paddingTop: "0.5rem",
                            borderColor: "#ffffff22",
                        }}
                    />
                    {renderLocationData(data.originData, "Origin Details")}
                    {data.originData && (
                        <Divider
                            variant="middle"
                            style={{
                                paddingTop: "0.5rem",
                                borderColor: "#ffffff22",
                            }}
                        />
                    )}
                    {renderLocationData(
                        data.locationData,
                        "Last known location"
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
