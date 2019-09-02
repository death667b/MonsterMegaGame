import React from 'react';
import { CardColumns, Accordion, Card } from 'react-bootstrap';
import EditableBeastCard from './EditableBeastCard';

const EditableFactionBeastsList = (props) => {
  const { faction, factionBeasts, onFormSubmit } = props;
  const factionBeastsComponents = factionBeasts.map(factionBeast => (
    <EditableBeastCard
      {...factionBeast}
      faction={faction}
      onFormSubmit={onFormSubmit}
    />
  ));
  return (
    <div>
      <Accordion>
        <Accordion.Toggle as={Card.Header}>
          <h2>{faction}</h2>
        </Accordion.Toggle>
        <Accordion.Collapse>
          <CardColumns>
            {factionBeastsComponents}
          </CardColumns>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
};

export default EditableFactionBeastsList;