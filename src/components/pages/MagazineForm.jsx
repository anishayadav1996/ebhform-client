import React, { useState } from 'react';
import Model from '../form/Model';
import Photographer from '../form/Photographer';
import ParentGuardian from '../form/ParentGuardian';
import OtherIndividuals from '../form/OtherIndividuals';

export default function MagazineForm() {
  const [selectedForm, setSelectedForm] = useState('');

  const renderForm = () => {
    switch (selectedForm) {
      case 'Model':
        return <Model />;
      case 'Photographer':
        return <Photographer />;
      case 'ParentGuardian':
        return <ParentGuardian />;
      case 'OtherIndividuals':
        return <OtherIndividuals />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 container">
      <label className="block mb-2 text-lg font-semibold">Select Form:</label>
      <select
        className="w-full p-2 border rounded-md"
        onChange={(e) => setSelectedForm(e.target.value)}
        value={selectedForm}
      >
        <option value="">-- Choose a form --</option>
        <option value="Model">Model</option>
        <option value="Photographer">Photographer</option>
        <option value="ParentGuardian">Parent/Guardian</option>
        <option value="OtherIndividuals">Other Individuals</option>
      </select>

      <div className="mt-4">{renderForm()}</div>
    </div>
  );
}
