import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const ThemeBar = observer(() => {
    const {image} = useContext(Context)

    return (
        <Row className="d-flex">
            {image.themes.map(theme =>                         
                <Card
                    style={{cursor:'pointer'}}
                    key={theme.id}
                    className="p-3"
                    onClick={ ()=>{
                        if(image.selectedTheme.id == undefined || image.selectedTheme.id != theme.id){
                            image.setSelectedTheme(theme);
                        } else if(image.selectedTheme.id === theme.id){
                            image.setSelectedTheme("*");
                        }}
                    }
                    border={theme.id === image.selectedTheme.id ? 'danger' : 'light'}
                >
                    {theme.name}
                </Card>
            )}
        </Row>
    );
});

export default ThemeBar;
