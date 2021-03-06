import React from 'react';
import { Row, Accordion, Card } from 'react-bootstrap';
import EditableBeastCard from './EditableBeastCard';

const EditableFactionBeastsList = (props) => {
  const {
    faction, logo, factionBeasts, onFormSubmit,
  } = props;
  const factionBeastsComponents = factionBeasts.map(factionBeast => (
    <EditableBeastCard
      {...factionBeast}
      faction={faction}
      logo={logo}
      onFormSubmit={onFormSubmit}
      key={factionBeast.id}
    />
  ));
  return (
    <Accordion>
      <Accordion.Toggle as={Card.Header}>
        <h2>{faction}</h2>
      </Accordion.Toggle>
      <Accordion.Collapse>
        <Row>
          {factionBeastsComponents}
        </Row>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default EditableFactionBeastsList;
