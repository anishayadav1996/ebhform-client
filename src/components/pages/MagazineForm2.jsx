import React from 'react'
import Model from '../form/Model';
import Photographer from '../form/Photographer';
import ParentGuardian from '../form/ParentGuardian';
import OtherIndividuals from '../form/OtherIndividuals';

export default function MagazineForm2() {
  return (
    <>
      <Model />
      <Photographer />
      <ParentGuardian />
      <OtherIndividuals />
    </>
  )
}
