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
                    onClick={() => image.setSelectedTheme(theme)}
                    border={theme.id === image.selectedTheme.id ? 'danger' : 'light'}
                >
                    {theme.name}
                </Card>
            )}
        </Row>
    );
});

export default ThemeBar;
